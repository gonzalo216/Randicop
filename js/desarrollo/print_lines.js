import { $transcurso, copySize } from "./print_blocks.js";

const d = document;
export function titulo(text, clas = null) {
  const $p = d.createElement("section");
  if (clas) $p.className = clas;
  $p.innerHTML = text;
  $transcurso.at(-1).appendChild($p);
}
export function crearBotones(si, no, clas = null) {
  const $template = d.getElementById("tem-decidir").content,
    $clone = d.importNode($template, true);
  if (clas) $clone.firstElementChild.className = clas;
  $clone.getElementById("btn-si").innerHTML = si;
  $clone.getElementById("btn-no").innerHTML = no;
  $transcurso.at(-1).lastElementChild.appendChild($clone);
  copySize();
}
export async function decidir(si, no) {
  const eleccion = new Promise((resolve, reject) => {
    d.addEventListener("click", (e) => {
      if (e.target.matches("#btn-si")) resolve(true);
      if (e.target.matches("#btn-no")) resolve(false);
    });
  });
  crearBotones(si, no);
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
  const $template = d.getElementById("tem-linea").content;
  $template.querySelector(clas).innerHTML = text;
  if (addClass) $template.querySelector(clas).className += addClass;
  if (fin) {
    const $clone = d.importNode($template, true);
    if (!$clone.querySelector(".vida-extra").innerHTML)
      $clone.querySelector(".vida-extra").remove();
    if (!$clone.querySelector(".vida-total").innerHTML)
      $clone.querySelector(".bar").remove();
    $transcurso.at(-1).lastElementChild.appendChild($clone);
    $template.querySelectorAll(".icon").forEach((el) => (el.innerHTML = ""));
    $template.querySelector(".texto").className = "texto";
    copySize();
  }
}
const printIcons = (corazones, img, midImg = null) => {
  const text = [];
  for (let i = 0; i < corazones - 1; i += 2)
    text.push(`<img src="/assets/bar/${img}.png">​`);
  if (corazones % 2 === 1)
    text.push(`<img src="/assets/bar/${midImg}.png">​`);
  return text.join("");
};
function vidaTotal() {
  imprimir(printIcons(20, "heartNo"), ".vida-total");
}
function armarTotal() {
  imprimir(printIcons(20, "armorNo"), ".arm-total");
}
function armar(armadura) {
  let escudo = Object.values(armadura).reduce(
    (total, actual) => total + actual,
    0
  );
  imprimir(printIcons(escudo, "armorOne", "armorHalf"), ".armadura");
}
function vidaDefault(vida) {
  imprimir(printIcons(vida, "heartOne", "heartHalf"), ".vida-jugador");
}
export function vidaExtra(extra) {
  imprimir(printIcons(extra, "goldOne", "goldHalf"), ".vida-extra");
}
export function danoInsta(dano, bol = false) {
  imprimir(printIcons(dano, "damagOne", "damagHalf"), ".vida-anterior", bol);
}
export function curar(cura, bol = false) {
  imprimir(
    printIcons(cura > 20 ? 20 : cura, "addOne", "addHalf"),
    ".vida-anterior",
    bol
  );
}
export function texto(text, jug, bol = true) {
  if (jug) {
    vidaTotal();
    armarTotal();
    armar(jug.armadura);
    if (jug.vida > 20) jug.vida = 20;
    vidaDefault(jug.vida);
  }
  imprimir(text, ".texto", bol);
}
export async function haySit() {
  if ($transcurso.at(-1).lastElementChild.lastElementChild.tagName !== "DIV") {
    imprimir("&middot;&middot;&middot;", ".texto", true, " vacio");
  }
}
export function crearProgreso(valor) {
  const $template = d.getElementById("tem-progreso").content,
    $progress = d.importNode($template, true);
  $progress.querySelector("h4").innerHTML = "DRAGON";
  $progress.querySelector("meter").value = valor;
  $transcurso.at(-1).lastElementChild.appendChild($progress);
}
export function updateProgreso(valor) {
  const $meter = $transcurso.at(-1).querySelector("meter");
  $meter.value = valor > 200 ? 200 : valor;
}
