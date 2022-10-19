import juego, { apurar, final } from "./situaciones.js";

const d = document;
var btnSig, btnAnt;
let primero = true;
export const $transcurso = [];
export function iniciar() {
  (btnSig = d.getElementById("sig")), (btnAnt = d.getElementById("ant"));
}

export function crearDiv() {
  if (!primero) $transcurso.at(-1).className = "cont anterior";
  primero = false;
  $transcurso.push(d.createElement("article"));
  $transcurso.at(-1).className = "cont actual";
  d.getElementById("imprimir").appendChild($transcurso.at(-1));
}

const hayValor = (valor) =>
    $transcurso.findIndex((el) => el.className === valor) !== -1 ? true : false,
  contenidoSig = (valor) =>
    $transcurso.at($transcurso.findIndex((el) => el.className === valor)),
  contenidoAnt = (valor) =>
    $transcurso.at($transcurso.findLastIndex((el) => el.className === valor)),
  desHabi = () => {
    hayValor("cont anterior")
      ? (btnAnt.disabled = false)
      : (btnAnt.disabled = true);
  };

export async function copySize() {
  const $tamanio = d.getElementById("tamanio");
  $tamanio.innerHTML = contenidoSig("cont actual").innerHTML;
}

let escrito = false;
export function completo(bol = escrito, fin = false) {
  escrito = bol;
  hayValor("cont sig")
    ? (btnSig.textContent = "SIGUIENTE")
    : escrito
    ? fin
      ? (btnSig.textContent = "FINALIZAR")
      : (btnSig.textContent = "SIGUIENTE")
    : (btnSig.textContent = "Completar");
}
export function siguiente() {
  if (hayValor("cont sig")) {
    contenidoSig("cont actual").className = "cont anterior";
    contenidoSig("cont sig").className = "cont actual";
    copySize();
    completo();
    if (contenidoSig("cont sig").id === "fin") btnSig.textContent = "FINALIZAR";
    if (contenidoSig("cont actual").id === "fin") btnSig.disabled = true;
  } else {
    if (btnSig.textContent === "FINALIZAR") {
      final();
      $transcurso.at(-1).id = "fin";
      btnSig.disabled = true;
      return;
    }
    if (btnSig.textContent === "SIGUIENTE") juego();
    else apurar();
    completo(false);
    btnSig.textContent = "Completar";
  }
  desHabi();
}
export function anterior() {
  if (hayValor("cont anterior")) {
    contenidoAnt("cont actual").className = "cont sig";
    contenidoAnt("cont anterior").className = "cont actual";
    contenidoSig("cont sig").id === "fin"
      ? (btnSig.textContent = "FINALIZAR")
      : (btnSig.textContent = "SIGUIENTE");
  }
  desHabi();
  btnSig.disabled = false;
  copySize();
}
