class Jugador {
  constructor(nombre) {
    this.nombre = nombre;
    this.vida = 20;
    this.cantF = 0;
    this.funciones = new Object();
  }
}
export const lista = new Object();
export function crearJugs() {
  const $names = document.querySelectorAll(".input-name"),
    names = $names.values;
  console.log($names);
  $names.forEach((el, index) => {
    lista[`jug${index}`] = new Jugador(el.value);
  });
  jugs = Object.keys(lista);
}
export let jugs;
