/* eslint-disable */
export function objectIsEmpty(object) {
    return typeof object === 'undefined' || (Object.keys(object).length === 0 && object.constructor === Object);
}
