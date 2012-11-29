<?php
require_once 'conexao.php';
$arrDados 	= $_REQUEST; 
$arrMessage = array(); 

if($arrDados["acao"] == "graficoTotal"){
    $sql_total = "SELECT
                        sum(tf.nuvalor) as total,
                        tc.nmconta as conta
                FROM
                        tefluxo tf
                INNER JOIN
                        tecontas tc
                ON
                        tc.idcontas = tf.tecontas_idcontas
                GROUP BY
                        tc.nmconta
                ";

    $objRs = mysql_query($sql_total);
    $arrBanco = array(); 

    while($objRow = mysql_fetch_assoc ($objRs)){
            $arrBanco[] = $objRow; 	
    }		                

    echo json_encode(array(
        "data" => $arrBanco,
        "success" => true			
    ));    
    
}else if($arrDados["acao"] == "graficoDia"){
    $sql_total = "SELECT
                        sum(tf.nuvalor) as total,
                        tf.dtfluxo as data,
                        if(tc.fgtipo = 1, 'Receber', 'Pagar') as tipo
                FROM
                        tefluxo tf
                INNER JOIN
                        tecontas tc
                ON
                        tc.idcontas = tf.tecontas_idcontas
                GROUP BY
                        tc.fgtipo, tf.dtfluxo
                ";

    $objRs = mysql_query($sql_total);
    $arrBanco = array(); 

    while($objRow = mysql_fetch_assoc ($objRs)){
            $arrBanco[] = $objRow; 	
    }		                

    echo json_encode(array(
        "data" => $arrBanco,
        "success" => true			
    ));     
}

mysql_close();

?>
