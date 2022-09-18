const d = document,
    $divPadre = d.getElementById("imprimir"),
    $transcurso = [],
    contenedor = [];
let primero = true;
export function crearDiv(){
    if (primero) primero=false;
    else{
        $transcurso.at(-1).className = "anterior";
    }
    $transcurso.push(d.createElement("div"));
    $transcurso.at(-1).className="actual";
    $divPadre.appendChild($transcurso.at(-1));
    while(contenedor.length>0) contenedor.pop();

}
export function imprimir(text){
    text = `<p>${text}</p>`;
    contenedor.push(text);

    $transcurso.at(-1).innerHTML = contenedor.join('');
}
