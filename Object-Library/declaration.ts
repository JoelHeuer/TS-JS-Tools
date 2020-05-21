
/*================[KEY OPERATIONS]================*/


/**
 * @param obj 
 * @warning array-entries without keys will be ignored 
 * get #keys in obj (recursive/nested, not flat)
 */
export type GetAmountOfKeys = (obj:any) => number;

/**
 * @param obj json/js-object
 * get all keys 
 */
export type GetAllKeys = (obj:any) => string[];

/**
 * 
 * @param obj 
 * @param key 
 * 
 * returns true if key exists in obj
 */
export type IsKey = (obj, key) => boolean;            



/*================[VALUE OPERATIONS]================*/
export type GetAllValues = (obj) => any[];


// check specification