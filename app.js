
 /*
  *Create the Angular Module - Our app main module..
  * Inject the ngRoute module, ngRoute module provides routing and deeplinking services
  * and directives our App
 */
angular.module('userApp',['ngRoute']);

 /*
 * config function of angular Allow us to register work which needs to be performed on
 * module loading.
 * We need routing for our application we do routing configuration in the angular 
  * config function
 * */
angular.module('userApp').config(function ($routeProvider) {

 $routeProvider.when("/",{
      templateUrl : 'home.html',
      controller : 'homeCtrl', 
    })
 .when("/users",{
      //   a path to an html template that would be displayed when route is users 
         templateUrl : 'users.html',  
         controller : 'usersCtrl' 
 }).when("/users/:userID",{ 
// userID is $routeParam parameter that is accessible in userDetailCtrl 
            templateUrl : 'userDetail.html',
            controller : 'userDetailCtrl'
  }).otherwise("/");
})

 // create the our User Controller that contain all business login for add delete users. 
  //and inject the $scope
 angular.module('userApp').controller('homeCtrl',function($scope,userService){
     $scope.headerMessage = "Welcome to User App";

 });


 // create the our User Controller that contain all business login for add delete users.
// and inject the $scope
angular.module('userApp').controller('usersCtrl',function($scope,userService){
    // Blank New User Object
    $scope.newUser = {};

    // Array of Users: that contain the user List
    $scope.users = userService.users;

    // Add new User
    $scope.addUser = function(user){
        userService.addUser(user,function(isUserAdded){
            $scope.newUser = {};
        });
    };
    $scope.deleteUser = userService.deleteUser;

});
 // create the our User Controller that contain all business login for add delete users. 
 //and inject the $scope
 angular.module('userApp').controller('userDetailCtrl',function($scope,$routeParams,userService){
      // our controller get access to route parameter(userID) via the AngularJS $routeParams service
      var userID = $routeParams.userID;
     userService.getUserForID(userID,function(user){
         $scope.user = user;
     });

 });

