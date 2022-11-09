import { deleteJson, getJson, putJson } from "./edicion/crear_formulario.js";
import { toggleDescription } from "./edicion/toggle_description.js";

const d = document;
export function iniciarpre() {
  getJson(5);
}
d.addEventListener("click", (e) => {
  if (e.target.matches("#mas") || e.target.matches("#mas *")) putJson();
  if (e.target.matches("#menos") || e.target.matches("#menos *"))
    deleteJson(false);
  if (e.target.matches(`button[name="id"]`)) deleteJson(e.target);
  if (e.target.matches("summary") || e.target.matches("summary *")) {
    toggleDescription();
  }
});
