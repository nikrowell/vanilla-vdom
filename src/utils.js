
export const CREATE = 'CREATE';
export const REMOVE = 'REMOVE';
export const REPLACE = 'REPLACE';
export const UPDATE = 'UPDATE';
export const REMOVE_ATTR = 'REMOVE_ATTR';
export const SET_ATTR = 'SET_ATTR';

export const noop = fn => fn;
export const isArray = Array.isArray;
export const isBoolean = (value) => typeof value === 'boolean';
export const isFunction = (value) => typeof value === 'function';
export const isNumber = (value) => typeof value === 'number';
export const isObject = (value) => typeof value === 'object';
export const isString = (value) => typeof value === 'string';
export const isUndefined = (value) => typeof value === 'undefined';