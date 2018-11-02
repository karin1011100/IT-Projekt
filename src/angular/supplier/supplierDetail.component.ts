angular.module("app").component("supplierDetailComponent", {
	templateUrl: "./src/angular/supplier/supplierDetail.component.html",
	controller: addSupplierController
});

addSupplierController.$inject = ["$location", "supplierService"];

function addSupplierController($location, supplierService) {

   var vm = this;
   
   vm.Save = save;

   vm.Company = "";
   vm.FirstName = "";
   vm.LastName = "";
   vm.Email = "";
   vm.MobileNumber = "";
   vm.Fax = "";
   vm.Address = "";
   vm.City = "";

   function save(){
      var supplier = {
         Company: vm.Company,
         FirstName: vm.FirstName,
         LastName: vm.LastName,
         Email: vm.Email,
         MobileNumber: vm.MobileNumber,
         Fax: vm.Fax,
         Address: vm.Address,
         City: vm.City
      };

      supplierService.AddNewSupplier(supplier).then(function(result){
         $location.url("/supplier");
      }).catch(function(error){
         console.log("Error:", error);
      });
   }
   
   function change(supplier){
       var supplier = {
          Company: supplier.Company,
          FirstName: supplier.FirstName,
          LastName: supplier.LastName,
          Email: supplier.Email,
          MobileNumber: supplier.MobileNumber,
          Fax: supplier.Fax,
          Address: supplier.Address,
          City: supplier.City
       };

       supplierService.AddNewSupplier(supplier).then(function(result){
          $location.url("/supplier");
       }).catch(function(error){
          console.log("Error:", error);
       });
    }
}