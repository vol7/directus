// shared/abbreviate-number.ts
function abbreviateNumber(number, decimalPlaces = 0, units = ["K", "M", "B", "T"]) {
  const isNegative = number < 0;
  number = Math.abs(number);
  let stringValue = String(number);
  if (number >= 1e3) {
    const precisionScale = Math.pow(10, decimalPlaces);
    for (let i = units.length - 1; i >= 0; i--) {
      const size = Math.pow(10, (i + 1) * 3);
      if (size <= number) {
        number = Math.round(number * precisionScale / size) / precisionScale;
        if (number === 1e3 && i < units.length - 1) {
          number = 1;
          i++;
        }
        stringValue = number.toFixed(decimalPlaces) + units[i];
        break;
      }
    }
  }
  if (isNegative) {
    stringValue = `-${stringValue}`;
  }
  return stringValue;
}

// shared/add-field-flag.ts
function addFieldFlag(field, flag) {
  if (!field.meta) {
    field.meta = {
      special: [flag]
    };
  } else if (!field.meta.special) {
    field.meta.special = [flag];
  } else if (!field.meta.special.includes(flag)) {
    field.meta.special.push(flag);
  }
}

// shared/adjust-date.ts
import {
  addYears,
  subWeeks,
  subYears,
  addWeeks,
  subMonths,
  addMonths,
  subDays,
  addDays,
  subHours,
  addHours,
  subMinutes,
  addMinutes,
  subSeconds,
  addSeconds,
  addMilliseconds,
  subMilliseconds
} from "date-fns";
import { clone } from "lodash-es";
function adjustDate(date, adjustment) {
  date = clone(date);
  const subtract = adjustment.startsWith("-");
  if (subtract || adjustment.startsWith("+")) {
    adjustment = adjustment.substring(1);
  }
  const match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|mth|mo|years?|yrs?|y)?$/i.exec(
    adjustment
  );
  if (!match || !match[1]) {
    return;
  }
  const amount = parseFloat(match[1]);
  const type = (match[2] ?? "days").toLowerCase();
  switch (type) {
    case "years":
    case "year":
    case "yrs":
    case "yr":
    case "y":
      return subtract ? subYears(date, amount) : addYears(date, amount);
    case "months":
    case "month":
    case "mth":
    case "mo":
      return subtract ? subMonths(date, amount) : addMonths(date, amount);
    case "weeks":
    case "week":
    case "w":
      return subtract ? subWeeks(date, amount) : addWeeks(date, amount);
    case "days":
    case "day":
    case "d":
      return subtract ? subDays(date, amount) : addDays(date, amount);
    case "hours":
    case "hour":
    case "hrs":
    case "hr":
    case "h":
      return subtract ? subHours(date, amount) : addHours(date, amount);
    case "minutes":
    case "minute":
    case "mins":
    case "min":
    case "m":
      return subtract ? subMinutes(date, amount) : addMinutes(date, amount);
    case "seconds":
    case "second":
    case "secs":
    case "sec":
    case "s":
      return subtract ? subSeconds(date, amount) : addSeconds(date, amount);
    case "milliseconds":
    case "millisecond":
    case "msecs":
    case "msec":
    case "ms":
      return subtract ? subMilliseconds(date, amount) : addMilliseconds(date, amount);
    default:
      return void 0;
  }
}

// shared/apply-options-data.ts
import { get, renderFn } from "micromustache";

// shared/parse-json.ts
function parseJSON(input) {
  if (String(input).includes("__proto__")) {
    return JSON.parse(input, noproto);
  }
  return JSON.parse(input);
}
function noproto(key, value) {
  if (key !== "__proto__") {
    return value;
  }
}

// shared/apply-options-data.ts
function applyOptionsData(options, data, skipUndefinedKeys = []) {
  return Object.fromEntries(
    Object.entries(options).map(([key, value]) => [key, renderMustache(value, data, skipUndefinedKeys.includes(key))])
  );
}
function resolveFn(skipUndefined) {
  return (path, scope) => {
    const value = get(scope, path);
    if (value !== void 0 || !skipUndefined) {
      return typeof value === "object" ? JSON.stringify(value) : value;
    } else {
      return `{{ ${path} }}`;
    }
  };
}
function renderMustache(item, scope, skipUndefined) {
  if (typeof item === "string") {
    const raw = item.match(/^\{\{\s*([^}\s]+)\s*\}\}$/);
    if (raw !== null) {
      const value = get(scope, raw[1]);
      if (value !== void 0) {
        return value;
      }
    }
    return renderFn(item, resolveFn(skipUndefined), scope, { explicit: true });
  } else if (Array.isArray(item)) {
    return item.map((element) => renderMustache(element, scope, skipUndefined));
  } else if (typeof item === "object" && item !== null) {
    return Object.fromEntries(
      Object.entries(item).map(([key, value]) => [key, renderMustache(value, scope, skipUndefined)])
    );
  } else {
    return item;
  }
}
function optionToObject(option) {
  return typeof option === "string" ? parseJSON(option) : option;
}
function optionToString(option) {
  return typeof option === "object" ? JSON.stringify(option) : String(option);
}

