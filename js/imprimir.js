import { esperar } from "./funciones.js";
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
const agregarC = (corazones, img, midImg = null) =>{
    const text = [];
    for (let i = 0; i < corazones-1; i+=2)
        text.push(`<img src="./../assets/${img}.png">​`);
    if (corazones % 2 === 1) text.push(`<img src="./../assets/${midImg}.png">​`);
    return text.join('');
}
export function titulo(text){ 
    const $p = d.createElement("p");
    $p.innerHTML = text
    $transcurso.at(-1).appendChild($p);
}
export function vidaDefault(vida, bol = false){
    vidaTotal();
    imprimir(agregarC(vida, "cRojo", "midRojo"), "vida jugador", "div", bol);
}
export function vidaTotal(){
    imprimir(agregarC(20, "cBlanco"), "vida total", "div");
}
export function vidaExtra(extra){
    imprimir(agregarC(extra, "cAmari"), "vida extra", "div");
}
export function danoInsta(dano, bol = true){
    imprimir(agregarC(dano, "cVerde", "midVerde"), "vida anterior", "div", bol);
}
export function curar(cura, bol = true){
    imprimir(agregarC(cura, "cRojoOpaco", "midRojoOpaco"), "vida anterior", "div", bol);
}
export function texto(text, bol = false){
    imprimir(text, "texto", "p", bol, true);
}
const $text = d.createElement(`p`);
export function imprimir(text, clas, el, fin = false, texto = false){
    const $contenedor = d.createElement("div");
    $contenedor.className = "linea";

    const $el = d.createElement(`${el}`);
        
    if (texto){
        $text.className = `${clas}`;
        $text.innerHTML = text;
    }
    else
    {
        $el.className = `${clas}`;
        $el.innerHTML = text;
        $text.appendChild($el);
    }
    const $linea = d.createElement("div")
    $linea.innerHTML = $text.innerHTML;
    $linea.className = $text.className;
    if (fin){
        $contenedor.appendChild($linea);
        $transcurso.at(-1).lastElementChild.appendChild($contenedor);
    }
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
    (hayValor("cont sig"))
    ? d.getElementById("sig").textContent ="SIGUIENTE"
    : (fin)
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

