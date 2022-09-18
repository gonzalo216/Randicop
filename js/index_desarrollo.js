import { anterior, desHabi, siguiente } from "./imprimir.js";
import evento, { apurar } from "./situaciones.js";
const d = document;
evento();
desHabi();
d.addEventListener("click", e =>{
    if(e.target.matches("#sig")) {
        siguiente()
    }
    if(e.target.matches("#ant")) {
        anterior();
    }
})
