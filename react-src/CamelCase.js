function toCamelCase(x) {
  return x.replace(/(_\w)/g, m => m[1].toUpperCase());
}

function isObject(x) {
  return x != null && (typeof x === 'object');
}

function camelCaseKeys(obj) {
  if (Array.isArray(obj)) {
    return obj.map(camelCaseKeys);
  }
  if (isObject(obj)) {
    return Object.keys(obj).reduce((result, key) => {
      let val = obj[key];
      if (isObject(val)) {
        val = camelCaseKeys(val);
      }
      // eslint-disable-next-line no-param-reassign
      result[toCamelCase(key)] = val;
      return result;
    }, {});
  }
  return obj;
}

export default camelCaseKeys;
