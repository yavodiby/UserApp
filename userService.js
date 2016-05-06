
// Register a **service factory**, which will be called to return the service instance.
/*
 * Syntax:-  module.factory('serviceName',function fnFactory(){ return serviceInstance;})
 * AngularJS provides 'factory('serviceName', fnFactory)' method which takes two parameter, 
 * serviceName and a function
 * Create The User Service wia the Factory recipe ,
 * We create the object in userService and add some property(returnObject.users) and 
*  behaviours(addUser,deleteUser)
 * */

angular.module('userApp').factory('userService',function(){

    function getHashFromList(objectArray,key) {
        var _returnHash = {}
        if(Array.isArray(objectArray)){
            for(var i=0;i<objectArray.length;i++){
                _returnHash[objectArray[i][key]] = objectArray[i];
            }
        }
        return _returnHash;
    }
    function getUSERID(_userStr) {
        return (_userStr.toUpperCase()).replace(" ","");
    }
	function USER(user){
		this.id = getUSERID(user.name);
		this.name = user.name;
		this.age = user.age;
		this.phoneNo = user.phoneNo;
		this.address = user.address;
	}
	// Default Users
	var _users = [{id : "RICKYAVO",name:'Rick Yavo',age:12,gender:'Male',phoneNo:'1234556',
       address:'C-777 Heaven Street Sky CI'}];

	var returnObject = {};
    returnObject.getUserForID = function (userID,callback) {
        var _userHash = getHashFromList(returnObject.users,'id');
        callback(_userHash[userID]);
    }
	returnObject.users =  _users;
	// Check  either user  is duplicate or new User
	function isDuplicateUser(object,key){
		for(var i = 0;i<returnObject.users.length;i++){
			if(returnObject.users[i][key] == object[key]){return true;}
		}
		return false;
	}
	// add New User
	returnObject.addUser = function(user,callback){
		// Not allow any user that don't have the name..
		if(user.name == undefined || user.name == null || user.name.length<1){
			alert("User Name Can not be blank");
			return;
		}
		if(isDuplicateUser(user,'id')){
			alert("Duplicate User.");
		}else{
			// push new user in Users array
			returnObject.users.push(new USER(angular.copy(user)));
			// and blank the new user Object...
			callback(true);
		}
	}
	// Delete the user from Users
	returnObject.deleteUser = function(user){		/*
	 * $scope.users.indexOf(user) :- indexOf return the current index of user , 
          *that user we want to delete ..
	 * */
		returnObject.users.splice(returnObject.users.indexOf(user), 1);

	};

	return returnObject;
});

