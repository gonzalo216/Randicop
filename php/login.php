<?php

$servidor = "localhost";
$usuario = "id19792673_datos";
$clave = "-OjG5qjWg*c+]eF+";
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
        import alertar from "/js/login/login.js";
        alertar();
        setTimeout(function () {
          window.location.href = "/index.html";
        }, 1000);
    </script>
</body>
</html>