// shared/array-helpers.ts
function isIn(value, array) {
  return array.includes(value);
}
function isTypeIn(object, array) {
  if (!object.type)
    return false;
  return array.includes(object.type);
}

// shared/compress.ts
function compress(obj) {
  const strings = /* @__PURE__ */ new Map();
  const integers = /* @__PURE__ */ new Map();
  const floats = /* @__PURE__ */ new Map();
  const getAst = (part) => {
    if (part === null) {
      return {
        type: "null" /* NULL */,
        index: -3 /* NULL */
      };
    }
    if (part === void 0) {
      return {
        type: "undefined" /* UNDEFINED */,
        index: -5 /* UNDEFINED */
      };
    }
    if (Array.isArray(part)) {
      return ["@", ...part.map((subPart) => getAst(subPart))];
    }
    if (part instanceof Date) {
      const value = encode(part.toJSON());
      if (strings.has(value)) {
        return {
          type: "string" /* STRING */,
          index: strings.get(value)
        };
      }
      const index = strings.size;
      strings.set(value, index);
      return {
        type: "string" /* STRING */,
        index
      };
    }
    if (typeof part === "object") {
      return [
        "$",
        ...Object.entries(part).map(([key, value]) => [getAst(key), getAst(value)]).flat()
      ];
    }
    if (part === "") {
      return {
        type: "empty" /* EMPTY */,
        index: -4 /* EMPTY */
      };
    }
    if (typeof part === "string") {
      const value = encode(part);
      if (strings.has(value)) {
        return {
          type: "string" /* STRING */,
          index: strings.get(value)
        };
      }
      const index = strings.size;
      strings.set(value, index);
      return {
        type: "string" /* STRING */,
        index
      };
    }
    if (typeof part === "number" && Number.isInteger(part)) {
      const value = to36(part);
      if (integers.has(value)) {
        return {
          type: "integer" /* INTEGER */,
          index: integers.get(value)
        };
      }
      const index = integers.size;
      integers.set(value, index);
      return {
        type: "integer" /* INTEGER */,
        index
      };
    }
    if (typeof part === "number") {
      if (floats.has(part)) {
        return {
          type: "float" /* FLOAT */,
          index: floats.get(part)
        };
      }
      const index = floats.size;
      floats.set(part, index);
      return {
        type: "float" /* FLOAT */,
        index
      };
    }
    if (typeof part === "boolean") {
      return {
        type: "boolean" /* BOOLEAN */,
        index: part ? -1 /* TRUE */ : -2 /* FALSE */
      };
    }
    throw new Error(`Unexpected argument of type ${typeof part}`);
  };
  const ast = getAst(obj);
  const getCompressed = (part) => {
    if (Array.isArray(part)) {
      let compressed2 = part.shift();
      part.forEach((subPart) => compressed2 += getCompressed(subPart) + "|");
      if (compressed2.endsWith("|"))
        compressed2 = compressed2.slice(0, -1);
      return compressed2 + "]";
    }
    const { type, index } = part;
    switch (type) {
      case "string" /* STRING */:
        return to36(index);
      case "integer" /* INTEGER */:
        return to36(strings.size + index);
      case "float" /* FLOAT */:
        return to36(strings.size + integers.size + index);
      default:
        return index;
    }
  };
  let compressed = mapToSortedArray(strings).join("|");
  compressed += "^" + mapToSortedArray(integers).join("|");
  compressed += "^" + mapToSortedArray(floats).join("|");
  compressed += "^" + getCompressed(ast);
  return compressed;
}
function decompress(input) {
  const parts = input.split("^");
  if (parts.length !== 4)
    throw new Error(`Invalid input string given`);
  const values = [];
  if (parts[0]) {
    values.push(...parts[0].split("|").map((part) => decode(part)));
  }
  if (parts[1]) {
    values.push(...parts[1].split("|").map((part) => to10(part)));
  }
  if (parts[2]) {
    values.push(...parts[2].split("|").map((part) => parseFloat(part)));
  }
  let num36Buffer = "";
  const tokens = [];
  parts[3].split("").forEach((symbol) => {
    if (["|", "$", "@", "]"].includes(symbol)) {
      if (num36Buffer) {
        tokens.push(to10(num36Buffer));
        num36Buffer = "";
      }
      if (symbol !== "|")
        tokens.push(symbol);
    } else {
      num36Buffer += symbol;
    }
  });
  let tokenIndex = 0;
  const getDecompressed = () => {
    const type = tokens[tokenIndex++];
    if (type === "$") {
      const node = {};
      for (; tokenIndex < tokens.length; tokenIndex++) {
        const rawKey = tokens[tokenIndex];
        if (rawKey === "]")
          return node;
        const rawValue = tokens[++tokenIndex];
        const key = values[rawKey];
        if (rawValue === "$" || rawValue === "@") {
          node[key] = getDecompressed();
        } else {
          const value = values[rawValue] ?? getValueForToken(rawValue);
          node[key] = value;
        }
      }
    }
    if (type === "@") {
      const node = [];
      for (; tokenIndex < tokens.length; tokenIndex++) {
        const rawValue = tokens[tokenIndex];
        if (rawValue === "]")
          return node;
        if (rawValue === "$" || rawValue === "@") {
          node.push(getDecompressed());
        } else {
          const value = values[tokens[tokenIndex]] ?? getValueForToken(tokens[tokenIndex]);
          node.push(value);
        }
      }
    }
    throw new Error("Bad token: " + type);
  };
  return getDecompressed();
}
function mapToSortedArray(map) {
  const output = [];
  map.forEach((index, value) => {
    output[index] = value;
  });
  return output;
}
function encode(str) {
  return str.replace(/[+ |^%]/g, (a) => {
    switch (a) {
      case " ":
        return "+";
      case "+":
        return "%2B";
      case "|":
        return "%7C";
      case "^":
        return "%5E";
      case "%":
      default:
        return "%25";
    }
  });
}
function decode(str) {
  return str.replace(/\+|%2B|%7C|%5E|%25/g, (a) => {
    switch (a) {
      case "%25":
        return "%";
      case "%2B":
        return "+";
      case "%7C":
        return "|";
      case "%5E":
        return "^";
      case "+":
      default:
        return " ";
    }
  });
}
function to36(num) {
  return num.toString(36).toUpperCase();
}
function to10(str) {
  return parseInt(str, 36);
}
function getValueForToken(token) {
  switch (token) {
    case -1 /* TRUE */:
      return true;
    case -2 /* FALSE */:
      return false;
    case -3 /* NULL */:
      return null;
    case -4 /* EMPTY */:
      return "";
    case -5 /* UNDEFINED */:
      return void 0;
  }
}

