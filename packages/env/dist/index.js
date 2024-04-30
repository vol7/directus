// src/lib/create-env.ts
import { readFileSync as readFileSync2 } from "fs";

// src/constants/defaults.ts
import { resolve } from "path";
import { cwd } from "process";
var DEFAULTS = {
  CONFIG_PATH: resolve(cwd(), ".env"),
  HOST: "0.0.0.0",
  PORT: 8055,
  PUBLIC_URL: "/",
  MAX_PAYLOAD_SIZE: "1mb",
  MAX_RELATIONAL_DEPTH: 10,
  QUERY_LIMIT_DEFAULT: 100,
  MAX_BATCH_MUTATION: Infinity,
  ROBOTS_TXT: "User-agent: *\nDisallow: /",
  TEMP_PATH: "./node_modules/.directus",
  DB_EXCLUDE_TABLES: "spatial_ref_sys,sysdiagrams",
  STORAGE_LOCATIONS: "local",
  STORAGE_LOCAL_DRIVER: "local",
  STORAGE_LOCAL_ROOT: "./uploads",
  RATE_LIMITER_ENABLED: false,
  RATE_LIMITER_POINTS: 50,
  RATE_LIMITER_DURATION: 1,
  RATE_LIMITER_STORE: "memory",
  RATE_LIMITER_GLOBAL_ENABLED: false,
  RATE_LIMITER_GLOBAL_POINTS: 1e3,
  RATE_LIMITER_GLOBAL_DURATION: 1,
  RATE_LIMITER_GLOBAL_STORE: "memory",
  ACCESS_TOKEN_TTL: "15m",
  REFRESH_TOKEN_TTL: "7d",
  REFRESH_TOKEN_COOKIE_NAME: "directus_refresh_token",
  REFRESH_TOKEN_COOKIE_SECURE: false,
  REFRESH_TOKEN_COOKIE_SAME_SITE: "lax",
  SESSION_COOKIE_TTL: "1d",
  SESSION_COOKIE_NAME: "directus_session_token",
  SESSION_COOKIE_SECURE: false,
  SESSION_COOKIE_SAME_SITE: "lax",
  LOGIN_STALL_TIME: 500,
  SERVER_SHUTDOWN_TIMEOUT: 1e3,
  ROOT_REDIRECT: "./admin",
  CORS_ENABLED: false,
  CORS_ORIGIN: false,
  CORS_METHODS: "GET,POST,PATCH,DELETE",
  CORS_ALLOWED_HEADERS: "Content-Type,Authorization",
  CORS_EXPOSED_HEADERS: "Content-Range",
  CORS_CREDENTIALS: true,
  CORS_MAX_AGE: 18e3,
  CACHE_ENABLED: false,
  CACHE_STORE: "memory",
  CACHE_TTL: "5m",
  CACHE_NAMESPACE: "system-cache",
  CACHE_AUTO_PURGE: false,
  CACHE_AUTO_PURGE_IGNORE_LIST: "directus_activity,directus_presets",
  CACHE_CONTROL_S_MAXAGE: "0",
  CACHE_SCHEMA: true,
  CACHE_SCHEMA_MAX_ITERATIONS: 100,
  CACHE_PERMISSIONS: true,
  CACHE_VALUE_MAX_SIZE: false,
  CACHE_SKIP_ALLOWED: false,
  AUTH_PROVIDERS: "",
  AUTH_DISABLE_DEFAULT: false,
  PACKAGE_FILE_LOCATION: ".",
  EXTENSIONS_PATH: "./extensions",
  EXTENSIONS_MUST_LOAD: false,
  EXTENSIONS_AUTO_RELOAD: false,
  EXTENSIONS_SANDBOX_MEMORY: 100,
  EXTENSIONS_SANDBOX_TIMEOUT: 1e3,
  MIGRATIONS_PATH: "./migrations",
  EMAIL_FROM: "no-reply@example.com",
  EMAIL_VERIFY_SETUP: true,
  EMAIL_TRANSPORT: "sendmail",
  EMAIL_SENDMAIL_NEW_LINE: "unix",
  EMAIL_SENDMAIL_PATH: "/usr/sbin/sendmail",
  EMAIL_TEMPLATES_PATH: "./templates",
  MARKETPLACE_TRUST: "sandbox",
  TELEMETRY: true,
  TELEMETRY_URL: "https://telemetry.directus.io",
  ASSETS_CACHE_TTL: "30d",
  ASSETS_TRANSFORM_MAX_CONCURRENT: 25,
  ASSETS_TRANSFORM_IMAGE_MAX_DIMENSION: 6e3,
  ASSETS_TRANSFORM_MAX_OPERATIONS: 5,
  ASSETS_TRANSFORM_TIMEOUT: "7500ms",
  ASSETS_INVALID_IMAGE_SENSITIVITY_LEVEL: "warning",
  IP_TRUST_PROXY: true,
  IP_CUSTOM_HEADER: false,
  IMPORT_IP_DENY_LIST: ["0.0.0.0", "169.254.169.254"],
  SERVE_APP: true,
  RELATIONAL_BATCH_SIZE: 25e3,
  EXPORT_BATCH_SIZE: 5e3,
  FILE_METADATA_ALLOW_LIST: "ifd0.Make,ifd0.Model,exif.FNumber,exif.ExposureTime,exif.FocalLength,exif.ISOSpeedRatings",
  GRAPHQL_INTROSPECTION: true,
  WEBSOCKETS_ENABLED: false,
  WEBSOCKETS_REST_ENABLED: true,
  WEBSOCKETS_REST_AUTH: "handshake",
  WEBSOCKETS_REST_AUTH_TIMEOUT: 10,
  WEBSOCKETS_REST_PATH: "/websocket",
  WEBSOCKETS_GRAPHQL_ENABLED: true,
  WEBSOCKETS_GRAPHQL_AUTH: "handshake",
  WEBSOCKETS_GRAPHQL_AUTH_TIMEOUT: 10,
  WEBSOCKETS_GRAPHQL_PATH: "/graphql",
  WEBSOCKETS_HEARTBEAT_ENABLED: true,
  WEBSOCKETS_HEARTBEAT_PERIOD: 30,
  FLOWS_ENV_ALLOW_LIST: false,
  FLOWS_RUN_SCRIPT_MAX_MEMORY: 32,
  FLOWS_RUN_SCRIPT_TIMEOUT: 1e4,
  PRESSURE_LIMITER_ENABLED: true,
  PRESSURE_LIMITER_SAMPLE_INTERVAL: 250,
  PRESSURE_LIMITER_MAX_EVENT_LOOP_UTILIZATION: 0.99,
  PRESSURE_LIMITER_MAX_EVENT_LOOP_DELAY: 500,
  PRESSURE_LIMITER_MAX_MEMORY_RSS: false,
  PRESSURE_LIMITER_MAX_MEMORY_HEAP_USED: false,
  PRESSURE_LIMITER_RETRY_AFTER: false,
  FILES_MIME_TYPE_ALLOW_LIST: "*/*"
};

