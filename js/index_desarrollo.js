import { anterior, siguiente } from "./desarrollo/imprimir.js";
import evento from "./desarrollo/situaciones.js";

const d = document,
  btnAnt = d.getElementById("ant");
evento();
btnAnt.disabled = true;
d.addEventListener("click", (e) => {
  if (e.target.matches("#sig")) {
    siguiente();
  }
  if (e.target.matches("#ant")) {
    anterior();
  }
});
