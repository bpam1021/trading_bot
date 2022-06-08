export declare function mergeArray(source: any[], dest: any[], compareField?: string): any[];
export declare function groupByArray(xs: Array<any>, key: string): any;
export declare function removeDuplicatesByField<T>(source: T[], field?: string): T[];
export declare function copyDictionaryValues(target: any, source: any, config: {
    include?: string[];
    exclude?: string[];
}): any;