// src/utils/get-config-path.ts
import { resolve as resolve2 } from "path";
var getConfigPath = () => {
  const path = process.env["CONFIG_PATH"] || DEFAULTS.CONFIG_PATH;
  return resolve2(path);
};

// src/constants/type-map.ts
var TYPE_MAP = {
  HOST: "string",
  PORT: "string",
  DB_NAME: "string",
  DB_USER: "string",
  DB_PASSWORD: "string",
  DB_DATABASE: "string",
  DB_PORT: "number",
  DB_EXCLUDE_TABLES: "array",
  CACHE_SKIP_ALLOWED: "boolean",
  CACHE_AUTO_PURGE_IGNORE_LIST: "array",
  CACHE_SCHEMA_MAX_ITERATIONS: "number",
  IMPORT_IP_DENY_LIST: "array",
  FILE_METADATA_ALLOW_LIST: "array",
  GRAPHQL_INTROSPECTION: "boolean",
  MAX_BATCH_MUTATION: "number",
  SERVER_SHUTDOWN_TIMEOUT: "number",
  LOG_HTTP_IGNORE_PATHS: "array",
  REDIS_ENABLED: "boolean"
};

// src/utils/get-type-from-map.ts
var getTypeFromMap = (key) => {
  if (!key)
    return null;
  const type = TYPE_MAP[key];
  if (type !== void 0) {
    return type;
  }
  return null;
};

