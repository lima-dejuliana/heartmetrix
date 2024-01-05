<?php
require 'arquivo.php';
$a = new Arquivo();

if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
  $value = $_FILES['file'];
  $novoArquivo = $a->renomeiaArquivo($value['name'], $value['error'], $value['type'], $value['tmp_name'], 'uploads');
  echo json_encode($novoArquivo);
} else {
  echo json_encode("Erro no upload: " . $_FILES['file']['error']);
  //echo "Erro no upload: " . $_FILES['file']['error'];
}