// shared/deep-map.ts
import { isObjectLike } from "lodash-es";
function deepMap(object, iterator, context) {
  if (Array.isArray(object)) {
    return object.map(function(val, key) {
      return isObjectLike(val) ? deepMap(val, iterator, context) : iterator.call(context, val, key);
    });
  } else if (isObjectLike(object)) {
    const res = {};
    for (const key in object) {
      const val = object[key];
      if (isObjectLike(val)) {
        res[key] = deepMap(val, iterator, context);
      } else {
        res[key] = iterator.call(context, val, key);
      }
    }
    return res;
  } else {
    return object;
  }
}

// shared/defaults.ts
var defaults = (obj, def) => {
  const input = Object.fromEntries(Object.entries(obj).filter(([_key, value]) => value !== void 0));
  return {
    ...def,
    ...input
  };
};

// shared/functions.ts
import { getDate, getDay, getWeek, parseISO } from "date-fns";
var functions = {
  year,
  month,
  week,
  day,
  weekday,
  hour,
  minute,
  second,
  count
};
function year(value) {
  return parseISO(value).getUTCFullYear();
}
function month(value) {
  return parseISO(value).getUTCMonth() + 1;
}
function week(value) {
  return getWeek(parseISO(value));
}
function day(value) {
  return getDate(parseISO(value));
}
function weekday(value) {
  return getDay(parseISO(value));
}
function hour(value) {
  return parseISO(value).getUTCHours();
}
function minute(value) {
  return parseISO(value).getUTCMinutes();
}
function second(value) {
  return parseISO(value).getUTCSeconds();
}
function count(value) {
  return Array.isArray(value) ? value.length : null;
}

