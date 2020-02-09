module.exports = function createURI(uri, params) {
  const url = new URL(uri);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
}