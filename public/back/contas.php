<?php
    require_once 'conexao.php';
    $arrDados = $_REQUEST;
    $arrMessage = array();

    if($arrDados["acao"] == "insert"){
        $data = json_decode($arrDados["data"]);
        $nmconta = mysql_real_escape_string($data->{'nmconta'});
        $fgtipo = mysql_real_escape_string($data->{'fgtipo'});
        
        $sql = "INSERT INTO tecontas (nmconta, fgtipo) VALUES ('".$nmconta."', ".$fgtipo.")";
	
        if(mysql_query($sql)){
            $data->{'idcontas'} = mysql_insert_id();
            $arrMessage['success'] = true;
            $arrMessage['message'] = "Registro salvo com sucesso!";
            $arrMessage['data'] = $data;		
	}else{
		$arrMessage['success'] = false;
		$arrMessage['message'] = "Erro ao salvar no banco de dados!";
	}
	
	 echo json_encode($arrMessage);
    }elseif($arrDados["acao"] == "update"){
        $idcontas =  mysql_real_escape_string($arrDados['idcontas']);
        $nmconta = mysql_real_escape_string($arrDados['nmconta']);
        $fgtipo = mysql_real_escape_string($arrDados['fgtipo']);
        
        $sql = "UPDATE tecontas SET nmconta = '".$nmconta."', fgtipo = '".$fgtipo."' WHERE idcontas = ".$idcontas;
	
        if(mysql_query($sql)){
            $arrMessage['success'] = true;
            $arrMessage['message'] = "Registro atualizado com sucesso!";	
	}else{
		$arrMessage['success'] = false;
		$arrMessage['message'] = "Erro ao salvar no banco de dados!";
	}
	
	 echo json_encode($arrMessage);          
    }elseif($arrDados["acao"] == "delete"){
        $arrContas = $arrDados["id"];
        
        for ($i = 0; $i < count($arrContas); $i++) {
            $idConta = mysql_real_escape_string($arrContas[$i]);
            
            $sql = "DELETE FROM tecontas WHERE idcontas = ".$idConta;
            if(!mysql_query($sql)){
                echo json_encode(array(
                    "success" => false,
                    "message" => 'Erro na exclusão'
                ));
                break;
            }            
        }
        
        echo json_encode(array(
            "success" => true,
            "message" => 'Registro(s) excluído(s) com sucesso'
        ));                
    }else{
        //campo de ordenação
        $sort = $arrDados['sort'] ? $arrDados['sort'] : '1';
        //fgtipo de ordenacao
        $dir = $arrDados['dir'] ? $arrDados['dir'] : 'ASC';
        $order = $sort . ' ' . $dir;        

        $sql = "SELECT idcontas, nmconta, fgtipo FROM tecontas ORDER BY ".mysql_real_escape_string($order);

        if($arrDados["start"] !== null && $arrDados["start"] !== 'start' && $arrDados["limit"] !== null && $arrDados["limit"] !== 'limit'){
            $inicio = ($arrDados["page"] - 1);
            $inicio *= $arrDados["limit"];

            $sql .= " LIMIT " . $inicio . " , " . $arrDados["limit"];             
        }
         
        $objRs = mysql_query($sql);
        $arrBanco = array();

        while($objRow = mysql_fetch_assoc($objRs)){
            $arrBanco[] = $objRow;
        }         
        
        $sql = "SELECT COUNT(*) AS total FROM tecontas";
        $total = mysql_fetch_array(mysql_query($sql));

        echo json_encode(array(
            "data" => $arrBanco,
            "success" => true,
            "inicio" => $inicio,
            "total" => $total['total']
        ));
    }
    
    mysql_close(); 
?>
