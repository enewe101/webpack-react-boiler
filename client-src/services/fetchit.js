
const esc = encodeURIComponent;
function encode_query(query) {
  return Object.keys(query).map(k => esc(k) + '=' + esc(query[k])).join('&');
}

function fetchit(url, options) {
  let query = null;
  if(options.query) {
    url = url + '?' + encode_query(options.query);
    delete options.query;
  }
  return fetch(url, options);
}

export default fetchit;
