var express = require('express');
var router = require('express').Router();
var path = require('path');
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/grocery-list');

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
// router.put('/editbyitemname/:item/:newname', function(request, response){
//
//   var name = request.params.name;
//   var newName = request.params.newname;
//
//   items.findById(request.params.name, function(err, newName){
//     if(err){
//       console.log(err);
//       response.sendStatus(500);
//     } else {
//
//       items.item = newName;
//
//       item.save(function(err){
//         if(err){
//           console.log('Error', err);
//           response.sendStatus(500);
//         } else {
//           console.log('Saved');
//           response.sendStatus(200);
//         }
//       });
//
//     }
//   });
// });

//route for deleting items will go here


router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../../public/views/index.html'));
});

module.exports = router;