// src/constants/directus-variables.ts
var DIRECTUS_VARIABLES = [
  // general
  "CONFIG_PATH",
  "HOST",
  "PORT",
  "PUBLIC_URL",
  "LOG_LEVEL",
  "LOG_STYLE",
  "LOG_HTTP_IGNORE_PATHS",
  "MAX_PAYLOAD_SIZE",
  "ROOT_REDIRECT",
  "SERVE_APP",
  "GRAPHQL_INTROSPECTION",
  "GRAPHQL_SCHEMA_CACHE_CAPACITY",
  "MAX_BATCH_MUTATION",
  "LOGGER_.+",
  "QUERY_LIMIT_MAX",
  "QUERY_LIMIT_DEFAULT",
  "ROBOTS_TXT",
  "TEMP_PATH",
  "MARKETPLACE_REGISTRY",
  "MARKETPLACE_TRUST",
  // server
  "SERVER_.+",
  // database
  "DB_.+",
  // security
  "KEY",
  "SECRET",
  "ACCESS_TOKEN_TTL",
  "REFRESH_TOKEN_TTL",
  "REFRESH_TOKEN_COOKIE_NAME",
  "REFRESH_TOKEN_COOKIE_DOMAIN",
  "REFRESH_TOKEN_COOKIE_SECURE",
  "REFRESH_TOKEN_COOKIE_SAME_SITE",
  "SESSION_COOKIE_TTL",
  "SESSION_COOKIE_NAME",
  "SESSION_COOKIE_DOMAIN",
  "SESSION_COOKIE_SECURE",
  "SESSION_COOKIE_SAME_SITE",
  "REDIS",
  "REDIS_ENABLED",
  "REDIS_HOST",
  "REDIS_PORT",
  "REDIS_USERNAME",
  "REDIS_PASSWORD",
  "REDIS_DB",
  "LOGIN_STALL_TIME",
  "PASSWORD_RESET_URL_ALLOW_LIST",
  "USER_INVITE_URL_ALLOW_LIST",
  "IP_TRUST_PROXY",
  "IP_CUSTOM_HEADER",
  "ASSETS_CONTENT_SECURITY_POLICY",
  "IMPORT_IP_DENY_LIST",
  "CONTENT_SECURITY_POLICY_.+",
  "HSTS_.+",
  // hashing
  "HASH_.+",
  // cors
  "CORS_ENABLED",
  "CORS_ORIGIN",
  "CORS_METHODS",
  "CORS_ALLOWED_HEADERS",
  "CORS_EXPOSED_HEADERS",
  "CORS_CREDENTIALS",
  "CORS_MAX_AGE",
  // rate limiting
  "RATE_LIMITER_GLOBAL_.+",
  "RATE_LIMITER_.+",
  // cache
  "CACHE_ENABLED",
  "CACHE_TTL",
  "CACHE_CONTROL_S_MAXAGE",
  "CACHE_AUTO_PURGE",
  "CACHE_AUTO_PURGE_IGNORE_LIST",
  "CACHE_SYSTEM_TTL",
  "CACHE_SCHEMA",
  "CACHE_SCHEMA_MAX_ITERATIONS",
  "CACHE_PERMISSIONS",
  "CACHE_NAMESPACE",
  "CACHE_STORE",
  "CACHE_STATUS_HEADER",
  "CACHE_VALUE_MAX_SIZE",
  "CACHE_SKIP_ALLOWED",
  "CACHE_HEALTHCHECK_THRESHOLD",
  // storage
  "STORAGE_LOCATIONS",
  "STORAGE_.+_DRIVER",
  "STORAGE_.+_ROOT",
  "STORAGE_.+_KEY",
  "STORAGE_.+_SECRET",
  "STORAGE_.+_BUCKET",
  "STORAGE_.+_REGION",
  "STORAGE_.+_ENDPOINT",
  "STORAGE_.+_ACL",
  "STORAGE_.+_CONTAINER_NAME",
  "STORAGE_.+_SERVER_SIDE_ENCRYPTION",
  "STORAGE_.+_ACCOUNT_NAME",
  "STORAGE_.+_ACCOUNT_KEY",
  "STORAGE_.+_ENDPOINT",
  "STORAGE_.+_KEY_FILENAME",
  "STORAGE_.+_BUCKET",
  "STORAGE_.+_HEALTHCHECK_THRESHOLD",
  // metadata
  "FILE_METADATA_ALLOW_LIST",
  // files
  "FILES_MAX_UPLOAD_SIZE",
  "FILES_CONTENT_TYPE_ALLOW_LIST",
  // assets
  "ASSETS_CACHE_TTL",
  "ASSETS_TRANSFORM_MAX_CONCURRENT",
  "ASSETS_TRANSFORM_IMAGE_MAX_DIMENSION",
  "ASSETS_TRANSFORM_MAX_OPERATIONS",
  "ASSETS_TRANSFORM_TIMEOUT",
  "ASSETS_CONTENT_SECURITY_POLICY",
  "ASSETS_INVALID_IMAGE_SENSITIVITY_LEVEL",
  // auth
  "AUTH_PROVIDERS",
  "AUTH_DISABLE_DEFAULT",
  "AUTH_.+_DRIVER",
  "AUTH_.+_CLIENT_ID",
  "AUTH_.+_CLIENT_SECRET",
  "AUTH_.+_SCOPE",
  "AUTH_.+_AUTHORIZE_URL",
  "AUTH_.+_ACCESS_URL",
  "AUTH_.+_PROFILE_URL",
  "AUTH_.+_IDENTIFIER_KEY",
  "AUTH_.+_EMAIL_KEY",
  "AUTH_.+_FIRST_NAME_KEY",
  "AUTH_.+_LAST_NAME_KEY",
  "AUTH_.+_ALLOW_PUBLIC_REGISTRATION",
  "AUTH_.+_DEFAULT_ROLE_ID",
  "AUTH_.+_ICON",
  "AUTH_.+_LABEL",
  "AUTH_.+_PARAMS",
  "AUTH_.+_ISSUER_URL",
  "AUTH_.+_AUTH_REQUIRE_VERIFIED_EMAIL",
  "AUTH_.+_CLIENT_URL",
  "AUTH_.+_BIND_DN",
  "AUTH_.+_BIND_PASSWORD",
  "AUTH_.+_USER_DN",
  "AUTH_.+_USER_ATTRIBUTE",
  "AUTH_.+_USER_SCOPE",
  "AUTH_.+_MAIL_ATTRIBUTE",
  "AUTH_.+_FIRST_NAME_ATTRIBUTE",
  "AUTH_.+_LAST_NAME_ATTRIBUTE",
  "AUTH_.+_GROUP_DN",
  "AUTH_.+_GROUP_ATTRIBUTE",
  "AUTH_.+_GROUP_SCOPE",
  "AUTH_.+_IDP.+",
  "AUTH_.+_SP.+",
  "AUTH_.+_REDIRECT_ALLOW_LIST",
  // extensions
  "PACKAGE_FILE_LOCATION",
  "EXTENSIONS_LOCATION",
  "EXTENSIONS_PATH",
  "EXTENSIONS_MUST_LOAD",
  "EXTENSIONS_AUTO_RELOAD",
  "EXTENSIONS_CACHE_TTL",
  "EXTENSIONS_SANDBOX_MEMORY",
  "EXTENSIONS_SANDBOX_TIMEOUT",
  "EXTENSIONS_LIMIT",
  // migrations
  "MIGRATIONS_PATH",
  // synchronization
  "SYNCHRONIZATION_STORE",
  "SYNCHRONIZATION_NAMESPACE",
  // emails
  "EMAIL_FROM",
  "EMAIL_TRANSPORT",
  "EMAIL_VERIFY_SETUP",
  "EMAIL_SENDMAIL_NEW_LINE",
  "EMAIL_SENDMAIL_PATH",
  "EMAIL_SMTP_NAME",
  "EMAIL_SMTP_HOST",
  "EMAIL_SMTP_PORT",
  "EMAIL_SMTP_USER",
  "EMAIL_SMTP_PASSWORD",
  "EMAIL_SMTP_POOL",
  "EMAIL_SMTP_SECURE",
  "EMAIL_SMTP_IGNORE_TLS",
  "EMAIL_MAILGUN_API_KEY",
  "EMAIL_MAILGUN_DOMAIN",
  "EMAIL_MAILGUN_HOST",
  "EMAIL_SENDGRID_API_KEY",
  "EMAIL_SES_CREDENTIALS__ACCESS_KEY_ID",
  "EMAIL_SES_CREDENTIALS__SECRET_ACCESS_KEY",
  "EMAIL_SES_REGION",
  "EMAIL_TEMPLATES_PATH",
  // admin account
  "ADMIN_EMAIL",
  "ADMIN_PASSWORD",
  // telemetry
  "TELEMETRY",
  "TELEMETRY_URL",
  "TELEMETRY_AUTHORIZATION",
  // limits & optimization
  "RELATIONAL_BATCH_SIZE",
  "EXPORT_BATCH_SIZE",
  // flows
  "FLOWS_ENV_ALLOW_LIST",
  "FLOWS_RUN_SCRIPT_MAX_MEMORY",
  "FLOWS_RUN_SCRIPT_TIMEOUT",
  // websockets
  "WEBSOCKETS_.+"
];
var DIRECTUS_VARIABLES_REGEX = DIRECTUS_VARIABLES.map((name) => new RegExp(`^${name}$`));

