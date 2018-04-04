// keys must be in the same order as well. whatever
exports.validateObjectSchema = function (obj1, obj2) {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    const obj1Vals = Object.values(obj1);
    const obj2Vals = Object.values(obj2);
    if (obj1Keys.length !== obj2Keys.length || obj1Vals.length !== obj2Vals.length) {
        return false;
    }
    let key1, key2, val1, val2;
    for (let i = 0; i < obj1Keys.length; i++) {
        key1 = obj1Keys[i];
        key2 = obj2Keys[i];
        val1 = obj1Vals[i];
        val2 = obj2Vals[i];

        if (key1 !== key2) {
            return false;
        }
        
        if (typeof val1 !== typeof val2 || val1.constructor !== val2.constructor) {
            return false;
        }

    }
    return true;
};