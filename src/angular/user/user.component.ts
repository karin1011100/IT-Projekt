angular.module("app").component("userComponent", {
	templateUrl: "./src/angular/user/user.component.html",
	controller: userComponent
})

userComponent.$inject = ["userService"];
function userComponent(userService) {

	var vm = this;
	vm.Users = [];

	vm.$onInit = $onInit;

	function $onInit() {
		userService.GetUsers().then(function(result){
			console.log("Ergebnis SQL", result);
			vm.Users = result.data;
		})
		console.log("test user service");
	}
}