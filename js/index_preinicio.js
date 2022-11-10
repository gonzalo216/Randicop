import { crearJugs, resetJugs } from "./desarrollo/variables.js";
import { updateJson } from "./edicion/crear_formulario.js";
import insertar from "./edicion/insertar_html.js";
import { resetear } from "./index_desarrollo.js";
import { iniciarpre } from "./index_edicion.js";
const d = document,
  $index = d.getElementById("index"),
  $volver = d.querySelector(".volver-svg");
d.addEventListener("DOMContentLoaded", async (e) => {
  await insertar("./edicion.html");
  $index.setAttribute("src", "/js/index_edicion.js");
  iniciarpre();
});
d.addEventListener("click", async (e) => {
  if (e.target.matches(".mImg") || e.target.matches(".mImg *")) {
    updateJson();
    crearJugs();
    await insertar("./desarrollo.html");
    $index.setAttribute("src", "/js/index_desarrollo.js");
    resetear();
    $volver.id = "volverPre";
  }
  if (e.target.matches(".btn-final > button:first-child")) {
    resetJugs();
    await insertar("./desarrollo.html");
    resetear();
  }
  if (e.target.matches(".btn-final > button:last-child")) {
    insertEdicion();
    $volver.id = "volverIni";
  }
  if (e.target.matches("#volverIni")) {
    window.location.href = "/index.html";
  }
  if (e.target.matches("#volverPre")) {
    $volver.id = "volverIni";
    insertEdicion();
  }
});
async function insertEdicion() {
  await insertar("./edicion.html");
  $index.setAttribute("src", "/js/index_edicion.js");
  iniciarpre();
}
