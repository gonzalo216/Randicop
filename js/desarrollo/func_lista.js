import { getRandomIntInclusive } from "./funciones.js";
import { curar, danoInsta, texto, updateProgreso } from "./print_lines.js";
import { dragon, jugs, lista } from "./variables.js";

export function nJugRand(jug, jug2 = null) {
  let num,
    i = 0;
  do {
    num = getRandomIntInclusive(Object.keys(lista).length - 1);
    if (i >= 50) return false;
    i++;
  } while (
    lista[jugs[num]].vida <= 0 ||
    lista[jugs[num]].nombre === jug.nombre ||
    lista[jugs[num]].nombre === (jug2 ? jug2.nombre : null)
  );
  return lista[jugs[num]];
}
/* Sacar armadura */
export function getArmadura(armadura) {
  return Object.values(armadura).reduce((total, actual) => total + actual, 0);
}
/* DANO */
export function danoEspadas(espada) {
  if (espada === "netherite") return 9;
  if (espada === "diamante") return 8;
  if (espada === "hierro") return 7;
}
export function danoDragon(espada) {
  let veces = getRandomIntInclusive(5, 2);
  let dano = danoEspadas(espada);
  dragon.vida -= dano * veces;
  updateProgreso();
  return veces;
}
export function pocionIns(vida) {
  if (getRandomIntInclusive(1)) {
    curar(vida + 4);
    return "I";
  } else {
    curar(vida + 8);
    return "II";
  }
}
export function banneado(jug, chance) {
  jug.funcion.push(() => {
    if (!getRandomIntInclusive(chance)) {
      danoInsta(jug.vida);
      jug.vida = 0;
      texto(
        `Los moderadores descubren a ${jug.nombre} por lo que habia hecho`,
        jug
      );
      return false;
    } else {
      return true;
    }
  });
}