// src/utils/is-directus-variable.ts
var isDirectusVariable = (key) => {
  if (key.endsWith("_FILE")) {
    key = key.slice(0, -5);
  }
  return DIRECTUS_VARIABLES_REGEX.some((regex) => regex.test(key));
};

// src/utils/is-file-key.ts
var isFileKey = (key) => key.length > 5 && key.endsWith("_FILE");

// src/utils/read-configuration-from-process.ts
var readConfigurationFromProcess = () => {
  return { ...process.env };
};

// src/utils/remove-file-suffix.ts
var removeFileSuffix = (key) => key.slice(0, -5);

// src/lib/cast.ts
import { toArray, toBoolean } from "@directus/utils";
import { toNumber, toString } from "lodash-es";

// src/utils/guess-type.ts
var guessType = (value) => {
  if (value === "true" || value === "false") {
    return "boolean";
  }
  if (String(value).startsWith("0") === false && isNaN(Number(value)) === false && String(value).length > 0 && Number(value) <= Number.MAX_SAFE_INTEGER) {
    return "number";
  }
  if (String(value).includes(",")) {
    return "array";
  }
  return "json";
};

// src/utils/has-cast-prefix.ts
import { isIn } from "@directus/utils";

// src/constants/env-types.ts
var ENV_TYPES = ["string", "number", "regex", "array", "json", "boolean"];

