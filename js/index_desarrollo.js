import { anterior, iniciar, siguiente } from "./desarrollo/imprimir.js";
import evento, { Hola } from "./desarrollo/situaciones.js";

const d = document,
  btnAnt = d.getElementById("ant");
iniciar();
evento();
btnAnt.disabled = true;
Hola();
d.addEventListener("click", (e) => {
  if (e.target.matches("#sig")) {
    siguiente();
  }
  if (e.target.matches("#ant")) {
    anterior();
  }
});
