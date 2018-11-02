(function(){
   "use strict";

   angular.module("app").component("customEvaluationController", {
      templateUrl: "./src/angular/evaluation/custom.evaluation.component.html",
      controller: customEvaluationController
   });

   customEvaluationController.$inject = ["supplierService"];

   function customEvaluationController(supplierService) {

      var vm = this;
      vm.$onInit = init;
      vm.SelectedProductCategory = null;
      vm.ProductCategories = [];
      vm.Criterions = [];
      vm.Ratings = [];
      vm.Suppliers = [];
      vm.SelectedSuppliers = [];
      vm.ProductSuppliers = [];
      vm.Criterion1 = "";
      vm.Criterion2 = "";
      vm.Options = null;
      vm.Data = [];
      vm.Config = {
         visible: true, // default: true
         extended: false, // default: false
         disabled: false, // default: false
         refreshDataOnly: true, // default: true
         deepWatchOptions: true, // default: true
         deepWatchData: true, // default: true
         deepWatchDataDepth: 2, // default: 2
         debounce: 10 // default: 10
     };
     vm.Criterion1FullName = "";
     vm.Criterion2FullName = "";

     vm.Calculate = calculate;

      function init(){
         supplierService.GetProductCategories().then(function(result){
            vm.ProductCategories = result.data;
        });

        supplierService.GetAllRatings().then(function(result){
            vm.Ratings = result.data;
        });

        supplierService.GetAllSupplier().then(function(result){
            vm.Suppliers = result.data;
        });

        supplierService.GetAllProductSupplier().then(function(result){
         vm.ProductSuppliers = result.data;
        });

        fillCriterions();

        fillChart();
      }

      function fillCriterions(){
         vm.Criterions.push(
            {id: "price", name: "Preis"},
            {id: "service", name: "Service"},
            {id: "customer_service", name: "Kundenservice"},
            {id: "delivery_time", name: "Lieferzeit"},
            {id: "delivery_state", name: "Zustand"},
            {id: "punctual", name: "Pünktlichkeit"}
         );
      }

      function fillChart(){
         vm.Options = {
            chart: {
                type: 'scatterChart',
                height: 800,
                width: 800,
                color: d3.scale.category10().range(),
                scatter: {
                    onlyCircles: false
                },
                showDistX: true,
                showDistY: true,
                tooltipContent: function(key) {
                    return '<h3>' + key + '</h3>';
                },
                duration: 350,
                xAxis: {
                    axisLabel: vm.Criterion1FullName,
                   ticks:10,
                   showMaxMin:true
                    },
                xDomain:[0,5],
                yAxis: {
                    axisLabel: vm.Criterion2FullName,
                    ticks:10,
                    showMaxMin:true},
                                    
                  yDomain:[0,5],
                zoom: {
                    //NOTE: All attributes below are optional
                    enabled: false,
                    scaleExtent: [1, 10],
                    useFixedDomain: true,
                    useNiceScale: false,
                    horizontalOff: false,
                    verticalOff: false,
                    unzoomEventType: 'dblclick.zoom'
                },
                pointRange: [100, 300]
            }
        };

        // vm.Data = generateData(4,40);
       // console.log(vm.Data);
      // console.log(vm.Options);
      }

      function generateData(groups, points) { //# groups,# points per group
         var data = [],
             shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
             random = d3.random.normal();

         for (var i = 0; i < groups; i++) {
             data.push({
                 key: 'Group ' + i,
                 values: [],
                 //slope: Math.random() - .01, // Linie
                 intercept: Math.random() - .5
             });

             for (var j = 0; j < points; j++) {
                 data[i].values.push({
                     x: random(),
                     y: random(),
                     size: Math.random(),
                     shape: shapes[j % 6]
                 });
             }
         }
         return data;
     }

      function calculate(){
         var products;
         var currentRatings = [];
         var supplierName = "";

         var criterionValue1 = 0;
         var criterionValue2 = 0;

         vm.Criterion1FullName = getCriterionName(vm.Criterion1);
         vm.Criterion2FullName = getCriterionName(vm.Criterion2);
         fillChart();

         vm.Data = [];

         supplierService.GetAllProductsByCategoryId(vm.SelectedProductCategory).then(function(result){
            products = result.data;

            for(var i=0; i < products.length; i++){
               for(var j=0; j < vm.ProductSuppliers.length; j++){
                  if(products[i].id === vm.ProductSuppliers[j].product_id){
                     if(!vm.SelectedSuppliers.includes(vm.ProductSuppliers[j].supplier_id)){
                        vm.SelectedSuppliers.push(vm.ProductSuppliers[j].supplier_id);
                     }
                  }
               }
            }

            for(var i = 0; i < vm.SelectedSuppliers.length; i++){
               for(var j = 0; j < vm.Ratings.length; j++){
                  if(vm.SelectedSuppliers[i] === vm.Ratings[j].supplier_id){
                     currentRatings.push(vm.Ratings[j]);
                  }
               }

               for(var r = 0; r < currentRatings.length; r++){
                  criterionValue1 = criterionValue1 + Number(currentRatings[r][vm.Criterion1]);
                  criterionValue2 = criterionValue2 + Number(currentRatings[r][vm.Criterion2]);
               }

               criterionValue1 = Number(criterionValue1 / currentRatings.length).toFixed(1);
               criterionValue2 = Number(criterionValue2 / currentRatings.length).toFixed(1);
               
               for(var s = 0; s < vm.Suppliers.length; s++){
                  if(vm.Suppliers[s].id === vm.SelectedSuppliers[i]){
                     supplierName = vm.Suppliers[s].company;
                  }
               }

               if(!(isNaN(criterionValue1) || isNaN(criterionValue1))){
                  vm.Data.push({
                     key: supplierName,
                     values: [{
                        x: criterionValue1,
                        y: criterionValue2,
                        size: currentRatings.length*10,
                        shape: getShape(currentRatings, criterionValue1, criterionValue2) //"circle"
                     }],
                     intercept: Math.random() - .5
                  });
               }

               criterionValue1 = 0;
               criterionValue2 = 0;
               supplierName = "";
               currentRatings = [];
            }
            //console.log("Final data", vm.Data);
            //console.log("Generierte daten", generateData(4,40));
            //console.log("Config", vm.Config);
         });

      }

      function getCriterionName(criterionId){
         if(vm.Criterions === null)
            return "ERROR";

         for(var i=0;i<vm.Criterions.length;i++){
            if(vm.Criterions[i].id === criterionId)
               return vm.Criterions[i].name;
         }
      }

      function getShape(currentRatings, x, y){
         if(currentRatings !== null){
            var newX = 0;
            var newY = 0;
            var combinedNew = 0;
            var combinedOld = (Number(x) + Number(y)).toFixed(1);
            var ratingCount;

            // sort array by date (thx to Daniel H.)
            currentRatings.sortBy(function(o){ return o.date });

            ratingCount = Number(Math.floor(currentRatings.length * 0.8));

            if(ratingCount < 2)
               return "circle";

            for(var i = 0; i < ratingCount; i++){
               newX = newX + Number(currentRatings[i][vm.Criterion1]);
               newY = newY + Number(currentRatings[i][vm.Criterion2]);
            }

            newX = Number(newX / ratingCount).toFixed(1);
            newY = Number(newY / ratingCount).toFixed(1);

            combinedNew = (Number(newX) + Number(newY)).toFixed(1);


            if((combinedNew - combinedOld) > -0.3 && (combinedNew - combinedOld) < 0.3)
               return "circle";

            if(combinedNew < combinedOld)
               return "triangle-down";
            
            return "triangle-up";


            
         }

      }

      (function(){
         if (typeof Object.defineProperty === 'function'){
           try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
         }
         if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;
       
         function sb(f){
           for (var i=this.length;i;){
             var o = this[--i];
             this[i] = [].concat(f.call(o,o,i),o);
           }
           this.sort(function(a,b){
             for (var i=0,len=a.length;i<len;++i){
               if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
             }
             return 0;
           });
           for (var i=this.length;i;){
             this[--i]=this[i][this[i].length-1];
           }
           return this;
         }
       })();
   }
})();