// shared/generate-joi.ts
import BaseJoi from "joi";
import { escapeRegExp, merge } from "lodash-es";
var Joi = BaseJoi.extend({
  type: "string",
  base: BaseJoi.string(),
  messages: {
    "string.contains": "{{#label}} must contain [{{#substring}}]",
    "string.icontains": "{{#label}} must contain case insensitive [{{#substring}}]",
    "string.ncontains": "{{#label}} can't contain [{{#substring}}]"
  },
  rules: {
    contains: {
      args: [
        {
          name: "substring",
          ref: true,
          assert: (val) => typeof val === "string",
          message: "must be a string"
        }
      ],
      method(substring) {
        return this.$_addRule({ name: "contains", args: { substring } });
      },
      validate(value, helpers, { substring }) {
        if (value.includes(substring) === false) {
          return helpers.error("string.contains", { substring });
        }
        return value;
      }
    },
    icontains: {
      args: [
        {
          name: "substring",
          ref: true,
          assert: (val) => typeof val === "string",
          message: "must be a string"
        }
      ],
      method(substring) {
        return this.$_addRule({ name: "icontains", args: { substring } });
      },
      validate(value, helpers, { substring }) {
        if (value.toLowerCase().includes(substring.toLowerCase()) === false) {
          return helpers.error("string.icontains", { substring });
        }
        return value;
      }
    },
    ncontains: {
      args: [
        {
          name: "substring",
          ref: true,
          assert: (val) => typeof val === "string",
          message: "must be a string"
        }
      ],
      method(substring) {
        return this.$_addRule({ name: "ncontains", args: { substring } });
      },
      validate(value, helpers, { substring }) {
        if (value.includes(substring) === true) {
          return helpers.error("string.ncontains", { substring });
        }
        return value;
      }
    }
  }
});
var defaults2 = {
  requireAll: false
};
function generateJoi(filter, options) {
  filter = filter || {};
  options = merge({}, defaults2, options);
  const schema = {};
  const key = Object.keys(filter)[0];
  if (!key) {
    throw new Error(`[generateJoi] Filter doesn't contain field key. Passed filter: ${JSON.stringify(filter)}`);
  }
  const value = Object.values(filter)[0];
  if (!value) {
    throw new Error(`[generateJoi] Filter doesn't contain filter rule. Passed filter: ${JSON.stringify(filter)}`);
  }
  if (Object.keys(value)[0]?.startsWith("_") === false) {
    schema[key] = generateJoi(value, options);
  } else {
    const operator = Object.keys(value)[0];
    const compareValue = Object.values(value)[0];
    const getAnySchema = () => schema[key] ?? Joi.any();
    const getStringSchema = () => schema[key] ?? Joi.string();
    const getNumberSchema = () => schema[key] ?? Joi.number();
    const getDateSchema = () => schema[key] ?? Joi.date();
    if (operator === "_eq") {
      const numericValue = compareValue === null || compareValue === "" || compareValue === true || compareValue === false ? NaN : Number(compareValue);
      if (isNaN(numericValue)) {
        schema[key] = getAnySchema().equal(compareValue);
      } else {
        schema[key] = getAnySchema().equal(compareValue, numericValue);
      }
    }
    if (operator === "_neq") {
      const numericValue = compareValue === null || compareValue === "" || compareValue === true || compareValue === false ? NaN : Number(compareValue);
      if (isNaN(numericValue)) {
        schema[key] = getAnySchema().not(compareValue);
      } else {
        schema[key] = getAnySchema().not(compareValue, numericValue);
      }
    }
    if (operator === "_contains") {
      if (compareValue === null || compareValue === void 0 || typeof compareValue !== "string") {
        schema[key] = Joi.any().equal(true);
      } else {
        schema[key] = Joi.alternatives().try(
          getStringSchema().contains(compareValue),
          Joi.array().items(getStringSchema().contains(compareValue).required(), Joi.any())
        );
      }
    }
    if (operator === "_icontains") {
      if (compareValue === null || compareValue === void 0 || typeof compareValue !== "string") {
        schema[key] = Joi.any().equal(true);
      } else {
        schema[key] = Joi.alternatives().try(
          getStringSchema().icontains(compareValue),
          Joi.array().items(getStringSchema().icontains(compareValue).required(), Joi.any())
        );
      }
    }
    if (operator === "_ncontains") {
      if (compareValue === null || compareValue === void 0 || typeof compareValue !== "string") {
        schema[key] = Joi.any().equal(true);
      } else {
        schema[key] = Joi.alternatives().try(
          getStringSchema().ncontains(compareValue),
          Joi.array().items(getStringSchema().contains(compareValue).forbidden())
        );
      }
    }
    if (operator === "_starts_with") {
      if (compareValue === null || compareValue === void 0 || typeof compareValue !== "string") {
        schema[key] = Joi.any().equal(true);
      } else {
        schema[key] = getStringSchema().pattern(new RegExp(`^${escapeRegExp(compareValue)}.*`), {
          name: "starts_with"
        });
      }
    }
    if (operator === "_nstarts_with") {
      if (compareValue === null || compareValue === void 0 || typeof compareValue !== "string") {
        schema[key] = Joi.any().equal(true);
      } else {
        schema[key] = getStringSchema().pattern(new RegExp(`^${escapeRegExp(compareValue)}.*`), {
          name: "nstarts_with",
          invert: true
        });
      }
    }
    if (operator === "_istarts_with") {
      if (compareValue === null || compareValue === void 0 || typeof compareValue !== "string") {
        schema[key] = Joi.any().equal(true);
      } else {
        schema[key] = getStringSchema().pattern(new RegExp(`^${escapeRegExp(compareValue)}.*`, "i"), {
          name: "istarts_with"
        });
      }
    }
    if (operator === "_nistarts_with") {
      if (compareValue === null || compareValue === void 0 || typeof compareValue !== "string") {
        schema[key] = Joi.any().equal(true);
      } else {
        schema[key] = getStringSchema().pattern(new RegExp(`^${escapeRegExp(compareValue)}.*`, "i"), {
          name: "nistarts_with",
          invert: true
        });
      }
    }
    if (operator === "_ends_with") {
      if (compareValue === null || compareValue === void 0 || typeof compareValue !== "string") {
        schema[key] = Joi.any().equal(true);
      } else {
        schema[key] = getStringSchema().pattern(new RegExp(`.*${escapeRegExp(compareValue)}$`), {
          name: "ends_with"
        });
      }
    }
    if (operator === "_nends_with") {
      if (compareValue === null || compareValue === void 0 || typeof compareValue !== "string") {
        schema[key] = Joi.any().equal(true);
      } else {
        schema[key] = getStringSchema().pattern(new RegExp(`.*${escapeRegExp(compareValue)}$`), {
          name: "nends_with",
          invert: true
        });
      }
    }
    if (operator === "_iends_with") {
      if (compareValue === null || compareValue === void 0 || typeof compareValue !== "string") {
        schema[key] = Joi.any().equal(true);
      } else {
        schema[key] = getStringSchema().pattern(new RegExp(`.*${escapeRegExp(compareValue)}$`, "i"), {
          name: "iends_with"
        });
      }
    }
    if (operator === "_niends_with") {
      if (compareValue === null || compareValue === void 0 || typeof compareValue !== "string") {
        schema[key] = Joi.any().equal(true);
      } else {
        schema[key] = getStringSchema().pattern(new RegExp(`.*${escapeRegExp(compareValue)}$`, "i"), {
          name: "niends_with",
          invert: true
        });
      }
    }
    if (operator === "_in") {
      schema[key] = getAnySchema().equal(...compareValue);
    }
    if (operator === "_nin") {
      schema[key] = getAnySchema().not(...compareValue);
    }
    if (operator === "_gt") {
      const isDate = compareValue instanceof Date || Number.isNaN(Number(compareValue));
      schema[key] = isDate ? getDateSchema().greater(compareValue) : getNumberSchema().greater(Number(compareValue));
    }
    if (operator === "_gte") {
      const isDate = compareValue instanceof Date || Number.isNaN(Number(compareValue));
      schema[key] = isDate ? getDateSchema().min(compareValue) : getNumberSchema().min(Number(compareValue));
    }
    if (operator === "_lt") {
      const isDate = compareValue instanceof Date || Number.isNaN(Number(compareValue));
      schema[key] = isDate ? getDateSchema().less(compareValue) : getNumberSchema().less(Number(compareValue));
    }
    if (operator === "_lte") {
      const isDate = compareValue instanceof Date || Number.isNaN(Number(compareValue));
      schema[key] = isDate ? getDateSchema().max(compareValue) : getNumberSchema().max(Number(compareValue));
    }
    if (operator === "_null") {
      schema[key] = getAnySchema().valid(null);
    }
    if (operator === "_nnull") {
      schema[key] = getAnySchema().invalid(null);
    }
    if (operator === "_empty") {
      schema[key] = getAnySchema().valid("");
    }
    if (operator === "_nempty") {
      schema[key] = getAnySchema().invalid("");
    }
    if (operator === "_between") {
      if (compareValue.every((value2) => {
        const val = Number(value2 instanceof Date ? NaN : value2);
        return !Number.isNaN(val) && Math.abs(val) <= Number.MAX_SAFE_INTEGER;
      })) {
        const values = compareValue;
        schema[key] = getNumberSchema().min(Number(values[0])).max(Number(values[1]));
      } else {
        const values = compareValue;
        schema[key] = getDateSchema().min(values[0]).max(values[1]);
      }
    }
    if (operator === "_nbetween") {
      if (compareValue.every((value2) => {
        const val = Number(value2 instanceof Date ? NaN : value2);
        return !Number.isNaN(val) && Math.abs(val) <= Number.MAX_SAFE_INTEGER;
      })) {
        const values = compareValue;
        schema[key] = getNumberSchema().less(Number(values[0])).greater(Number(values[1]));
      } else {
        const values = compareValue;
        schema[key] = getDateSchema().less(values[0]).greater(values[1]);
      }
    }
    if (operator === "_submitted") {
      schema[key] = getAnySchema().required();
    }
    if (operator === "_regex") {
      if (compareValue === null || compareValue === void 0) {
        schema[key] = Joi.any().equal(true);
      } else {
        const wrapped = typeof compareValue === "string" ? compareValue.startsWith("/") && compareValue.endsWith("/") : false;
        schema[key] = getStringSchema().regex(new RegExp(wrapped ? compareValue.slice(1, -1) : compareValue));
      }
    }
  }
  schema[key] = schema[key] ?? Joi.any();
  if (options.requireAll) {
    schema[key] = schema[key].required();
  }
  return Joi.object(schema).unknown();
}

