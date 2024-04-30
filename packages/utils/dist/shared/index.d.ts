import { RawField, FieldFunction, FieldFilter, Collection, CollectionType, Type, ClientFilterOperator, Relation, Filter, UnknownObject, Accountability, User, Role, Plural } from '@directus/types';
import BaseJoi, { StringSchema as StringSchema$1, AnySchema } from 'joi';
import { Component } from 'vue';

declare function abbreviateNumber(number: number, decimalPlaces?: number, units?: string[]): string;

/**
 * Add a flag to a field.
 */
declare function addFieldFlag(field: RawField, flag: string): void;

/**
 * Adjust a given date by a given change in duration. The adjustment value uses the exact same syntax
 * and logic as Vercel's `ms`.
 *
 * The conversion is lifted straight from `ms`.
 */
declare function adjustDate(date: Date, adjustment: string): Date | undefined;

declare function applyOptionsData(options: Record<string, any>, data: Record<string, any>, skipUndefinedKeys?: string[]): Record<string, any>;
declare function optionToObject<T>(option: T): Exclude<T, string>;
declare function optionToString(option: unknown): string;

declare function isIn<T extends readonly string[]>(value: string, array: T): value is T[number];
declare function isTypeIn<T extends {
    type?: string;
}, E extends string>(object: T, array: readonly E[]): object is Extract<T, {
    type?: E;
}>;

/**
 * Compress any input object or array down to a minimal size reproduction in a string
 * Inspired by `jsonpack`
 */
declare function compress(obj: Record<string, any> | Record<string, any>[]): string;
declare function decompress(input: string): unknown;

declare function deepMap(object: any, iterator: (value: any, key: string | number) => any, context?: any): any;

/**
 * Returns the input source object with the defaults applied
 *
 * @example
 * ```js
 * type Example = {
 * 	optional?: boolean;
 * 	required: boolean;
 * }
 * const input: Example = { required: true };
 * const output = defaults(input, { optional: false });
 * // => { required: true, optional: false }
 * ```
 */
declare const defaults: <T extends object>(obj: T, def: Required<Pick<T, Exclude<keyof T, Exclude<{ [K in keyof T]: T[K] extends Exclude<T[keyof T], undefined> ? K : never; }[keyof T], undefined>>>>) => Required<T>;

declare const functions: Record<FieldFunction, (val: any) => any>;

interface StringSchema extends StringSchema$1 {
    contains(substring: string): this;
    icontains(substring: string): this;
    ncontains(substring: string): this;
}
declare const Joi: typeof BaseJoi;
type JoiOptions = {
    requireAll?: boolean;
};
/**
 * Generate a Joi schema from a filter object.
 *
 * @param {FieldFilter} filter - Field filter object. Note: does not support _and/_or filters.
 * @param {JoiOptions} [options] - Options for the schema generation.
 * @returns {AnySchema} Joi schema.
 */
declare function generateJoi(filter: FieldFilter | null, options?: JoiOptions): AnySchema;

/**
 * Get the type of collection. One of alias | table. (And later: view)
 *
 * @param collection Collection object to get the type of
 * @returns collection type
 */
declare function getCollectionType(collection: Collection): CollectionType;

declare function getFieldsFromTemplate(template?: string | null): string[];

type GetFilterOperationsForTypeOptions = {
    includeValidation?: boolean;
};
declare function getFilterOperatorsForType(type: Type, opts?: GetFilterOperationsForTypeOptions): ClientFilterOperator[];

declare function getFunctionsForType(type: Type): FieldFunction[];

declare function getOutputTypeForFunction(fn: FieldFunction): Type;

declare const getRedactedString: (key?: string) => string;
declare const REDACTED_TEXT: string;

declare function getRelationType(getRelationOptions: {
    relation: Relation;
    collection: string | null;
    field: string;
}): 'm2o' | 'o2m' | 'm2a' | null;

/**
 * Generate a simple short hash for a given string
 * This is not cryptographically secure in any way, and has a high chance of collision
 */
declare function getSimpleHash(str: string): string;

