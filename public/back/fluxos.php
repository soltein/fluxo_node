<?php
    require_once 'conexao.php';
    $arrDados = $_REQUEST;
    $arrMessage = array();

    if($arrDados["acao"] == "insert"){
        $data = json_decode($arrDados["data"]);
        $dsdescricao = mysql_real_escape_string($data->{'dsdescricao'});
        $dtfluxo = mysql_real_escape_string($data->{'dtfluxo'});
        $nuvalor = mysql_real_escape_string($data->{'nuvalor'});
        $tecontas_idcontas = mysql_real_escape_string($data->{'tecontas_idcontas'});
        
        $sql = "INSERT INTO tefluxo (dsdescricao, dtfluxo, nuvalor, tecontas_idcontas) VALUES ('".$dsdescricao."','".$dtfluxo."',".$nuvalor.",".$tecontas_idcontas.")";
	
        if(mysql_query($sql)){
            $data->{'idfluxo'} = mysql_insert_id();
            $arrMessage['success'] = true;
            $arrMessage['message'] = "Registro salvo com sucesso!";
            $arrMessage['data'] = $data;		
	}else{
		$arrMessage['success'] = false;
		$arrMessage['message'] = "Erro ao salvar no banco de dados!";
	}
	
	 echo json_encode($arrMessage);        
    }elseif($arrDados["acao"] == "update"){
        $idfluxo =  mysql_real_escape_string($arrDados['idfluxo']);
        $dsdescricao = mysql_real_escape_string($arrDados['dsdescricao']);
        $tecontas_idcontas = mysql_real_escape_string($arrDados['tecontas_idcontas']);
        $dtfluxo = mysql_real_escape_string($arrDados['dtfluxo']);
        $nuvalor = mysql_real_escape_string($arrDados['nuvalor']);        
        
        $sql = "UPDATE tefluxo SET dsdescricao = '".$dsdescricao."', tecontas_idcontas = ".$tecontas_idcontas.", dtfluxo = '".$dtfluxo."', nuvalor = ".$nuvalor." WHERE idfluxo = ".$idfluxo;
	
        
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
            $idfluxo = mysql_real_escape_string($arrContas[$i]);
            
            $sql = "DELETE FROM tefluxo WHERE idfluxo = ".$idfluxo;
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
        //tecontas_idcontas de ordenacao
        $dir = $arrDados['dir'] ? $arrDados['dir'] : 'ASC';
        $order = $sort . ' ' . $dir;        

        $sql = "SELECT idfluxo, dsdescricao, tecontas_idcontas, nuvalor, dtfluxo FROM tefluxo ORDER BY ".mysql_real_escape_string($order);

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
        
        $sql = "SELECT COUNT(*) AS total FROM tefluxo";
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
