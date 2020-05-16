// compile & run with:     tsc file.ts && node file.js
import { isArray } from "util";

const exampleJSON = require("./defaultJson.json");
const json =      Object.freeze(exampleJSON);

/**
 *  Leaf <--> type != "object" OR isNull or isUndefined
 */
const isLeaf = (obj):boolean =>{
    return (typeof(obj) != typeof({}) || (!obj));
} 

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
const countAllKeysOfObject = (recJSON):number => {

    /*  [REC-ANCHOR] if parameter is leaf */
    if(isLeaf(recJSON)){ return 0; }

    let keys:any[];
    let len:number;
    let counter:number;
    let isArr:boolean = isArray(recJSON);
    let newJSON:any;

    
    if(isArr){   /*  recJSON is 'array' [ ] */
        // filter all arr-entries which are objects { }
        keys = recJSON.filter( (entry) => ! isLeaf(entry)) 
        counter = 0; // because array-entries has no key 
    }
    else{ /*  recJSON is 'object' { } */
        keys =  Object.keys(recJSON);
        counter = keys.length;  // count "flat" keys        
    }

    /*  [REC-STEP] - subtree */
    len = keys.length;
    for(let k:number=0; k < len; k++){
        newJSON = isArr ?  keys[k] : recJSON[keys[k]]
        counter += countAllKeysOfObject(newJSON);
    }

    /*  [REC-END]*/
    return counter
}

let amountKeys:number = countAllKeysOfObject(json);
console.log("json/object contains "+amountKeys+" keys");