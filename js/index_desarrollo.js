import { esperar } from "./desarrollo/funciones.js";
import { anterior, iniciar, siguiente } from "./desarrollo/print_blocks.js";
import juego, { Hola, resetEventos } from "./desarrollo/situaciones.js";

export async function resetear() {
  await esperar(0.1);
  const btnAnt = document.getElementById("ant");
  iniciar();
  resetEventos();
  juego();
  btnAnt.disabled = true;
  //Hola();
}
document.addEventListener("click", (e) => {
  if (e.target.matches("#sig")) siguiente();
  if (e.target.matches("#ant")) anterior();
});
