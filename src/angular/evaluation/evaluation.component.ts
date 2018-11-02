(function(){
   "use strict";

   angular.module("app").component("evaluationController", {
      templateUrl: "./src/angular/evaluation/evaluation.component.html",
      controller: evaluationController
   });

   evaluationController.$inject = ["$routeParams", "supplierService"];

   function evaluationController($routeParams, supplierService) {

      var vm = this;
      vm.$onInit = init;

      vm.ChangeCriterion = changeCriterion;
      vm.Id = null;
      vm.Ratings = [];
      vm.Evaluation = [];
      vm.Months = [];
      vm.YKeys = ['price', 'service', 'customer_service', 'delivery_time', 'delivery_state', 'punctual'];
      vm.YLabels = ['Preis', 'Service', 'Kundenservice', 'Lieferzeit', 'Zustand', 'Pünktlich'];
      vm.Colors = ['CornflowerBlue','grey','green','purple','orange','red'];
      vm.ShowPrice = true;
      vm.ShowService = true;
      vm.ShowCustomerService = true;
      vm.ShowDeliveryTime = true;
      vm.ShowDeliveryState = true;
      vm.ShowPunctual = true;

      function init(){
         vm.Id = $routeParams.supplierId;
         supplierService.GetEvaluationById(vm.Id).then(function(result){
            vm.Ratings = result.data;
            fillMonths();
            parseData();
            drawLineChart();
         });
      }

      function changeCriterion(){
         vm.YKeys = [];
         vm.YLabels = [];
         vm.Colors = [];

         $("#morris-line-chart").empty()

         if(vm.ShowPrice){
            vm.YKeys.push('price');
            vm.YLabels.push('Preis');
            vm.Colors.push('CornflowerBlue');
         }

         if(vm.ShowService){
            vm.YKeys.push('service');
            vm.YLabels.push('Service');
            vm.Colors.push('grey');
         }

         if(vm.ShowCustomerService){
            vm.YKeys.push('customer_service');
            vm.YLabels.push('Kundenservice');
            vm.Colors.push('green');
         }

         if(vm.ShowDeliveryTime){
            vm.YKeys.push('delivery_time');
            vm.YLabels.push('Lieferzeit');
            vm.Colors.push('purple');
         }

         if(vm.ShowDeliveryState){
            vm.YKeys.push('delivery_state');
            vm.YLabels.push('Zustand');
            vm.Colors.push('orange');
         }

         if(vm.ShowPunctual){
            vm.YKeys.push('punctual');
            vm.YLabels.push('Pünktlich');
            vm.Colors.push('red');
         }

         drawLineChart();
      }

      function fillMonths(){
         vm.Months[0] = "Jan";
         vm.Months[1] = "Feb";
         vm.Months[2] = "Mär";
         vm.Months[3] = "Apr";
         vm.Months[4] = "Mai";
         vm.Months[5] = "Jun";
         vm.Months[6] = "Jul";
         vm.Months[7] = "Aug";
         vm.Months[8] = "Sep";
         vm.Months[9] = "Okt";
         vm.Months[10] = "Nov";
         vm.Months[11] = "Dez";
      }

      function drawLineChart(){
         Morris.Line({
            element: 'morris-line-chart',
            data: vm.Evaluation,
            xkey: 'y',
            ykeys: vm.YKeys,//['price', 'service', 'customer_service', 'delivery_time', 'delivery_state', 'punctual'],
            labels: vm.YLabels,//['Preis', 'Service', 'Kundenservice', 'Lieferzeit', 'Zustand', 'Pünktlich'],
            lineColors: vm.Colors,
            parseTime: false,
            ymax: 5,
            ymin: 0,
            hideHover: 'auto'
         });
      }

      function parseData(){
         var counter = 0;
         var currentMonth = (new Date().getMonth() + 1) % 12;
         var priceSum, customer_serviceSum, delivery_stateSum, delivery_timeSum, punctualSum, serviceSum, counterRating, first=true, lastItem = null;

         while(counter < 12)
         {
            priceSum = 0;
            customer_serviceSum = 0;
            delivery_stateSum = 0;
            delivery_timeSum = 0;
            punctualSum = 0;
            serviceSum = 0;
            counterRating = 0;

            for(var i =0; i < vm.Ratings.length; i++)
            {
               if(new Date(vm.Ratings[i].date).getMonth() === currentMonth){
                  priceSum = priceSum + Number(vm.Ratings[i].price);
                  customer_serviceSum = customer_serviceSum + Number(vm.Ratings[i].customer_service);
                  delivery_stateSum = delivery_stateSum + Number(vm.Ratings[i].delivery_state);
                  punctualSum = punctualSum + Number(vm.Ratings[i].punctual);
                  serviceSum = serviceSum + Number(vm.Ratings[i].service);
                  delivery_timeSum = delivery_timeSum + Number(vm.Ratings[i].delivery_time);
                  counterRating++;
               }
            }

            if(first && counterRating === 0){
               vm.Evaluation.push({
                  y: vm.Months[currentMonth],
                  price: null,
                  service: null,
                  customer_service: null,
                  delivery_time: null,
                  delivery_state: null,
                  punctual: null
               });
            } else if(!first && counterRating === 0){
               lastItem = vm.Evaluation.slice(vm.Evaluation.length - 1);
               vm.Evaluation.push({
                  y: vm.Months[currentMonth],
                  price: lastItem[0].price,
                  service: lastItem[0].service,
                  customer_service: lastItem[0].customer_service,
                  delivery_time: lastItem[0].delivery_time,
                  delivery_state: lastItem[0].delivery_state,
                  punctual:lastItem[0].punctual
               });
               lastItem = null;
            } else {
               vm.Evaluation.push({
                  y: vm.Months[currentMonth],
                  price: Number(priceSum / counterRating).toFixed(1),
                  service: Number(serviceSum / counterRating).toFixed(1),
                  customer_service: Number(customer_serviceSum / counterRating).toFixed(1),
                  delivery_time: Number(delivery_timeSum / counterRating).toFixed(1),
                  delivery_state: Number(delivery_stateSum / counterRating).toFixed(1),
                  punctual: Number(punctualSum / counterRating).toFixed(1)
               });
            }
            currentMonth = (currentMonth + 1) % 12;
            first = false;
            counter++;
         }
      }
   }
})();