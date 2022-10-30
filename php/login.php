<?php

$servidor = "localhost";
$usuario = "root";
$clave = "";
$bdd = "prueba";

$enlace = mysqli_connect($servidor, $usuario, $clave, $bdd);


if(!$enlace)
{
    echo"Error en la conexion con el servidor";
}


if(isset($_POST['registrarse'])){
    $Nombre = $_POST["nomb"];
    $Contraseña = $_POST["pass"];
    $ID = 0;


    $insertar = "INSERT INTO datos VALUES('ID',
                                          '$Nombre',
                                          '$Contraseña')";

    $ejecutarInsertar = mysqli_query($enlace, $insertar);

    if(!$ejecutarInsertar){
        echo"Error en la linea de sql";
    }
}
?>

<html>
<head>

</head>
<body>
    <h1>GENIAL!, YA HAS INGRESADO</h1>
    <a href= ./../html/index.html>Volver</a>
</body>
</html>