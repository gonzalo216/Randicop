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
export function imprimir(text, vida = null, dano = null, cura = null, extra = null){
    const $contenedor = d.createElement("div"),
        $texto = d.createElement("p");
    $contenedor.className = "linea";
    $texto.className = "texto";
    $texto.innerHTML = text;
    if (vida !== null){
        const $vidaJugador = d.createElement("div"),
        $vidaTotal =d.createElement("div"),
        $vidaAnterior = d.createElement("div"),
        $vidaExtra = d.createElement("div");
        $vidaJugador.className = "vida jugador";
        $vidaTotal.className = "vida total";
        $vidaAnterior.className = "vida anterior";
        $vidaExtra.className = "vida extra";
        if(extra){
            $vidaExtra.innerHTML = agregarC(extra, "cAmari");
            $texto.appendChild($vidaExtra);
        }
        
        $vidaTotal.innerHTML = agregarC(20, "cBlanco");
        $vidaJugador.innerHTML = agregarC(vida, "cRojoOpaco", "midRojoOpaco");
        $texto.appendChild($vidaTotal);
        $texto.appendChild($vidaJugador);
        if (dano){
            $vidaAnterior.innerHTML = agregarC(dano, "cVerde", "midVerde");
            $texto.appendChild($vidaAnterior);
        }
        if (cura){
            if (cura > 20) cura = 20;
            $vidaAnterior.innerHTML = agregarC(cura, "cRojo", "midRojo");
            $texto.appendChild($vidaAnterior);
        }
    } 
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

