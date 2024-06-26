type FetchInterface = (input: string | any, init?: RequestInit | any) => Promise<unknown>;
type UrlInterface = typeof URL;
/** While the standard says 'string | URL' for the 'url' parameter, some implementations (e.g. React Native) only accept 'string' */
type WebSocketConstructor = {
    new (url: string, protocols?: string | string[]): WebSocketInterface;
};
type WebSocketInterface = {
    readonly readyState: number;
    addEventListener(type: string, listener: (this: WebSocketInterface, ev: any) => any): void;
    removeEventListener(type: string, listener: (this: WebSocketInterface, ev: any) => any): void;
    send(data: string): void;
    close(code?: number, reason?: string): void;
};
type LogLevels = 'log' | 'info' | 'warn' | 'error';
type ConsoleInterface = {
    [level in LogLevels]: (...args: any) => any;
};

/**
 * empty directus client
 */
interface DirectusClient<Schema> {
    url: URL;
    globals: ClientGlobals;
    with: <Extension extends object>(createExtension: (client: DirectusClient<Schema>) => Extension) => this & Extension;
}
/**
 * All used globals for the client
 */
type ClientGlobals = {
    fetch: FetchInterface;
    WebSocket: WebSocketConstructor;
    URL: UrlInterface;
    logger: ConsoleInterface;
};
/**
 * Available options on the client
 */
type ClientOptions = {
    globals?: Partial<ClientGlobals>;
};

type AuthenticationMode = 'json' | 'cookie' | 'session';
type LoginOptions = {
    /** The user's one-time-password (if MFA is enabled). */
    otp?: string;
    /** Whether to retrieve the refresh token in the JSON response, or in a httpOnly cookie. One of `json`, `cookie` or `session`. Defaults to `cookie`. */
    mode?: AuthenticationMode;
    /** Use a specific authentication provider (does not work for SSO that relies on browser redirects). */
    provider?: string;
};
interface AuthenticationData {
    access_token: string | null;
    refresh_token: string | null;
    expires: number | null;
    expires_at: number | null;
}
interface AuthenticationStorage {
    get: () => Promise<AuthenticationData | null> | AuthenticationData | null;
    set: (value: AuthenticationData | null) => Promise<void> | void;
}
interface AuthenticationConfig {
    autoRefresh: boolean;
    msRefreshBeforeExpires: number;
    credentials?: RequestCredentials;
    storage?: AuthenticationStorage;
}
interface AuthenticationClient<_Schema> {
    login(email: string, password: string, options?: LoginOptions): Promise<AuthenticationData>;
    refresh(): Promise<AuthenticationData>;
    logout(): Promise<void>;
    stopRefreshing(): void;
    getToken(): Promise<string | null>;
    setToken(access_token: string | null): void;
}
interface StaticTokenClient<_Schema> {
    getToken(): Promise<string | null>;
    setToken(access_token: string | null): void;
}

/**
 * Creates a client to authenticate with Directus.
 *
 * @param mode AuthenticationMode
 * @param config The optional configuration.
 *
 * @returns A Directus authentication client.
 */
declare const authentication: (mode?: AuthenticationMode, config?: Partial<AuthenticationConfig>) => <Schema>(client: DirectusClient<Schema>) => AuthenticationClient<Schema>;

/**
 * Creates a client to authenticate with Directus using a static token.
 *
 * @param token static token.
 *
 * @returns A Directus static token client.
 */
declare const staticToken: (access_token: string) => <Schema>(_client: DirectusClient<Schema>) => StaticTokenClient<Schema>;

/**
 * Simple memory storage implementation
 *
 * @returns AuthenticationStorage
 */
declare const memoryStorage: () => AuthenticationStorage;

/**
 * Creates a client to communicate with a Directus app.
 *
 * @param url The URL to the Directus app.
 * @param config The optional configuration.
 *
 * @returns A Directus client.
 */
declare const createDirectus: <Schema = any>(url: string, options?: ClientOptions) => DirectusClient<Schema>;

interface GraphqlClient<_Schema> {
    query<Output extends object = Record<string, any>>(query: string, variables?: Record<string, unknown>, scope?: 'items' | 'system'): Promise<Output>;
}
interface GraphqlConfig {
    credentials?: RequestCredentials;
}
type GqlResult<Schema extends object, Collection extends keyof Schema> = {
    [Key in Collection]: Schema[Collection][];
};
type GqlSingletonResult<Schema extends object, Collection extends keyof Schema> = {
    [Key in Collection]: Schema[Collection];
};

/**
 * Creates a client to communicate with Directus GraphQL.
 *
 * @returns A Directus GraphQL client.
 */
declare const graphql: (config?: Partial<GraphqlConfig>) => <Schema>(client: DirectusClient<Schema>) => GraphqlClient<Schema>;

interface EmailAuth {
    email: string;
    password: string;
    uid?: string;
}
interface TokenAuth {
    access_token: string;
    uid?: string;
}
interface RefreshAuth {
    refresh_token: string;
    uid?: string;
}
declare function auth(creds: EmailAuth | TokenAuth | RefreshAuth): string;

declare const pong: () => string;

type DirectusCollection<Schema> = {
    collection: string;
    meta: MergeCoreCollection<Schema, 'directus_collections', {
        collection: string;
        icon: string | null;
        note: string | null;
        display_template: string | null;
        hidden: boolean;
        singleton: boolean;
        translations: CollectionMetaTranslationType[] | null;
        archive_field: string | null;
        archive_app_filter: boolean;
        archive_value: string | null;
        unarchive_value: string | null;
        sort_field: string | null;
        accountability: string | null;
        color: string | null;
        item_duplication_fields: string[] | null;
        sort: number | null;
        group: string | null;
        collapse: string;
        preview_url: string | null;
        versioning: boolean;
    }>;
    schema: ({
        name: string;
        comment: string | null;
    } & Record<string, unknown>) | null;
    fields?: NestedPartial<DirectusField<Schema>>[];
};
type CollectionMetaTranslationType = {
    language: string;
    plural: string;
    singular: string;
    translation: string;
};

type DirectusFolder<Schema> = MergeCoreCollection<Schema, 'directus_folders', {
    id: string;
    name: string;
    parent: DirectusFolder<Schema> | string | null;
}>;

type DirectusFile<Schema> = MergeCoreCollection<Schema, 'directus_files', {
    id: string;
    storage: string;
    filename_disk: string | null;
    filename_download: string;
    title: string | null;
    type: string | null;
    folder: DirectusFolder<Schema> | string | null;
    uploaded_by: DirectusUser<Schema> | string | null;
    uploaded_on: 'datetime';
    modified_by: DirectusUser<Schema> | string | null;
    modified_on: 'datetime';
    charset: string | null;
    filesize: string | null;
    width: number | null;
    height: number | null;
    duration: number | null;
    embed: unknown | null;
    description: string | null;
    location: string | null;
    tags: string[] | null;
    metadata: Record<string, any> | null;
    focal_point_x: number | null;
    focal_point_y: number | null;
}>;

/**
 * directus_users type
 */
type DirectusUser<Schema> = MergeCoreCollection<Schema, 'directus_users', {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    password: string | null;
    location: string | null;
    title: string | null;
    description: string | null;
    tags: string[] | null;
    avatar: DirectusFile<Schema> | string | null;
    language: string | null;
    theme: string | null;
    tfa_secret: string | null;
    status: string;
    role: DirectusRole<Schema> | string | null;
    token: string | null;
    last_access: 'datetime' | null;
    last_page: string | null;
    provider: string;
    external_identifier: string | null;
    auth_data: Record<string, any> | null;
    email_notifications: boolean | null;
}>;

type DirectusVersion<Schema> = MergeCoreCollection<Schema, 'directus_versions', {
    id: string;
    key: string;
    name: string | null;
    collection: DirectusCollection<Schema> | string;
    item: string;
    hash: string;
    date_created: 'datetime' | null;
    date_updated: 'datetime' | null;
    user_created: DirectusUser<Schema> | string | null;
    user_updated: DirectusUser<Schema> | string | null;
}>;

type DirectusRevision<Schema> = MergeCoreCollection<Schema, 'directus_revisions', {
    id: number;
    activity: DirectusActivity<Schema> | number;
    collection: string;
    item: string;
    data: Record<string, any> | null;
    delta: Record<string, any> | null;
    parent: DirectusRevision<Schema> | number | null;
    version: DirectusVersion<Schema> | string | null;
}>;

type DirectusActivity<Schema> = MergeCoreCollection<Schema, 'directus_activity', {
    id: number;
    action: string;
    user: DirectusUser<Schema> | string | null;
    timestamp: 'datetime';
    ip: string | null;
    user_agent: string | null;
    collection: string;
    item: string;
    comment: string | null;
    origin: string | null;
    revisions: DirectusRevision<Schema>[] | number[] | null;
}>;

type DirectusDashboard<Schema> = MergeCoreCollection<Schema, 'directus_dashboards', {
    id: string;
    name: string;
    icon: string;
    note: string | null;
    date_created: 'datetime' | null;
    user_created: DirectusUser<Schema> | string | null;
    color: string | null;
}>;

type DirectusExtension<Schema> = {
    name: string;
    bundle: string | null;
    schema: ExtensionSchema | null;
    meta: MergeCoreCollection<Schema, 'directus_extensions', {
        enabled: boolean;
    }>;
};
type ExtensionSchema = {
    type: ExtensionTypes;
    local: boolean;
    version?: string;
};
type ExtensionTypes = 'interface' | 'display' | 'layout' | 'module' | 'panel' | 'hook' | 'endpoint' | 'operation' | 'bundle';

type DirectusField<Schema> = {
    collection: string;
    field: string;
    type: string;
    meta: MergeCoreCollection<Schema, 'directus_fields', {
        id: number;
        collection: string;
        field: string;
        special: string[] | null;
        interface: string | null;
        options: Record<string, any> | null;
        display: string | null;
        display_options: Record<string, any> | null;
        readonly: boolean;
        hidden: boolean;
        sort: number | null;
        width: string | null;
        translations: FieldMetaTranslationType[] | null;
        note: string | null;
        conditions: FieldMetaConditionType[] | null;
        required: boolean;
        group: string | null;
        validation: Record<string, any> | null;
        validation_message: string | null;
    }>;
    schema: {
        name: string;
        table: string;
        schema: string;
        data_type: string;
        is_nullable: boolean;
        generation_expression: unknown | null;
        default_value: any | null;
        is_generated: boolean;
        max_length: number | null;
        comment: string | null;
        numeric_precision: number | null;
        numeric_scale: number | null;
        is_unique: boolean;
        is_primary_key: boolean;
        has_auto_increment: boolean;
        foreign_key_schema: string | null;
        foreign_key_table: string | null;
        foreign_key_column: string | null;
    };
};
type FieldMetaConditionType = {
    hidden: boolean;
    name: string;
    options: FieldMetaConditionOptionType;
    readonly: boolean;
    required: boolean;
    rule: unknown;
};
type FieldMetaConditionOptionType = {
    clear: boolean;
    font: string;
    iconLeft?: string;
    iconRight?: string;
    masked: boolean;
    placeholder: string;
    slug: boolean;
    softLength?: number;
    trim: boolean;
};
type FieldMetaTranslationType = {
    language: string;
    translation: string;
};

type DirectusOperation<Schema> = MergeCoreCollection<Schema, 'directus_operations', {
    id: string;
    name: string | null;
    key: string;
    type: string;
    position_x: number;
    position_y: number;
    timestamp: string;
    options: Record<string, any> | null;
    resolve: DirectusOperation<Schema> | string | null;
    reject: DirectusOperation<Schema> | string | null;
    flow: DirectusFlow<Schema> | string;
    date_created: 'datetime' | null;
    user_created: DirectusUser<Schema> | string | null;
}>;

type DirectusFlow<Schema> = MergeCoreCollection<Schema, 'directus_flows', {
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
    description: string | null;
    status: string;
    trigger: string | null;
    accountability: string | null;
    options: Record<string, any> | null;
    operation: DirectusOperation<Schema> | string | null;
    date_created: 'datetime' | null;
    user_created: DirectusUser<Schema> | string | null;
}>;

type DirectusNotification<Schema> = MergeCoreCollection<Schema, 'directus_notifications', {
    id: string;
    timestamp: 'datetime' | null;
    status: string | null;
    recipient: DirectusUser<Schema> | string;
    sender: DirectusUser<Schema> | string | null;
    subject: string;
    message: string | null;
    collection: string | null;
    item: string | null;
}>;

type DirectusPanel<Schema> = MergeCoreCollection<Schema, 'directus_panels', {
    id: string;
    dashboard: DirectusDashboard<Schema> | string;
    name: string | null;
    icon: string | null;
    color: string | null;
    show_header: boolean;
    note: string | null;
    type: string;
    position_x: number;
    position_y: number;
    width: number;
    height: number;
    options: Record<string, any> | null;
    date_created: 'datetime' | null;
    user_created: DirectusUser<Schema> | string | null;
}>;

type DirectusRole<Schema> = MergeCoreCollection<Schema, 'directus_roles', {
    id: string;
    name: string;
    icon: string;
    description: string | null;
    ip_access: string | null;
    enforce_tfa: boolean;
    admin_access: boolean;
    app_access: boolean;
}>;

type DirectusPermission<Schema> = MergeCoreCollection<Schema, 'directus_permissions', {
    id: number;
    role: DirectusRole<Schema> | string | null;
    collection: string;
    action: string;
    permissions: Record<string, any> | null;
    validation: Record<string, any> | null;
    presets: Record<string, any> | null;
    fields: string[] | null;
}>;

type DirectusPreset<Schema> = MergeCoreCollection<Schema, 'directus_presets', {
    id: number;
    bookmark: string | null;
    user: DirectusUser<Schema> | string | null;
    role: DirectusRole<Schema> | string | null;
    collection: string | null;
    search: string | null;
    layout: string | null;
    layout_query: Record<string, any> | null;
    layout_options: Record<string, any> | null;
    refresh_interval: number | null;
    filter: Record<string, any> | null;
    icon: string | null;
    color: string | null;
}>;

type DirectusRelation<Schema> = {
    collection: string;
    field: string;
    related_collection: string;
    meta: MergeCoreCollection<Schema, 'directus_relations', {
        id: number;
        junction_field: string | null;
        many_collection: string | null;
        many_field: string | null;
        one_allowed_collections: string | null;
        one_collection: string | null;
        one_collection_field: string | null;
        one_deselect_action: string;
        one_field: string | null;
        sort_field: string | null;
        system: boolean | null;
    }>;
    schema: {
        column: string;
        constraint_name: string;
        foreign_key_column: string;
        foreign_key_schema: string;
        foreign_key_table: string;
        on_delete: string;
        on_update: string;
        table: string;
    };
};

type DirectusSettings<Schema> = MergeCoreCollection<Schema, 'directus_settings', {
    id: 1;
    project_name: string;
    project_url: string;
    report_error_url: string | null;
    report_bug_url: string | null;
    report_feature_url: string | null;
    project_color: string | null;
    project_logo: string | null;
    public_foreground: string | null;
    public_background: {
        id: string;
        type: string;
    } | null;
    public_note: string | null;
    auth_login_attempts: number;
    auth_password_policy: string | null;
    storage_asset_transform: 'all' | 'none' | 'presets';
    storage_asset_presets: {
        fit: string;
        height: number;
        width: number;
        quality: number;
        key: string;
        withoutEnlargement: boolean;
    }[] | null;
    custom_css: string | null;
    storage_default_folder: DirectusFolder<Schema> | string | null;
    basemaps: Record<string, any> | null;
    mapbox_key: string | null;
    module_bar: 'json' | null;
    project_descriptor: string | null;
    default_language: string;
    custom_aspect_ratios: Record<string, any> | null;
}>;

type DirectusShare<Schema> = MergeCoreCollection<Schema, 'directus_shares', {
    id: string;
    name: string | null;
    collection: string | null;
    item: string | null;
    role: DirectusRole<Schema> | string | null;
    password: string | null;
    user_created: DirectusUser<Schema> | string | null;
    date_created: 'datetime' | null;
    date_start: 'datetime' | null;
    date_end: 'datetime' | null;
    times_used: number | null;
    max_uses: number | null;
}>;

type DirectusWebhook<Schema> = MergeCoreCollection<Schema, 'directus_webhooks', {
    id: number;
    name: string;
    method: string;
    url: string;
    status: string;
    data: boolean;
    actions: string | string[];
    collections: string | string[];
    headers: Record<string, any> | null;
}>;

interface CoreSchema<Schema = object> {
    directus_activity: DirectusActivity<Schema>[];
    directus_collections: DirectusCollection<Schema>[];
    directus_dashboards: DirectusDashboard<Schema>[];
    directus_extensions: DirectusExtension<Schema>[];
    directus_fields: DirectusField<Schema>[];
    directus_files: DirectusFile<Schema>[];
    directus_flows: DirectusFlow<Schema>[];
    directus_folders: DirectusFolder<Schema>[];
    directus_notifications: DirectusNotification<Schema>[];
    directus_operations: DirectusOperation<Schema>[];
    directus_panels: DirectusPanel<Schema>[];
    directus_permissions: DirectusPermission<Schema>[];
    directus_presets: DirectusPreset<Schema>[];
    directus_relations: DirectusRelation<Schema>[];
    directus_roles: DirectusRole<Schema>[];
    directus_settings: DirectusSettings<Schema>;
    directus_shares: DirectusShare<Schema>[];
    directus_users: DirectusUser<Schema>[];
    directus_versions: DirectusVersion<Schema>[];
    directus_webhooks: DirectusWebhook<Schema>[];
}

