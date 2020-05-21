import { GetAmountOfKeys, GetAllKeys, IsKey } from "./declaration";
import { isArray } from "util";



/**
 * 
 * @param obj 
 * obj is leaf <--> not type of {} or null/undefined
 */
const isLeaf = (obj):boolean =>{
    return (typeof(obj) != typeof({}) || (!obj));
} 

export const getAmountOfKeys:GetAmountOfKeys = (obj:any):number => {
    /*  [REC-ANCHOR] if parameter is leaf */
    if(isLeaf(obj)){ return 0; }

    let keys:any[];
    let len:number;
    let counter:number;
    let isArr:boolean = isArray(obj);
    let newJSON:any;

    
    if(isArr){   /*  recJSON is 'array' [ ] */
        // filter all arr-entries which are objects { }
        keys = obj.filter( (entry) => ! isLeaf(entry)) 
        counter = 0; // because array-entries has no key 
    }
    else{ /*  recJSON is 'object' { } */
        keys =  Object.keys(obj);
        counter = keys.length;  // count "flat" keys        
    }

    /*  [REC-STEP] - subtree */
    len = keys.length;
    for(let k:number=0; k < len; k++){
        newJSON = isArr ?  keys[k] : obj[keys[k]]
        counter += getAmountOfKeys(newJSON);
    }

    /*  [REC-END]*/
    return counter
}

export const getAllKeys:GetAllKeys = (obj:any):string[]=> {
    /*  [REC-ANCHOR] if parameter is leaf */
    if(isLeaf(obj)){ return []; }

    let keys:any[];
    let len:number;
    let keyList:string[];
    let isArr:boolean = isArray(obj);
    let newJSON:any;

    
    if(isArr){   /*  recJSON is 'array' [ ] */
        // filter all arr-entries which are objects { }
        keys = obj.filter( (entry) => ! isLeaf(entry)) 
        keyList = []; // because array-entries has no key 
    }
    else{ /*  recJSON is 'object' { } */
        keys =  Object.keys(obj);
        keyList = keys;  // count "flat" keys        
    }

    /*  [REC-STEP] - subtree */
    len = keys.length;
    for(let k:number=0; k < len; k++){
        newJSON = isArr ?  keys[k] : obj[keys[k]]
        keyList = keyList.concat(getAllKeys(newJSON));
    }

    /*  [REC-END]*/
    return keyList
}

export const isKey:IsKey = (obj:any, key:string):boolean =>{
    
    /*  [REC-ANCHOR] if parameter is leaf */
    if(isLeaf(obj)){ return false; }

    let keys:any[];
    let len:number;
    let isArr:boolean = isArray(obj);
    let value:boolean = false;

    
    keys = isArr ? 
        keys = obj.filter( (entry) => ! isLeaf(entry)) : keys =  Object.keys(obj);

    /*  [REC-STEP] - subtree */
    len = keys.length;
    for(let k:number=0; k < len; k++){
        if(isArr){   
            value = value || isKey(keys[k], key);
       }
        else if(key==keys[k]){   
            return true;
        }
        else{   
            value = value || isKey(obj[keys[k]], key); 
        }
    }

    /*  [REC-END]*/
    return value
}



/*==============================================*/
/*==========[TEST: better use main.ts]==========*/
/*==============================================*/
const exampleJSON = Object.freeze(require("../defaultJson.json"));

console.log(isKey(exampleJSON, '3.2.1'))