import { crearJugs, resetJugs } from "./desarrollo/variables.js";
import insertar from "./edicion/insertar_html.js";
import crearFormulario from "./edicion/crear_formulario.js";
import { toggleDescription } from "./edicion/toggle_description.js";
import { resetear } from "./index_desarrollo.js";
import { iniciarpre } from "./index_edicion.js";
const d = document,
$index = d.getElementById("index");
d.addEventListener("DOMContentLoaded", async (e) => {
  await insertar("./edicion.html");
  $index.setAttribute("src", "/js/index_edicion.js");
  iniciarpre();
});
d.addEventListener("click", async (e) => {
  if (e.target.matches(".mImg") || e.target.matches(".mImg *")) {
    crearJugs();
    await insertar("./desarrollo.html");
    $index.setAttribute("src", "/js/index_desarrollo.js");
    resetear();
  }
  if (e.target.matches(".btn-final > button:first-child")) {
    resetJugs();
    await insertar("./desarrollo.html");
    resetear();
  }
  if (e.target.matches(".btn-final > button:last-child")) {
    await insertar("./edicion.html");
    $index.setAttribute("src", "/js/index_edicion.js");
    iniciarpre();
  }
  if (e.target.matches("#mas") || e.target.matches("#mas *")) {
    crearFormulario(1);
  }
  if (e.target.matches("#menos") || e.target.matches("#menos *")) {
    crearFormulario(0, true);
  }
  if (e.target.matches("summary") || e.target.matches("summary *")) {
    toggleDescription();
  }
});