type DirectusTranslation<Schema> = MergeCoreCollection<Schema, 'directus_translations', {
    id: string;
    language: string;
    key: string;
    value: string;
}>;

/**
 * Makes types mutable
 */
type Mutable<T> = T extends object ? {
    -readonly [K in keyof T]: Mutable<T[K]>;
} : T;
/**
 * Flatten array types to their singular root
 */
type UnpackList<Item> = Item extends any[] ? Item[number] : Item;
/**
 * Merge two object types with never guard
 */
type Merge<A, B, TypeA = NeverToUnknown<A>, TypeB = NeverToUnknown<B>> = {
    [K in keyof TypeA | keyof TypeB]: K extends keyof TypeA & keyof TypeB ? TypeA[K] | TypeB[K] : K extends keyof TypeB ? TypeB[K] : K extends keyof TypeA ? TypeA[K] : never;
};
type MergeOptional<A, B, TypeA = NeverToUnknown<A>, TypeB = NeverToUnknown<B>> = Partial<Merge<A, B, TypeA, TypeB>>;
/**
 * Fallback never to unknown
 */
type NeverToUnknown<T> = IfNever<T, unknown>;
type IfNever<T, Y, N = T> = [T] extends [never] ? Y : N;
/**
 * Test for any
 */
type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
type IsAny<T> = IfAny<T, true, never>;
type IsNullable<T, Y = true, N = never> = T | null extends T ? Y : N;
type IsDateTime<T, Y, N> = T extends 'datetime' ? Y : N;
type IsNumber<T, Y, N> = T extends number ? Y : N;
type IsString<T, Y, N> = T extends string ? Y : N;
type NestedPartial<Item extends object> = {
    [Key in keyof Item]?: NonNullable<Item[Key]> extends infer NestedItem ? NestedItem extends object[] ? NestedPartial<UnpackList<NestedItem>>[] | Exclude<Item[Key], NestedItem> : NestedItem extends object ? NestedPartial<NestedItem> | Exclude<Item[Key], NestedItem> : Item[Key] : Item[Key];
};
/**
 * Resolve type to its final object
 */
type Identity<U> = U extends infer A ? A : U;

/**
 * Get all available top level Item types from a given Schema
 */
type ItemType<Schema> = Schema[keyof Schema] | {
    [K in keyof Schema]: Schema[K] extends any[] ? Schema[K][number] : never;
}[keyof Schema];
/**
 * Return singular collection type
 */
type CollectionType<Schema, Collection> = IfAny<Schema, any, Collection extends keyof Schema ? UnpackList<Schema[Collection]> extends object ? UnpackList<Schema[Collection]> : never : never>;
/**
 * Returns a list of singleton collections in the schema
 */
type SingletonCollections<Schema> = {
    [Key in keyof Schema]: Schema[Key] extends any[] ? never : Key;
}[keyof Schema];
/**
 * Returns a list of regular collections in the schema
 */
type RegularCollections<Schema> = IfAny<Schema, string, Exclude<keyof Schema, SingletonCollections<Schema>>>;
/**
 * Return string keys of all Primitive fields in the given schema Item
 */
type PrimitiveFields<Schema, Item> = {
    [Key in keyof Item]: Extract<Item[Key], ItemType<Schema>> extends never ? Key : never;
}[keyof Item];
/**
 * Return string keys of all Relational fields in the given schema Item
 */
type RelationalFields<Schema, Item> = {
    [Key in keyof Item]: Extract<Item[Key], ItemType<Schema>> extends never ? never : Key;
}[keyof Item];
/**
 * Remove the related Item types from relational m2o/a2o fields
 */
type RemoveRelationships<Schema, Item> = {
    [Key in keyof Item]: Exclude<Item[Key], ItemType<Schema>>;
};
/**
 * Merge a core collection from the schema with the builtin schema
 */
type MergeCoreCollection<Schema, Collection extends keyof Schema | string, BuiltinCollection> = Collection extends keyof Schema ? UnpackList<Schema[Collection]> extends infer Item ? {
    [Field in Exclude<keyof Item, keyof BuiltinCollection>]: Item[Field];
} & BuiltinCollection : never : BuiltinCollection;
/**
 * Merge custom and core schema objects
 */
type CompleteSchema<Schema> = CoreSchema<Schema> extends infer Core ? {
    [Collection in keyof Schema | keyof Core]: Collection extends keyof Core ? Core[Collection] : Collection extends keyof Schema ? Schema[Collection] : never;
} : never;
/**
 * Merge custom schema with core schema
 */
type AllCollections<Schema> = RegularCollections<Schema> | RegularCollections<CoreSchema<Schema>>;
/**
 * Helper to extract a collection with fallback to defaults
 */
type GetCollection<Schema, CollectionName extends AllCollections<Schema>> = CollectionName extends keyof CoreSchema<Schema> ? CoreSchema<Schema>[CollectionName] : CollectionName extends keyof Schema ? Schema[CollectionName] : never;
/**
 * Helper to extract a collection name
 */
type GetCollectionName<Schema, Collection, FullSchema = CompleteSchema<Schema>> = {
    [K in keyof FullSchema]: UnpackList<FullSchema[K]> extends Collection ? K : never;
}[keyof FullSchema];

/**
 * Deep filter object
 */
type QueryDeep<Schema, Item> = UnpackList<Item> extends infer FlatItem ? RelationalFields<Schema, FlatItem> extends never ? never : {
    [Field in RelationalFields<Schema, FlatItem> as ExtractCollection<Schema, FlatItem[Field]> extends any[] ? Field : never]?: ExtractCollection<Schema, FlatItem[Field]> extends infer CollectionItem ? Query<Schema, CollectionItem> extends infer TQuery ? MergeObjects<QueryDeep<Schema, CollectionItem>, {
        [Key in keyof Omit<TQuery, 'deep' | 'alias' | 'fields'> as `_${string & Key}`]: TQuery[Key];
    }> : never : never;
} : never;
type ExtractCollection<Schema, Item> = Extract<Item, ItemType<Schema>>;

/**
 * Available query functions
 */
type DateTimeFunctions = 'year' | 'month' | 'week' | 'day' | 'weekday' | 'hour' | 'minute' | 'second';
type ArrayFunctions = 'count';
type QueryFunctions = {
    datetime: DateTimeFunctions;
    json: ArrayFunctions;
    csv: ArrayFunctions;
};
/**
 * Permute [function, field] combinations
 */
type PermuteFields<Fields, Funcs> = Fields extends string ? Funcs extends string ? [Fields, Funcs] : never : never;
/**
 * Get all many relations on an item
 */
type RelationalFunctions<Schema, Item> = keyof {
    [Key in RelationalFields<Schema, Item> as Extract<Item[Key], ItemType<Schema>> extends any[] ? Key : never]: Key;
};
/**
 * Create a map of function fields and their resulting output names
 */
type TranslateFunctionFields<Fields, Funcs> = {
    [F in PermuteFields<Fields, Funcs> as `${F[1]}(${F[0]})`]: `${F[0]}_${F[1]}`;
};
/**
 * Combine the various function types
 */
type FunctionFields<Schema, Item> = {
    [Type in keyof QueryFunctions]: TypeFunctionFields<Item, Type>;
}[keyof QueryFunctions] | keyof TranslateFunctionFields<RelationalFunctions<Schema, Item>, ArrayFunctions>;
/**
 *
 */
type TypeFunctionFields<Item, Type extends keyof QueryFunctions> = keyof TranslateFunctionFields<LiteralFields<Item, Type>, QueryFunctions[Type]>;
/**
 * Map all possible function fields on an item
 */
type MappedFunctionFields<Schema, Item> = Merge<TranslateFunctionFields<RelationalFunctions<Schema, Item>, ArrayFunctions>, TranslateFunctionFields<LiteralFields<Item, 'datetime'>, DateTimeFunctions> & TranslateFunctionFields<LiteralFields<Item, 'json' | 'csv'>, ArrayFunctions>>;
/**
 * Create a map of function fields with its original field name
 */
type FunctionFieldNames<Fields, Funcs> = {
    [F in PermuteFields<Fields, Funcs> as `${F[1]}(${F[0]})`]: F[0];
};
/**
 * Map all possible function fields to name on an item
 */
type MappedFieldNames<Schema, Item> = Merge<FunctionFieldNames<RelationalFunctions<Schema, Item>, ArrayFunctions>, FunctionFieldNames<LiteralFields<Item, 'datetime'>, DateTimeFunctions> & FunctionFieldNames<LiteralFields<Item, 'json' | 'csv'>, ArrayFunctions>>;

/**
 * Fields querying, including nested relational fields
 */
type QueryFields<Schema, Item> = WrapQueryFields<Schema, Item, QueryFieldsRelational<Schema, UnpackList<Item>>>;
/**
 * Wrap array of fields
 */
type WrapQueryFields<Schema, Item, NestedFields> = readonly ('*' | keyof UnpackList<Item> | NestedFields | FunctionFields<Schema, UnpackList<Item>>)[];
/**
 * Object of nested relational fields in a given Item with it's own fields available for selection
 */
type QueryFieldsRelational<Schema, Item> = IfNever<RelationalFields<Schema, Item>, never, {
    [Key in RelationalFields<Schema, Item>]?: Extract<Item[Key], ItemType<Schema>> extends infer RelatedCollection ? RelatedCollection extends any[] ? HasManyToAnyRelation<RelatedCollection> extends never ? QueryFields<Schema, RelatedCollection> : ManyToAnyFields<Schema, RelatedCollection> : QueryFields<Schema, RelatedCollection> : never;
}>;
/**
 * Deal with many-to-any relational fields
 */
type ManyToAnyFields<Schema, Item> = ExtractItem<Schema, Item> extends infer TItem ? TItem extends object ? 'collection' extends keyof TItem ? 'item' extends keyof TItem ? WrapQueryFields<Schema, TItem, Omit<QueryFieldsRelational<Schema, UnpackList<Item>>, 'item'> & {
    item?: {
        [Collection in keyof Schema as Collection extends TItem['collection'] ? Collection : never]?: QueryFields<Schema, Schema[Collection]>;
    };
}> : never : never : never : never;
/**
 * Determine whether a field definition has a many-to-any relation
 * TODO try making this dynamic somehow instead of relying on "item" as key
 */
type HasManyToAnyRelation<Item> = UnpackList<Item> extends infer TItem ? TItem extends object ? 'collection' extends keyof TItem ? 'item' extends keyof TItem ? true : never : never : never : never;
/**
 * Returns true if the Fields has any nested field
 */
type HasNestedFields<Fields> = UnpackList<Fields> extends infer Field ? Field extends object ? true : never : never;
/**
 * Return all keys if Fields is undefined or contains '*'
 */
type FieldsWildcard<Item extends object, Fields> = unknown extends Fields ? keyof Item : UnpackList<Fields> extends infer Field ? Field extends undefined ? keyof Item : Field extends '*' ? keyof Item : Field extends string ? Field : never : never;
/**
 * Returns the relational fields from the fields list
 */
type PickRelationalFields<Fields> = MergeRelations<UnpackList<Fields> extends infer Field ? (Field extends object ? Field : never) : never>;
type MergeRelations<RelationalFields extends object | never> = {
    [Key in AllKeys<RelationalFields>]: PickType<RelationalFields, Key>;
};
type PickType<T, K extends AllKeys<T>> = T extends {
    [k in K]?: any;
} ? T[K] : undefined;
type AllKeys<T> = T extends any ? keyof T : never;
/**
 * Extract the required fields from an item
 */
type PickFlatFields<Schema, Item, Fields> = Extract<Fields, keyof Item> extends never ? never : Pick<RemoveRelationships<Schema, Item>, Extract<Fields, keyof Item>>;
/**
 * Extract a specific literal type from a collection
 */
type LiteralFields<Item, Type extends string> = {
    [Key in keyof Item]: Extract<Item[Key], Type>[] extends never[] ? never : Key;
}[keyof Item];

/**
 * Apply the configured fields query parameter on a given Item type
 */
type ApplyQueryFields<Schema, Collection extends object, ReadonlyFields, CollectionItem extends object = UnpackList<Collection>, Fields = UnpackList<Mutable<ReadonlyFields>>, RelationalFields = PickRelationalFields<Fields>, RelationalKeys extends keyof RelationalFields = RelationalFields extends never ? never : keyof RelationalFields, FlatFields extends keyof CollectionItem = FieldsWildcard<CollectionItem, Exclude<Fields, RelationalKeys>>> = IfAny<Schema, Record<string, any>, Merge<MappedFunctionFields<Schema, CollectionItem> extends infer FF ? MapFlatFields<CollectionItem, FlatFields, FF extends Record<string, string> ? FF : Record<string, string>> : never, RelationalFields extends never ? never : {
    [Field in keyof RelationalFields]: Field extends keyof CollectionItem ? Extract<CollectionItem[Field], ItemType<Schema>> extends infer RelatedCollection ? RelationNullable<CollectionItem[Field], RelatedCollection extends any[] ? HasManyToAnyRelation<RelatedCollection> extends never ? ApplyNestedQueryFields<Schema, RelatedCollection, RelationalFields[Field]>[] | null : ApplyManyToAnyFields<Schema, RelatedCollection, RelationalFields[Field]>[] : ApplyNestedQueryFields<Schema, RelatedCollection, RelationalFields[Field]>> : never : never;
}>>;
/**
 * Apply the configured fields query parameter on a many to any relation
 */
type ApplyManyToAnyFields<Schema, JunctionCollection, FieldsList, Junction = UnpackList<JunctionCollection>> = Junction extends object ? PickRelationalFields<FieldsList> extends never ? ApplyQueryFields<Schema, Junction, Readonly<UnpackList<FieldsList>>> : 'item' extends keyof PickRelationalFields<FieldsList> ? PickRelationalFields<FieldsList>['item'] extends infer ItemFields ? Omit<ApplyQueryFields<Schema, Omit<Junction, 'item'>, Readonly<UnpackList<FieldsList>>>, 'item'> & {
    item: {
        [Scope in keyof ItemFields]: Scope extends keyof Schema ? ApplyNestedQueryFields<Schema, Schema[Scope], ItemFields[Scope]> : never;
    }[keyof ItemFields];
} : never : ApplyQueryFields<Schema, Junction, Readonly<UnpackList<FieldsList>>> : never;
/**
 * wrapper to aid in recursion
 */
type ApplyNestedQueryFields<Schema, Collection, Fields> = Collection extends object ? ApplyQueryFields<Schema, Collection, Readonly<UnpackList<Fields>>> : never;
/**
 * Carry nullability of
 */
type RelationNullable<Relation, Output> = IsNullable<Relation, Output | null, Output>;
/**
 * Map literal types to actual output types
 */
type MapFlatFields<Item extends object, Fields extends keyof Item, FunctionMap extends Record<string, string>> = {
    [F in Fields as F extends keyof FunctionMap ? FunctionMap[F] : F]: F extends keyof FunctionMap ? FunctionOutputType : Extract<Item[F], keyof FieldOutputMap> extends infer A ? A[] extends never[] ? Item[F] : A extends keyof FieldOutputMap ? FieldOutputMap[A] | Exclude<Item[F], A> : Item[F] : Item[F];
};
type JsonPrimitive = null | boolean | number | string;
type JsonValue = JsonPrimitive | JsonPrimitive[] | {
    [key: string]: JsonValue;
};
/**
 * Output map for specific literal types
 */
type FieldOutputMap = {
    json: JsonValue;
    csv: string[];
    datetime: string;
};
type FunctionOutputType = number;

/**
 * Filters
 */
type QueryFilter<Schema, Item> = WrapLogicalFilters<NestedQueryFilter<Schema, Item>>;
/**
 * Query filters without logical filters
 */
type NestedQueryFilter<Schema, Item> = UnpackList<Item> extends infer FlatItem ? MergeOptional<{
    [Field in keyof FlatItem]?: NestedRelationalFilter<Schema, FlatItem, Field>;
}, MappedFieldNames<Schema, Item> extends infer Funcs ? {
    [Func in keyof Funcs]?: Funcs[Func] extends infer Field ? Field extends keyof FlatItem ? NestedRelationalFilter<Schema, FlatItem, Field> : never : never;
} : never> : never;
/**
 * Allow for relational filters
 */
type NestedRelationalFilter<Schema, Item, Field extends keyof Item> = (Field extends RelationalFields<Schema, Item> ? WrapRelationalFilters<NestedQueryFilter<Schema, Item[Field]>> : never) | FilterOperators<Item[Field]>;
/**
 * All regular filter operators
 *
 * TODO would love to filter this based on field type but thats not accurate enough in the schema atm
 */
