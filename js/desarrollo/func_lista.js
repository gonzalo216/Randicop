import { getRandomIntInclusive } from "./funciones.js";
import { curar, danoInsta, texto, updateProgreso } from "./print_lines.js";
import { dragon, jugs, lista } from "./variables.js";

export function nJugRand(jug){
    let num;
    do {
      num = getRandomIntInclusive(Object.keys(lista).length - 1);
    } while (
      lista[jugs[num]].vida <= 0 ||
      lista[jugs[num]].nombre === jug.nombre
    );
    return lista[jugs[num]];
  };
export function danoEspadas(espada){
    if (espada === "netherite") return 9;
    if (espada === "diamante") return 8;
    if (espada === "hierro") return 7;
  };
export function  danoDragon(espada){
    let veces = getRandomIntInclusive(5, 2);
    let dano = danoEspadas(espada);
    dragon.vida -= dano * veces;
    updateProgreso(dragon.vida);
    return veces;
  };
export function pocionIns(vida){
    if (getRandomIntInclusive(1)) {
        curar(vida + 4);
        return "I";
    } else {
        curar(vida + 8);
        return "II";
    }
  };
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