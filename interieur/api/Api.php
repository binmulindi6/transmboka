<?php

use PDO;


class Api extends DB
{
    public function getActivite($id)
    {   
        
        
        $conn = $this->activiteCommerciale();
        $sql = "SELECT * FROM activite_commerciale WHERE code_unique_activ='$id'";
        $stmt = $conn->prepare($sql);
        // die();
        $stmt->execute();
        
        $activ = $stmt->fetchAll(PDO::FETCH_OBJ)[0];
        return $activ;
    }
    
    public function getActivites()
    {   
        $conn = $this->activiteCommerciale();
        $sql = "SELECT * FROM activite_commerciale";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        
        $activ = $stmt->fetchAll(PDO::FETCH_OBJ);
        return $activ;
    }
    
    public function getAssujetti($id)
    {   
        $conn = $this->assujetties();
        $sql = "SELECT * FROM assujetti WHERE id_assujetti='$id'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();

        $activ = $stmt->fetchAll(PDO::FETCH_OBJ)[0];

        return $activ;
    }

    public function getProprietaire($id)
    {   
        $conn = $this->mairie();
        
        $sql = "SELECT * FROM activites INNER JOIN affectation_assuj ON id_activ_fk = id_activite INNER JOIN proprietaire ON id_prop_fk = id_prop WHERE id_activ_com='$id'";
        $stmt = $conn->prepare($sql);
        $stmt->execute();
        $activ = $stmt->fetchAll(PDO::FETCH_OBJ)[0];

        return $activ;
    }


    public function getData($code)
    {   
        $activite = $this->getActivite($code);
        
        $prop = $this->getProprietaire($activite->id_activ);
        $assujetti = $this->getAssujetti($prop->id_assujetti);
        
        $data = [];
        $data['activite'] = [];
        $data['activite']['code_unique'] = $activite->code_unique_activ;
        $data['activite']['nom_activ'] = $activite->nom_activ;
        $data['activite']['long'] = $activite->longitude_activ;
        $data['activite']['lat'] = $activite->latitude_activ;
        $data['activite']['ville'] = $activite->ville_activ;
        $data['activite']['commune'] = $activite->commune_activ;
        $data['activite']['quartier'] = $activite->quartier_activ;
        $data['activite']['avenue'] = $activite->avenue_activ;
        $data['activite']['numero'] = $activite->num_domicile_activ;
        
        $data['proprietaire'] = [];
        $data['proprietaire']['nom'] = $assujetti->nom_assujetti;
        $data['proprietaire']['postnom'] = $assujetti->postnom_assujetti;
        $data['proprietaire']['prenom'] = $assujetti->prenom_assujetti;
        

        return $data;
    }
    
    public function getAllData()
    {   
        $activites = $this->getActivites();
        
        $datas = [];
        
        foreach($activites as $activite){
        $prop = $this->getProprietaire($activite->id_activ);
        $assujetti = $this->getAssujetti($prop->id_assujetti);
        
        $data = [];
        $data['activite'] = [];
        $data['activite']['code_unique'] = $activite->code_unique_activ;
        $data['activite']['nom_activ'] = $activite->nom_activ;
        $data['activite']['long'] = $activite->longitude_activ;
        $data['activite']['lat'] = $activite->latitude_activ;
        $data['activite']['ville'] = $activite->ville_activ;
        $data['activite']['commune'] = $activite->commune_activ;
        $data['activite']['quartier'] = $activite->quartier_activ;
        $data['activite']['avenue'] = $activite->avenue_activ;
        $data['activite']['numero'] = $activite->num_domicile_activ;
        
        $data['proprietaire'] = [];
        $data['proprietaire']['nom'] = $assujetti->nom_assujetti;
        $data['proprietaire']['postnom'] = $assujetti->postnom_assujetti;
        $data['proprietaire']['prenom'] = $assujetti->prenom_assujetti;

        $datas[] = $data;
        
        }
        
        var_dump($datas);
    }


    public  function test()
    {
        echo ("This i it");
        // var_dump($this->find(1));
    }

    // public function getSpecificData($id,$colums){
    //     $col
    // }

}


class DB
{

    protected  $ds_activite_com = "mysql:host=localhost;dbname=etranspo_activite_commerciale";
    protected  $ds_assujeties = "mysql:host=localhost;dbname=etranspo_assujettis";
    protected  $ds_mairie = "mysql:host=localhost;dbname=etranspo_mairie";
    protected  $user = "etranspo_user";
    protected  $password = "wm@sOIsh@NIL";
    public     $conn;
    // public     $affectationTable ="affectation_gardiens_sg";
    // public     $carteGardienTable ="carte_gardien";
    // public     $gardienTable ="gardiens";
    // public     $societeDeGardiennageTable ="societe_de_gardiennage";

    // public function __construct()
    // {
    //     $this->conn=$this->connection();
    // }
    public function activiteCommerciale()
    {
        try {
            $conn = new PDO($this->ds_activite_com, $this->user, $this->password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            if ($conn) {
                return $conn;
            }
        } catch (PDOExecption $e) {
            return "cant connect to the db" . $e->getMessage();
        }
    }
    public function mairie()
    {
        
        try {
            $conn = new PDO($this->ds_mairie, $this->user, $this->password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            if ($conn) {
                return $conn;
            }else{
                
            }
        } catch (PDOExecption $e) {
            return "cant connect to the db" . $e->getMessage();
        }
    }
    public function assujetties()
    {
        try {
            $conn = new PDO($this->ds_assujeties, $this->user, $this->password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            if ($conn) {
                return $conn;
            }
        } catch (PDOExecption $e) {
            return "cant connect to the db" . $e->getMessage();
        }
    }
}


// $api = new Api();
// var_dump($api->test());
