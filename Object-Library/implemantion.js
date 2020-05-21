"use strict";
exports.__esModule = true;
var util_1 = require("util");
/**
 *
 * @param obj
 * obj is leaf <--> not type of {} or null/undefined
 */
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
exports.getAllKeys = function (obj) {
    /*  [REC-ANCHOR] if parameter is leaf */
    if (isLeaf(obj)) {
        return [];
    }
    var keys;
    var len;
    var keyList;
    var isArr = util_1.isArray(obj);
    var newJSON;
    if (isArr) { /*  recJSON is 'array' [ ] */
        // filter all arr-entries which are objects { }
        keys = obj.filter(function (entry) { return !isLeaf(entry); });
        keyList = []; // because array-entries has no key 
    }
    else { /*  recJSON is 'object' { } */
        keys = Object.keys(obj);
        keyList = keys; // count "flat" keys        
    }
    /*  [REC-STEP] - subtree */
    len = keys.length;
    for (var k = 0; k < len; k++) {
        newJSON = isArr ? keys[k] : obj[keys[k]];
        keyList = keyList.concat(exports.getAllKeys(newJSON));
    }
    /*  [REC-END]*/
    return keyList;
};
exports.isKey = function (obj, key) {
    /*  [REC-ANCHOR] if parameter is leaf */
    if (isLeaf(obj)) {
        return false;
    }
    var keys;
    var len;
    var isArr = util_1.isArray(obj);
    var value = false;
    keys = isArr ?
        keys = obj.filter(function (entry) { return !isLeaf(entry); }) : keys = Object.keys(obj);
    /*  [REC-STEP] - subtree */
    len = keys.length;
    for (var k = 0; k < len; k++) {
        if (isArr) {
            value = value || exports.isKey(keys[k], key);
        }
        else if (key == keys[k]) {
            return true;
        }
        else {
            value = value || exports.isKey(obj[keys[k]], key);
        }
    }
    /*  [REC-END]*/
    return value;
};
/*==============================================*/
/*==========[TEST: better use main.ts]==========*/
/*==============================================*/
var exampleJSON = Object.freeze(require("../defaultJson.json"));
console.log(exports.isKey(exampleJSON, '3.2.1'));
