<?php

session_start();

require_once "conexao.php";
//Get como POST
$arrDados = $_REQUEST;
$arrRetorno = array();
$arrRetorno["success"] = false;
$arrRetorno["erro"]["motivo"] = "Erro no usuario ou dssenha";
$_SESSION["idUsuario"] = "";
$_SESSION["NmUsuario"] = "";

if($arrDados["acao"] == "login"){
    $sql = "SELECT idusuario, nmusuario FROM teusuario WHERE dslogin = '" . mysql_real_escape_string($arrDados["dslogin"]) . "' AND dssenha = '" . mysql_real_escape_string($arrDados["dssenha"]) . "'";
    $objRow = mysql_fetch_array(mysql_query($sql));

    if($objRow["idusuario"] <> ""){
        $arrRetorno["success"] = true;
        $_SESSION["idusuario"] = $objRow["idusuario"];
        $_SESSION["nome"] = $objRow["nmusuario"];
        unset($arrRetorno["erro"]);
    }
}

echo json_encode($arrRetorno);
mysql_close();