type FilterOperators<FieldType, T = FieldType extends keyof FieldOutputMap ? FieldOutputMap[FieldType] : FieldType> = MapFilterOperators<{
    _eq: T;
    _neq: T;
    _gt: IsDateTime<FieldType, string, IsNumber<T, number, never>>;
    _gte: IsDateTime<FieldType, string, IsNumber<T, number, never>>;
    _lt: IsDateTime<FieldType, string, IsNumber<T, number, never>>;
    _lte: IsDateTime<FieldType, string, IsNumber<T, number, never>>;
    _in: T[];
    _nin: T[];
    _between: IsDateTime<FieldType, [T, T], IsNumber<T, [T, T], never>>;
    _nbetween: IsDateTime<FieldType, [T, T], IsNumber<T, [T, T], never>>;
    _contains: IsDateTime<FieldType, never, IsString<T, string, never>>;
    _ncontains: IsDateTime<FieldType, never, IsString<T, string, never>>;
    _icontains: IsDateTime<FieldType, never, IsString<T, string, never>>;
    _starts_with: IsDateTime<FieldType, never, IsString<T, string, never>>;
    _istarts_with: IsDateTime<FieldType, never, IsString<T, string, never>>;
    _nstarts_with: IsDateTime<FieldType, never, IsString<T, string, never>>;
    _nistarts_with: IsDateTime<FieldType, never, IsString<T, string, never>>;
    _ends_with: IsDateTime<FieldType, never, IsString<T, string, never>>;
    _iends_with: IsDateTime<FieldType, never, IsString<T, string, never>>;
    _nends_with: IsDateTime<FieldType, never, IsString<T, string, never>>;
    _niends_with: IsDateTime<FieldType, never, IsString<T, string, never>>;
    _empty: boolean;
    _nempty: boolean;
    _nnull: boolean;
    _null: boolean;
    _intersects: T;
    _nintersects: T;
    _intersects_bbox: T;
    _nintersects_bbox: T;
}>;
type MapFilterOperators<Filters extends object> = {
    [Key in keyof Filters as IfNever<Filters[Key], never, Key>]?: Filters[Key];
};
/**
 * Relational filter operators
 */
type RelationalFilterOperators = '_some' | '_none';
type WrapRelationalFilters<Filters> = {
    [Operator in RelationalFilterOperators]?: Filters;
} | Filters;
/**
 * Logical filter operations
 */
type LogicalFilterOperators = '_or' | '_and';
type WrapLogicalFilters<Filters extends object> = MergeOptional<{
    [Operator in LogicalFilterOperators]?: WrapLogicalFilters<Filters>[];
}, Filters>;

/**
 * All query options available
 */
interface Query<Schema, Item> {
    readonly fields?: IfAny<Schema, (string | Record<string, any>)[], QueryFields<Schema, Item>> | undefined;
    filter?: IfAny<Schema, Record<string, any>, QueryFilter<Schema, Item>> | undefined;
    search?: string | undefined;
    sort?: IfAny<Schema, string | string[], QuerySort<Schema, Item> | QuerySort<Schema, Item>[]> | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    page?: number | undefined;
    deep?: IfAny<Schema, Record<string, any>, QueryDeep<Schema, Item>> | undefined;
    readonly alias?: IfAny<Schema, Record<string, string>, QueryAlias<Schema, Item>> | undefined;
}
/**
 * All query options with an additional version query option for readItem and readSingleton
 */
interface QueryItem<Schema, Item> extends Query<Schema, Item> {
    readonly version?: string | undefined;
    readonly versionRaw?: boolean | undefined;
}
/**
 * Returns Item types that are available in the root Schema
 */
type ExtractItem<Schema, Item> = Extract<UnpackList<Item>, ItemType<Schema>>;
/**
 * Returns the relation type from the current item by key
 */
type ExtractRelation<Schema, Item extends object, Key> = Key extends keyof Item ? ExtractItem<Schema, Item[Key]> : never;
/**
 * Merge union of optional objects
 */
type MergeRelationalFields<FieldList> = Exclude<UnpackList<FieldList>, string> extends infer RelatedFields ? {
    [Key in RelatedFields extends any ? keyof RelatedFields : never]-?: Exclude<RelatedFields[Key], undefined>;
} : never;
/**
 * Merge separate relational objects together
 */
type MergeFields<FieldList> = HasNestedFields<FieldList> extends never ? Extract<UnpackList<FieldList>, string> : Extract<UnpackList<FieldList>, string> | MergeRelationalFields<FieldList>;
/**
 * Query sort
 * TODO expand to relational sorting (same object notation as fields i guess)
 */
type QuerySort<_Schema, Item> = UnpackList<Item> extends infer FlatItem ? {
    [Field in keyof FlatItem]: Field | `-${Field & string}`;
}[keyof FlatItem] : never;
type MergeObjects<A, B> = object extends A ? (object extends B ? A & B : A) : object extends B ? B : never;
/**
 * Alias object
 *
 * TODO somehow include these aliases in the Field Types!!
 */
type QueryAlias<_Schema, Item> = Record<string, keyof Item>;

type WebSocketAuthModes = 'public' | 'handshake' | 'strict';
interface WebSocketConfig {
    authMode?: WebSocketAuthModes;
    reconnect?: {
        delay: number;
        retries: number;
    } | false;
    heartbeat?: boolean;
    debug?: boolean;
    url?: string;
}
interface SubscribeOptions<Schema, Collection extends keyof Schema> {
    event?: SubscriptionOptionsEvents;
    query?: Query<Schema, Schema[Collection]>;
    uid?: string;
}
type WebSocketEvents = 'open' | 'close' | 'error' | 'message';
type RemoveEventHandler = () => void;
type WebSocketEventHandler = (this: WebSocketInterface, ev: Event | CloseEvent | any) => any;
interface WebSocketClient<Schema> {
    connect(): Promise<WebSocketInterface>;
    disconnect(): void;
    onWebSocket(event: 'open', callback: (this: WebSocketInterface, ev: Event) => any): RemoveEventHandler;
    onWebSocket(event: 'error', callback: (this: WebSocketInterface, ev: Event) => any): RemoveEventHandler;
    onWebSocket(event: 'close', callback: (this: WebSocketInterface, ev: CloseEvent) => any): RemoveEventHandler;
    onWebSocket(event: 'message', callback: (this: WebSocketInterface, ev: any) => any): RemoveEventHandler;
    onWebSocket(event: WebSocketEvents, callback: WebSocketEventHandler): RemoveEventHandler;
    sendMessage(message: string | Record<string, any>): void;
    subscribe<Collection extends keyof Schema, const Options extends SubscribeOptions<Schema, Collection>>(collection: Collection, options?: Options): Promise<{
        subscription: AsyncGenerator<SubscriptionOutput<Schema, Collection, Options['query'], Fallback<Options['event'], SubscriptionOptionsEvents> | 'init'>, void, unknown>;
        unsubscribe(): void;
    }>;
}
type ConnectionState = {
    code: 'open';
    connection: WebSocketInterface;
    firstMessage: boolean;
} | {
    code: 'connecting';
    connection: Promise<WebSocketInterface>;
} | {
    code: 'error';
} | {
    code: 'closed';
};
type ReconnectState = {
    attempts: number;
    active: false | Promise<WebSocketInterface | void>;
};
type Fallback<Selected, Options> = Selected extends Options ? Selected : Options;
type SubscriptionOptionsEvents = 'create' | 'update' | 'delete';
type SubscriptionEvents = 'init' | SubscriptionOptionsEvents;
type SubscriptionOutput<Schema, Collection extends keyof Schema, TQuery extends Query<Schema, Schema[Collection]> | undefined, Events extends SubscriptionEvents, TItem = TQuery extends Query<Schema, Schema[Collection]> ? ApplyQueryFields<Schema, CollectionType<Schema, Collection>, TQuery['fields']> : Partial<Schema[Collection]>> = {
    type: 'subscription';
    uid?: string;
} & ({
    [Event in Events]: {
        event: Event;
        data: SubscriptionPayload<TItem>[Event];
    };
}[Events] | {
    event: 'error';
    error: {
        code: string;
        message: string;
    };
});
type SubscriptionPayload<Item> = {
    init: Item[];
    create: Item[];
    update: Item[];
    delete: string[] | number[];
};
type WebSocketAuthError = {
    type: 'auth';
    status: 'error';
    error: {
        code: string;
        message: string;
    };
};

/**
 * Creates a client to communicate with a Directus REST WebSocket.
 *
 * @param config The optional configuration.
 *
 * @returns A Directus realtime client.
 */
declare function realtime(config?: WebSocketConfig): <Schema>(client: DirectusClient<Schema>) => WebSocketClient<Schema>;

/**
 * Fallback generator function to get increment id's for subscriptions
 */
declare function generateUid(): Generator<string, string, unknown>;

/**
 * Wait for a websocket response
 *
 * @param socket WebSocket
 * @param number timeout
 *
 * @returns Incoming message object
 */
declare const messageCallback: (socket: WebSocketInterface, timeout?: number) => Promise<Record<string, any> | MessageEvent<string> | undefined>;

/**
 * Wait for a certain amount of ms
 * @param delay number in MS
 * @returns void
 */
declare const sleep: (delay: number) => Promise<void>;

type HttpMethod = 'GET' | 'SEARCH' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
interface RequestOptions {
    path: string;
    method?: HttpMethod;
    params?: Record<string, any>;
    headers?: Record<string, string>;
    body?: string | FormData;
    onRequest?: RequestTransformer;
    onResponse?: ResponseTransformer;
}
type RequestTransformer = (options: RequestInit) => RequestInit | Promise<RequestInit>;
type ResponseTransformer<Output = any> = (data: any, request: RequestInit) => Output | Promise<Output>;

interface RestCommand<_Output extends object | unknown, _Schema> {
    (): RequestOptions;
}
interface RestClient<Schema> {
    request<Output>(options: RestCommand<Output, Schema>): Promise<Output>;
}
interface RestConfig {
    credentials?: RequestCredentials;
    onRequest?: RequestTransformer;
    onResponse?: ResponseTransformer;
}

/**
 * Authenticate as a user.
 *
 * @param email Email address of the user.
 * @param password Password of the user.
 * @param options Optional login settings.
 *
 * @returns Authentication data.
 */
declare const login: <Schema>(email: string, password: string, options?: LoginOptions) => RestCommand<AuthenticationData, Schema>;

/**
 * Invalidate the refresh token thus destroying the user's session.
 *
 * @param mode Whether the refresh token is submitted in the JSON response, or in a httpOnly cookie.
 * @param refresh_token The refresh token to invalidate. If you have the refresh token in a cookie through /auth/login, you don't have to submit it here.
 *
 * @returns Empty body.
 */
declare const logout: <Schema>(refresh_token?: string, mode?: AuthenticationMode) => RestCommand<void, Schema>;

/**
 * Request a password reset email to be sent to the given user.
 *
 * @param email Email address of the user you're requesting a password reset for.
 * @param reset_url Provide a custom reset url which the link in the email will lead to. The reset token will be passed as a parameter.
 *
 * @returns Empty body.
 */
declare const passwordRequest: <Schema>(email: string, reset_url?: string) => RestCommand<void, Schema>;

/**
 * The request a password reset endpoint sends an email with a link to the admin app (or a custom route) which in turn uses this endpoint to allow the user to reset their password.
 *
 * @param token Password reset token, as provided in the email sent by the request endpoint.
 * @param password New password for the user.
 *
 * @returns Empty body.
 */
declare const passwordReset: <Schema>(token: string, password: string) => RestCommand<void, Schema>;

interface ReadProviderOutput {
    name: string;
    driver: string;
    icon?: string | null;
}
/**
 * List all the configured auth providers.
 *
 * @returns Array of configured auth providers.
 */
declare const readProviders: <Schema>(sessionOnly?: boolean) => RestCommand<ReadProviderOutput[], Schema>;

/**
 * Retrieve a new access token using a refresh token.
 *
 * @param mode Whether to submit and retrieve the refresh token in the JSON response, or in a httpOnly cookie.
 * @param refresh_token The refresh token to use. If you have the refresh token in a cookie through /auth/login, you don't have to submit it here.
 *
 * @returns The new access and refresh tokens for the session.
 */
declare const refresh: <Schema>(mode?: AuthenticationMode, refresh_token?: string) => RestCommand<AuthenticationData, Schema>;

type GroupingFunctions = {
    date: 'year' | 'month' | 'week' | 'day' | 'weekday' | 'hour' | 'minute' | 'second';
    array: 'count';
};
type AggregationTypes = {
    count: {
        output: string | null;
        wildcard: true;
    };
    countDistinct: {
        output: string | null;
        wildcard: true;
    };
    sum: {
        output: string | null;
        wildcard: never;
    };
    sumDistinct: {
        output: string | null;
        wildcard: never;
    };
    avg: {
        output: string | null;
        wildcard: never;
    };
    avgDistinct: {
        output: string | null;
        wildcard: never;
    };
    min: {
        output: number | null;
        wildcard: never;
    };
    max: {
        output: number | null;
        wildcard: never;
    };
};
/**
 * Aggregation parameters
 */
type AggregateRecord<Fields = string> = {
    [Func in keyof AggregationTypes]?: Fields | Fields[] | (AggregationTypes[Func]['wildcard'] extends never ? never : '*');
};
/**
 * GroupBy parameters
 */
type GroupByFields<Schema, Item> = WrappedFields<LiteralFields<Item, 'datetime'>, DateTimeFunctions> | WrappedFields<RelationalFields<Schema, Item>, ArrayFunctions>;
/**
 * Aggregation input options
 */
type AggregationOptions<Schema, Collection extends AllCollections<Schema>, Fields = Collection extends keyof Schema ? keyof UnpackList<GetCollection<Schema, Collection>> : string, Item = Collection extends keyof Schema ? UnpackList<GetCollection<Schema, Collection>> : object> = {
    aggregate: AggregateRecord<Fields>;
    groupBy?: (Fields | GroupByFields<Schema, Item>)[];
    query?: Omit<Query<Schema, Item>, 'fields' | 'deep' | 'alias'>;
};
/**
 * Output typing for aggregation
 */
type AggregationOutput<Schema, Collection extends AllCollections<Schema>, Options extends AggregationOptions<Schema, Collection>> = ((Options['groupBy'] extends string[] ? UnpackList<GetCollection<Schema, Collection>> extends infer Item ? Item extends object ? MappedFunctionFields<Schema, Item> extends infer FieldMap ? MappedFieldNames<Schema, Item> extends infer NamesMap ? {
    [Field in UnpackList<Options['groupBy']> as TranslateFunctionField<FieldMap, Field>]: TranslateFunctionField<NamesMap, Field> extends keyof Item ? Item[TranslateFunctionField<NamesMap, Field>] : never;
} : never : never : never : never : object) & {
    [Func in keyof Options['aggregate']]: Func extends keyof AggregationTypes ? Options['aggregate'][Func] extends string[] ? {
        [Field in UnpackList<Options['aggregate'][Func]>]: Field extends '*' ? AggregationTypes[Func]['output'] : {
            [SubField in Field]: AggregationTypes[Func]['output'];
        }[Field];
    } : Options['aggregate'][Func] extends string ? Options['aggregate'][Func] extends '*' ? AggregationTypes[Func]['output'] : {
        [SubField in Options['aggregate'][Func]]: AggregationTypes[Func]['output'];
    }[Options['aggregate'][Func]] : never : never;
})[];
/**
 * Wrap fields in functions
 */
type WrappedFields<Fields, Funcs> = Fields extends string ? Funcs extends string ? `${Funcs}(${Fields})` : never : never;
/**
 * Translate function names based on provided map
 */
type TranslateFunctionField<FieldMap, Field> = Field extends keyof FieldMap ? FieldMap[Field] extends string ? FieldMap[Field] : never : Field extends string ? Field : never;

/**
 * The assets endpoint query parameters
 */
type AssetsQuery = {
    key: string;
} | {
    key?: never;
    fit?: 'cover' | 'contain' | 'inside' | 'outside';
    width?: number;
    height?: number;
    quality?: number;
    withoutEnlargement?: boolean;
    format?: 'auto' | 'jpg' | 'png' | 'webp' | 'tiff';
    focal_point_x?: number;
    focal_point_y?: number;
    transforms?: [string, ...any[]][];
};

type CreateActivityOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusActivity<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Creates a new comment on a given item.
 *
 * @param items The items to create
 * @param query Optional return data query
 *
 * @returns Returns the activity object of the created comment.
 */
declare const createComment: <Schema, const TQuery extends Query<Schema, DirectusActivity<Schema>>>(item: Partial<DirectusActivity<Schema>>, query?: TQuery) => RestCommand<CreateActivityOutput<Schema, TQuery>, Schema>;

type CreateCollectionOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusCollection<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Create a new Collection. This will create a new table in the database as well.
 *
 * @param item This endpoint doesn't currently support any query parameters.
 * @param query Optional return data query
 *
 * @returns The collection object for the collection created in this request.
 */
declare const createCollection: <Schema, const TQuery extends Query<Schema, DirectusCollection<Schema>>>(item: NestedPartial<DirectusCollection<Schema>>, query?: TQuery) => RestCommand<CreateCollectionOutput<Schema, TQuery>, Schema>;

type CreateDashboardOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusDashboard<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Create multiple new dashboards.
 *
 * @param items The items to create
 * @param query Optional return data query
 *
 * @returns Returns the dashboard object for the created dashboards.
 */
declare const createDashboards: <Schema, const TQuery extends Query<Schema, DirectusDashboard<Schema>>>(items: Partial<DirectusDashboard<Schema>>[], query?: TQuery) => RestCommand<CreateDashboardOutput<Schema, TQuery>[], Schema>;
/**
 * Create a new dashboard.
 *
 * @param item The dashboard to create
 * @param query Optional return data query
 *
 * @returns Returns the dashboard object for the created dashboard.
 */
