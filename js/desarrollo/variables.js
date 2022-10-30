class Jugador {
  constructor(nombre, bol) {
    this.nombre = nombre;
    this.vida = 20;
    this.protag = bol;
    this.cantF = 0;
    this.funcion = [];
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
    this.perro = 0;
    this.gato = 0;
    this.conv = false;
    this.strider = false;
    this.lagrima = false;
    this.escudo = false;
    this.espadaD = false;
    this.espadaN = false;
    this.netheritecrafteo = false;
    this.oro = false;
    this.huesos = false;
    this.peces = false;
    this.noEnderman = false;
    this.trofeo = false;
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