// shared/get-collection-type.ts
function getCollectionType(collection) {
  if (collection.schema)
    return "table";
  if (collection.meta)
    return "alias";
  return "unknown";
}

// shared/get-fields-from-template.ts
import { isNil } from "lodash-es";
function getFieldsFromTemplate(template) {
  if (isNil(template))
    return [];
  const regex = /{{(.*?)}}/g;
  const fields = template.match(regex);
  if (!Array.isArray(fields)) {
    return [];
  }
  return fields.map((field) => {
    return field.replace(/{{/g, "").replace(/}}/g, "").trim();
  });
}

// shared/get-filter-operators-for-type.ts
function getFilterOperatorsForType(type, opts) {
  const validationOnlyStringFilterOperators = opts?.includeValidation ? ["regex"] : [];
  switch (type) {
    case "binary":
    case "string":
    case "text":
    case "csv":
      return [
        "contains",
        "ncontains",
        "icontains",
        "starts_with",
        "nstarts_with",
        "istarts_with",
        "nistarts_with",
        "ends_with",
        "nends_with",
        "iends_with",
        "niends_with",
        "eq",
        "neq",
        "empty",
        "nempty",
        "null",
        "nnull",
        "in",
        "nin",
        ...validationOnlyStringFilterOperators
      ];
    case "hash":
      return ["empty", "nempty", "null", "nnull"];
    case "uuid":
      return ["eq", "neq", "null", "nnull", "in", "nin"];
    case "json":
      return ["null", "nnull"];
    case "boolean":
      return ["eq", "neq", "null", "nnull"];
    case "bigInteger":
    case "integer":
    case "decimal":
    case "float":
      return ["eq", "neq", "lt", "lte", "gt", "gte", "between", "nbetween", "null", "nnull", "in", "nin"];
    case "dateTime":
    case "date":
    case "time":
      return ["eq", "neq", "lt", "lte", "gt", "gte", "between", "nbetween", "null", "nnull", "in", "nin"];
    case "geometry":
      return ["eq", "neq", "null", "nnull", "intersects", "nintersects", "intersects_bbox", "nintersects_bbox"];
    default:
      return [
        "contains",
        "ncontains",
        "eq",
        "neq",
        "lt",
        "lte",
        "gt",
        "gte",
        "between",
        "nbetween",
        "empty",
        "nempty",
        "null",
        "nnull",
        "in",
        "nin",
        ...validationOnlyStringFilterOperators
      ];
  }
}

