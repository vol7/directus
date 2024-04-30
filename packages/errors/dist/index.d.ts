import { Range } from '@directus/storage';

interface DirectusError<Extensions = void> extends Error {
    extensions: Extensions;
    code: string;
    status: number;
}
interface DirectusErrorConstructor<Extensions = void> {
    new (extensions: Extensions, options?: ErrorOptions): DirectusError<Extensions>;
    readonly prototype: DirectusError<Extensions>;
}
declare const createError: <Extensions = void>(code: string, message: string | ((extensions: Extensions) => string), status?: number) => DirectusErrorConstructor<Extensions>;

declare enum ErrorCode {
    ContainsNullValues = "CONTAINS_NULL_VALUES",
    ContentTooLarge = "CONTENT_TOO_LARGE",
    Forbidden = "FORBIDDEN",
    IllegalAssetTransformation = "ILLEGAL_ASSET_TRANSFORMATION",
    InvalidCredentials = "INVALID_CREDENTIALS",
    InvalidForeignKey = "INVALID_FOREIGN_KEY",
    InvalidIp = "INVALID_IP",
    InvalidOtp = "INVALID_OTP",
    InvalidPayload = "INVALID_PAYLOAD",
    InvalidProvider = "INVALID_PROVIDER",
    InvalidProviderConfig = "INVALID_PROVIDER_CONFIG",
    InvalidQuery = "INVALID_QUERY",
    InvalidToken = "INVALID_TOKEN",
    LimitExceeded = "LIMIT_EXCEEDED",
    MethodNotAllowed = "METHOD_NOT_ALLOWED",
    NotNullViolation = "NOT_NULL_VIOLATION",
    OutOfDate = "OUT_OF_DATE",
    RangeNotSatisfiable = "RANGE_NOT_SATISFIABLE",
    RecordNotUnique = "RECORD_NOT_UNIQUE",
    RequestsExceeded = "REQUESTS_EXCEEDED",
    RouteNotFound = "ROUTE_NOT_FOUND",
    ServiceUnavailable = "SERVICE_UNAVAILABLE",
    TokenExpired = "TOKEN_EXPIRED",
    UnexpectedResponse = "UNEXPECTED_RESPONSE",
    UnprocessableContent = "UNPROCESSABLE_CONTENT",
    UnsupportedMediaType = "UNSUPPORTED_MEDIA_TYPE",
    UserSuspended = "USER_SUSPENDED",
    ValueOutOfRange = "VALUE_OUT_OF_RANGE",
    ValueTooLong = "VALUE_TOO_LONG"
}

/**
 * Check whether or not a passed thing is a valid Directus error
 *
 * @param err - Any input
 */
declare const isDirectusError: <T = unknown>(err: unknown, code?: string) => err is DirectusError<T>;

interface ContainsNullValuesErrorExtensions {
    collection: string;
    field: string;
}
declare const ContainsNullValuesError: DirectusErrorConstructor<ContainsNullValuesErrorExtensions>;

declare const ContentTooLargeError: DirectusErrorConstructor<void>;

declare const ForbiddenError: DirectusErrorConstructor<void>;

interface HitRateLimitErrorExtensions {
    limit: number;
    reset: Date;
}
declare const HitRateLimitError: DirectusErrorConstructor<HitRateLimitErrorExtensions>;

interface IllegalAssetTransformationErrorExtensions {
    invalidTransformations: string[];
}
declare const IllegalAssetTransformationError: DirectusErrorConstructor<IllegalAssetTransformationErrorExtensions>;

declare const InvalidCredentialsError: DirectusErrorConstructor<void>;

interface InvalidForeignKeyErrorExtensions {
    collection: string | null;
    field: string | null;
}
declare const InvalidForeignKeyError: DirectusErrorConstructor<InvalidForeignKeyErrorExtensions>;

declare const InvalidIpError: DirectusErrorConstructor<void>;

declare const InvalidOtpError: DirectusErrorConstructor<void>;

