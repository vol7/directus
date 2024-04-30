import { useEnv } from '@directus/env';
import { ErrorCode, InvalidPayloadError, isDirectusError } from '@directus/errors';
import { Router } from 'express';
import { createLDAPAuthRouter, createLocalAuthRouter, createOAuth2AuthRouter, createOpenIDAuthRouter, createSAMLAuthRouter, } from '../auth/drivers/index.js';
import { REFRESH_COOKIE_OPTIONS, DEFAULT_AUTH_PROVIDER, SESSION_COOKIE_OPTIONS } from '../constants.js';
import { useLogger } from '../logger.js';
import { respond } from '../middleware/respond.js';
import { AuthenticationService } from '../services/authentication.js';
import { UsersService } from '../services/users.js';
import asyncHandler from '../utils/async-handler.js';
import { getAuthProviders } from '../utils/get-auth-providers.js';
import { getIPFromReq } from '../utils/get-ip-from-req.js';
import isDirectusJWT from '../utils/is-directus-jwt.js';
import { verifyAccessJWT } from '../utils/jwt.js';
const router = Router();
const env = useEnv();
const logger = useLogger();
const authProviders = getAuthProviders();
for (const authProvider of authProviders) {
    let authRouter;
    switch (authProvider.driver) {
        case 'local':
            authRouter = createLocalAuthRouter(authProvider.name);
            break;
        case 'oauth2':
            authRouter = createOAuth2AuthRouter(authProvider.name);
            break;
        case 'openid':
            authRouter = createOpenIDAuthRouter(authProvider.name);
            break;
        case 'ldap':
            authRouter = createLDAPAuthRouter(authProvider.name);
            break;
        case 'saml':
            authRouter = createSAMLAuthRouter(authProvider.name);
            break;
    }
    if (!authRouter) {
        logger.warn(`Couldn't create login router for auth provider "${authProvider.name}"`);
        continue;
    }
    router.use(`/login/${authProvider.name}`, authRouter);
}
if (!env['AUTH_DISABLE_DEFAULT']) {
    router.use('/login', createLocalAuthRouter(DEFAULT_AUTH_PROVIDER));
}
function getCurrentMode(req) {
    if (req.body.mode) {
        return req.body.mode;
    }
    if (req.body.refresh_token) {
        return 'json';
    }
    return 'cookie';
}
function getCurrentRefreshToken(req, mode) {
    if (mode === 'json') {
        return req.body.refresh_token;
    }
    if (mode === 'cookie') {
        return req.cookies[env['REFRESH_TOKEN_COOKIE_NAME']];
    }
    if (mode === 'session') {
        const token = req.cookies[env['SESSION_COOKIE_NAME']];
        if (isDirectusJWT(token)) {
            const payload = verifyAccessJWT(token, env['SECRET']);
            return payload.session;
        }
    }
    return undefined;
}
router.post('/refresh', asyncHandler(async (req, res, next) => {
    const accountability = {
        ip: getIPFromReq(req),
        role: null,
    };
    const userAgent = req.get('user-agent')?.substring(0, 1024);
    if (userAgent)
        accountability.userAgent = userAgent;
    const origin = req.get('origin');
    if (origin)
        accountability.origin = origin;
    const authenticationService = new AuthenticationService({
        accountability: accountability,
        schema: req.schema,
    });
    const mode = getCurrentMode(req);
    const currentRefreshToken = getCurrentRefreshToken(req, mode);
    if (!currentRefreshToken) {
        throw new InvalidPayloadError({
            reason: `The refresh token is required in either the payload or cookie`,
        });
    }
    const { accessToken, refreshToken, expires } = await authenticationService.refresh(currentRefreshToken, {
        session: mode === 'session',
    });
    const payload = { expires };
    if (mode === 'json') {
        payload.refresh_token = refreshToken;
        payload.access_token = accessToken;
    }
    if (mode === 'cookie') {
        res.cookie(env['REFRESH_TOKEN_COOKIE_NAME'], refreshToken, REFRESH_COOKIE_OPTIONS);
        payload.access_token = accessToken;
    }
    if (mode === 'session') {
        res.cookie(env['SESSION_COOKIE_NAME'], accessToken, SESSION_COOKIE_OPTIONS);
    }
    res.locals['payload'] = { data: payload };
    return next();
}), respond);
router.post('/logout', asyncHandler(async (req, res, next) => {
    const accountability = {
        ip: getIPFromReq(req),
        role: null,
    };
    const userAgent = req.get('user-agent')?.substring(0, 1024);
    if (userAgent)
        accountability.userAgent = userAgent;
    const origin = req.get('origin');
    if (origin)
        accountability.origin = origin;
    const authenticationService = new AuthenticationService({
        accountability: accountability,
        schema: req.schema,
    });
    const mode = getCurrentMode(req);
    const currentRefreshToken = getCurrentRefreshToken(req, mode);
    if (!currentRefreshToken) {
        throw new InvalidPayloadError({
            reason: `The refresh token is required in either the payload or cookie`,
        });
    }
    await authenticationService.logout(currentRefreshToken);
    if (req.cookies[env['REFRESH_TOKEN_COOKIE_NAME']]) {
        res.clearCookie(env['REFRESH_TOKEN_COOKIE_NAME'], REFRESH_COOKIE_OPTIONS);
    }
    if (req.cookies[env['SESSION_COOKIE_NAME']]) {
        res.clearCookie(env['SESSION_COOKIE_NAME'], SESSION_COOKIE_OPTIONS);
    }
    return next();
}), respond);
router.post('/password/request', asyncHandler(async (req, _res, next) => {
    if (typeof req.body.email !== 'string') {
        throw new InvalidPayloadError({ reason: `"email" field is required` });
    }
    const accountability = {
        ip: getIPFromReq(req),
        role: null,
    };
    const userAgent = req.get('user-agent')?.substring(0, 1024);
    if (userAgent)
        accountability.userAgent = userAgent;
    const origin = req.get('origin');
    if (origin)
        accountability.origin = origin;
    const service = new UsersService({ accountability, schema: req.schema });
    try {
        await service.requestPasswordReset(req.body.email, req.body.reset_url || null);
        return next();
    }
    catch (err) {
        if (isDirectusError(err, ErrorCode.InvalidPayload)) {
            throw err;
        }
        else {
            logger.warn(err, `[email] ${err}`);
            return next();
        }
    }
}), respond);
router.post('/password/reset', asyncHandler(async (req, _res, next) => {
    if (typeof req.body.token !== 'string') {
        throw new InvalidPayloadError({ reason: `"token" field is required` });
    }
    if (typeof req.body.password !== 'string') {
        throw new InvalidPayloadError({ reason: `"password" field is required` });
    }
    const accountability = {
        ip: getIPFromReq(req),
        role: null,
    };
    const userAgent = req.get('user-agent')?.substring(0, 1024);
    if (userAgent)
        accountability.userAgent = userAgent;
    const origin = req.get('origin');
    if (origin)
        accountability.origin = origin;
    const service = new UsersService({ accountability, schema: req.schema });
    await service.resetPassword(req.body.token, req.body.password);
    return next();
}), respond);
router.get('/', asyncHandler(async (req, res, next) => {
    const sessionOnly = 'sessionOnly' in req.query && (req.query['sessionOnly'] === '' || Boolean(req.query['sessionOnly']));
    res.locals['payload'] = {
        data: getAuthProviders({ sessionOnly }),
        disableDefault: env['AUTH_DISABLE_DEFAULT'],
    };
    return next();
}), respond);
export default router;