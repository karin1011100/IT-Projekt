angular.module("app").component("home", {
	templateUrl: "./src/angular/app.component.html",
	controller: myController
})

myController.$inject = ["supplierService"];

function myController(supplierService) {

	var vm = this;

   vm.$onInit = $onInit;
   vm.CountSupplier = 0;
   vm.CountRating = 0;

	function $onInit() {
      supplierService.CountSupplier().then(function(result){
         vm.CountSupplier = result.data['suppliers'];
      });

      supplierService.CountRating().then(function(result){
         vm.CountRating = result.data['ratings'];
      });
	}
}