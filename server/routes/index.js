var express = require('express');
var router = require('express').Router();
var path = require('path');
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

// from now on put mongo connect in server
var mongoURI = 'mongodb://localhost/grocery-list'
var db = mongoose.connect(mongoURI).connection;

db.once('open', function(){
  'Mongo has started';
});


var grocerySchema = new Schema ({
  item: String,
  qty: Number
})

var Item = mongoose.model('Item', grocerySchema);

router.post('/item/newitem', function(request, response){
  console.log('Requesting to add an item with', request.body);
  var item = new Item({item: request.body.listItem, qty: request.body.qty});
  item.save(function(err){
    if (err) {
      console.log('item', err);
    }
    response.send(item);
  });
});

router.get('/items', function(request, response){
  Item.find({}).exec(function(err, items){
    if (err) {
      throw new Error(err);
    }
    response.send(JSON.stringify(items));
  });
});

// route for updating items goes below, current version not working
router.put('/item/update/:_id/:item/:qty', function(request, response){
  Item.findByIdAndUpdate(request.params._id, { item: request.params.item, qty: request.params.qty}, function(err){
    console.log(err);
  });
});

//route for deleting items will go here
router.delete('/item/deleteitem/:_id', function(request, response){
  console.log('id on server', request.params._id);
  Item.findById(request.params._id, function(err, Item){
    if (err) {
      log('Could not remove item, error: ', err)
    }
    Item.remove();
  })
});

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../../public/views/index.html'));
});

module.exports = router;