declare const createDashboard: <Schema, const TQuery extends Query<Schema, DirectusDashboard<Schema>>>(item: Partial<DirectusDashboard<Schema>>, query?: TQuery) => RestCommand<CreateDashboardOutput<Schema, TQuery>, Schema>;

type CreateFieldOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusField<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Create a new field in the given collection.
 *
 * @param collection The collection to create a field for
 * @param item The field to create
 * @param query Optional return data query
 *
 * @returns The field object for the created field.
 */
declare const createField: <Schema, const TQuery extends Query<Schema, DirectusField<Schema>>>(collection: keyof Schema, item: NestedPartial<DirectusField<Schema>>, query?: TQuery) => RestCommand<CreateFieldOutput<Schema, TQuery>, Schema>;

type CreateFileOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusFile<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Upload/create a new file.
 *
 * @param data Formdata object
 * @param query The query parameters
 *
 * @returns Returns the file object for the uploaded file, or an array of file objects if multiple files were uploaded at once.
 */
declare const uploadFiles: <Schema, const TQuery extends Query<Schema, DirectusFile<Schema>>>(data: FormData, query?: TQuery) => RestCommand<CreateFileOutput<Schema, TQuery>, Schema>;
/**
 * Import a file from the web
 *
 * @param url The url to import the file from
 * @param data Formdata object
 * @param query The query parameters
 *
 * @returns Returns the file object for the imported file.
 */
declare const importFile: <Schema, TQuery extends Query<Schema, DirectusFile<Schema>>>(url: string, data?: Partial<DirectusFile<Schema>>, query?: TQuery) => RestCommand<CreateFileOutput<Schema, TQuery>, Schema>;

type CreateFlowOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusFlow<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Create multiple new flows.
 *
 * @param items The flows to create
 * @param query Optional return data query
 *
 * @returns Returns the flow object for the created flow.
 */
declare const createFlows: <Schema, const TQuery extends Query<Schema, DirectusFlow<Schema>>>(items: Partial<DirectusFlow<Schema>>[], query?: TQuery) => RestCommand<CreateFlowOutput<Schema, TQuery>[], Schema>;
/**
 * Create a new flow.
 *
 * @param item The flow to create
 * @param query Optional return data query
 *
 * @returns Returns the flow object for the created flow.
 */
declare const createFlow: <Schema, TQuery extends Query<Schema, DirectusFlow<Schema>>>(item: Partial<DirectusFlow<Schema>>, query?: TQuery) => RestCommand<CreateFlowOutput<Schema, TQuery>, Schema>;

type CreateFolderOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusFolder<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Create multiple new (virtual) folders.
 *
 * @param item The folder to create
 * @param query Optional return data query
 *
 * @returns Returns the folder object of the folder that was created.
 */
declare const createFolders: <Schema, const TQuery extends Query<Schema, DirectusFolder<Schema>>>(items: Partial<DirectusFolder<Schema>>[], query?: TQuery) => RestCommand<CreateFolderOutput<Schema, TQuery>[], Schema>;
/**
 * Create a new (virtual) folder.
 *
 * @param item The folder to create
 * @param query Optional return data query
 *
 * @returns Returns the folder object of the folder that was created.
 */
declare const createFolder: <Schema, const TQuery extends Query<Schema, DirectusFolder<Schema>>>(item: Partial<DirectusFolder<Schema>>, query?: TQuery) => RestCommand<CreateFolderOutput<Schema, TQuery>, Schema>;

type CreateItemOutput<Schema, Collection extends keyof Schema, TQuery extends Query<Schema, Schema[Collection]>> = ApplyQueryFields<Schema, CollectionType<Schema, Collection>, TQuery['fields']>;
/**
 * Create new items in the given collection.
 *
 * @param collection The collection of the item
 * @param items The items to create
 * @param query Optional return data query
 *
 * @returns Returns the item objects of the item that were created.
 */
declare const createItems: <Schema, Collection extends keyof Schema, const TQuery extends Query<Schema, Schema[Collection]>>(collection: Collection, items: Partial<UnpackList<Schema[Collection]>>[], query?: TQuery) => RestCommand<CreateItemOutput<Schema, Collection, TQuery>[], Schema>;
/**
 * Create a new item in the given collection.
 *
 * @param collection The collection of the item
 * @param item The item to create
 * @param query Optional return data query
 *
 * @returns Returns the item objects of the item that were created.
 */
declare const createItem: <Schema, Collection extends keyof Schema, const TQuery extends Query<Schema, Schema[Collection]>>(collection: Collection, item: Partial<UnpackList<Schema[Collection]>>, query?: TQuery) => RestCommand<CreateItemOutput<Schema, Collection, TQuery>, Schema>;

type CreateNotificationOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusNotification<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Create multiple new notifications.
 *
 * @param items The notifications to create
 * @param query Optional return data query
 *
 * @returns Returns the notification object for the created notification.
 */
declare const createNotifications: <Schema, const TQuery extends Query<Schema, DirectusNotification<Schema>>>(items: Partial<DirectusNotification<Schema>>[], query?: TQuery) => RestCommand<CreateNotificationOutput<Schema, TQuery>[], Schema>;
/**
 * Create a new notification.
 *
 * @param item The notification to create
 * @param query Optional return data query
 *
 * @returns Returns the notification object for the created notification.
 */
declare const createNotification: <Schema, const TQuery extends Query<Schema, DirectusNotification<Schema>>>(item: Partial<DirectusNotification<Schema>>, query?: TQuery) => RestCommand<CreateNotificationOutput<Schema, TQuery>, Schema>;

type CreateOperationOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusOperation<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Create multiple new operations.
 *
 * @param items The operation to create
 * @param query Optional return data query
 *
 * @returns Returns the operation object for the created operation.
 */
declare const createOperations: <Schema, const TQuery extends Query<Schema, DirectusOperation<Schema>>>(items: Partial<DirectusOperation<Schema>>[], query?: TQuery) => RestCommand<CreateOperationOutput<Schema, TQuery>[], Schema>;
/**
 * Create a new operation.
 *
 * @param item The operation to create
 * @param query Optional return data query
 *
 * @returns Returns the operation object for the created operation.
 */
declare const createOperation: <Schema, const TQuery extends Query<Schema, DirectusOperation<Schema>>>(item: Partial<DirectusOperation<Schema>>, query?: TQuery) => RestCommand<CreateOperationOutput<Schema, TQuery>, Schema>;

type CreatePanelOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusPanel<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Create multiple new panels.
 *
 * @param items The panel to create
 * @param query Optional return data query
 *
 * @returns Returns the panel object for the created panel.
 */
declare const createPanels: <Schema, const TQuery extends Query<Schema, DirectusPanel<Schema>>>(items: Partial<DirectusPanel<Schema>>[], query?: TQuery) => RestCommand<CreatePanelOutput<Schema, TQuery>[], Schema>;
/**
 * Create a new panel.
 *
 * @param item The panel to create
 * @param query Optional return data query
 *
 * @returns Returns the panel object for the created panel.
 */
declare const createPanel: <Schema, const TQuery extends Query<Schema, DirectusPanel<Schema>>>(item: Partial<DirectusPanel<Schema>>, query?: TQuery) => RestCommand<CreatePanelOutput<Schema, TQuery>, Schema>;

type CreatePermissionOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusPermission<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Create multiple new permission rules
 *
 * @param items The permission rules to create
 * @param query Optional return data query
 *
 * @returns Returns the permission objects for the created permissions.
 */
declare const createPermissions: <Schema, const TQuery extends Query<Schema, DirectusPermission<Schema>>>(items: Partial<DirectusPermission<Schema>>[], query?: TQuery) => RestCommand<CreatePermissionOutput<Schema, TQuery>[], Schema>;
/**
 * Create a new permission rule
 *
 * @param item The permission rule to create
 * @param query Optional return data query
 *
 * @returns Returns the permission object for the created permission.
 */
declare const createPermission: <Schema, const TQuery extends Query<Schema, DirectusPermission<Schema>>>(item: Partial<DirectusPermission<Schema>>, query?: TQuery) => RestCommand<CreatePermissionOutput<Schema, TQuery>, Schema>;

type CreatePresetOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusPreset<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Create multiple new presets.
 *
 * @param items The presets to create
 * @param query Optional return data query
 *
 * @returns Returns the preset object for the created preset.
 */
declare const createPresets: <Schema, const TQuery extends Query<Schema, DirectusPreset<Schema>>>(items: Partial<DirectusPreset<Schema>>[], query?: TQuery) => RestCommand<CreatePresetOutput<Schema, TQuery>[], Schema>;
/**
 * Create a new preset.
 *
 * @param item The preset to create
 * @param query Optional return data query
 *
 * @returns Returns the preset object for the created preset.
 */
declare const createPreset: <Schema, const TQuery extends Query<Schema, DirectusPreset<Schema>>>(item: Partial<DirectusPreset<Schema>>, query?: TQuery) => RestCommand<CreatePresetOutput<Schema, TQuery>, Schema>;

type CreateRelationOutput<Schema, Item extends object = DirectusRelation<Schema>> = ApplyQueryFields<Schema, Item, '*'>;
/**
 * Create a new relation.
 *
 * @param item The relation to create
 * @param query Optional return data query
 *
 * @returns Returns the relation object for the created relation.
 */
declare const createRelation: <Schema>(item: NestedPartial<DirectusRelation<Schema>>) => RestCommand<CreateRelationOutput<Schema>, Schema>;

type CreateRoleOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusRole<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Create multiple new roles.
 *
 * @param items The roles to create
 * @param query Optional return data query
 *
 * @returns Returns the role objects for the created roles.
 */
declare const createRoles: <Schema, const TQuery extends Query<Schema, DirectusRole<Schema>>>(items: Partial<DirectusRole<Schema>>[], query?: TQuery) => RestCommand<CreateRoleOutput<Schema, TQuery>[], Schema>;
/**
 * Create a new role.
 *
 * @param item The role to create
 * @param query Optional return data query
 *
 * @returns Returns the role object for the created role.
 */
declare const createRole: <Schema, const TQuery extends Query<Schema, DirectusRole<Schema>>>(item: Partial<DirectusRole<Schema>>, query?: TQuery) => RestCommand<CreateRoleOutput<Schema, TQuery>, Schema>;

type CreateShareOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusShare<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Create multiple new shares.
 *
 * @param items The shares to create
 * @param query Optional return data query
 *
 * @returns Returns the share objects for the created shares.
 */
declare const createShares: <Schema, const TQuery extends Query<Schema, DirectusShare<Schema>>>(items: Partial<DirectusShare<Schema>>[], query?: TQuery) => RestCommand<CreateShareOutput<Schema, TQuery>[], Schema>;
/**
 * Create a new share.
 *
 * @param item The share to create
 * @param query Optional return data query
 *
 * @returns Returns the share object for the created share.
 */
declare const createShare: <Schema, const TQuery extends Query<Schema, DirectusShare<Schema>>>(item: Partial<DirectusShare<Schema>>, query?: TQuery) => RestCommand<CreateShareOutput<Schema, TQuery>, Schema>;

type CreateTranslationOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusTranslation<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Create multiple new translation.
 *
 * @param items The translations to create
 * @param query Optional return data query
 *
 * @returns Returns the translation object for the created translation.
 */
declare const createTranslations: <Schema, const TQuery extends Query<Schema, DirectusTranslation<Schema>>>(items: Partial<DirectusTranslation<Schema>>[], query?: TQuery) => RestCommand<CreateTranslationOutput<Schema, TQuery>[], Schema>;
/**
 * Create a new translation.
 *
 * @param item The translation to create
 * @param query Optional return data query
 *
 * @returns Returns the translation object for the created translation.
 */
declare const createTranslation: <Schema, const TQuery extends Query<Schema, DirectusTranslation<Schema>>>(item: Partial<DirectusTranslation<Schema>>, query?: TQuery) => RestCommand<CreateTranslationOutput<Schema, TQuery>, Schema>;

type CreateUserOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusUser<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Create multiple new users.
 *
 * @param items The items to create
 * @param query Optional return data query
 *
 * @returns Returns the user objects for the created users.
 */
declare const createUsers: <Schema, const TQuery extends Query<Schema, DirectusUser<Schema>>>(items: Partial<DirectusUser<Schema>>[], query?: TQuery) => RestCommand<CreateUserOutput<Schema, TQuery>[], Schema>;
/**
 * Create a new user.
 *
 * @param item The user to create
 * @param query Optional return data query
 *
 * @returns Returns the user object for the created user.
 */
declare const createUser: <Schema, const TQuery extends Query<Schema, DirectusUser<Schema>>>(item: Partial<DirectusUser<Schema>>, query?: TQuery) => RestCommand<CreateUserOutput<Schema, TQuery>, Schema>;

type CreateContentVersionOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusVersion<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Create multiple new Content Versions.
 *
 * @param items The Content Versions to create
 * @param query Optional return data query
 *
 * @returns Returns the Content Version object for the created Content Versions.
 */
declare const createContentVersions: <Schema, const TQuery extends Query<Schema, DirectusVersion<Schema>>>(items: Partial<DirectusVersion<Schema>>[], query?: TQuery) => RestCommand<CreateContentVersionOutput<Schema, TQuery>[], Schema>;
/**
 * Create a new Content Version.
 *
 * @param item The Content Version to create
 * @param query Optional return data query
 *
 * @returns Returns the Content Version object for the created Content Version.
 */
declare const createContentVersion: <Schema, const TQuery extends Query<Schema, DirectusVersion<Schema>>>(item: Partial<DirectusVersion<Schema>>, query?: TQuery) => RestCommand<CreateContentVersionOutput<Schema, TQuery>, Schema>;

type CreateWebhookOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusWebhook<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Create multiple new webhooks.
 *
 * @param items The webhooks to create
 * @param query Optional return data query
 *
 * @returns Returns the webhook objects for the created webhooks.
 */
declare const createWebhooks: <Schema, const TQuery extends Query<Schema, DirectusWebhook<Schema>>>(items: Partial<DirectusWebhook<Schema>>[], query?: TQuery) => RestCommand<CreateWebhookOutput<Schema, TQuery>[], Schema>;
/**
 * Create a new webhook.
 *
 * @param item The webhook to create
 * @param query Optional return data query
 *
 * @returns Returns the webhook object for the created webhook.
 */
declare const createWebhook: <Schema, const TQuery extends Query<Schema, DirectusWebhook<Schema>>>(item: Partial<DirectusWebhook<Schema>>, query?: TQuery) => RestCommand<CreateWebhookOutput<Schema, TQuery>, Schema>;

/**
 * Deletes a comment.
 * @param key
 * @returns Nothing
 */
declare const deleteComment: <Schema>(key: DirectusActivity<Schema>['id']) => RestCommand<void, Schema>;

/**
 * Delete a collection.
 * @param collection
 * @returns
 */
declare const deleteCollection: <Schema>(collection: DirectusCollection<Schema>['collection']) => RestCommand<void, Schema>;

/**
 * Delete multiple existing dashboards.
 * @param keysOrQuery
 * @returns
 * @throws Will throw if keys is empty
 */
declare const deleteDashboards: <Schema>(keys: DirectusDashboard<Schema>['id'][]) => RestCommand<void, Schema>;
/**
 * Delete an existing dashboard.
 * @param key
 * @returns
 * @throws Will throw if key is empty
 */
declare const deleteDashboard: <Schema>(key: DirectusDashboard<Schema>['id']) => RestCommand<void, Schema>;

/**
 * Deletes the given field in the given collection.
 * @param collection
 * @param field
 * @returns
 * @throws Will throw if collection is empty
 * @throws Will throw if field is empty
 */
declare const deleteField: <Schema>(collection: DirectusField<Schema>['collection'], field: DirectusField<Schema>['field']) => RestCommand<void, Schema>;

/**
 * Delete multiple files at once.
 * @param keys
 * @returns
 * @throws Will throw if keys is empty
 */
declare const deleteFiles: <Schema>(keys: DirectusFile<Schema>['id'][]) => RestCommand<void, Schema>;
/**
 * Delete an existing file.
 * @param key
 * @returns
 * @throws Will throw if key is empty
 */
declare const deleteFile: <Schema>(key: DirectusFile<Schema>['id']) => RestCommand<void, Schema>;

/**
 * Delete multiple existing flows.
 * @param keys
 * @returns
 * @throws Will throw if keys is empty
 */
declare const deleteFlows: <Schema>(keys: DirectusFlow<Schema>['id'][]) => RestCommand<void, Schema>;
/**
 * Delete an existing flow.
 * @param key
 * @returns
 * @throws Will throw if key is empty
 */
declare const deleteFlow: <Schema>(key: DirectusFlow<Schema>['id']) => RestCommand<void, Schema>;

/**
 * Delete multiple existing folders.
 * @param keys
 * @returns
 * @throws Will throw if keys is empty
 */
declare const deleteFolders: <Schema>(keys: DirectusFolder<Schema>['id'][]) => RestCommand<void, Schema>;
/**
 * Delete an existing folder.
 * @param key
 * @returns
 * @throws Will throw if key is empty
 */
declare const deleteFolder: <Schema>(key: DirectusFolder<Schema>['id']) => RestCommand<void, Schema>;

