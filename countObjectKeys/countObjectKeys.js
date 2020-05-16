"use strict";
exports.__esModule = true;
// compile with 
var util_1 = require("util");
var exampleJSON = require("./defaultJson.json");
var json = Object.freeze(exampleJSON);
/**
 *  Leaf <--> type != "object" OR isNull or isUndefined
 */
var isLeaf = function (obj) {
    return (typeof (obj) != typeof ({}) || (!obj));
};
/**
 *  [PURPOSE]   counts all keys in JSON/Object (nested, not flat)
 *
 *  [CASES]
 *      Value of key is:
 *          -   null/undefned
 *          -   number/boolean/char/string/...
 *          -   another object
 *          -   array
 *
 *      Filters entries of array for objects and does not count entries != type object
 *
 *  [HINT]      See Object/JSON as a tree!
 *
 */
var countAllKeysOfObject = function (recJSON) {
    /*  [REC-ANCHOR] if parameter is leaf */
    if (isLeaf(recJSON)) {
        return 0;
    }
    var keys;
    var len;
    var counter;
    var isArr = util_1.isArray(recJSON);
    var newJSON;
    if (isArr) { /*  recJSON is 'array' [ ] */
        // filter all arr-entries which are objects { }
        keys = recJSON.filter(function (entry) { return !isLeaf(entry); });
        counter = 0; // because array-entries has no key 
    }
    else { /*  recJSON is 'object' { } */
        keys = Object.keys(recJSON);
        counter = keys.length; // count "flat" keys        
    }
    /*  [REC-STEP] - subtree */
    len = keys.length;
    for (var k = 0; k < len; k++) {
        newJSON = isArr ? keys[k] : recJSON[keys[k]];
        counter += countAllKeysOfObject(newJSON);
    }
    /*  [REC-END]*/
    return counter;
};
var amountKeys = countAllKeysOfObject(json);
console.log("json/object contains " + amountKeys + " keys");
