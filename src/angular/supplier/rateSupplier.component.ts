(function(){
   "use strict";

   angular.module("app").component("rateSupplierController", {
      templateUrl: "./src/angular/supplier/rateSupplier.component.html",
      controller: rateSupplierController,
      bindings: {
         resolve: "<",
         close: "&",
         dismiss: "&"
      }
   });

   rateSupplierController.$inject = ["supplierService"];

   function rateSupplierController(supplierService) {

      var vm = this;
      vm.$onInit = init;
      vm.Save = closeOk;
      vm.Cancel = closeCancel;
      vm.Suppliers = [];
      vm.SelectedSupplier = null;
      vm.Price = null;
      vm.Service = null;
      vm.CustomerService = null;
      vm.DeliveryTime = null;
      vm.DeliveryState = null;
      vm.Punctual = null;

      function init(){
         supplierService.GetAllSupplier().then(function(result){
            vm.Suppliers = result.data;
         });
      }

      function closeOk(){
         var rating = {
            supplier_id: vm.SelectedSupplier,
            price: Number.parseInt(vm.Price),
            service: Number.parseInt(vm.Service),
            customer_service: Number.parseInt(vm.CustomerService),
            delivery_time: Number.parseInt(vm.DeliveryTime),
            delivery_state: Number.parseInt(vm.DeliveryState),
            punctual: Number.parseInt(vm.Punctual)
         };

         supplierService.AddNewRating(rating).then(function(){
            vm.close();
         }).catch(function(error){
            console.log("Error: ", error);
         });
      }

      function closeCancel(){
         vm.dismiss();
      }

   }
})();