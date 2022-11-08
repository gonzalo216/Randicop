<?php

$servidor = "localhost";
$usuario = "id19797305_randicopuser";
$clave = "}e2qV_IPUu%[>)8l";
$bdd = "id19797305_mysqlrandicop";

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
        alert("Ingreso exitoso");
        window.location.href = "/index.html";
    </script>
</body>
</html>