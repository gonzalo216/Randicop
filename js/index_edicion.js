import { deleteJson, getJson, putJson } from "./edicion/crear_formulario.js";
import { toggleDescription } from "./edicion/toggle_description.js";

const d = document;
let jugIni = 5;
export const updateJugIni = (n) => jugIni = n;
export function iniciarpre() {
  getJson(jugIni);
}
d.addEventListener("click", (e) => {
  if (e.target.matches(".protag-div"))
    e.target.firstElementChild.checked = !e.target.firstElementChild.checked;
  if (e.target.matches("#mas")) putJson();
  if (e.target.matches("#menos")) deleteJson(false);
  if (e.target.matches(`button[name="id"]`)) deleteJson(e.target);
  if (e.target.matches("summary") || e.target.matches("summary *")) {
    toggleDescription();
  }
});
