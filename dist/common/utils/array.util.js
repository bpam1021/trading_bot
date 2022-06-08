"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyDictionaryValues = exports.removeDuplicatesByField = exports.groupByArray = exports.mergeArray = void 0;
function mergeArray(source, dest, compareField = 'id') {
    const added = dest.filter(x => !Boolean(source.find(s => s[compareField] === x[compareField])));
    const deleted = source.filter(x => !Boolean(dest.find(d => d[compareField] === x[compareField])));
    deleted.forEach(x => {
        x.deletedAt = new Date().toISOString();
    });
    return [...source, ...added];
}
exports.mergeArray = mergeArray;
function groupByArray(xs, key) {
    return xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
}
exports.groupByArray = groupByArray;
function removeDuplicatesByField(source, field = 'id') {
    const uniqueValues = [...new Set(source.map(s => s[field]))];
    return uniqueValues.map(value => source.find(s => s[field] === value));
}
exports.removeDuplicatesByField = removeDuplicatesByField;
function copyDictionaryValues(target, source, config) {
    config.include = config.include || [];
    config.exclude = config.exclude || [];
    const result = Object.assign({}, target);
    const sourceKeys = Object.keys(source);
    if (!config.include.length && !config.exclude.length) {
        sourceKeys.forEach(key => result[key] = source[key]);
        return result;
    }
    if (config.include.length) {
        config.include.forEach(key => {
            if (key in source) {
                result[key] = source[key];
            }
        });
        return result;
    }
    if (config.exclude.length) {
        sourceKeys.forEach(key => {
            if (!(key in config.exclude)) {
                result[key] = source[key];
            }
        });
        return result;
    }
    return result;
}
exports.copyDictionaryValues = copyDictionaryValues;
//# sourceMappingURL=array.util.js.map