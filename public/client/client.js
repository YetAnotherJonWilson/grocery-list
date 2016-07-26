angular.module('groceryList', []);

angular.module('groceryList').controller("MainController", function($scope, $http){
  var vm = this;

    var sendData = {};
    $scope.items = [];
   var fetchItems = function() {
        $http.get('/items').then(function(response){
           if(response.status !== 200){
               throw new Error('Failed to fetch items');
           }
           $scope.items = response.data;
           console.log(response.data);
       });
   };

    vm.addItem = function(){

      sendData.listItem = vm.listItem;
      sendData.qty = vm.qty;
      console.log('Clicked');
      $http.post('item/newitem', sendData).then(fetchItems());
  }

  fetchItems();



  });
