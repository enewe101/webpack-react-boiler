import fetchit from './fetchit';


const POST_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};


// NOTE: conflict: fetch expects second arg to be options (as done below when
// using fetchit), but fethit expects second arg to be url query params.

class CrudService {

  // These functions return promises, which supply a .then(callback) function,
  // which supplies the fetched result to the callback.
  //
  // e.g.:
  //      crudService.get().then(entities => console.log(entities))
  //

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  get(entity_id) {
    return fetchit(this.endpoint + entity_id)
      .then(response => response.json());
  }

  find(query, options) {
    options = options || {};
    return fetchit(this.endpoint + 'find', {
      method: 'post',
      headers: POST_HEADERS, 
      body: JSON.stringify([query, options])
    }).then(response => response.json());
  }

  create(entity) {
    return fetchit(this.endpoint, {
      method: 'post',
      headers: POST_HEADERS, 
      body: JSON.stringify(entity)
    }).then(response => response.json());
  }

  update(entity_id, entity) {
    return fetchit(this.endpoint + entity_id, {
      method: 'put',
      headers: headers, 
      body: JSON.stringify(entity),
    });
  }

  del(entity_id) {
    return fetchit(this.endpoint + entity_id, {method: 'delete'})
      .then(response => response.json());
  }

}

export default CrudService;


