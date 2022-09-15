const $div = document.getElementById("imprimir")
const contenedor = [];
export function imprimir(text){
    text = `<p>${text}</p>`;
    contenedor.push(text);
    $div.innerHTML = contenedor.join('');
}
