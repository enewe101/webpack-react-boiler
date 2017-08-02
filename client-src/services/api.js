import fetchit from './fetchit';


const POST_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};


// NOTE: conflict: fetch expects second arg to be options (as done below when
// using fetchit), but fethit expects second arg to be url query params.
class DocumentService {

  // These functions return promises, which supply a .then(callback) function,
  // which supplies the fetched result to the callback.
  //
  // e.g.:
  //      documentService.get().then(documents => console.log(documents))
  //

  get(doc_id) {
    return fetchit('/api/documents/' + doc_id)
      .then(response => response.json());
  }

  find(query, options) {
    options = options || {};
    return fetchit('/api/documents/find', {
      method: 'post',
      headers: POST_HEADERS, 
      body: JSON.stringify([query, options])
    }).then(response => response.json());
  }

  create(doc) {
    return fetchit('/api/documents', {
      method: 'post',
      headers: POST_HEADERS, 
      body: JSON.stringify(doc)
    }).then(response => response.json());
  }

  update(doc_id, doc) {
    return fetchit('/api/documents/'+doc_id, {
      method: 'put',
      headers: headers, 
      body: JSON.stringify(doc),
    });
  }

  del(doc_id) {
    return fetchit('/api/documents/' + doc_id, {method: 'delete'})
      .then(response => response.json());
  }

}

let documentService = new DocumentService()

export default documentService;