/**
 * Delete multiple existing items.
 *
 * @param collection The collection of the items
 * @param keysOrQuery The primary keys or a query
 *
 * @returns Nothing
 * @throws Will throw if collection is empty
 * @throws Will throw if collection is a core collection
 * @throws Will throw if keysOrQuery is empty
 */
declare const deleteItems: <Schema, Collection extends keyof Schema, const TQuery extends Query<Schema, Schema[Collection]>>(collection: Collection, keysOrQuery: string[] | number[] | TQuery) => RestCommand<void, Schema>;
/**
 * Delete an existing item.
 *
 * @param collection The collection of the item
 * @param key The primary key of the item
 *
 * @returns Nothing
 * @throws Will throw if collection is empty
 * @throws Will throw if collection is a core collection
 * @throws Will throw if key is empty
 */
declare const deleteItem: <Schema, Collection extends keyof Schema>(collection: Collection, key: string | number) => RestCommand<void, Schema>;

/**
 * Delete multiple existing notifications.
 * @param keys
 * @returns
 * @throws Will throw if keys is empty
 */
declare const deleteNotifications: <Schema>(keys: DirectusNotification<Schema>['id'][]) => RestCommand<void, Schema>;
/**
 * Delete an existing notification.
 * @param key
 * @returns
 * @throws Will throw if key is empty
 */
declare const deleteNotification: <Schema>(key: DirectusNotification<Schema>['id']) => RestCommand<void, Schema>;

/**
 * Delete multiple existing operations.
 * @param keys
 * @returns
 * @throws Will throw if keys is empty
 */
declare const deleteOperations: <Schema>(keys: DirectusOperation<Schema>['id'][]) => RestCommand<void, Schema>;
/**
 * Delete an existing operation.
 * @param key
 * @returns
 * @throws Will throw if key is empty
 */
declare const deleteOperation: <Schema>(key: DirectusOperation<Schema>['id']) => RestCommand<void, Schema>;

/**
 * Delete multiple existing panels.
 * @param keys
 * @returns
 * @throws Will throw if keys is empty
 */
declare const deletePanels: <Schema>(keys: DirectusPanel<Schema>['id'][]) => RestCommand<void, Schema>;
/**
 * Delete an existing panel.
 * @param key
 * @returns
 * @throws Will throw if key is empty
 */
declare const deletePanel: <Schema>(key: DirectusPanel<Schema>['id']) => RestCommand<void, Schema>;

/**
 * Delete multiple existing permissions rules
 * @param keys
 * @returns
 * @throws Will throw if keys is empty
 */
declare const deletePermissions: <Schema>(keys: DirectusPermission<Schema>['id'][]) => RestCommand<void, Schema>;
/**
 * Delete an existing permissions rule
 * @param key
 * @returns
 * @throws Will throw if key is empty
 */
declare const deletePermission: <Schema>(key: DirectusPermission<Schema>['id']) => RestCommand<void, Schema>;

/**
 * Delete multiple existing presets.
 * @param keys
 * @returns
 * @throws Will throw if keys is empty
 */
declare const deletePresets: <Schema>(keys: DirectusPreset<Schema>['id'][]) => RestCommand<void, Schema>;
/**
 * Delete an existing preset.
 * @param key
 * @returns
 * @throws Will throw if key is empty
 */
declare const deletePreset: <Schema>(key: DirectusPreset<Schema>['id']) => RestCommand<void, Schema>;

/**
 * Delete an existing relation.
 * @param collection
 * @param field
 * @returns
 * @throws Will throw if collection is empty
 * @throws Will throw if field is empty
 */
declare const deleteRelation: <Schema>(collection: DirectusRelation<Schema>['collection'], field: DirectusRelation<Schema>['field']) => RestCommand<void, Schema>;

/**
 * Delete multiple existing roles.
 * @param keys
 * @returns
 * @throws Will throw if keys is empty
 */
declare const deleteRoles: <Schema>(keys: DirectusRole<Schema>['id'][]) => RestCommand<void, Schema>;
/**
 * Delete an existing role.
 * @param key
 * @returns
 * @throws Will throw if key is empty
 */
declare const deleteRole: <Schema>(key: DirectusRole<Schema>['id']) => RestCommand<void, Schema>;

/**
 * Delete multiple existing shares.
 * @param keys
 * @returns
 * @throws Will throw if keys is empty
 */
declare const deleteShares: <Schema>(keys: DirectusShare<Schema>['id'][]) => RestCommand<void, Schema>;
/**
 * Delete an existing share.
 * @param key
 * @returns
 * @throws Will throw if key is empty
 */
declare const deleteShare: <Schema>(key: DirectusShare<Schema>['id']) => RestCommand<void, Schema>;

/**
 * Delete multiple existing translations.
 * @param keys
 * @returns
 * @throws Will throw if keys is empty
 */
declare const deleteTranslations: <Schema>(keys: DirectusTranslation<Schema>['id'][]) => RestCommand<void, Schema>;
/**
 * Delete an existing translation.
 * @param key
 * @returns
 * @throws Will throw if key is empty
 */
declare const deleteTranslation: <Schema>(key: DirectusTranslation<Schema>['id']) => RestCommand<void, Schema>;

/**
 * Delete multiple existing users.
 *
 * @param keys
 * @returns Nothing
 * @throws Will throw if keys is empty
 */
declare const deleteUsers: <Schema>(keys: DirectusUser<Schema>['id'][]) => RestCommand<void, Schema>;
/**
 * Delete an existing user.
 *
 * @param key
 * @returns Nothing
 * @throws Will throw if key is empty
 */
declare const deleteUser: <Schema>(key: DirectusUser<Schema>['id']) => RestCommand<void, Schema>;

/**
 * Delete multiple existing Content Versions.
 * @param keys
 * @returns
 * @throws Will throw if keys is empty
 */
declare const deleteContentVersions: <Schema>(keys: DirectusVersion<Schema>['id'][]) => RestCommand<void, Schema>;
/**
 * Delete an existing Content Version.
 * @param key
 * @returns
 * @throws Will throw if key is empty
 */
declare const deleteContentVersion: <Schema>(key: DirectusVersion<Schema>['id']) => RestCommand<void, Schema>;

/**
 * Delete multiple existing webhooks.
 * @param keys
 * @returns
 * @throws Will throw if keys is empty
 */
declare const deleteWebhooks: <Schema>(keys: DirectusWebhook<Schema>['id'][]) => RestCommand<void, Schema>;
/**
 * Delete an existing webhook.
 * @param key
 * @returns
 * @throws Will throw if key is empty
 */
declare const deleteWebhook: <Schema>(key: DirectusWebhook<Schema>['id']) => RestCommand<void, Schema>;

type ReadActivityOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusActivity<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Returns a list of activity actions.
 * @param query The query parameters
 * @returns An array of up to limit activity objects. If no items are available, data will be an empty array.
 */
declare const readActivities: <Schema, const TQuery extends Query<Schema, DirectusActivity<Schema>>>(query?: TQuery) => RestCommand<ReadActivityOutput<Schema, TQuery>[], Schema>;
/**
 * Returns a single activity action by primary key.
 * @param key The primary key of the activity
 * @param query The query parameters
 * @returns Returns an activity object if a valid identifier was provided.
 * @throws Will throw if key is empty
 */
declare const readActivity: <Schema, const TQuery extends Query<Schema, DirectusActivity<Schema>>>(key: DirectusActivity<Schema>['id'], query?: TQuery) => RestCommand<ReadActivityOutput<Schema, TQuery>, Schema>;

/**
 * Aggregate allow you to perform calculations on a set of values, returning a single result.
 * @param collection The collection to aggregate
 * @param options The aggregation options
 * @returns Aggregated data
 * @throws Will throw if collection is empty
 */
declare const aggregate: <Schema, Collection extends AllCollections<Schema>, Options extends AggregationOptions<Schema, Collection>>(collection: Collection, options: Options) => RestCommand<AggregationOutput<Schema, Collection, Options>, Schema>;

/**
 * Read the contents of a file as a ReadableStream<Uint8Array>
 *
 * @param {string} key
 * @param {AssetsQuery} query
 * @returns {ReadableStream<Uint8Array>}
 */
declare const readAssetRaw: <Schema>(key: DirectusFile<Schema>['id'], query?: AssetsQuery) => RestCommand<ReadableStream<Uint8Array>, Schema>;
/**
 * Read the contents of a file as a Blob
 *
 * @param {string} key
 * @param {AssetsQuery} query
 * @returns {Blob}
 */
declare const readAssetBlob: <Schema>(key: DirectusFile<Schema>['id'], query?: AssetsQuery) => RestCommand<Blob, Schema>;
/**
 * Read the contents of a file as a ArrayBuffer
 *
 * @param {string} key
 * @param {AssetsQuery} query
 * @returns {ArrayBuffer}
 */
declare const readAssetArrayBuffer: <Schema>(key: DirectusFile<Schema>['id'], query?: AssetsQuery) => RestCommand<ArrayBuffer, Schema>;

type ReadCollectionOutput<Schema, Item extends object = DirectusCollection<Schema>> = ApplyQueryFields<Schema, Item, '*'>;
/**
 * List the available collections.
 * @returns An array of collection objects.
 */
declare const readCollections: <Schema>() => RestCommand<ReadCollectionOutput<Schema>[], Schema>;
/**
 * Retrieve a single collection by table name.
 * @param collection The collection name
 * @returns A collection object.
 * @throws Will throw if collection is empty
 */
declare const readCollection: <Schema>(collection: DirectusCollection<Schema>['collection']) => RestCommand<ReadCollectionOutput<Schema>, Schema>;

type ReadDashboardOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusDashboard<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * List all dashboards that exist in Directus.
 * @param query The query parameters
 * @returns An array of up to limit dashboard objects. If no items are available, data will be an empty array.
 */
declare const readDashboards: <Schema, const TQuery extends Query<Schema, DirectusDashboard<Schema>>>(query?: TQuery) => RestCommand<ReadDashboardOutput<Schema, TQuery>[], Schema>;
/**
 * List an existing dashboard by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 * @returns Returns the requested dashboard object.
 * @throws Will throw if key is empty
 */
declare const readDashboard: <Schema, const TQuery extends Query<Schema, DirectusDashboard<Schema>>>(key: DirectusDashboard<Schema>['id'], query?: TQuery) => RestCommand<ReadDashboardOutput<Schema, TQuery>, Schema>;

/**
 * List the available extensions in the project.
 * @returns An array of extensions.
 */
declare const readExtensions: <Schema>() => RestCommand<DirectusExtension<Schema>[], Schema>;

type ReadFieldOutput<Schema, Item extends object = DirectusField<Schema>> = ApplyQueryFields<Schema, Item, '*'>;
/**
 * List the available fields.
 * @param query The query parameters
 * @returns An array of field objects.
 */
declare const readFields: <Schema>() => RestCommand<ReadFieldOutput<Schema>[], Schema>;
/**
 * List the available fields in a given collection.
 * @param collection The primary key of the field
 * @returns
 * @throws Will throw if collection is empty
 */
declare const readFieldsByCollection: <Schema>(collection: DirectusField<Schema>['collection']) => RestCommand<ReadFieldOutput<Schema>[], Schema>;
/**
 *
 * @param key The primary key of the dashboard
 * @param query The query parameters
 * @returns
 * @throws Will throw if collection is empty
 * @throws Will throw if field is empty
 */
declare const readField: <Schema>(collection: DirectusField<Schema>['collection'], field: DirectusField<Schema>['field']) => RestCommand<ReadFieldOutput<Schema>, Schema>;

type ReadFileOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusFile<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * List all files that exist in Directus.
 * @param query The query parameters
 * @returns An array of up to limit file objects. If no items are available, data will be an empty array.
 */
declare const readFiles: <Schema, const TQuery extends Query<Schema, DirectusFile<Schema>>>(query?: TQuery) => RestCommand<ReadFileOutput<Schema, TQuery>[], Schema>;
/**
 * Retrieve a single file by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 * @returns Returns a file object if a valid primary key was provided.
 * @throws Will throw if key is empty
 */
declare const readFile: <Schema, const TQuery extends Query<Schema, DirectusFile<Schema>>>(key: DirectusFile<Schema>['id'], query?: TQuery) => RestCommand<ReadFileOutput<Schema, TQuery>, Schema>;

type ReadFlowOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusFlow<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * List all flows that exist in Directus.
 * @param query The query parameters
 * @returns An array of up to limit flow objects. If no items are available, data will be an empty array.
 */
declare const readFlows: <Schema, const TQuery extends Query<Schema, DirectusFlow<Schema>>>(query?: TQuery) => RestCommand<ReadFlowOutput<Schema, TQuery>[], Schema>;
/**
 * List an existing flow by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 * @returns Returns the requested flow object.
 * @throws Will throw if key is empty
 */
declare const readFlow: <Schema, const TQuery extends Query<Schema, DirectusFlow<Schema>>>(key: DirectusFlow<Schema>['id'], query?: TQuery) => RestCommand<ReadFlowOutput<Schema, TQuery>, Schema>;

type ReadFolderOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusFolder<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * List all folders that exist in Directus.
 * @param query The query parameters
 * @returns An array of up to limit folder objects. If no items are available, data will be an empty array.
 */
declare const readFolders: <Schema, const TQuery extends Query<Schema, DirectusFolder<Schema>>>(query?: TQuery) => RestCommand<ReadFolderOutput<Schema, TQuery>[], Schema>;
/**
 * List an existing folder by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 * @returns Returns a folder object if a valid primary key was provided.
 * @throws Will throw if key is empty
 */
declare const readFolder: <Schema, const TQuery extends Query<Schema, DirectusFolder<Schema>>>(key: DirectusFolder<Schema>['id'], query?: TQuery) => RestCommand<ReadFolderOutput<Schema, TQuery>, Schema>;

type ReadItemOutput<Schema, Collection extends RegularCollections<Schema>, TQuery extends Query<Schema, CollectionType<Schema, Collection>>> = ApplyQueryFields<Schema, CollectionType<Schema, Collection>, TQuery['fields']>;
/**
 * List all items that exist in Directus.
 *
 * @param collection The collection of the items
 * @param query The query parameters
 *
 * @returns An array of up to limit item objects. If no items are available, data will be an empty array.
 * @throws Will throw if collection is a core collection
 * @throws Will throw if collection is empty
 */
declare const readItems: <Schema, Collection extends RegularCollections<Schema>, const TQuery extends Query<Schema, CollectionType<Schema, Collection>>>(collection: Collection, query?: TQuery) => RestCommand<ReadItemOutput<Schema, Collection, TQuery>[], Schema>;
/**
 * Get an item that exists in Directus.
 *
 * @param collection The collection of the item
 * @param key The primary key of the item
 * @param query The query parameters
 *
 * @returns Returns an item object if a valid primary key was provided.
 * @throws Will throw if collection is a core collection
 * @throws Will throw if collection is empty
 * @throws Will throw if key is empty
 */
declare const readItem: <Schema, Collection extends RegularCollections<Schema>, const TQuery extends QueryItem<Schema, CollectionType<Schema, Collection>>>(collection: Collection, key: string | number, query?: TQuery) => RestCommand<ReadItemOutput<Schema, Collection, TQuery>, Schema>;

type ReadNotificationOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusNotification<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * List all notifications that exist in Directus.
 * @param query The query parameters
 * @returns An array of up to limit notification objects. If no items are available, data will be an empty array.
 */
declare const readNotifications: <Schema, const TQuery extends Query<Schema, DirectusNotification<Schema>>>(query?: TQuery) => RestCommand<ReadNotificationOutput<Schema, TQuery>[], Schema>;
/**
 * List an existing notification by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 * @returns Returns the requested notification object.
 * @throws Will throw if key is empty
 */
declare const readNotification: <Schema, const TQuery extends Query<Schema, DirectusNotification<Schema>>>(key: DirectusNotification<Schema>['id'], query?: TQuery) => RestCommand<ReadNotificationOutput<Schema, TQuery>, Schema>;

type ReadOperationOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusOperation<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * List all operations that exist in Directus.
 * @param query The query parameters
 * @returns An array of up to limit operation objects. If no items are available, data will be an empty array.
 */
declare const readOperations: <Schema, const TQuery extends Query<Schema, DirectusOperation<Schema>>>(query?: TQuery) => RestCommand<ReadOperationOutput<Schema, TQuery>[], Schema>;
/**
 * List all Operations that exist in Directus.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 * @returns Returns a Operation object if a valid primary key was provided.
 * @throws Will throw if key is empty
 */
declare const readOperation: <Schema, const TQuery extends Query<Schema, DirectusOperation<Schema>>>(key: DirectusOperation<Schema>['id'], query?: TQuery) => RestCommand<ReadOperationOutput<Schema, TQuery>, Schema>;

type ReadPanelOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusPanel<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * List all Panels that exist in Directus.
 * @param query The query parameters
 * @returns An array of up to limit panel objects. If no items are available, data will be an empty array.
 */
declare const readPanels: <Schema, const TQuery extends Query<Schema, DirectusPanel<Schema>>>(query?: TQuery) => RestCommand<ReadPanelOutput<Schema, TQuery>[], Schema>;
/**
 * List an existing panel by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 * @returns Returns the requested panel object.
 * @throws Will throw if key is empty
 */
