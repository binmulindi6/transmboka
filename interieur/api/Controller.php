<?php
    require("api.php");
    $api = new Api();
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
            if(isset($_REQUEST['get_all_datas'])){
                $data = $api->getAllData();
            }

            if(isset($_REQUEST['get_single_data']) && isset($_REQUEST['code_unique'])){
                $data = $api->getData($_REQUEST['code_unique']);
            }
    }
    

   if (isset($data) && $data != null) {
    echo json_encode($data, JSON_PRETTY_PRINT);
    } else {
        header("HTTP/1.0 404  Not Found");
    }

    
?>