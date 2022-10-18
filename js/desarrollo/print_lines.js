import { $transcurso, copySize } from "./print_blocks.js";

const d = document;
export function titulo(text, clas = null) {
  const $p = d.createElement("section");
  if (clas) $p.className = clas;
  $p.innerHTML = text;
  $transcurso.at(-1).appendChild($p);
}
export async function decidir(si, no) {
  const eleccion = new Promise((resolve, reject) => {
    d.addEventListener("click", (e) => {
      if (e.target.matches("#btn-si")) {
        console.log("toco");
        resolve(true);
      }
      if (e.target.matches("#btn-no")) {
        console.log("toco2");
        resolve(false);
      }
    });
  });
  const $template = d.getElementById("tem-decidir").content,
    $fragment = d.createDocumentFragment();
  $template.getElementById("btn-si").innerHTML = si;
  $template.getElementById("btn-no").innerHTML = no;
  let $clone = d.importNode($template, true);
  $fragment.appendChild($clone);
  $transcurso.at(-1).lastElementChild.appendChild($fragment);
  copySize();
  let result = await eleccion;
  $transcurso.at(-1).lastElementChild.lastElementChild.remove();
  $transcurso.at(-1).lastElementChild.lastElementChild.remove();
  //if (result)
  $transcurso
    .at(-1)
    .lastElementChild.lastElementChild.lastElementChild.remove();

  return result;
}
function imprimir(text, clas, fin = false, addClass = null) {
  const $template = d.getElementById("tem-linea").content,
    $fragment = d.createDocumentFragment();

  $template.querySelector(clas).innerHTML = text;
  if (addClass) $template.querySelector(clas).className += addClass;
  if (fin) {
    let $clone = d.importNode($template, true);
    $fragment.appendChild($clone);
    $transcurso.at(-1).lastElementChild.appendChild($fragment);
    copySize();
    $template.querySelectorAll(".vida").forEach((el) => (el.innerHTML = ""));
    $template.querySelector(".armadura").innerHTML = "";

    $template.querySelector(".texto").className = "texto";
  }
}
const printIcons = (corazones, img, midImg = null) => {
  const text = [];
  for (let i = 0; i < corazones - 1; i += 2)
    text.push(`<img src="./../assets/${img}.png">​`);
  if (corazones % 2 === 1) text.push(`<img src="./../assets/${midImg}.png">​`);
  return text.join("");
};
export function armar(armadura) {
  let escudo = Object.values(armadura).reduce(
    (total, actual) => total + actual,
    0
  );
  escudo = 20;
  console.log("armando");
  imprimir(printIcons(escudo, "FullArmor", "MedioArmor"), ".armadura");
}
export function vidaTotal() {
  imprimir(printIcons(20, "Hvacio"), ".vida.total");
}
export function vidaDefault(jug, bol = false) {
  vidaTotal();
  armar(jug.armadura);
  imprimir(printIcons(jug.vida, "cRojo", "Medio"), ".vida.jugador", bol);
}
export function vidaExtra(extra) {
  imprimir(printIcons(extra, "FullG", "MedioG"), ".vida.extra");
}
export function danoInsta(dano, bol = true) {
  imprimir(printIcons(dano, "FullDano", "MedioDano"), ".vida.anterior", bol);
}
export function curar(cura, bol = true) {
  imprimir(
    printIcons(cura, "FullRosa", "MedioRosa"),
    ".vida.anterior",
    bol
  );
}
export function texto(text, bol = false) {
  imprimir(text, ".texto", bol);
}
export async function haySit() {
  if ($transcurso.at(-1).lastElementChild.lastElementChild.tagName !== "DIV") {
    imprimir("&middot;&middot;&middot;", ".texto", true, " vacio");
  }
}
