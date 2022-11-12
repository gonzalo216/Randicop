class Jugador {
  constructor(nombre, bol) {
    this.nombre = nombre;
    this.vida = 20;
    this.protag = bol;
    this.funcion = [];
    /* equipaje */
    this.armadura = {
      casco: 0,
      peto: 0,
      pantalon: 0,
      botas: 0,
    };
    this.armourName = {
      casco: "-",
      peto: "-",
      pantalon: "-",
      botas: "-",
    };
    this.espada = "hierro";
    this.arco = false;
    this.escudo = false;
    /* mascotas */
    this.perro = 0;
    this.gato = 0;
    this.hongo = false;
    /* compañeros */
    this.conv = false;
    this.trofeo = false;
    /* materiales */
    this.netherite = 0;
    this.diamante = 0;

    this.vara = 0;
    this.montura = 0;
    this.lagrima = false;
    this.oro = false;
    this.huesos = false;
    this.peces = false;
    this.comida = false;
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
export function resetJugs() {
  for (const key of Object.keys(lista)) {
    lista[key] = new Jugador(lista[key].nombre, lista[key].protag);
  }
}
class Dragon {
  constructor() {
    this.vida = 200;
    this.crystalAct = 10;
  }
}
const dragonBase = new Dragon();
export const dragon = dragonBase;
