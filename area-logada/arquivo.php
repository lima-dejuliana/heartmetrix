<?php


class Arquivo
{
    private $nomedoarquivo;

    public function renomeiaArquivo($img, $imgErro, $imgTipo, $imgTmp, $tPasta)
    {
        if ($imgErro !== 0 || empty($img)) {
            return false; // Retorna falso se houver erro no upload ou o arquivo estiver vazio
        }
        $nome_arquivo = $img;
        $this->nomedoarquivo = md5(date("Y-m-d H:i:s") . $nome_arquivo);
        $tipoPermitido = array(
            0 => 'image/jpg',
            1 => 'image/jpeg',
            2 => 'image/bmp',
            3 => 'image/x-ms-bmp',
            4 => 'image/png'
        );
        switch ($imgTipo) {
            case 'image/jpg':
                $this->nomedoarquivo .= '.jpg';
                break;
            case 'image/png':
                $this->nomedoarquivo .= '.png';
                break;
            case 'image/jpeg':
                $this->nomedoarquivo .= '.jpeg';
                break;
            case 'image/x-ms-bmp':
            case 'image/bmp':
                $this->nomedoarquivo .= '.bmp';
                break;
                // case 'application/pdf':
                //     $this->nomedoarquivo .= '.pdf';
                //     break;
                // case 'application/zip':
                //     $this->nomedoarquivo .= '.zip';
                //     break;
            default:
                $this->nomedoarquivo = 'false';
        }
        // $this->movePasta($imgTmp, $this->nomedoarquivo, $tPasta);
        // return $this->nomedoarquivo;
        return $this->movePasta($imgTmp, $this->nomedoarquivo, $tPasta); // Retorna o resultado da função movePasta
    }

    public function movePasta($arquivoTmp, $arquivo, $tPasta)
    {
        $parentDir = dirname(__FILE__);
        $caminho = $parentDir . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $tPasta . DIRECTORY_SEPARATOR;
        //$urlFull = $_SERVER['HTTP_HOST'] . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $tPasta . DIRECTORY_SEPARATOR;
        $urlFull = 'https://deploy.rai.com.br/heartmetrix/' . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . $tPasta . DIRECTORY_SEPARATOR;


        if (!file_exists($caminho)) {
            mkdir($caminho, 0777, true);
        }
        if (move_uploaded_file($arquivoTmp, $caminho . $arquivo)) {
            //return true;
            return $urlFull . $arquivo; // Retorna o caminho completo junto com o nome do arquivo
        } else {
            return false;
        }
    }
}
