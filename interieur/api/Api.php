<?php

    class Assujetti {

    protected  $dsn="mysql:host=http://localhost;dbname=etranspo_assujettis";
	protected  $user="root";
	protected  $password="root";
	// protected  $user="etranspo_user";
	// protected  $password="wm@sOIsh@NIL";
	public     $conn;
	public     $tableName ="assujeti";

        public function __construct()
        {
            $this->conn=$this->connection();
        }
        public function connection(){
            try
            {
                $conn=new PDO($this->dsn,$this->user,$this->password);
                // $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            if($conn)
            {
                return $conn ;
            }
            }
            catch(PDOExecption $e)
            {
                return "cant connect to the db".$e->getMessage();
            }
        }

        public function find($id){
            $sql="SELECT * FROM $this->tableName WHERE id_assujeti='$id'";
            $stmt=$this->conn->prepare($sql);
            $stmt->execute();

            $assujeti=$stmt->fetchAll(PDO::FETCH_OBJ);

	        return $assujeti;
        }

        public function all(){
            $sql="SELECT * FROM $this->tableName ";
            $stmt=$this->conn->prepare($sql);
            $stmt->execute();

            $assujetis=$stmt->fetchAll(PDO::FETCH_OBJ);

	        return $assujetis;
        }

        public  function test()
        {
            echo("This i it");
            // var_dump($this->find(1));
        }

        // public function getSpecificData($id,$colums){
        //     $col
        // }
    
}


class Interieur {

    protected  $dsn="mysql:host=localhost;dbname=etranspo_interieur";
	protected  $user="etranspo_user";
	protected  $password="wm@sOIsh@NIL";
	public     $conn;
	public     $affectationTable ="affectation_gardiens_sg";
	public     $carteGardienTable ="carte_gardien";
	public     $gardienTable ="gardiens";
	public     $societeDeGardiennageTable ="societe_de_gardiennage";

        public function __construct()
        {
            $this->conn=$this->connection();
        }
        public function connection(){
            try
            {
            $conn=new PDO($this->dsn,$this->user,$this->password);
            $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
            if($conn)
            {
            return $conn ;
            }
        }
        catch(PDOExecption $e)
        {
            return "cant connect to the db".$e->getMessage();
        }
    }
    
}