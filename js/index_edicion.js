import insertar from "./edicion-desarrollo.js";
import crearFormulario from "./edicion/crear_formulario.js";
const d = document,
  $desarrolloJs = d.getElementById("index");
d.addEventListener("DOMContentLoaded", (e) => {
  crearFormulario();
});
d.addEventListener("click", (e) => {
  if (e.target.matches(".iniciar")) {
    e.preventDefault();
    insertar("./desarrollo.html");
    $desarrolloJs.setAttribute("src", "./../js/index_desarrollo.js");
  }
});