/**
 * Basically the same as `get` from `lodash`, but will convert nested array values to arrays, so for example:
 *
 * @example
 * ```js
 * const obj = { value: [{ example: 1 }, { example: 2 }]}
 * get(obj, 'value.example');
 * // => [1, 2]
 * ```
 */
declare function get(object: Record<string, any> | any[], path: string, defaultValue?: unknown): any;

/**
 * Inject function output fields into a given payload for accurate validation
 *
 * @param payload Any data payload
 * @param filter A single level filter rule to verify against
 *
 * @example
 * ```js
 * const input = { date: '2022-03-29T11:37:56Z' };
 * const filter = { 'year(date)': { _eq: 2022 }}
 * const output = applyFunctions(input, filter);
 * // { date: '2022-03-29T11:37:56Z', 'year(date)': 2022 }
 * ```
 */
declare function injectFunctionResults(payload: Record<string, any>, filter: Filter): Record<string, any>;

declare function isDynamicVariable(value: any): boolean;

declare function isObject(input: unknown): input is UnknownObject;

declare function isValidJSON(input: string): boolean;

declare function isVueComponent(input: unknown): input is Component;

declare function mergeFilters(filterA: Filter | null, filterB: Filter | null, strategy?: 'and' | 'or'): Filter | null;

declare function moveInArray<T = any>(array: T[], fromIndex: number, toIndex: number): T[];

/**
 * Replace windows style backslashes with unix forwards slashes
 */
declare const normalizePath: (path: string, { removeLeading }?: {
    removeLeading: boolean;
}) => string;

/**
 * Generator function to generate parameter indices.
 */
declare function numberGenerator(): Generator<number, number, number>;

/**
 * Parse count(a.b.c) as a.b.count(c) and a.b.count(c.d) as a.b.c.count(d)
 */
declare function parseFilterFunctionPath(path: string): string;

type ParseFilterContext = {
    $CURRENT_USER?: User & Record<string, any>;
    $CURRENT_ROLE?: Role & Record<string, any>;
};
declare function parseFilter(filter: Filter | null, accountability: Accountability | null, context?: ParseFilterContext): Filter | null;
declare function parsePreset(preset: Record<string, any> | null, accountability: Accountability | null, context: ParseFilterContext): any;

/**
 * Run JSON.parse, but ignore `__proto__` properties. This prevents prototype pollution attacks
 */
declare function parseJSON(input: string): any;
declare function noproto<T>(key: string, value: T): T | void;

declare function pluralize<T extends string>(str: T): Plural<T>;
declare function depluralize<T extends string>(str: Plural<T>): T;

declare function toArray<T = any>(val: T | T[]): T[];

/**
 * Convert environment variable to Boolean
 */
declare function toBoolean(value: any): boolean;

/**
 * Validate the payload against the given filter rules
 *
 * @param {Filter} filter - The filter rules to check against
 * @param {Record<string, any>} payload - The payload to validate
 * @param {JoiOptions} [options] - Optional options to pass to Joi
 * @returns Array of errors
 */
declare function validatePayload(filter: Filter, payload: Record<string, any>, options?: JoiOptions): BaseJoi.ValidationError[];

declare function getEndpoint(collection: string): string;

export { Joi, type JoiOptions, REDACTED_TEXT, type StringSchema, abbreviateNumber, addFieldFlag, adjustDate, applyOptionsData, compress, decompress, deepMap, defaults, depluralize, functions, generateJoi, get, getCollectionType, getEndpoint, getFieldsFromTemplate, getFilterOperatorsForType, getFunctionsForType, getOutputTypeForFunction, getRedactedString, getRelationType, getSimpleHash, injectFunctionResults, isDynamicVariable, isIn, isObject, isTypeIn, isValidJSON, isVueComponent, mergeFilters, moveInArray, noproto, normalizePath, numberGenerator, optionToObject, optionToString, parseFilter, parseFilterFunctionPath, parseJSON, parsePreset, pluralize, toArray, toBoolean, validatePayload };