interface InvalidPayloadErrorExtensions {
    reason: string;
}
declare const InvalidPayloadError: DirectusErrorConstructor<InvalidPayloadErrorExtensions>;

interface InvalidProviderConfigErrorExtensions {
    provider: string;
    reason?: string;
}
declare const InvalidProviderConfigError: DirectusErrorConstructor<InvalidProviderConfigErrorExtensions>;

declare const InvalidProviderError: DirectusErrorConstructor<void>;

interface InvalidQueryErrorExtensions {
    reason: string;
}
declare const InvalidQueryError: DirectusErrorConstructor<InvalidQueryErrorExtensions>;

declare const InvalidTokenError: DirectusErrorConstructor<void>;

declare const LimitExceededError: DirectusErrorConstructor<void>;

interface MethodNotAllowedErrorExtensions {
    allowed: string[];
    current: string;
}
declare const MethodNotAllowedError: DirectusErrorConstructor<MethodNotAllowedErrorExtensions>;

interface NotNullViolationErrorExtensions {
    collection: string | null;
    field: string | null;
}
declare const NotNullViolationError: DirectusErrorConstructor<NotNullViolationErrorExtensions>;

declare const OutOfDateError: DirectusErrorConstructor<void>;

interface RangeNotSatisfiableErrorExtensions {
    range: Range;
}
declare const RangeNotSatisfiableError: DirectusErrorConstructor<RangeNotSatisfiableErrorExtensions>;

interface RecordNotUniqueErrorExtensions {
    collection: string | null;
    field: string | null;
}
declare const RecordNotUniqueError: DirectusErrorConstructor<RecordNotUniqueErrorExtensions>;

interface RouteNotFoundErrorExtensions {
    path: string;
}
declare const RouteNotFoundError: DirectusErrorConstructor<RouteNotFoundErrorExtensions>;

interface ServiceUnavailableErrorExtensions {
    service: string;
    reason: string;
}
declare const ServiceUnavailableError: DirectusErrorConstructor<ServiceUnavailableErrorExtensions>;

declare const TokenExpiredError: DirectusErrorConstructor<void>;

declare const UnexpectedResponseError: DirectusErrorConstructor<void>;

interface UnprocessableContentErrorExtensions {
    reason: string;
}
declare const UnprocessableContentError: DirectusErrorConstructor<UnprocessableContentErrorExtensions>;

interface UnsupportedMediaTypeErrorExtensions {
    mediaType: string;
    where: string;
}
declare const UnsupportedMediaTypeError: DirectusErrorConstructor<UnsupportedMediaTypeErrorExtensions>;

declare const UserSuspendedError: DirectusErrorConstructor<void>;

interface ValueOutOfRangeErrorExtensions {
    collection: string | null;
    field: string | null;
}
declare const ValueOutOfRangeError: DirectusErrorConstructor<ValueOutOfRangeErrorExtensions>;

interface ValueTooLongErrorExtensions {
    collection: string | null;
    field: string | null;
}
declare const ValueTooLongError: DirectusErrorConstructor<ValueTooLongErrorExtensions>;

export { ContainsNullValuesError, ContentTooLargeError, type DirectusError, type DirectusErrorConstructor, ErrorCode, ForbiddenError, HitRateLimitError, IllegalAssetTransformationError, InvalidCredentialsError, InvalidForeignKeyError, InvalidIpError, InvalidOtpError, InvalidPayloadError, InvalidProviderConfigError, InvalidProviderError, InvalidQueryError, InvalidTokenError, LimitExceededError, MethodNotAllowedError, NotNullViolationError, OutOfDateError, RangeNotSatisfiableError, RecordNotUniqueError, RouteNotFoundError, ServiceUnavailableError, TokenExpiredError, UnexpectedResponseError, UnprocessableContentError, UnsupportedMediaTypeError, UserSuspendedError, ValueOutOfRangeError, ValueTooLongError, createError, isDirectusError };
