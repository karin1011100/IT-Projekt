angular.module("app").component("supplierOverviewComponent", {
	templateUrl: "./src/angular/supplier/supplierOverview.component.html",
	controller: supplierOverviewController
});

supplierOverviewController.$inject = ["$location", "supplierService"];

function supplierOverviewController($location, supplierService) {

	var vm = this;
	vm.Suppliers = [];

   vm.$onInit = $onInit;
   vm.SupplierDetail = supplierDetail;
   vm.RateSupplier = rateSupplier;
   vm.DeleteSupplier = deleteSupplier;
   vm.NewRating = false;
   vm.SupplierSearch = "";
   vm.supplierId = "";

	function $onInit() {
		supplierService.GetAllSupplier().then(function(result){
         vm.Suppliers = result.data;
		});
   }
   
   function supplierDetail(){
      $location.url("!#/detail");
   }

   function rateSupplier(){
      supplierService.RateSupplier().result.then(function(result){
         vm.NewRating = true;
         console.log("daten vong eingabe", result);
      }, function(){
         // cancelled
      });
   }
   
   function deleteSupplier(supplierId){       
       supplierService.deleteSupplier(supplierId).then(function(result){
           $location.url("/supplier");
       }).catch(function(error){
          console.log("Error:", error);
       })
   }
}