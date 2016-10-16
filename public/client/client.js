angular.module('groceryList', []);

angular.module('groceryList').controller("MainController", function($http){
  var vm = this;

    var sendData = {};
    vm.items = [];
   var fetchItems = function() {
        $http.get('/items').then(function(response){
           if(response.status !== 200){
               throw new Error('Failed to fetch items');
           }
           vm.items = response.data;
           console.log(response.data);
       });
   };

    vm.addItem = function(){

      sendData.listItem = vm.listItem;
      sendData.qty = vm.qty;
      console.log('Clicked');
      $http.post('/item/newitem', sendData).then(fetchItems());
  };

  vm.updateItem = function(item){
    console.log(item.item, item.qty);
   $http.put('item/update/' + item._id + '/' + item.item + '/' + item.qty).then(fetchItems());
  };

  vm.removeItem = function(item){
    //console.log(item._id);
    $http.delete('/item/deleteitem/' + item._id).then(fetchItems());
  };

  fetchItems();



  });
