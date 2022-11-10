import { updateJugIni } from "/js/index_edicion.js";
import { json } from "/json/nombres.js";

const d = document,
  array = [0, 1, 2, 3, 4];

export function getJson(num) {
  const $template = d.querySelector("template").content,
    $fragment = d.createDocumentFragment();
  for (let i = 0; i < num; i++) {
    if (!json[array[i]]) return;
    const el = json[array[i]];
    $template.querySelector(`input[name="nombre"]`).value = el.name;
    $template.querySelector(`button[name="id"]`).dataset.id = array[i];

    let $clone = d.importNode($template, true);
    $fragment.appendChild($clone);
  }
  d.querySelector(".flex").appendChild($fragment);
}
export function putJson() {
  console.log(d.querySelectorAll(`button[name="id"]`));
  const $template = d.querySelector("template").content,
    $fragment = d.createDocumentFragment(),
    $ids = [];
  d.querySelectorAll(`button[name="id"]`).forEach((el) =>
    $ids.push(el.dataset.id)
  );
  let i = Object.keys(json).findIndex((el) => {
    if (!$ids.includes(el)) return el;
  });
  if (i === -1) return;

  const el = json[i];
  $template.querySelector(`input[name="nombre"]`).value = el.name;
  $template.querySelector(`button[name="id"]`).dataset.id = i;

  let $clone = d.importNode($template, true);
  $fragment.appendChild($clone);
  d.querySelector(".flex").appendChild($fragment);
}
export function deleteJson(target) {
  updateJson();
  const $celdas = d.querySelectorAll(".celda");
  if ($celdas.length !== 1) {
    if (!target) {
      $celdas[$celdas.length - 1].remove();
      return;
    }
    $celdas.forEach((el) => {
      if (
        el.querySelector(`button[name="id"]`).dataset.id === target.dataset.id
      )
        el.remove();
    });
  }
}
export function updateJson() {
  const $celdas = d.querySelectorAll(".celda");
  while (array.length > 0) array.pop();
  updateJugIni($celdas.length);
  $celdas.forEach(($celda) => {
    let id = $celda.querySelector(`button[name="id"]`).dataset.id;
    json[id].name = $celda.querySelector(`input[name="nombre"]`).value;
    array.push(id);
  });
}
export function resetJson() {
  const $celdas = d.querySelectorAll(".celda");
  while (array.length > 0) array.pop();
  $celdas.forEach(($celda, i) => {
    $celda.querySelector(`button[name="id"]`).dataset.id = i;
    $celda.querySelector(`input[name="nombre"]`).value = `Steve ${i + 1}`;
  });
  json.forEach((el, i) => (el.name = `Steve ${i + 1}`));
}
