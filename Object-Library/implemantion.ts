import { GetAmountOfKeys } from "./declaration";
import { isArray } from "util";


const isLeaf = (obj):boolean =>{
    return (typeof(obj) != typeof({}) || (!obj));
} 

export const getAmountOfKeys:GetAmountOfKeys = (obj:any) => {
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