// shared/get-functions-for-type.ts
function getFunctionsForType(type) {
  switch (type) {
    case "dateTime":
    case "timestamp":
      return ["year", "month", "week", "day", "weekday", "hour", "minute", "second"];
    case "date":
      return ["year", "month", "week", "day", "weekday"];
    case "time":
      return ["hour", "minute", "second"];
    case "json":
      return ["count"];
    case "alias":
      return ["count"];
    default:
      return [];
  }
}

// shared/get-output-type-for-function.ts
function getOutputTypeForFunction(fn) {
  const typeMap = {
    year: "integer",
    month: "integer",
    week: "integer",
    day: "integer",
    weekday: "integer",
    hour: "integer",
    minute: "integer",
    second: "integer",
    count: "integer"
  };
  return typeMap[fn];
}

// shared/get-redacted-string.ts
var getRedactedString = (key) => `--redacted${key ? `:${key}` : ""}--`;
var REDACTED_TEXT = getRedactedString();

// shared/get-relation-type.ts
function getRelationType(getRelationOptions) {
  const { relation, collection, field } = getRelationOptions;
  if (!relation)
    return null;
  if (relation.collection === collection && relation.field === field && relation.meta?.one_collection_field && relation.meta?.one_allowed_collections) {
    return "m2a";
  }
  if (relation.collection === collection && relation.field === field) {
    return "m2o";
  }
  if (relation.related_collection === collection && relation.meta?.one_field === field) {
    return "o2m";
  }
  return null;
}

// shared/get-simple-hash.ts
function getSimpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; hash &= hash) {
    hash = 31 * hash + str.charCodeAt(i++);
  }
  return Math.abs(hash).toString(16);
}

// shared/get-with-arrays.ts
function get2(object, path, defaultValue) {
  let key = path.split(".")[0];
  const follow = path.split(".").slice(1);
  if (key.includes(":"))
    key = key.split(":")[0];
  const result = Array.isArray(object) ? getArrayResult(object, key) : object?.[key];
  if (result !== void 0 && follow.length > 0) {
    return get2(result, follow.join("."), defaultValue);
  }
  return result ?? defaultValue;
}
function getArrayResult(object, key) {
  const result = object.map((entry) => entry?.[key]).filter((entry) => entry);
  return result.length > 0 ? result.flat() : void 0;
}

// shared/inject-function-results.ts
import { cloneDeep, get as get3, isPlainObject, set } from "lodash-es";
import { REGEX_BETWEEN_PARENS } from "@directus/constants";
function injectFunctionResults(payload, filter) {
  const newInput = cloneDeep(payload);
  processFilterLevel(filter);
  return newInput;
  function processFilterLevel(filter2, parentPath) {
    for (const [key, value] of Object.entries(filter2)) {
      const path = parentPath ? parentPath + "." + key : key;
      if (key.startsWith("_") === false && isPlainObject(value)) {
        processFilterLevel(value, path);
      }
      if (key.includes("(") && key.includes(")")) {
        const functionName = key.split("(")[0];
        const fieldKey = key.match(REGEX_BETWEEN_PARENS)?.[1];
        if (!fieldKey || !functionName)
          continue;
        const currentValuePath = parentPath ? parentPath + "." + fieldKey : fieldKey;
        const currentValue = get3(newInput, currentValuePath);
        set(newInput, path, functions[functionName](currentValue));
      }
    }
  }
}

// shared/is-dynamic-variable.ts
var dynamicVariablePrefixes = ["$NOW", "$CURRENT_USER", "$CURRENT_ROLE"];
function isDynamicVariable(value) {
  return typeof value === "string" && dynamicVariablePrefixes.some((prefix) => value.startsWith(prefix));
}

// shared/is-object.ts
function isObject(input) {
  return typeof input === "object" && input !== null && !Array.isArray(input);
}

// shared/is-valid-json.ts
function isValidJSON(input) {
  try {
    parseJSON(input);
    return true;
  } catch {
    return false;
  }
}

// shared/is-vue-component.ts
function isVueComponent(input) {
  if (!isObject(input))
    return false;
  return typeof input["setup"] === "function" || typeof input["render"] === "function";
}

