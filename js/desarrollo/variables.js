class Jugador {
  constructor(nombre, bol) {
    this.nombre = nombre;
    this.vida = 20;
    this.protag = bol;
    this.cantF = 0;
    this.funciones = new Object();
  }
}
export const lista = new Object();
export let jugs;
export function crearJugs() {
  const $names = document.querySelectorAll(`input[name="nombre"]`),
    $protags = document.querySelectorAll(`input[name="protag"]`);
  $names.forEach((el, i) => {
    lista[`jug${i}`] = new Jugador(el.value, $protags[i].checked);
  });
  jugs = Object.keys(lista);
}
