import CrudService from './CrudService.js';


// The api service will let us request the following kinds of objects using
// standard CRUD operations.
let crudEndpoints = ['tweets', 'documents'];

// Add subservices for standard CRUD operations on various objects
let api = {};
for(let i=0; i<crudEndpoints.length; i++){
  api[crudEndpoints[i]] = new CrudService('/api/' + crudEndpoints[i] + '/');
}

// Add any special api subservices
// api.someSpecialService = new MySpecialService();

export default api;