// src/utils/has-cast-prefix.ts
var getCastFlag = (value) => {
  if (typeof value !== "string")
    return null;
  if (value.includes(":") === false)
    return null;
  const castPrefix = value.split(":")[0];
  if (isIn(castPrefix, ENV_TYPES) === false)
    return null;
  return castPrefix;
};

// src/utils/try-json.ts
import { parseJSON } from "@directus/utils";
var tryJson = (value) => {
  try {
    return parseJSON(String(value));
  } catch {
    return value;
  }
};

// src/lib/cast.ts
var cast = (value, key) => {
  const castFlag = getCastFlag(value);
  const type = castFlag ?? getTypeFromMap(key) ?? guessType(value);
  if (typeof value === "string" && castFlag) {
    value = value.substring(castFlag.length + 1);
  }
  switch (type) {
    case "string":
      return toString(value);
    case "number":
      return toNumber(value);
    case "boolean":
      return toBoolean(value);
    case "regex":
      return new RegExp(String(value));
    case "array":
      return toArray(value).map((v) => cast(v)).filter((v) => v !== "");
    case "json":
      return tryJson(value);
  }
};

// src/lib/read-configuration-from-file.ts
import { JAVASCRIPT_FILE_EXTS } from "@directus/constants";
import { isIn as isIn2 } from "@directus/utils";
import { existsSync } from "fs";

