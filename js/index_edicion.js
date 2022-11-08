import { crearFormulario } from "./edicion/crear_formulario.js";
import { toggleDescription } from "./edicion/toggle_description.js";

const d = document;
export function iniciarpre() {
  crearFormulario(5);
}
d.addEventListener("click", (e) => {
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
