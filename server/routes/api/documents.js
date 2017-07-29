const express = require('express');
const Entity = require('../../models/Document.js')

// Build and export the router.  This is called at the bottom of the file,
// after handlers are defined.
function prepare_router() {
  const router = express.Router();
  router.get('/', getEntities);
  router.get('/:entity_id', getOneEntity);
  router.post('/', createEntity);
  router.put('/:entity_id', updateEntity);
  router['delete']('/:entity_id', deleteEntities);
  module.exports = router;
}


function getEntities(req, res) {
  Entity.find({}, function(err, entities){
    if(err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(entities);
    }
  });
}


function getOneEntity(req, res) {
  Entity.findOne({}, function(err, entity) {
    if(err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(entity);
    }
  });
}


function createEntity(req, res) {}
function updateEntity(req, res) {}
function deleteEntities(req, res) {}

prepare_router();


