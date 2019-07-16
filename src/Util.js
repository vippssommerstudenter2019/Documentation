/**
 * Used to check wether an object is empty ({}).
 * 
 * @param {*} object The object to check.
 */
Object.prototype.isEmpty = function () {
    return Object.keys(this).length === 0 && this.constructor === Object;
}