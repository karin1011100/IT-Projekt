angular.module("app").factory("userService", userService);

userService.$inject = ["$http"];

function userService($http) {

	return {
		GetUsers: getUsers
	}

	function getUsers() {

		return $http.get("src/api/getAllUsers");

	}
}