declare const readPanel: <Schema, const TQuery extends Query<Schema, DirectusPanel<Schema>>>(key: DirectusPanel<Schema>['id'], query?: TQuery) => RestCommand<ReadPanelOutput<Schema, TQuery>, Schema>;

type ReadPermissionOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusPermission<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
type ReadItemPermissionsOutput = {
    update: {
        access: boolean;
        presets?: Record<string, any> | null;
        fields?: string[] | null;
    };
    delete: {
        access: boolean;
    };
    share: {
        access: boolean;
    };
};
/**
 * List all Permissions that exist in Directus.
 * @param query The query parameters
 * @returns An array of up to limit Permission objects. If no items are available, data will be an empty array.
 */
declare const readPermissions: <Schema, const TQuery extends Query<Schema, DirectusPermission<Schema>>>(query?: TQuery) => RestCommand<ReadPermissionOutput<Schema, TQuery>[], Schema>;
/**
 * List all Permissions that exist in Directus.
 * @param key The primary key of the permission
 * @param query The query parameters
 * @returns Returns a Permission object if a valid primary key was provided.
 * @throws Will throw if key is empty
 */
declare const readPermission: <Schema, const TQuery extends Query<Schema, DirectusPermission<Schema>>>(key: DirectusPermission<Schema>['id'], query?: TQuery) => RestCommand<ReadPermissionOutput<Schema, TQuery>, Schema>;
/**
 * Check the current user's permissions on a specific item.
 * @param collection The collection of the item
 * @param key The primary key of the item
 * @returns Returns a ItemPermissions object if a valid collection / primary key was provided.
 */
declare const readItemPermissions: <Schema, Collection extends AllCollections<Schema>>(collection: Collection, key?: string | number) => RestCommand<ReadItemPermissionsOutput, Schema>;

type ReadPresetOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusPreset<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * List all Presets that exist in Directus.
 * @param query The query parameters
 * @returns An array of up to limit Preset objects. If no items are available, data will be an empty array.
 */
declare const readPresets: <Schema, const TQuery extends Query<Schema, DirectusPreset<Schema>>>(query?: TQuery) => RestCommand<ReadPresetOutput<Schema, TQuery>[], Schema>;
/**
 * List an existing preset by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 * @returns Returns a Preset object if a valid primary key was provided.
 * @throws Will throw if key is empty
 */
declare const readPreset: <Schema, const TQuery extends Query<Schema, DirectusPreset<Schema>>>(key: DirectusPreset<Schema>['id'], query?: TQuery) => RestCommand<ReadPresetOutput<Schema, TQuery>, Schema>;

type ReadRelationOutput<Schema, Item extends object = DirectusRelation<Schema>> = ApplyQueryFields<Schema, Item, '*'>;
/**
 * List all Relations that exist in Directus.
 * @param query The query parameters
 * @returns An array of up to limit Relation objects. If no items are available, data will be an empty array.
 */
declare const readRelations: <Schema>() => RestCommand<ReadRelationOutput<Schema>[], Schema>;
/**
 * List an existing Relation by primary key.
 * @param collection The collection
 * @returns Returns a Relation object if a valid primary key was provided.
 * @throws Will throw if collection is empty
 */
declare const readRelationByCollection: <Schema>(collection: DirectusRelation<Schema>['collection']) => RestCommand<ReadRelationOutput<Schema>, Schema>;
/**
 * List an existing Relation by primary key.
 * @param collection The collection
 * @param field The field
 * @returns Returns a Relation object if a valid primary key was provided.
 * @throws Will throw if collection is empty
 * @throws Will throw if field is empty
 */
declare const readRelation: <Schema, const TQuery extends Query<Schema, DirectusRelation<Schema>>>(collection: DirectusRelation<Schema>['collection'], field: DirectusRelation<Schema>['field']) => RestCommand<ReadRelationOutput<Schema, TQuery>, Schema>;

type ReadRevisionOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusRevision<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * List all Revisions that exist in Directus.
 * @param query The query parameters
 * @returns An array of up to limit Revision objects. If no items are available, data will be an empty array.
 */
declare const readRevisions: <Schema, const TQuery extends Query<Schema, DirectusRevision<Schema>>>(query?: TQuery) => RestCommand<ReadRevisionOutput<Schema, TQuery>[], Schema>;
/**
 * List an existing Revision by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 * @returns Returns a Revision object if a valid primary key was provided.
 * @throws Will throw if key is empty
 */
declare const readRevision: <Schema, const TQuery extends Query<Schema, DirectusRevision<Schema>>>(key: DirectusRevision<Schema>['id'], query?: TQuery) => RestCommand<ReadRevisionOutput<Schema, TQuery>, Schema>;

type ReadRoleOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusRole<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * List all Roles that exist in Directus.
 * @param query The query parameters
 * @returns An array of up to limit Role objects. If no items are available, data will be an empty array.
 */
declare const readRoles: <Schema, const TQuery extends Query<Schema, DirectusRole<Schema>>>(query?: TQuery) => RestCommand<ReadRoleOutput<Schema, TQuery>[], Schema>;
/**
 * List an existing Role by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 * @returns Returns a Role object if a valid primary key was provided.
 * @throws Will throw if key is empty
 */
declare const readRole: <Schema, const TQuery extends Query<Schema, DirectusRole<Schema>>>(key: DirectusRole<Schema>['id'], query?: TQuery) => RestCommand<ReadRoleOutput<Schema, TQuery>, Schema>;

type ReadSettingOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusSettings<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Retrieve Settings.
 *
 * @param query The query parameters
 *
 * @returns Returns the settings object.
 */
declare const readSettings: <Schema, const TQuery extends Query<Schema, DirectusSettings<Schema>>>(query?: TQuery) => RestCommand<ReadSettingOutput<Schema, TQuery>, Schema>;

type ReadShareOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusShare<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * List all Shares that exist in Directus.
 * @param query The query parameters
 * @returns An array of up to limit Share objects. If no items are available, data will be an empty array.
 */
declare const readShares: <Schema, const TQuery extends Query<Schema, DirectusShare<Schema>>>(query?: TQuery) => RestCommand<ReadShareOutput<Schema, TQuery>[], Schema>;
/**
 * List an existing Share by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 * @returns Returns a Share object if a valid primary key was provided.
 * @throws Will throw if key is empty
 */
declare const readShare: <Schema, TQuery extends Query<Schema, DirectusShare<Schema>>>(key: DirectusShare<Schema>['id'], query?: TQuery) => RestCommand<ReadShareOutput<Schema, TQuery>, Schema>;

type ReadSingletonOutput<Schema, Collection extends SingletonCollections<Schema>, TQuery extends Query<Schema, Schema[Collection]>> = ApplyQueryFields<Schema, CollectionType<Schema, Collection>, TQuery['fields']>;
/**
 * List the singleton item in Directus.
 *
 * @param collection The collection of the items
 * @param query The query parameters
 *
 * @returns An array of up to limit item objects. If no items are available, data will be an empty array.
 * @throws Will throw if collection is a core collection
 * @throws Will throw if collection is empty
 */
declare const readSingleton: <Schema, Collection extends SingletonCollections<Schema>, const TQuery extends QueryItem<Schema, Schema[Collection]>>(collection: Collection, query?: TQuery) => RestCommand<ReadSingletonOutput<Schema, Collection, TQuery>, Schema>;

type ReadTranslationOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusTranslation<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * List all Translations that exist in Directus.
 * @param query The query parameters
 * @returns An array of up to limit Translation objects. If no items are available, data will be an empty array.
 */
declare const readTranslations: <Schema, const TQuery extends Query<Schema, DirectusTranslation<Schema>>>(query?: TQuery) => RestCommand<ReadTranslationOutput<Schema, TQuery>[], Schema>;
/**
 * List an existing Translation by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 * @returns Returns a Translation object if a valid primary key was provided.
 * @throws Will throw if key is empty
 */
declare const readTranslation: <Schema, const TQuery extends Query<Schema, DirectusTranslation<Schema>>>(key: DirectusTranslation<Schema>['id'], query?: TQuery) => RestCommand<ReadTranslationOutput<Schema, TQuery>, Schema>;

type ReadUserOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusUser<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * List all users that exist in Directus.
 *
 * @param query The query parameters
 *
 * @returns An array of up to limit user objects. If no items are available, data will be an empty array.
 */
declare const readUsers: <Schema, const TQuery extends Query<Schema, DirectusUser<Schema>>>(query?: TQuery) => RestCommand<ReadUserOutput<Schema, TQuery>[], Schema>;
/**
 * List an existing user by primary key.
 *
 * @param key The primary key of the user
 * @param query The query parameters
 *
 * @returns Returns the requested user object.
 * @throws Will throw if key is empty
 */
declare const readUser: <Schema, const TQuery extends Query<Schema, DirectusUser<Schema>>>(key: DirectusUser<Schema>['id'], query?: TQuery) => RestCommand<ReadUserOutput<Schema, TQuery>, Schema>;
/**
 * Retrieve the currently authenticated user.
 *
 * @param query The query parameters
 *
 * @returns Returns the user object for the currently authenticated user.
 */
declare const readMe: <Schema, const TQuery extends Query<Schema, DirectusUser<Schema>>>(query?: TQuery) => RestCommand<ReadUserOutput<Schema, TQuery>, Schema>;

type ReadContentVersionOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusVersion<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * List all Content Versions that exist in Directus.
 * @param query The query parameters
 * @returns An array of up to limit Content Version objects. If no items are available, data will be an empty array.
 */
declare const readContentVersions: <Schema, const TQuery extends Query<Schema, DirectusVersion<Schema>>>(query?: TQuery) => RestCommand<ReadContentVersionOutput<Schema, TQuery>[], Schema>;
/**
 * List an existing COntent Version by primary key.
 * @param key The primary key of the Content Version
 * @param query The query parameters
 * @returns Returns a Content Version object if a valid primary key was provided.
 * @throws Will throw if key is empty
 */
declare const readContentVersion: <Schema, const TQuery extends Query<Schema, DirectusVersion<Schema>>>(key: DirectusVersion<Schema>['id'], query?: TQuery) => RestCommand<ReadContentVersionOutput<Schema, TQuery>, Schema>;

type ReadWebhookOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusWebhook<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * List all Webhooks that exist in Directus.
 * @param query The query parameters
 * @returns An array of up to limit Webhook objects. If no items are available, data will be an empty array.
 */
declare const readWebhooks: <Schema, const TQuery extends Query<Schema, DirectusWebhook<Schema>>>(query?: TQuery) => RestCommand<ReadWebhookOutput<Schema, TQuery>[], Schema>;
/**
 * List an existing Webhook by primary key.
 * @param key The primary key of the dashboard
 * @param query The query parameters
 * @returns Returns a Webhook object if a valid primary key was provided.
 * @throws Will throw if key is empty
 */
declare const readWebhook: <Schema, const TQuery extends Query<Schema, DirectusWebhook<Schema>>>(key: DirectusWebhook<Schema>['id'], query?: TQuery) => RestCommand<ReadWebhookOutput<Schema, TQuery>, Schema>;

type SchemaSnapshotOutput = {
    version: number;
    directus: string;
    vendor: string;
    collections: Record<string, any>[];
    fields: Record<string, any>[];
    relations: Record<string, any>[];
};
/**
 * Retrieve the current schema. This endpoint is only available to admin users.
 * @returns Returns the JSON object containing schema details.
 */
declare const schemaSnapshot: <Schema>() => RestCommand<SchemaSnapshotOutput, Schema>;

type SchemaDiffOutput = {
    hash: string;
    diff: Record<string, any>;
};
/**
 * Compare the current instance's schema against the schema snapshot in JSON request body and retrieve the difference. This endpoint is only available to admin users.
 * @param snapshot JSON object containing collections, fields, and relations to apply.
 * @param force Bypass version and database vendor restrictions.
 * @returns Returns the differences between the current instance's schema and the schema passed in the request body.
 */
declare const schemaDiff: <Schema>(snapshot: SchemaSnapshotOutput, force?: boolean) => RestCommand<SchemaDiffOutput, Schema>;

/**
 * Update the instance's schema by passing the diff previously retrieved via /schema/diff endpoint in the request body. This endpoint is only available to admin users.
 * @param diff JSON object containing hash and diffs of collections, fields, and relations to apply.
 * @returns Empty body.
 */
declare const schemaApply: <Schema>(diff: SchemaDiffOutput) => RestCommand<void, Schema>;

/**
 * Retrieve the GraphQL SDL for the current project.
 * @returns GraphQL SDL.
 */
declare const readGraphqlSdl: <Schema>(scope?: 'item' | 'system') => RestCommand<string, Schema>;

type ServerHealthOutput = {
    status: 'ok' | 'warn' | 'error';
    releaseId?: string;
    serviceId?: string;
    checks?: {
        [name: string]: Record<string, any>[];
    };
};
/**
 * Get the current health status of the server.
 * @returns The current health status of the server.
 */
declare const serverHealth: <Schema>() => RestCommand<ServerHealthOutput, Schema>;

type ServerInfoOutput = {
    project: {
        project_name: string;
        default_language: string;
    };
    rateLimit?: {
        points: number;
        duration: number;
    } | false;
    rateLimitGlobal?: {
        points: number;
        duration: number;
    } | false;
    queryLimit?: {
        default: number;
        max: number;
    };
    websocket?: {
        rest: {
            authentication: WebSocketAuthModes;
            path: string;
        } | false;
        graphql: {
            authentication: WebSocketAuthModes;
            path: string;
        } | false;
        heartbeat: number | false;
    } | false;
};
/**
 * Get information about the current installation.
 * @returns Information about the current installation.
 */
declare const serverInfo: <Schema>() => RestCommand<ServerInfoOutput, Schema>;

type OpenApiSpecOutput = Record<string, any>;
/**
 * Retrieve the OpenAPI spec for the current project.
 * @returns Object conforming to the OpenAPI Specification
 */
declare const readOpenApiSpec: <Schema>() => RestCommand<OpenApiSpecOutput, Schema>;

/**
 * Ping... pong! 🏓
 * @returns Pong
 */
declare const serverPing: <Schema>() => RestCommand<string, Schema>;

type UpdateActivityOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusActivity<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Updates an existing comment by activity action primary key.
 * @param key
 * @param item
 * @param query
 * @returns Returns the activity object of the created comment.
 * @throws Will throw if key is empty
 */
declare const updateComment: <Schema, const TQuery extends Query<Schema, DirectusActivity<Schema>>>(key: DirectusActivity<Schema>['id'], item: Partial<DirectusActivity<Schema>>, query?: TQuery) => RestCommand<UpdateActivityOutput<Schema, TQuery>, Schema>;

type UpdateCollectionOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusCollection<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update the metadata for an existing collection.
 * @param collection
 * @param item
 * @param query
 * @returns The collection object for the updated collection in this request.
 * @throws Will throw if collection is empty
 */
declare const updateCollection: <Schema, const TQuery extends Query<Schema, DirectusCollection<Schema>>>(collection: DirectusCollection<Schema>['collection'], item: NestedPartial<DirectusCollection<Schema>>, query?: TQuery) => RestCommand<UpdateCollectionOutput<Schema, TQuery>, Schema>;

type UpdateDashboardOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusDashboard<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update multiple existing dashboards.
 * @param keys
 * @param item
 * @param query
 * @returns Returns the dashboard objects for the updated dashboards.
 * @throws Will throw if keys is empty
 */
declare const updateDashboards: <Schema, const TQuery extends Query<Schema, DirectusDashboard<Schema>>>(keys: DirectusDashboard<Schema>['id'][], item: Partial<DirectusDashboard<Schema>>, query?: TQuery) => RestCommand<UpdateDashboardOutput<Schema, TQuery>[], Schema>;
/**
 * Update an existing dashboard.
 * @param key
 * @param item
 * @param query
 * @returns Returns the dashboard object for the updated dashboard.
 * @throws Will throw if key is empty
 */
declare const updateDashboard: <Schema, const TQuery extends Query<Schema, DirectusDashboard<Schema>>>(key: DirectusDashboard<Schema>['id'], item: Partial<DirectusDashboard<Schema>>, query?: TQuery) => RestCommand<UpdateDashboardOutput<Schema, TQuery>, Schema>;

/**
 * Update an existing extension.
 * @param bundle - Bundle this extension is in
 * @param name - Unique name of the extension
 * @param data - Partial extension object
 * @returns Returns the extension that was updated
 */
declare const updateExtension: <Schema>(bundle: string | null, name: string, data: NestedPartial<DirectusExtension<Schema>>) => RestCommand<DirectusExtension<Schema>, Schema>;

type UpdateFieldOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusField<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Updates the given field in the given collection.
 * @param collection
 * @param field
 * @param item
 * @param query
 * @returns
 * @throws Will throw if collection is empty
 * @throws Will throw if field is empty
 */
declare const updateField: <Schema, const TQuery extends Query<Schema, DirectusField<Schema>>>(collection: DirectusField<Schema>['collection'], field: DirectusField<Schema>['field'], item: NestedPartial<DirectusField<Schema>>, query?: TQuery) => RestCommand<UpdateFieldOutput<Schema, TQuery>, Schema>;

type UpdateFileOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusFile<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update multiple files at the same time.
 * @param keys
 * @param item
 * @param query
 * @returns Returns the file objects for the updated files.
 * @throws Will throw if keys is empty
 */
