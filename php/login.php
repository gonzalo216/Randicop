<?php

$servidor = "localhost";
$usuario = "id19792673_datos";
$clave = "";
$bdd = "id19792673_prueba";

$enlace = mysqli_connect($servidor, $usuario, $clave, $bdd);


if(!$enlace)
{
    echo"Error en la conexion con el servidor";
}


if(isset($_POST['registrarse'])){
    $Nombre = $_POST["nomb"];
    $Contraseña = $_POST["pass"];
    


    $insertar = "INSERT INTO datos (Nombre,Contraseña) VALUES('$Nombre',
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
    <script type="module">
        import alertar from "/index.html";
        alertar();
        window.location.href = "/index.html";
    </script>
</body>
</html>