// shared/merge-filters.ts
function mergeFilters(filterA, filterB, strategy = "and") {
  if (!filterA)
    return filterB;
  if (!filterB)
    return filterA;
  return {
    [`_${strategy}`]: [filterA, filterB]
  };
}

// shared/move-in-array.ts
function moveInArray(array, fromIndex, toIndex) {
  const item = array[fromIndex];
  const length = array.length;
  const diff = fromIndex - toIndex;
  if (item === void 0)
    return array;
  if (diff > 0) {
    return [
      ...array.slice(0, toIndex),
      item,
      ...array.slice(toIndex, fromIndex),
      ...array.slice(fromIndex + 1, length)
    ];
  } else if (diff < 0) {
    const targetIndex = toIndex + 1;
    return [
      ...array.slice(0, fromIndex),
      ...array.slice(fromIndex + 1, targetIndex),
      item,
      ...array.slice(targetIndex, length)
    ];
  }
  return array;
}

// shared/normalize-path.ts
var normalizePath = (path, { removeLeading } = { removeLeading: false }) => {
  if (path === "\\" || path === "/")
    return "/";
  if (path.length <= 1) {
    return path;
  }
  let prefix = "";
  if (path.length > 4 && path[3] === "\\") {
    if (["?", "."].includes(path[2]) && path.slice(0, 2) === "\\\\") {
      path = path.slice(2);
      prefix = "//";
    }
  }
  const segments = path.split(/[/\\]+/);
  if (segments.at(-1) === "") {
    segments.pop();
  }
  const normalizedPath = prefix + segments.join("/");
  if (removeLeading && path.startsWith("/")) {
    return normalizedPath.substring(1);
  }
  return normalizedPath;
};

// shared/number-generator.ts
function* numberGenerator() {
  let index = 0;
  while (true) {
    yield index++;
  }
}

// shared/parse-filter-function-path.ts
import { REGEX_BETWEEN_PARENS as REGEX_BETWEEN_PARENS2 } from "@directus/constants";
function parseFilterFunctionPath(path) {
  if (path.includes("(") && path.includes(")")) {
    const pre = path.split("(")[0];
    const preHasColumns = pre.includes(".");
    const preColumns = preHasColumns ? pre.slice(0, pre.lastIndexOf(".") + 1) : "";
    const functionName = preHasColumns ? pre.slice(pre.lastIndexOf(".") + 1) : pre;
    const matched = path.match(REGEX_BETWEEN_PARENS2);
    if (matched) {
      const fields = matched[1];
      const fieldsHasColumns = fields.includes(".");
      const columns = fieldsHasColumns ? fields.slice(0, fields.lastIndexOf(".") + 1) : "";
      const field = fieldsHasColumns ? fields.slice(fields.lastIndexOf(".") + 1) : fields;
      return `${preColumns}${columns}${functionName}(${field})`;
    }
  }
  return path;
}

// shared/parse-filter.ts
import { REGEX_BETWEEN_PARENS as REGEX_BETWEEN_PARENS3 } from "@directus/constants";
import { isObjectLike as isObjectLike2 } from "lodash-es";

// shared/to-array.ts
function toArray(val) {
  if (typeof val === "string") {
    return val.split(",");
  }
  return Array.isArray(val) ? val : [val];
}