declare const updateFiles: <Schema, const TQuery extends Query<Schema, DirectusFile<Schema>>>(keys: DirectusFile<Schema>['id'][], item: Partial<DirectusFile<Schema>>, query?: TQuery) => RestCommand<UpdateFileOutput<Schema, TQuery>[], Schema>;
/**
 * Update an existing file, and/or replace it's file contents.
 * @param key
 * @param item
 * @param query
 * @returns Returns the file object for the updated file.
 * @throws Will throw if key is empty
 */
declare const updateFile: <Schema, const TQuery extends Query<Schema, DirectusFile<Schema>>>(key: DirectusFile<Schema>['id'], item: Partial<DirectusFile<Schema>> | FormData, query?: TQuery) => RestCommand<UpdateFileOutput<Schema, TQuery>, Schema>;

type UpdateFlowOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusFlow<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update multiple existing flows.
 * @param keys
 * @param item
 * @param query
 * @returns Returns the flow objects for the updated flows.
 * @throws Will throw if keys is empty
 */
declare const updateFlows: <Schema, const TQuery extends Query<Schema, DirectusFlow<Schema>>>(keys: DirectusFlow<Schema>['id'][], item: Partial<DirectusFlow<Schema>>, query?: TQuery) => RestCommand<UpdateFlowOutput<Schema, TQuery>[], Schema>;
/**
 * Update an existing flow.
 * @param key
 * @param item
 * @param query
 * @returns Returns the flow object for the updated flow.
 * @throws Will throw if key is empty
 */
declare const updateFlow: <Schema, const TQuery extends Query<Schema, DirectusFlow<Schema>>>(key: DirectusFlow<Schema>['id'], item: Partial<DirectusFlow<Schema>>, query?: TQuery) => RestCommand<UpdateFlowOutput<Schema, TQuery>, Schema>;

type UpdateFolderOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusFolder<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update multiple existing folders.
 * @param keys
 * @param item
 * @param query
 * @returns Returns the folder objects of the folders that were updated.
 * @throws Will throw if keys is empty
 */
declare const updateFolders: <Schema, const TQuery extends Query<Schema, DirectusFolder<Schema>>>(keys: DirectusFolder<Schema>['id'][], item: Partial<DirectusFolder<Schema>>, query?: TQuery) => RestCommand<UpdateFolderOutput<Schema, TQuery>[], Schema>;
/**
 * Update an existing folder.
 * @param key
 * @param item
 * @param query
 * @returns Returns the folder object of the folder that was updated.
 * @throws Will throw if key is empty
 */
declare const updateFolder: <Schema, const TQuery extends Query<Schema, DirectusFolder<Schema>>>(key: DirectusFolder<Schema>['id'], item: Partial<DirectusFolder<Schema>>, query?: TQuery) => RestCommand<UpdateFolderOutput<Schema, TQuery>, Schema>;

type UpdateItemOutput<Schema, Collection extends keyof Schema, TQuery extends Query<Schema, Schema[Collection]>> = ApplyQueryFields<Schema, CollectionType<Schema, Collection>, TQuery['fields']>;
/**
 * Update multiple items at the same time.
 *
 * @param collection The collection of the items
 * @param keysOrQuery The primary keys or a query
 * @param item The item data to update
 * @param query Optional return data query
 *
 * @returns Returns the item objects for the updated items.
 * @throws Will throw if keysOrQuery is empty
 * @throws Will throw if collection is empty
 * @throws Will throw if collection is a core collection
 */
declare const updateItems: <Schema, Collection extends keyof Schema, const TQuery extends Query<Schema, Schema[Collection]>>(collection: Collection, keysOrQuery: string[] | number[] | Query<Schema, Schema[Collection]>, item: Partial<UnpackList<Schema[Collection]>>, query?: TQuery) => RestCommand<UpdateItemOutput<Schema, Collection, TQuery>[], Schema>;
/**
 * Update an existing item.
 *
 * @param collection The collection of the item
 * @param key The primary key of the item
 * @param item The item data to update
 * @param query Optional return data query
 *
 * @returns Returns the item object of the item that was updated.
 * @throws Will throw if key is empty
 * @throws Will throw if collection is empty
 * @throws Will throw if collection is a core collection
 */
declare const updateItem: <Schema, Collection extends keyof Schema, const TQuery extends Query<Schema, Schema[Collection]>, Item = UnpackList<Schema[Collection]>>(collection: Collection, key: string | number, item: Partial<Item>, query?: TQuery) => RestCommand<UpdateItemOutput<Schema, Collection, TQuery>, Schema>;

type UpdateNotificationOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusNotification<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update multiple existing notifications.
 * @param keys
 * @param item
 * @param query
 * @returns Returns the notification objects for the updated notifications.
 * @throws Will throw if keys is empty
 */
declare const updateNotifications: <Schema, const TQuery extends Query<Schema, DirectusNotification<Schema>>>(keys: DirectusNotification<Schema>['id'][], item: Partial<DirectusNotification<Schema>>, query?: TQuery) => RestCommand<UpdateNotificationOutput<Schema, TQuery>[], Schema>;
/**
 * Update an existing notification.
 * @param key
 * @param item
 * @param query
 * @returns Returns the notification object for the updated notification.
 * @throws Will throw if key is empty
 */
declare const updateNotification: <Schema, const TQuery extends Query<Schema, DirectusNotification<Schema>>>(key: DirectusNotification<Schema>['id'], item: Partial<DirectusNotification<Schema>>, query?: TQuery) => RestCommand<UpdateNotificationOutput<Schema, TQuery>, Schema>;

type UpdateOperationOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusOperation<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update multiple existing operations.
 * @param keys
 * @param item
 * @param query
 * @returns Returns the operation objects for the updated operations.
 * @throws Will throw if keys is empty
 */
declare const updateOperations: <Schema, const TQuery extends Query<Schema, DirectusOperation<Schema>>>(keys: DirectusOperation<Schema>['id'][], item: Partial<DirectusOperation<Schema>>, query?: TQuery) => RestCommand<UpdateOperationOutput<Schema, TQuery>[], Schema>;
/**
 * Update an existing operation.
 * @param key
 * @param item
 * @param query
 * @returns Returns the operation object for the updated operation.
 * @throws Will throw if key is empty
 */
declare const updateOperation: <Schema, const TQuery extends Query<Schema, DirectusOperation<Schema>>>(key: DirectusOperation<Schema>['id'], item: Partial<DirectusOperation<Schema>>, query?: TQuery) => RestCommand<UpdateOperationOutput<Schema, TQuery>, Schema>;

type UpdatePanelOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusPanel<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update multiple existing panels.
 * @param keys
 * @param item
 * @param query
 * @returns Returns the panel objects for the updated panels.
 * @throws Will throw if keys is empty
 */
declare const updatePanels: <Schema, const TQuery extends Query<Schema, DirectusPanel<Schema>>>(keys: DirectusPanel<Schema>['id'][], item: Partial<DirectusPanel<Schema>>, query?: TQuery) => RestCommand<UpdatePanelOutput<Schema, TQuery>[], Schema>;
/**
 * Update an existing panel.
 * @param key
 * @param item
 * @param query
 * @returns Returns the panel object for the updated panel.
 * @throws Will throw if key is empty
 */
declare const updatePanel: <Schema, const TQuery extends Query<Schema, DirectusPanel<Schema>>>(key: DirectusPanel<Schema>['id'], item: Partial<DirectusPanel<Schema>>, query?: TQuery) => RestCommand<UpdatePanelOutput<Schema, TQuery>, Schema>;

type UpdatePermissionOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusPermission<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update multiple existing permissions rules.
 * @param keys
 * @param item
 * @param query
 * @returns Returns the permission object for the updated permissions.
 * @throws Will throw if keys is empty
 */
declare const updatePermissions: <Schema, const TQuery extends Query<Schema, DirectusPermission<Schema>>>(keys: DirectusPermission<Schema>['id'][], item: Partial<DirectusPermission<Schema>>, query?: TQuery) => RestCommand<UpdatePermissionOutput<Schema, TQuery>[], Schema>;
/**
 * Update an existing permissions rule.
 * @param key
 * @param item
 * @param query
 * @returns Returns the permission object for the updated permission.
 * @throws Will throw if key is empty
 */
declare const updatePermission: <Schema, const TQuery extends Query<Schema, DirectusPermission<Schema>>>(key: DirectusPermission<Schema>['id'], item: Partial<DirectusPermission<Schema>>, query?: TQuery) => RestCommand<UpdatePermissionOutput<Schema, TQuery>, Schema>;

type UpdatePresetOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusPreset<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update multiple existing presets.
 * @param keys
 * @param item
 * @param query
 * @returns Returns the preset objects for the updated presets.
 * @throws Will throw if keys is empty
 */
declare const updatePresets: <Schema, const TQuery extends Query<Schema, DirectusPreset<Schema>>>(keys: DirectusPreset<Schema>['id'][], item: Partial<DirectusPreset<Schema>>, query?: TQuery) => RestCommand<UpdatePresetOutput<Schema, TQuery>[], Schema>;
/**
 * Update an existing preset.
 * @param key
 * @param item
 * @param query
 * @returns Returns the preset object for the updated preset.
 * @throws Will throw if key is empty
 */
declare const updatePreset: <Schema, const TQuery extends Query<Schema, DirectusPreset<Schema>>>(key: DirectusPreset<Schema>['id'], item: Partial<DirectusPreset<Schema>>, query?: TQuery) => RestCommand<UpdatePresetOutput<Schema, TQuery>, Schema>;

type UpdateRelationOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusRelation<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update an existing relation.
 * @param collection
 * @param field
 * @param item
 * @param query
 * @returns Returns the relation object for the created relation.
 */
declare const updateRelation: <Schema, const TQuery extends Query<Schema, DirectusRelation<Schema>>>(collection: DirectusRelation<Schema>['collection'], field: DirectusRelation<Schema>['field'], item: NestedPartial<DirectusRelation<Schema>>, query?: TQuery) => RestCommand<UpdateRelationOutput<Schema, TQuery>, Schema>;

type UpdateRoleOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusRole<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update multiple existing roles.
 * @param keys
 * @param item
 * @param query
 * @returns Returns the role objects for the updated roles.
 * @throws Will throw if keys is empty
 */
declare const updateRoles: <Schema, const TQuery extends Query<Schema, DirectusRole<Schema>>>(keys: DirectusRole<Schema>['id'][], item: Partial<DirectusRole<Schema>>, query?: TQuery) => RestCommand<UpdateRoleOutput<Schema, TQuery>[], Schema>;
/**
 * Update an existing role.
 * @param key
 * @param item
 * @param query
 * @returns Returns the role object for the updated role.
 * @throws Will throw if key is empty
 */
declare const updateRole: <Schema, const TQuery extends Query<Schema, DirectusRole<Schema>>>(key: DirectusRole<Schema>['id'], item: Partial<DirectusRole<Schema>>, query?: TQuery) => RestCommand<UpdateRoleOutput<Schema, TQuery>, Schema>;

type UpdateSettingOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusSettings<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update Settings
 * @param item
 * @param query
 * @returns Returns the settings object.
 */
declare const updateSettings: <Schema, const TQuery extends Query<Schema, DirectusSettings<Schema>>>(item: Partial<DirectusSettings<Schema>>, query?: TQuery) => RestCommand<UpdateSettingOutput<Schema, TQuery>[], Schema>;

type UpdateShareOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusShare<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update multiple existing shares.
 * @param keys
 * @param item
 * @param query
 * @returns Returns the share objects for the updated shares.
 * @throws Will throw if keys is empty
 */
declare const updateShares: <Schema, const TQuery extends Query<Schema, DirectusShare<Schema>>>(keys: DirectusShare<Schema>['id'][], item: Partial<DirectusShare<Schema>>, query?: TQuery) => RestCommand<UpdateShareOutput<Schema, TQuery>[], Schema>;
/**
 * Update an existing share.
 * @param key
 * @param item
 * @param query
 * @returns Returns the share object for the updated share.
 * @throws Will throw if key is empty
 */
declare const updateShare: <Schema, const TQuery extends Query<Schema, DirectusShare<Schema>>>(key: DirectusShare<Schema>['id'], item: Partial<DirectusShare<Schema>>, query?: TQuery) => RestCommand<UpdateShareOutput<Schema, TQuery>, Schema>;

type UpdateSingletonOutput<Schema, Collection extends SingletonCollections<Schema>, TQuery extends Query<Schema, Schema[Collection]>> = ApplyQueryFields<Schema, CollectionType<Schema, Collection>, TQuery['fields']>;
/**
 * Update a singleton item
 *
 * @param collection The collection of the items
 * @param query The query parameters
 *
 * @returns An array of up to limit item objects. If no items are available, data will be an empty array.
 * @throws Will throw if collection is a core collection
 * @throws Will throw if collection is empty
 */
declare const updateSingleton: <Schema, Collection extends SingletonCollections<Schema>, const TQuery extends Query<Schema, Schema[Collection]>, Item = Schema[Collection]>(collection: Collection, item: Partial<Item>, query?: TQuery) => RestCommand<UpdateSingletonOutput<Schema, Collection, TQuery>, Schema>;

type UpdateTranslationOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusTranslation<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update multiple existing translations.
 * @param keys
 * @param item
 * @param query
 * @returns Returns the translation objects for the updated translations.
 * @throws Will throw if keys is empty
 */
declare const updateTranslations: <Schema, const TQuery extends Query<Schema, DirectusTranslation<Schema>>>(keys: DirectusTranslation<Schema>['id'][], item: Partial<DirectusTranslation<Schema>>, query?: TQuery) => RestCommand<UpdateTranslationOutput<Schema, TQuery>[], Schema>;
/**
 * Update an existing translation.
 * @param key
 * @param item
 * @param query
 * @returns Returns the translation object for the updated translation.
 * @throws Will throw if key is empty
 */
declare const updateTranslation: <Schema, const TQuery extends Query<Schema, DirectusTranslation<Schema>>>(key: DirectusTranslation<Schema>['id'], item: Partial<DirectusTranslation<Schema>>, query?: TQuery) => RestCommand<UpdateTranslationOutput<Schema, TQuery>, Schema>;

type UpdateUserOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusUser<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update multiple existing users.
 *
 * @param keys The primary key of the users
 * @param item The user data to update
 * @param query Optional return data query
 *
 * @returns Returns the user objects for the updated users.
 * @throws Will throw if keys is empty
 */
declare const updateUsers: <Schema, const TQuery extends Query<Schema, DirectusUser<Schema>>>(keys: DirectusUser<Schema>['id'][], item: Partial<DirectusUser<Schema>>, query?: TQuery) => RestCommand<UpdateUserOutput<Schema, TQuery>[], Schema>;
/**
 * Update an existing user.
 *
 * @param key The primary key of the user
 * @param item The user data to update
 * @param query Optional return data query
 *
 * @returns Returns the user object for the updated user.
 * @throws Will throw if key is empty
 */
declare const updateUser: <Schema, const TQuery extends Query<Schema, DirectusUser<Schema>>>(key: DirectusUser<Schema>['id'], item: Partial<DirectusUser<Schema>>, query?: TQuery) => RestCommand<UpdateUserOutput<Schema, TQuery>, Schema>;
/**
 * Update the authenticated user.
 *
 * @param item The user data to update
 * @param query Optional return data query
 *
 * @returns Returns the updated user object for the authenticated user.
 */
declare const updateMe: <Schema, const TQuery extends Query<Schema, DirectusUser<Schema>>>(item: Partial<DirectusUser<Schema>>, query?: TQuery) => RestCommand<UpdateUserOutput<Schema, TQuery>, Schema>;

type UpdateContentVersionOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusVersion<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update multiple existing Content Versions.
 * @param keys
 * @param item
 * @param query
 * @returns Returns the Content Version objects for the updated Content Versions.
 * @throws Will throw if keys is empty
 */
declare const updateContentVersions: <Schema, const TQuery extends Query<Schema, DirectusVersion<Schema>>>(keys: DirectusVersion<Schema>['id'][], item: Partial<DirectusVersion<Schema>>, query?: TQuery) => RestCommand<UpdateContentVersionOutput<Schema, TQuery>[], Schema>;
/**
 * Update an existing Content Version.
 * @param key
 * @param item
 * @param query
 * @returns Returns the Content Version object for the updated Content Version.
 * @throws Will throw if key is empty
 */
declare const updateContentVersion: <Schema, const TQuery extends Query<Schema, DirectusVersion<Schema>>>(key: DirectusVersion<Schema>['id'], item: Partial<DirectusVersion<Schema>>, query?: TQuery) => RestCommand<UpdateContentVersionOutput<Schema, TQuery>, Schema>;

type UpdateWebhookOutput<Schema, TQuery extends Query<Schema, Item>, Item extends object = DirectusWebhook<Schema>> = ApplyQueryFields<Schema, Item, TQuery['fields']>;
/**
 * Update multiple existing webhooks.
 * @param keys
 * @param item
 * @param query
 * @returns Returns the webhook objects for the updated webhooks.
 * @throws Will throw if keys is empty
 */
