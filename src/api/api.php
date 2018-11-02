<?php
error_reporting(E_ALL);
 	require_once("Rest.inc.php");
	
	class API extends REST {
	
		public $data = "";
		
		const DB_SERVER = "127.0.0.1";
		const DB_USER = "root";
		const DB_PASSWORD = "";
		const DB = "it_project";

		private $db = NULL;
		private $mysqli = NULL;
		public function __construct(){
			parent::__construct();				// Init parent contructor
			$this->dbConnect();					// Initiate Database connection
		}
		
		/*
		 *  Connect to Database
		*/
		private function dbConnect(){
			$this->mysqli = new mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB);
		}
		
		/*
		 * Dynmically call the method based on the query string
		 */
		public function processApi(){
			$func = strtolower(trim(str_replace("/","",$_REQUEST['x'])));
			if((int)method_exists($this,$func) > 0)
				$this->$func();
			else
				$this->response('',404); // If the method not exist with in this class "Page not found".
		}
		
		
		/* 
		 * Get customers 
		 * ML 20170927
		 */
		
		private function getAllUsers(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT e.last_name, e.first_name, e.email_address, e.business_phone FROM employee e order by e.last_name";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200);
			}
			$this->response('',204);
		}
            
      private function getAllSupplier(){
         if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT * FROM supplier ORDER BY company";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
            $result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200);
			}
			$this->response('',204);
      }

      private function getSupplier(){
         if($this->get_request_method() != "GET"){
				$this->response('',406);
         }
         $id = $this->_request['supplierId'];
			$query="SELECT * FROM supplier WHERE id=$id ORDER BY company";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
            $result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200);
			}
			$this->response('',204);
      }

      private function getEvaluationById(){
         if($this->get_request_method() != "GET"){
				$this->response('',406);
         }
         //$id = 1;
         $id = $this->_request['supplierId'];
			$query="SELECT * FROM `rating` WHERE `supplier_id`=$id AND `date` > DATE_SUB(now(), INTERVAL 12 MONTH) ORDER BY `date`";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
            $result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200);
			}
			$this->response('',204);
      }

      private function getAllProductCategories(){
         if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT * FROM product_category ORDER BY category";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
            $result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200);
			}
			$this->response('',204);
      }

      private function getAllRatings(){
         if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT * FROM rating ORDER BY id";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
            $result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200);
			}
			$this->response('',204);
      }

      private function addNewSupplier(){
         if($this->get_request_method() != "POST"){
				$this->response('',406);
         }

         $supplier = json_decode(file_get_contents("php://input"),true);

         $query = "INSERT INTO supplier (company, last_name, first_name, email_address, business_phone, fax_number, address, city) VALUES ('".$supplier['Company']."', '".$supplier['LastName']."', '".$supplier['FirstName']."', '".$supplier['Email']."', '".$supplier['MobileNumber']."', '".$supplier['Fax']."', '".$supplier['Address']."', '".$supplier['City']."')";

         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

         $success = array('status' => "Success", "msg" => "Supplier Created Successfully.", "data" => $supplier);
         
         $this->response($this->json($success),200);
      }
      
      private function deleteSupplier(){
      	if($this->get_request_method() != "POST"){
				$this->response('',406);
         }

         $supplier = json_decode(file_get_contents("php://input"),true);
         echo "Supplier $supplier";

         $query = "DELETE FROM supplier WHERE id='".$supplier."'";

			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

         $success = array('status' => "Success", "msg" => "Supplier Created Successfully.", "data" => $supplier);
         
         $this->response($this->json($success),200);



      }

      private function getAllProductsByCategoryId(){
         if($this->get_request_method() != "GET"){
				$this->response('',406);
         }

         $id = $this->_request['categoryId'];
			$query="SELECT * FROM `product` WHERE `category_id`=$id";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
            $result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200);
			}
			$this->response('',204);
      }

      private function getAllProductSupplier(){
         if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT * FROM product_supplier";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
            $result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200);
			}
			$this->response('',204);
      }

      private function addNewRating(){
         // TODO: implement fully working user system => user_id always set to 1 for now
         if($this->get_request_method() != "POST"){
				$this->response('',406);
         }

         $rating = json_decode(file_get_contents("php://input"),true);

         $query = "INSERT INTO rating (user_id, supplier_id, price, service, customer_service, delivery_time, delivery_state, punctual, `date`) VALUES (1, '".$rating['supplier_id']."', '".$rating['price']."', '".$rating['service']."', '".$rating['customer_service']."', '".$rating['delivery_time']."', '".$rating['delivery_state']."', '".$rating['punctual']."', '".date('Y-m-d')."')";

         $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

         $success = array('status' => "Success", "msg" => "Supplier rated successfully.", "data" => $rating);
         
         $this->response($this->json($success),200);
      }

      private function countSupplier(){
         if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query = "SELECT COUNT(id) AS suppliers FROM supplier";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

         $count = $r->fetch_assoc();
         $this->response($this->json($count), 200);
      }

      private function countRating(){
         if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query = "SELECT COUNT(id) AS ratings FROM rating";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

         $count = $r->fetch_assoc();
         $this->response($this->json($count), 200);
      }

      private function getProductsBySupplierId(){
         if($this->get_request_method() != "GET"){
				$this->response('',406);
         }

         $id = $this->_request['supplier_id'];
			$query="SELECT product.id, product.category_id, product.product_code, product.product_name, product.price FROM product INNER JOIN product_supplier ON product.id = product_supplier.product_id WHERE product_supplier.supplier_id =$id";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
            $result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200);
			}
			$this->response('',204);
      }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		private function login(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$email = $this->_request['email'];		
			$password = $this->_request['pwd'];
			if(!empty($email) and !empty($password)){
				if(filter_var($email, FILTER_VALIDATE_EMAIL)){
					$query="SELECT uid, name, email FROM users WHERE email = '$email' AND password = '".md5($password)."' LIMIT 1";
					$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

					if($r->num_rows > 0) {
						$result = $r->fetch_assoc();	
						// If success everythig is good send header as "OK" and user details
						$this->response($this->json($result), 200);
					}
					$this->response('', 204);	// If no records "No Content" status
				}
			}
			
			$error = array('status' => "Failed", "msg" => "Invalid Email address or Password");
			$this->response($this->json($error), 400);
		}
		
		private function customers(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$query="SELECT distinct c.customerNumber, c.customerName, c.email, c.address, c.city, c.state, c.postalCode, c.country FROM angularcode_customers c order by c.customerNumber desc";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);

			if($r->num_rows > 0){
				$result = array();
				while($row = $r->fetch_assoc()){
					$result[] = $row;
				}
				$this->response($this->json($result), 200); // send user details
			}
			$this->response('',204);	// If no records "No Content" status
		}
		private function customer(){	
			if($this->get_request_method() != "GET"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){	
				$query="SELECT distinct c.customerNumber, c.customerName, c.email, c.address, c.city, c.state, c.postalCode, c.country FROM angularcode_customers c where c.customerNumber=$id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				if($r->num_rows > 0) {
					$result = $r->fetch_assoc();	
					$this->response($this->json($result), 200); // send user details
				}
			}
			$this->response('',204);	// If no records "No Content" status
		}
		
		private function insertCustomer(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}

			$customer = json_decode(file_get_contents("php://input"),true);
			$column_names = array('customerName', 'email', 'city', 'address', 'country');
			$keys = array_keys($customer);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the customer received. If blank insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $customer[$desired_key];
				}
				$columns = $columns.$desired_key.',';
				$values = $values."'".$$desired_key."',";
			}
			$query = "INSERT INTO angularcode_customers(".trim($columns,',').") VALUES(".trim($values,',').")";
			if(!empty($customer)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Customer Created Successfully.", "data" => $customer);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	//"No Content" status
		}
		private function updateCustomer(){
			if($this->get_request_method() != "POST"){
				$this->response('',406);
			}
			$customer = json_decode(file_get_contents("php://input"),true);
			$id = (int)$customer['id'];
			$column_names = array('customerName', 'email', 'city', 'address', 'country');
			$keys = array_keys($customer['customer']);
			$columns = '';
			$values = '';
			foreach($column_names as $desired_key){ // Check the customer received. If key does not exist, insert blank into the array.
			   if(!in_array($desired_key, $keys)) {
			   		$$desired_key = '';
				}else{
					$$desired_key = $customer['customer'][$desired_key];
				}
				$columns = $columns.$desired_key."='".$$desired_key."',";
			}
			$query = "UPDATE angularcode_customers SET ".trim($columns,',')." WHERE customerNumber=$id";
			if(!empty($customer)){
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Customer ".$id." Updated Successfully.", "data" => $customer);
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// "No Content" status
		}
		
		private function deleteCustomer(){
			if($this->get_request_method() != "DELETE"){
				$this->response('',406);
			}
			$id = (int)$this->_request['id'];
			if($id > 0){				
				$query="DELETE FROM angularcode_customers WHERE customerNumber = $id";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "msg" => "Successfully deleted one record.");
				$this->response($this->json($success),200);
			}else
				$this->response('',204);	// If no records "No Content" status
		}
		
		/*
		 *	Encode array into JSON
		*/
		private function json($data){
			if(is_array($data)){
				return json_encode($data);
			}
		}
	}
	
	// Initiiate Library
	
	$api = new API;
	$api->processApi();
?>