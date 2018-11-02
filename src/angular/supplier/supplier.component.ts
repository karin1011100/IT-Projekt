angular.module("app").component("supplierComponent", {
	templateUrl: "./src/angular/supplier/supplier.component.html",
	controller: supplierController
})

supplierController.$inject = ["$routeParams", "supplierService", "$location"];

function supplierController($routeParams, supplierService, $location) {

   var vm = this;
   
   vm.$onInit = $onInit;
   vm.Suppplier = null;
   vm.Test = "hallo";
   vm.Back = back;
   vm.ShowBarChart = false;
   vm.Products = [];

	function $onInit() {
      // load supplier & supplier rating
      supplierService.GetSupplier($routeParams.supplierId).then(function(result){
         vm.Suppplier = result.data;
      });

      supplierService.GetProductsBySupplierId($routeParams.supplierId).then(function(result){
         vm.Products = result.data;
      });
      
      drawBarChart();
   }
   
   function drawBarChart(){
      if(vm.ShowBarChart){
         Morris.Bar({
            element: 'morris-bar-chart',
            data: [{
               y: 'Preis',
               a: 10,
               b: 5
            }, {
               y: 'Service',
               a: 4,
               b: 65
            }, {
               y: 'Kundenservice',
               a: 8,
               b: 40
            }, {
               y: 'Lieferzeit',
               a: 1,
               b: 65
            }, {
               y: 'Zustand',
               a: 1,
               b: 40
            }, {
               y: 'Pünktlich',
               a: 3,
               b: 65
            }],
            xkey: 'y',
            ykeys: ['a'],
            labels: ['Bewertung', 'Series B'],
            hideHover: 'auto',
            resize: true
         });
      }
   }

   function drawBarChart2(){
      Morris.Bar({
         element: 'morris-bar-chart',
         data: [{
             y: 'Preis',
             a: 10,
             b: 1,
             c: 7,
             d: 4
         }],
         xkey: 'y',
         ykeys: ['a', 'b', 'c', 'd'],
         labels: ['Lieferant 1', 'Lieferant 1', 'Lieferant 3', 'Lieferant 4'],
         hideHover: 'auto',
         resize: true
     });
   }

   function back(){
      $location.url("it-projekt/#!/supplier/");
   }
   
}