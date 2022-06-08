export function mergeArray(source: any[], dest: any[], compareField = 'id') {
  const added = dest.filter(x => !Boolean(source.find(s => s[compareField] === x[compareField])));
  const deleted = source.filter(x => !Boolean(dest.find(d => d[compareField] === x[compareField])));
  deleted.forEach(x => {
    x.deletedAt = new Date().toISOString();
  });
  return [...source, ...added];
}

export function groupByArray(xs: Array<any>, key: string) {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export function removeDuplicatesByField<T>(source: T[], field = 'id'): T[] {
  const uniqueValues = [...new Set(source.map(s => s[field]))];
  return uniqueValues.map(value => source.find(s => s[field] === value));
}

/*
e.g.
target = { name: 'John', age: 24 }
source = { name: 'Ginny', email: 'ginny@example.com' }

- const result = copyDictionaryValues(target, source, {});
  { name: 'Ginny', age: 24, email: 'ginny@example.com' }

- const result = copyDictionaryValues(target, source, { includes: ['name'] });
  { name: 'Ginny', age: 24 }

- const result = copyDictionaryValues(target, source, { excludes: ['name'] });
  { name: 'John', age: 24, email: 'ginny@example.com' }

'include' option will be used if both options are given
 */
export function copyDictionaryValues(target: any, source: any, config: { include?: string[], exclude?: string[] }) {
  config.include = config.include || [];
  config.exclude = config.exclude || [];
  const result = { ...target };
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
