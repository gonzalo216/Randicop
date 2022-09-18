import "./lista_situaciones.js";
import evento from "./situaciones.js";
const d = document;
evento();
d.addEventListener("click", e =>{
    if(e.target.matches("#sig")) evento();
})