// shared/parse-filter.ts
function parseFilter(filter, accountability, context = {}) {
  let parsedFilter = parseFilterRecursive(filter, accountability, context);
  if (parsedFilter) {
    parsedFilter = shiftLogicalOperatorsUp(parsedFilter);
  }
  return parsedFilter;
}
var logicalFilterOperators = ["_and", "_or"];
var bypassOperators = ["_none", "_some"];
function shiftLogicalOperatorsUp(filter) {
  const key = Object.keys(filter)[0];
  if (!key)
    return filter;
  if (logicalFilterOperators.includes(key)) {
    for (const childKey of Object.keys(filter[key])) {
      filter[key][childKey] = shiftLogicalOperatorsUp(filter[key][childKey]);
    }
    return filter;
  } else if (key.startsWith("_")) {
    return filter;
  } else {
    const childKey = Object.keys(filter[key])[0];
    if (!childKey)
      return filter;
    if (logicalFilterOperators.includes(childKey)) {
      return {
        [childKey]: toArray(filter[key][childKey]).map((childFilter) => {
          return { [key]: shiftLogicalOperatorsUp(childFilter) };
        })
      };
    } else if (bypassOperators.includes(childKey)) {
      return { [key]: { [childKey]: shiftLogicalOperatorsUp(filter[key][childKey]) } };
    } else if (childKey.startsWith("_")) {
      return filter;
    } else {
      return { [key]: shiftLogicalOperatorsUp(filter[key]) };
    }
  }
}
function parseFilterRecursive(filter, accountability, context = {}) {
  if (filter === null || filter === void 0) {
    return null;
  }
  if (!isObjectLike2(filter)) {
    return { _eq: parseFilterValue(filter, accountability, context) };
  }
  const filters = Object.entries(filter).map((entry) => parseFilterEntry(entry, accountability, context));
  if (filters.length === 0) {
    return {};
  } else if (filters.length === 1) {
    return filters[0] ?? null;
  } else {
    return { _and: filters };
  }
}
function parsePreset(preset, accountability, context) {
  if (!preset)
    return preset;
  return deepMap(preset, (value) => parseFilterValue(value, accountability, context));
}
function parseFilterEntry([key, value], accountability, context) {
  if (["_or", "_and"].includes(String(key))) {
    return { [key]: value.map((filter) => parseFilterRecursive(filter, accountability, context)) };
  } else if (["_in", "_nin", "_between", "_nbetween"].includes(String(key))) {
    const val = isObject(value) ? Object.values(value) : value;
    return { [key]: toArray(val).flatMap((value2) => parseFilterValue(value2, accountability, context)) };
  } else if (["_intersects", "_nintersects", "_intersects_bbox", "_nintersects_bbox"].includes(String(key))) {
    return { [key]: parseFilterValue(typeof value === "string" ? parseJSON(value) : value, accountability, context) };
  } else if (String(key).startsWith("_") && !bypassOperators.includes(key)) {
    return { [key]: parseFilterValue(value, accountability, context) };
  } else if (String(key).startsWith("item__") && isObjectLike2(value)) {
    return { [`item:${String(key).split("item__")[1]}`]: parseFilter(value, accountability, context) };
  } else {
    return { [key]: parseFilterRecursive(value, accountability, context) };
  }
}
function parseFilterValue(value, accountability, context) {
  if (value === "true")
    return true;
  if (value === "false")
    return false;
  if (value === "null" || value === "NULL")
    return null;
  if (isDynamicVariable(value))
    return parseDynamicVariable(value, accountability, context);
  return value;
}
function parseDynamicVariable(value, accountability, context) {
  if (value.startsWith("$NOW")) {
    if (value.includes("(") && value.includes(")")) {
      const adjustment = value.match(REGEX_BETWEEN_PARENS3)?.[1];
      if (!adjustment)
        return /* @__PURE__ */ new Date();
      return adjustDate(/* @__PURE__ */ new Date(), adjustment);
    }
    return /* @__PURE__ */ new Date();
  }
  if (value.startsWith("$CURRENT_USER")) {
    if (value === "$CURRENT_USER")
      return accountability?.user ?? null;
    return get2(context, value, null);
  }
  if (value.startsWith("$CURRENT_ROLE")) {
    if (value === "$CURRENT_ROLE")
      return accountability?.role ?? null;
    return get2(context, value, null);
  }
}

// shared/pluralize.ts
function pluralize(str) {
  return `${str}s`;
}
function depluralize(str) {
  return str.slice(0, -1);
}

// shared/to-boolean.ts
function toBoolean(value) {
  return value === "true" || value === true || value === "1" || value === 1;
}

// shared/validate-payload.ts
import { flatten } from "lodash-es";
function validatePayload(filter, payload, options) {
  const errors = [];
  if (Object.keys(filter)[0] === "_and") {
    const subValidation = Object.values(filter)[0];
    const nestedErrors = flatten(
      subValidation.map((subObj) => {
        return validatePayload(subObj, payload, options);
      })
    ).filter((err) => err);
    errors.push(...nestedErrors);
  } else if (Object.keys(filter)[0] === "_or") {
    const subValidation = Object.values(filter)[0];
    const swallowErrors = [];
    const pass = subValidation.some((subObj) => {
      const nestedErrors = validatePayload(subObj, payload, options);
      if (nestedErrors.length > 0) {
        swallowErrors.push(...nestedErrors);
        return false;
      }
      return true;
    });
    if (!pass) {
      errors.push(...swallowErrors);
    }
  } else {
    const payloadWithFunctions = injectFunctionResults(payload, filter);
    const schema = generateJoi(filter, options);
    const { error } = schema.validate(payloadWithFunctions, { abortEarly: false });
    if (error) {
      errors.push(error);
    }
  }
  return errors;
}

// shared/get-endpoint.ts
import { isSystemCollection } from "@directus/system-data";
function getEndpoint(collection) {
  if (isSystemCollection(collection)) {
    return `/${collection.substring(9)}`;
  }
  return `/items/${collection}`;
}
export {
  Joi,
  REDACTED_TEXT,
  abbreviateNumber,
  addFieldFlag,
  adjustDate,
  applyOptionsData,
  compress,
  decompress,
  deepMap,
  defaults,
  depluralize,
  functions,
  generateJoi,
  get2 as get,
  getCollectionType,
  getEndpoint,
  getFieldsFromTemplate,
  getFilterOperatorsForType,
  getFunctionsForType,
  getOutputTypeForFunction,
  getRedactedString,
  getRelationType,
  getSimpleHash,
  injectFunctionResults,
  isDynamicVariable,
  isIn,
  isObject,
  isTypeIn,
  isValidJSON,
  isVueComponent,
  mergeFilters,
  moveInArray,
  noproto,
  normalizePath,
  numberGenerator,
  optionToObject,
  optionToString,
  parseFilter,
  parseFilterFunctionPath,
  parseJSON,
  parsePreset,
  pluralize,
  toArray,
  toBoolean,
  validatePayload
};
