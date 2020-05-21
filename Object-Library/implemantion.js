"use strict";
exports.__esModule = true;
var util_1 = require("util");
var isLeaf = function (obj) {
    return (typeof (obj) != typeof ({}) || (!obj));
};
exports.getAmountOfKeys = function (obj) {
    /*  [REC-ANCHOR] if parameter is leaf */
    if (isLeaf(obj)) {
        return 0;
    }
    var keys;
    var len;
    var counter;
    var isArr = util_1.isArray(obj);
    var newJSON;
    if (isArr) { /*  recJSON is 'array' [ ] */
        // filter all arr-entries which are objects { }
        keys = obj.filter(function (entry) { return !isLeaf(entry); });
        counter = 0; // because array-entries has no key 
    }
    else { /*  recJSON is 'object' { } */
        keys = Object.keys(obj);
        counter = keys.length; // count "flat" keys        
    }
    /*  [REC-STEP] - subtree */
    len = keys.length;
    for (var k = 0; k < len; k++) {
        newJSON = isArr ? keys[k] : obj[keys[k]];
        counter += exports.getAmountOfKeys(newJSON);
    }
    /*  [REC-END]*/
    return counter;
};
