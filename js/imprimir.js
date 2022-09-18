import evento, { apurar } from "./situaciones.js";

const d = document,
    $divPadre = d.getElementById("imprimir"),
    $transcurso = [];
let primero = true;
export function crearDiv(){
    
    if (primero) primero=false;
    else{
        $transcurso.at(-1).className = "cont anterior";
    }
    $transcurso.push(d.createElement("div"));
    $transcurso.at(-1).className="cont actual";
    $divPadre.appendChild($transcurso.at(-1));
}
export function imprimir(text){
    const $contenedor = d.createElement("p")
    $contenedor.innerHTML = text;
    $contenedor.className = "parrafo";
    $transcurso.at(-1).appendChild($contenedor);
}

let fin = false;
let hayValor = (valor) =>($transcurso.findIndex(el=>el.className===valor) !== -1) ? true : false;
export function desHabi(){
    (hayValor("cont anterior"))
        ? d.getElementById("ant").disabled = false
        : d.getElementById("ant").disabled = true; 
}
export function completo(bol = fin){
    fin = bol;
    (!hayValor("cont sig") && fin)
            ? d.getElementById("sig").textContent ="SIGUIENTE"
            : d.getElementById("sig").textContent ="Completar";
}
export function siguiente(){
    if (hayValor("cont sig")){
    $transcurso.at($transcurso.findIndex(el=>el.className==="cont actual")).className="cont anterior";
    $transcurso.at($transcurso.findIndex(el=>el.className==="cont sig")).className="cont actual";
    completo();
    }
    else {
        if (d.getElementById("sig").textContent === "SIGUIENTE") evento();
        else apurar();
        completo(false)
        d.getElementById("sig").textContent ="Completar";
    }
    desHabi();
}
export function anterior(){
    if (hayValor("cont anterior")){
    $transcurso.at($transcurso.findIndex(el=>el.className==="cont actual")).className="cont sig";
    $transcurso.at($transcurso.findLastIndex(el=>el.className==="cont anterior")).className="cont actual";
    d.getElementById("sig").textContent ="SIGUIENTE";
    } 
    desHabi();
}

