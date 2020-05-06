<?php

    $limite = $_GET['qnt'];

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT');

    include_once("conecxaoBanco.php");

    if ($link) {
        if ($limite == 1)  {
            $query = "select * from usuarios LIMIT 10";
        }
        else {
            $query = "select * from usuarios LIMIT " . ($limite * 10) . ", 10";
        }

       $result = mysqli_query($link,$query);
       $num_rows = mysqli_num_rows($result);
  
        if ($num_rows > 0) {

            foreach ($result as $key) {
                $informacoes[] =array( $key['usuario'], $key['senha']); 
            }

            echo json_encode($informacoes);
        }
    }
?>