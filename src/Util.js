/**
 * Used to check wether an object is empty ({}).
 * 
 * @param {*} object The object to check.
 */
export function objectIsEmpty(object) {
    return Object.keys(object).length === 0 && object.constructor === Object;
}