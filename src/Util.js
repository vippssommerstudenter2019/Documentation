
/**
 * Used to check wether an object is empty ({}).
 * 
 * @param {*} object The object to check.
 */
export function objectIsEmpty(object) {
    return Object.keys(object).length === 0 && object.constructor === Object;
}

/**
 * Generates a hash (unique number) from a string.
 */
export function getHashCodeFromString(string) {

    var hash = 0, i, chr;

    if (string.length === 0) return hash;

    for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        // Convert to 32bit integer
        hash |= 0;
    }
    return hash;
};
