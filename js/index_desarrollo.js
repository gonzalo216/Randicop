import { esperar } from "./desarrollo/funciones.js";
import { anterior, iniciar, siguiente } from "./desarrollo/print_blocks.js";
import evento, { Hola } from "./desarrollo/situaciones.js";

const d = document,
  btnAnt = d.getElementById("ant");
(async function () {
  await esperar(0.1);
  iniciar();
  evento();
  btnAnt.disabled = true;
  //Hola();
})();
d.addEventListener("click", (e) => {
  if (e.target.matches("#sig")) {
    siguiente();
  }
  if (e.target.matches("#ant")) {
    anterior();
  }
});
