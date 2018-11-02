angular.module("app").factory("supplierService", supplierService);

supplierService.$inject = ["$http", "$uibModal"];

function supplierService($http, $uibModal) {

	return {
      GetAllSupplier: getAllSupplier,
      GetSupplier: getSupplier,
      GetEvaluationById: getEvaluationById,
      GetProductCategories: getProductCategories,
      GetAllRatings: getAllRatings,
      RateSupplier: rateSupplier,
      AddNewSupplier: addNewSupplier,
      GetAllProductsByCategoryId: getAllProductsByCategoryId,
      GetAllProductSupplier: getAllProductSupplier,
      AddNewRating: addNewRating,
      CountSupplier: countSupplier,
      CountRating: countRating,
      GetProductsBySupplierId: getProductsBySupplierId,
      DeleteSupplier: deleteSupplier
	}

	function getAllSupplier() {
		return $http.get("src/api/getAllSupplier");
   }
   
   function getSupplier(id){
      return $http.get("src/api/getSupplier/", {params: {supplierId: id}});
   }

   function getEvaluationById(id){
      return $http.get("src/api/getEvaluationById/", {params: {supplierId: id}});
   }

   function getProductCategories(){
      return $http.get("src/api/getAllProductCategories");
   }

   function getAllRatings(){
      return $http.get("src/api/getAllRatings");
   }

   function rateSupplier() {
      var modalInstance = $uibModal.open({
            animation: true,
            component: "rateSupplierController",
            resolve: {
            }
      });
      return modalInstance;
   }

   function addNewSupplier(supplier){
      return $http.post("src/api/addNewSupplier", supplier);
   }
   
   /*function changeSupplier(supplier){
       return $http.post("src/api/changeSupplier", supplier);
   }*/
   
   function deleteSupplier(supplier){
       return $http.post("src/api/deleteSupplier", {params: {supplierId: supplier}});
   }

   function getAllProductsByCategoryId(id){
      return $http.get("src/api/getAllProductsByCategoryId", {params: {categoryId: id}});
   }

   function getAllProductSupplier(){
      return $http.get("src/api/getAllProductSupplier");
   }

   function addNewRating(rating){
      return $http.post("src/api/addNewRating", rating);
   }

   function countSupplier(){
      return $http.get("src/api/countSupplier");
   }

   function countRating(){
      return $http.get("src/api/countRating");
   }

   function getProductsBySupplierId(supplierId){
      return $http.get("src/api/getProductsBySupplierId", {params: {supplier_id: supplierId}});
   }
}