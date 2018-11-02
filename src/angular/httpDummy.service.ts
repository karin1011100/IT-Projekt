angular.module("app").factory("httpDummy", myService);

myService.$inject = ["$http"];
function myService($http) {

	return {
		CallHttp: callhttp
	}


	function callhttp() {

		//return $http.get("localohost...")
		//console.log("httpCall");

	}
}