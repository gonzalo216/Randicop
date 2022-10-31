import { crearJugs, resetJugs } from "./desarrollo/variables.js";
import insertar from "./edicion/insertar_html.js";
import crearFormulario from "./edicion/crear_formulario.js";
import { toggleDescription } from "./edicion/toggle_description.js";
import { resetear } from "./index_desarrollo.js";
const d = document,
  $desarrolloJs = d.getElementById("index");
d.addEventListener("DOMContentLoaded", (e) => {
  crearFormulario(5);
});
d.addEventListener("click", async (e) => {
  if (e.target.matches(".mImg") || e.target.matches(".mImg *")) {
    crearJugs();
    await insertar("./desarrollo.html");
    $desarrolloJs.setAttribute("src", "/js/index_desarrollo.js");
    resetear();
  }
  if (
    e.target.matches(".btn-final:last-child") ||
    e.target.matches(".btn-final:last-child *")
  ) {
    console.log("ok");
    resetJugs();
    await insertar("./desarrollo.html");
    resetear();
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
