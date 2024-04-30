import { getMilliseconds } from './utils/get-milliseconds.js';
import { useEnv } from '@directus/env';
const env = useEnv();
export const SYSTEM_ASSET_ALLOW_LIST = [
    {
        key: 'system-small-cover',
        format: 'auto',
        transforms: [['resize', { width: 64, height: 64, fit: 'cover' }]],
    },
    {
        key: 'system-small-contain',
        format: 'auto',
        transforms: [['resize', { width: 64, fit: 'contain' }]],
    },
    {
        key: 'system-medium-cover',
        format: 'auto',
        transforms: [['resize', { width: 300, height: 300, fit: 'cover' }]],
    },
    {
        key: 'system-medium-contain',
        format: 'auto',
        transforms: [['resize', { width: 300, fit: 'contain' }]],
    },
    {
        key: 'system-large-cover',
        format: 'auto',
        transforms: [['resize', { width: 800, height: 800, fit: 'cover' }]],
    },
    {
        key: 'system-large-contain',
        format: 'auto',
        transforms: [['resize', { width: 800, fit: 'contain' }]],
    },
];
export const ASSET_TRANSFORM_QUERY_KEYS = [
    'key',
    'transforms',
    'width',
    'height',
    'format',
    'fit',
    'quality',
    'withoutEnlargement',
    'focal_point_x',
    'focal_point_y',
];
export const FILTER_VARIABLES = ['$NOW', '$CURRENT_USER', '$CURRENT_ROLE'];
export const ALIAS_TYPES = ['alias', 'o2m', 'm2m', 'm2a', 'o2a', 'files', 'translations'];
export const DEFAULT_AUTH_PROVIDER = 'default';
export const COLUMN_TRANSFORMS = ['year', 'month', 'day', 'weekday', 'hour', 'minute', 'second'];
export const GENERATE_SPECIAL = ['uuid', 'date-created', 'role-created', 'user-created'];
export const UUID_REGEX = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';
export const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    domain: env['REFRESH_TOKEN_COOKIE_DOMAIN'],
    maxAge: getMilliseconds(env['REFRESH_TOKEN_TTL']),
    secure: Boolean(env['REFRESH_TOKEN_COOKIE_SECURE']),
    sameSite: (env['REFRESH_TOKEN_COOKIE_SAME_SITE'] || 'strict'),
};
export const SESSION_COOKIE_OPTIONS = {
    httpOnly: true,
    domain: env['SESSION_COOKIE_DOMAIN'],
    maxAge: getMilliseconds(env['SESSION_COOKIE_TTL']),
    secure: Boolean(env['SESSION_COOKIE_SECURE']),
    sameSite: (env['SESSION_COOKIE_SAME_SITE'] || 'strict'),
};
export const OAS_REQUIRED_SCHEMAS = ['Query', 'x-metadata'];
/** Formats from which transformation is supported */
export const SUPPORTED_IMAGE_TRANSFORM_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/tiff', 'image/avif'];
/** Formats where metadata extraction is supported */
export const SUPPORTED_IMAGE_METADATA_FORMATS = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/tiff',
    'image/avif',
];