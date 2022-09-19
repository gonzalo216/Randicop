import evento, { apurar } from "./situaciones.js";

const d = document,
    $divPadre = d.getElementById("imprimir"),
    $transcurso = [],
    $texto = d.createElement("p");
$texto.className = "texto";
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
    let text = new String("");
    for (let i = 0; i < corazones-1; i+=2)
        text += `<img src="./../assets/${img}.png">​`;
    if (corazones % 2 === 1) text += `<img src="./../assets/${midImg}.png">​`;
    return text;
}
export function titulo(text){ 
    const $p = d.createElement("p");
    $p.innerHTML = text
    $transcurso.at(-1).appendChild($p);
}
export function vidaDefault(vida){
    const $corazones = d.createElement("div");
    $corazones.className = "vida jugador";
    $corazones.innerHTML = agregarC(vida, "cRojo", "midRojo");
    $texto.appendChild($corazones);
}
export function vidaTotal(){
    const $corazones = d.createElement("div");
    $corazones.className = "vida total";
    $corazones.innerHTML = agregarC(20, "cBlanco");
    $texto.appendChild($corazones);
}
export function vidaExtra(extra){
    const $corazones = d.createElement("div");
    $corazones.className = "vida extra";
    $corazones.innerHTML = agregarC(extra, "cAmari");
    $texto.appendChild($corazones);
}
export function danoInsta(dano){
    const $corazones = d.createElement("div");
    $corazones.className = "vida anterior";
    $corazones.innerHTML = agregarC(dano, "cVerde", "midVerde");
    $texto.appendChild($corazones);
}
export function curar(cura){
    const $corazones = d.createElement("div");
    $corazones.className = "vida anterior";
    $corazones.innerHTML = agregarC(cura, "cRojoOpaco", "midRojoOpaco");
    $texto.appendChild($corazones);
}


export function imprimir(text){
    const $contenedor = d.createElement("div");
    $contenedor.className = "linea";
    $texto.innerHTML = text;
    vidaTotal();
    $contenedor.appendChild($texto);
    $transcurso.at(-1).lastElementChild.appendChild($contenedor);
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