declare const updateWebhooks: <Schema, const TQuery extends Query<Schema, DirectusWebhook<Schema>>>(keys: DirectusWebhook<Schema>['id'][], item: Partial<DirectusWebhook<Schema>>, query?: TQuery) => RestCommand<UpdateWebhookOutput<Schema, TQuery>[], Schema>;
/**
 * Update an existing webhook.
 * @param key
 * @param item
 * @param query
 * @returns Returns the webhook object for the updated webhook.
 * @throws Will throw if key is empty
 */
declare const updateWebhook: <Schema, const TQuery extends Query<Schema, DirectusWebhook<Schema>>>(key: DirectusWebhook<Schema>['id'], item: Partial<DirectusWebhook<Schema>>, query?: TQuery) => RestCommand<UpdateWebhookOutput<Schema, TQuery>, Schema>;

/**
 * Resets both the data and schema cache of Directus. This endpoint is only available to admin users.
 * @returns Nothing
 */
declare const clearCache: <Schema>() => RestCommand<void, Schema>;

type FileFormat = 'csv' | 'json' | 'xml' | 'yaml';
/**
 * Export a larger data set to a file in the File Library
 * @returns Nothing
 */
declare const utilsExport: <Schema, TQuery extends Query<Schema, Schema[Collection]>, Collection extends keyof Schema>(collection: Collection, format: FileFormat, query: TQuery, file: Partial<DirectusFile<Schema>>) => RestCommand<void, Schema>;

/**
 * Trigger a flow
 * @param method
 * @param id
 * @param data
 * @returns Result of the flow, if any.
 */
declare const triggerFlow: <Schema>(method: 'GET' | 'POST', id: string, data?: Record<string, string>) => RestCommand<unknown, Schema>;

/**
 * Generate a hash for a given string.
 * @param string String to hash.
 * @returns Hashed string.
 */
declare const generateHash: <Schema>(string: string) => RestCommand<string, Schema>;
/**
 * Verify a string with a hash.
 * @param string Source string.
 * @param hash Hash you want to verify against.
 * @returns Boolean.
 */
declare const verifyHash: <Schema>(string: string, hash: string) => RestCommand<boolean, Schema>;

/**
 * Import multiple records from a JSON or CSV file into a collection.
 * @returns Nothing
 */
declare const utilsImport: <Schema>(collection: keyof Schema, data: FormData) => RestCommand<void, Schema>;

/**
 * Trigger an operation
 * @param id
 * @param data
 * @returns Result of the flow, if any.
 */
declare const triggerOperation: <Schema>(id: string, data?: any) => RestCommand<unknown, Schema>;

/**
 * Authenticate as a share user.
 *
 * @param share The ID of the share.
 * @param password Password for the share, if one is configured.
 * @param mode Whether to retrieve the refresh token in the JSON response, or in a httpOnly cookie. One of `json`, `cookie` or `session`. Defaults to `cookie`.
 *
 * @returns Authentication data.
 */
declare const authenticateShare: <Schema>(share: string, password?: string, mode?: AuthenticationMode) => RestCommand<AuthenticationData, Schema>;
/**
 * Sends an email to the provided email addresses with a link to the share.
 *
 * @param share Primary key of the share you're inviting people to.
 * @param emails Array of email strings to send the share link to.
 *
 * @returns Nothing
 */
declare const inviteShare: <Schema>(share: string, emails: string[]) => RestCommand<void, Schema>;
/**
 * Allows unauthenticated users to retrieve information about the share.
 *
 * @param id Primary key of the share you're viewing.
 *
 * @returns The share objects for the given UUID, if it's still valid.
 */
declare const readShareInfo: <Schema>(id: string) => RestCommand<{
    id: string;
    collection: string;
    item: string;
    password: string | null;
    date_start: string | null;
    date_end: string | null;
    times_used: number | null;
    max_uses: number | null;
}, Schema>;

/**
 * If a collection has a sort field, this util can be used to move items in that manual order.
 * @returns Nothing
 */
declare const utilitySort: <Schema>(collection: keyof Schema, item: string, to: number) => RestCommand<void, Schema>;

/**
 * Invite a new user by email.
 *
 * @param email User email to invite.
 * @param role Role of the new user.
 * @param invite_url Provide a custom invite url which the link in the email will lead to. The invite token will be passed as a parameter.
 *
 * @returns Nothing
 */
declare const inviteUser: <Schema>(email: string, role: string, invite_url?: string) => RestCommand<void, Schema>;
/**
 * Accept your invite. The invite user endpoint sends the email a link to the Admin App.
 *
 * @param token Accept invite token.
 * @param password Password for the user.
 *
 * @returns Nothing
 */
declare const acceptUserInvite: <Schema>(token: string, password: string) => RestCommand<void, Schema>;
/**
 * Generates a secret and returns the URL to be used in an authenticator app.
 *
 * @param password The user's password.
 *
 * @returns A two-factor secret
 */
declare const generateTwoFactorSecret: <Schema>(password: string) => RestCommand<{
    secret: string;
    otpauth_url: string;
}, Schema>;
/**
 * Adds a TFA secret to the user account.
 *
 * @param secret The TFA secret from tfa/generate.
 * @param otp OTP generated with the secret, to recheck if the user has a correct TFA setup
 *
 * @returns Nothing
 */
declare const enableTwoFactor: <Schema>(secret: string, otp: string) => RestCommand<void, Schema>;
/**
 * Disables two-factor authentication by removing the OTP secret from the user.
 *
 * @param otp One-time password generated by the authenticator app.
 *
 * @returns Nothing
 */
declare const disableTwoFactor: <Schema>(otp: string) => RestCommand<void, Schema>;

/**
 * Save item changes to an existing Content Version.
 *
 * @param id Primary key of the Content Version.
 * @param item The item changes to save to the specified Content Version.
 *
 * @returns State of the item after save.
 */
declare const saveToContentVersion: <Schema, Collection extends keyof Schema, Item = UnpackList<Schema[Collection]>>(id: DirectusVersion<Schema>['id'], item: Partial<Item>) => RestCommand<Item, Schema>;
/**
 * Compare an existing Content Version with the main version of the item.
 *
 * @param id Primary key of the Content Version.
 *
 * @returns All fields with different values, along with the hash of the main version of the item and the information
whether the Content Version is outdated (i.e. main version of the item has been updated since the creation of the
Content Version)
 */
declare const compareContentVersion: <Schema, Collection extends keyof Schema, Item = UnpackList<Schema[Collection]>>(id: DirectusVersion<Schema>['id']) => RestCommand<{
    outdated: boolean;
    mainHash: string;
    current: Partial<Item>;
    main: Item;
}, Schema>;
/**
 * Promote an existing Content Version to become the new main version of the item.
 *
 * @param id Primary key of the version.
 * @param mainHash The current hash of the main version of the item (obtained from the `compare` endpoint).
 * @param fields Optional array of field names of which the values are to be promoted. By default, all fields are selected.
 *
 * @returns The primary key of the promoted item.
 */
declare const promoteContentVersion: <Schema, Collection extends keyof Schema, Item = UnpackList<Schema[Collection]>>(id: DirectusVersion<Schema>['id'], mainHash: string, fields?: (keyof UnpackList<Item>)[]) => RestCommand<string | number, Schema>;

/**
 * Creates a client to communicate with the Directus REST API.
 *
 * @returns A Directus REST client.
 */
declare const rest: (config?: Partial<RestConfig>) => <Schema>(client: DirectusClient<Schema>) => RestClient<Schema>;

/**
 * Add arbitrary options to a fetch request
 *
 * @param getOptions
 * @param onRequest
 *
 * @returns
 */
declare function withOptions<Schema, Output>(getOptions: RestCommand<Output, Schema>, extraOptions: RequestTransformer | Partial<RequestInit>): RestCommand<Output, Schema>;

declare function withSearch<Schema, Output>(getOptions: RestCommand<Output, Schema>): RestCommand<Output, Schema>;

declare function withToken<Schema, Output>(token: string, getOptions: RestCommand<Output, Schema>): RestCommand<Output, Schema>;

declare function customEndpoint<Output = unknown>(options: RequestOptions): RestCommand<Output, never>;

type ExtendedQuery<Schema, Item> = Query<Schema, Item> & {
    aggregate?: Record<keyof AggregationTypes, string>;
    groupBy?: (string | GroupByFields<Schema, Item>)[];
};
declare const formatFields: (fields: (string | Record<string, any>)[]) => string[];
/**
 * Transform nested query object to an url compatible format
 *
 * @param query The nested query object
 *
 * @returns Flat query parameters
 */
declare const queryToParams: <Schema, Item>(query: ExtendedQuery<Schema, Item>) => Record<string, string>;

/**
 *
 * @param value
 * @param message
 * @throws Throws an error if an empty array or string is provided
 */
declare const throwIfEmpty: (value: string | (string | number)[], message: string) => void;

/**
 *
 * @param value
 * @param message
 * @throws Throws an error if the collection starts with the `directus_` prefix
 */
declare const throwIfCoreCollection: (value: string | number | symbol, message: string) => void;

/**
 * @param provider Use a specific authentication provider
 * @returns The endpoint to be used for authentication
 */
declare function getAuthEndpoint(provider?: string): string;

export { type AggregateRecord, type AggregationOptions, type AggregationOutput, type AggregationTypes, type AllCollections, type ApplyManyToAnyFields, type ApplyNestedQueryFields, type ApplyQueryFields, type AssetsQuery, type AuthenticationClient, type AuthenticationConfig, type AuthenticationData, type AuthenticationMode, type AuthenticationStorage, type ClientGlobals, type ClientOptions, type CollectionMetaTranslationType, type CollectionType, type CompleteSchema, type ConnectionState, type ConsoleInterface, type CoreSchema, type CreateActivityOutput, type CreateCollectionOutput, type CreateContentVersionOutput, type CreateDashboardOutput, type CreateFieldOutput, type CreateFileOutput, type CreateFlowOutput, type CreateFolderOutput, type CreateItemOutput, type CreateNotificationOutput, type CreateOperationOutput, type CreatePanelOutput, type CreatePermissionOutput, type CreatePresetOutput, type CreateRelationOutput, type CreateRoleOutput, type CreateShareOutput, type CreateTranslationOutput, type CreateUserOutput, type CreateWebhookOutput, type DirectusActivity, type DirectusClient, type DirectusCollection, type DirectusDashboard, type DirectusExtension, type DirectusField, type DirectusFile, type DirectusFlow, type DirectusFolder, type DirectusNotification, type DirectusOperation, type DirectusPanel, type DirectusPermission, type DirectusPreset, type DirectusRelation, type DirectusRevision, type DirectusRole, type DirectusSettings, type DirectusShare, type DirectusTranslation, type DirectusUser, type DirectusVersion, type DirectusWebhook, type EmailAuth, type ExtensionSchema, type ExtensionTypes, type ExtractItem, type ExtractRelation, type FetchInterface, type FieldMetaConditionOptionType, type FieldMetaConditionType, type FieldMetaTranslationType, type FieldOutputMap, type FieldsWildcard, type FileFormat, type FilterOperators, type GetCollection, type GetCollectionName, type GqlResult, type GqlSingletonResult, type GraphqlClient, type GraphqlConfig, type GroupByFields, type GroupingFunctions, type HasManyToAnyRelation, type HasNestedFields, type HttpMethod, type Identity, type IfAny, type IfNever, type IsAny, type IsDateTime, type IsNullable, type IsNumber, type IsString, type ItemType, type LiteralFields, type LogLevels, type LogicalFilterOperators, type LoginOptions, type ManyToAnyFields, type MapFlatFields, type Merge, type MergeCoreCollection, type MergeFields, type MergeObjects, type MergeOptional, type MergeRelationalFields, type Mutable, type NestedPartial, type NestedQueryFilter, type NestedRelationalFilter, type NeverToUnknown, type OpenApiSpecOutput, type PickFlatFields, type PickRelationalFields, type PrimitiveFields, type Query, type QueryAlias, type QueryDeep, type QueryFields, type QueryFieldsRelational, type QueryFilter, type QueryItem, type QuerySort, type ReadActivityOutput, type ReadCollectionOutput, type ReadContentVersionOutput, type ReadDashboardOutput, type ReadFieldOutput, type ReadFileOutput, type ReadFlowOutput, type ReadFolderOutput, type ReadItemOutput, type ReadItemPermissionsOutput, type ReadNotificationOutput, type ReadOperationOutput, type ReadPanelOutput, type ReadPermissionOutput, type ReadPresetOutput, type ReadProviderOutput, type ReadRelationOutput, type ReadRevisionOutput, type ReadRoleOutput, type ReadSettingOutput, type ReadShareOutput, type ReadSingletonOutput, type ReadTranslationOutput, type ReadUserOutput, type ReadWebhookOutput, type ReconnectState, type RefreshAuth, type RegularCollections, type RelationNullable, type RelationalFields, type RelationalFilterOperators, type RemoveEventHandler, type RemoveRelationships, type RequestOptions, type RequestTransformer, type ResponseTransformer, type RestClient, type RestCommand, type RestConfig, type SchemaDiffOutput, type SchemaSnapshotOutput, type ServerHealthOutput, type ServerInfoOutput, type SingletonCollections, type StaticTokenClient, type SubscribeOptions, type SubscriptionEvents, type SubscriptionOptionsEvents, type SubscriptionOutput, type SubscriptionPayload, type TokenAuth, type UnpackList, type UpdateActivityOutput, type UpdateCollectionOutput, type UpdateContentVersionOutput, type UpdateDashboardOutput, type UpdateFieldOutput, type UpdateFileOutput, type UpdateFlowOutput, type UpdateFolderOutput, type UpdateItemOutput, type UpdateNotificationOutput, type UpdateOperationOutput, type UpdatePanelOutput, type UpdatePermissionOutput, type UpdatePresetOutput, type UpdateRelationOutput, type UpdateRoleOutput, type UpdateSettingOutput, type UpdateShareOutput, type UpdateSingletonOutput, type UpdateTranslationOutput, type UpdateUserOutput, type UpdateWebhookOutput, type UrlInterface, type WebSocketAuthError, type WebSocketAuthModes, type WebSocketClient, type WebSocketConfig, type WebSocketConstructor, type WebSocketEventHandler, type WebSocketEvents, type WebSocketInterface, type WrapLogicalFilters, type WrapQueryFields, type WrapRelationalFilters, acceptUserInvite, aggregate, auth, authenticateShare, authentication, clearCache, compareContentVersion, createCollection, createComment, createContentVersion, createContentVersions, createDashboard, createDashboards, createDirectus, createField, createFlow, createFlows, createFolder, createFolders, createItem, createItems, createNotification, createNotifications, createOperation, createOperations, createPanel, createPanels, createPermission, createPermissions, createPreset, createPresets, createRelation, createRole, createRoles, createShare, createShares, createTranslation, createTranslations, createUser, createUsers, createWebhook, createWebhooks, customEndpoint, deleteCollection, deleteComment, deleteContentVersion, deleteContentVersions, deleteDashboard, deleteDashboards, deleteField, deleteFile, deleteFiles, deleteFlow, deleteFlows, deleteFolder, deleteFolders, deleteItem, deleteItems, deleteNotification, deleteNotifications, deleteOperation, deleteOperations, deletePanel, deletePanels, deletePermission, deletePermissions, deletePreset, deletePresets, deleteRelation, deleteRole, deleteRoles, deleteShare, deleteShares, deleteTranslation, deleteTranslations, deleteUser, deleteUsers, deleteWebhook, deleteWebhooks, disableTwoFactor, enableTwoFactor, formatFields, generateHash, generateTwoFactorSecret, generateUid, getAuthEndpoint, graphql, importFile, inviteShare, inviteUser, login, logout, memoryStorage, messageCallback, passwordRequest, passwordReset, pong, promoteContentVersion, queryToParams, readActivities, readActivity, readAssetArrayBuffer, readAssetBlob, readAssetRaw, readCollection, readCollections, readContentVersion, readContentVersions, readDashboard, readDashboards, readExtensions, readField, readFields, readFieldsByCollection, readFile, readFiles, readFlow, readFlows, readFolder, readFolders, readGraphqlSdl, readItem, readItemPermissions, readItems, readMe, readNotification, readNotifications, readOpenApiSpec, readOperation, readOperations, readPanel, readPanels, readPermission, readPermissions, readPreset, readPresets, readProviders, readRelation, readRelationByCollection, readRelations, readRevision, readRevisions, readRole, readRoles, readSettings, readShare, readShareInfo, readShares, readSingleton, readTranslation, readTranslations, readUser, readUsers, readWebhook, readWebhooks, realtime, refresh, rest, saveToContentVersion, schemaApply, schemaDiff, schemaSnapshot, serverHealth, serverInfo, serverPing, sleep, staticToken, throwIfCoreCollection, throwIfEmpty, triggerFlow, triggerOperation, updateCollection, updateComment, updateContentVersion, updateContentVersions, updateDashboard, updateDashboards, updateExtension, updateField, updateFile, updateFiles, updateFlow, updateFlows, updateFolder, updateFolders, updateItem, updateItems, updateMe, updateNotification, updateNotifications, updateOperation, updateOperations, updatePanel, updatePanels, updatePermission, updatePermissions, updatePreset, updatePresets, updateRelation, updateRole, updateRoles, updateSettings, updateShare, updateShares, updateSingleton, updateTranslation, updateTranslations, updateUser, updateUsers, updateWebhook, updateWebhooks, uploadFiles, utilitySort, utilsExport, utilsImport, verifyHash, withOptions, withSearch, withToken };
