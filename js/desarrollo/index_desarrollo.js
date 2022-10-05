import { anterior, siguiente } from "./imprimir.js";
import evento from "./situaciones.js";

const d = document,
  btnAnt = d.getElementById("ant");
console.log("hola");
//d.addEventListener("DOMContentLoaded", (e) => {
evento();
btnAnt.disabled = true;
//});
d.addEventListener("click", (e) => {
  if (e.target.matches("#sig")) {
    siguiente();
  }
  if (e.target.matches("#ant")) {
    anterior();
  }
});
