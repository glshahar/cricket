var app = angular.module('app',['ngRoute', 'LocalStorageModule']);

var model = {
	user:""
};

// Set Prefix
app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('cricket');
});

// Set Storage Type
app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setStorageType('sessionStorage');
});

// Set Default to Cookie
app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setDefaultToCookie(false);
});

// Set Storage Cookie
//Set cookie options (usually in case of fallback)
//expiry: number of days before cookies expire (0 = session cookie). default: 30
//path: the web path the cookie represents. default: '/'
//secure: whether to store cookies as secure. default: false
app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setStorageCookie(45, '/', false);
});

//Set the cookie domain
app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setStorageCookieDomain('');
});

//Set Notify
app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setNotify(true, true);
});

//SETTT
app.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('app')
    .setStorageType('sessionStorage')
    .setNotify(true, true)
});

app.controller('myCtrl', function($scope, $http, localStorageService){

	$scope.todo = model;

    $scope.checkLogin = function(){
    	console.log("User X logged in");
        var user = {
            'email': $scope.email,
            'password': $scope.password
        };
        $http.post('http://localhost:3000/checkLogin', user)
            .then(function(data){
                $scope.email = data.data.email;
                // $scope.password = data.data.password;

                localStorageService.set('email', data.data.email);
                localStorageService.set('password', data.data.password);
                localStorageService.set('products', data.data.products);

                $scope.products = localStorageService.get('products');


                // Get saved data from sessionStorage
                // var data = sessionStorage.getItem('email');
                console.log(data);
                // $scope.products = [];
                // for (var i = 0, l = data.products.length; i < l; i++) {
                //   $scope.products[i] = data.products[i];
                // }
                // var products = {name:'123',tom:'456',fff:'789'};
                // var log = [];
                $scope.connected = 1;
                // angular.forEach(products, function(value){
                //     console.log(value);
                // }, log);
                return console.log("Connected successfully");
        });
    };
    $scope.logOut = function(){
        console.log("User X has logged out");
        $scope.connected = 0;
    };
});