// src/utils/get-file-extension.ts
import { extname } from "path";
var getFileExtension = (path) => {
  return extname(path).toLowerCase().substring(1);
};

// src/utils/read-configuration-from-dotenv.ts
import { parse } from "dotenv";
import { readFileSync } from "fs";
var readConfigurationFromDotEnv = (path) => {
  return parse(readFileSync(path));
};

// src/utils/read-configuration-from-javascript.ts
import { isPlainObject } from "lodash-es";
import { createRequire } from "module";
var readConfigurationFromJavaScript = (path) => {
  const require2 = createRequire(import.meta.url);
  const module = require2(path);
  if (typeof module === "object" || typeof module === "function") {
    const exported2 = "default" in module ? module.default : module;
    if (typeof exported2 === "function") {
      return exported2(process.env);
    }
    if (isPlainObject(exported2)) {
      return exported2;
    }
  }
  throw new Error(
    `Invalid JS configuration file export type. Requires one of "function", "object", received: "${typeof exported}"`
  );
};

// src/utils/read-configuration-from-json.ts
import { createRequire as createRequire2 } from "module";
import { isPlainObject as isPlainObject2 } from "lodash-es";
var readConfigurationFromJson = (path) => {
  const require2 = createRequire2(import.meta.url);
  const config = require2(path);
  if (isPlainObject2(config) === false) {
    throw new Error("JSON configuration file does not contain an object");
  }
  return config;
};

// src/utils/read-configuration-from-yaml.ts
import { requireYaml } from "@directus/utils/node";
import { isPlainObject as isPlainObject3 } from "lodash-es";
var readConfigurationFromYaml = (path) => {
  const config = requireYaml(path);
  if (isPlainObject3(config) === false) {
    throw new Error("YAML configuration file does not contain an object");
  }
  return config;
};

// src/lib/read-configuration-from-file.ts
var readConfigurationFromFile = (path) => {
  if (existsSync(path) === false) {
    return null;
  }
  const ext = getFileExtension(path);
  if (isIn2(ext, JAVASCRIPT_FILE_EXTS)) {
    return readConfigurationFromJavaScript(path);
  }
  if (ext === "json") {
    return readConfigurationFromJson(path);
  }
  if (isIn2(ext, ["yaml", "yml"])) {
    return readConfigurationFromYaml(path);
  }
  return readConfigurationFromDotEnv(path);
};

// src/lib/create-env.ts
var createEnv = () => {
  const baseConfiguration = readConfigurationFromProcess();
  const fileConfiguration = readConfigurationFromFile(getConfigPath());
  const rawConfiguration = { ...baseConfiguration, ...fileConfiguration };
  const output = {};
  for (const [key, value] of Object.entries(DEFAULTS)) {
    output[key] = getTypeFromMap(key) ? cast(value, key) : value;
  }
  for (let [key, value] of Object.entries(rawConfiguration)) {
    if (isFileKey(key) && isDirectusVariable(key) && typeof value === "string") {
      try {
        value = readFileSync2(value, { encoding: "utf8" });
        key = removeFileSuffix(key);
      } catch {
        throw new Error(`Failed to read value from file "${value}", defined in environment variable "${key}".`);
      }
    }
    output[key] = cast(value, key);
  }
  return output;
};

// src/lib/use-env.ts
var _cache = { env: void 0 };
var useEnv = () => {
  if (_cache.env) {
    return _cache.env;
  }
  _cache.env = createEnv();
  return _cache.env;
};
export {
  useEnv
};
