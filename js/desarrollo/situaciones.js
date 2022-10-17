import { haySit, texto, titulo } from "./print_lines.js";
import {
  danoDia,
  danoNoche,
  decidirDia,
  decidirNoche,
  randomDia,
  randomNoche,
  relGlobal,
  vidaDia,
  vidaNoche,
} from "./lista_situaciones.js";
import { desordenar, esperar, getRandomIntInclusive } from "./funciones.js";
import { lista, jugs } from "./variables.js";
import { completo, crearDiv } from "./print_blocks.js";
let cont = 0,
  t = 0.5,
  finalista;
export function apurar() {
  t = 0;
}
export default async function evento() {
  try {
    const muertos = [];
    crearDiv();

    desordenar(jugs);
    let nrand = getRandomIntInclusive(3),
      cant = Object.keys(jugs).length,
      mitad = Math.floor(cant / 2);
    titulo(`<h3>Transcurrieron ${cont} dias</h3>`, "dias");
    cont++;

    if (nrand <= 3) {
      //Eventos Normales
      await esperar(t);
      titulo("<h2>DIA</h2>", "evento dia");
      await esperar(t);
      let i = 0;
      while (i < mitad) {
        const jug = lista[jugs[i]];
        let vivos = 0,
          repetir;
        if (jug.vida <= 0) {
          i++;
          continue;
        }
        jugs.forEach((n) => {
          if (lista[n].vida > 0) vivos++;
        });
        do {
          repetir = false;
          if (jug.vida === 20)
            vivos > 1
              ? (nrand = getRandomIntInclusive(10, 1)) //saltea curar
              : (nrand = getRandomIntInclusive(2, 1));
          else
            vivos > 1
              ? (nrand = getRandomIntInclusive(10))
              : (nrand = getRandomIntInclusive(2)); //saltea relaciones
          switch (nrand) {
            case 0: {
              // cura
              const accion = Object.keys(vidaDia);
              nrand = getRandomIntInclusive(accion.length - 1);
              vidaDia[accion[nrand]](jug);
              break;
            }
            case 1: {
              // daño
              const accion = Object.keys(danoDia);
              nrand = getRandomIntInclusive(accion.length - 1);
              danoDia[accion[nrand]](jug);
              break;
            }
            case 2: {
              // random
              const accion = Object.keys(randomDia);
              nrand = getRandomIntInclusive(accion.length - 1);
              randomDia[accion[nrand]](jug);
              break;
            }
            case 3:
            //console.log("descubrimiento");
            //break;
            case 4: {
              if (jug.protag) {
                const accion = Object.keys(decidirDia);
                nrand = getRandomIntInclusive(accion.length - 1);
                await decidirDia[accion[nrand]](jug);
              } else repetir = true;
              break;
            }
            case 5: {
              //relaciones
              const accion = Object.keys(relGlobal);
              nrand = getRandomIntInclusive(accion.length - 1);
              relGlobal[accion[nrand]](jug);
              break;
            }
            case 6:
            case 7:
            case 8:
            case 9:
            case 10: {
              if (jug.cantF === 0) repetir = true;
              else {
                nrand = getRandomIntInclusive(jug.cantF - 1);
                delete jug.funciones[nrand]();
                jug.cantF--;
              }
              break;
            }
          }
        } while (repetir);
        if (jug.vida <= 0) muertos.push(jugs[i]);
        i += await esperar(t);
      }
      haySit();
      await esperar(t);

      titulo("<h2>NOCHE</h2>", "evento noche");
      await esperar(t);
      while (i < cant) {
        const jug = lista[jugs[i]];
        let vivos = 0,
          repetir;
        if (jug.vida <= 0) {
          i++;
          continue;
        }
        jugs.forEach((n) => {
          if (lista[n].vida > 0) vivos++;
        });
        do {
          repetir = false;
          if (jug.vida === 20)
            vivos > 1
              ? (nrand = getRandomIntInclusive(10, 1)) //saltea curar
              : (nrand = getRandomIntInclusive(2, 1));
          else
            vivos > 1
              ? (nrand = getRandomIntInclusive(10))
              : (nrand = getRandomIntInclusive(2)); //saltea relaciones
          switch (nrand) {
            case 0: {
              // cura
              const accion = Object.keys(vidaNoche);
              nrand = getRandomIntInclusive(accion.length - 1);
              vidaNoche[accion[nrand]](jug);
              break;
            }
            case 1: {
              // daño
              const accion = Object.keys(danoNoche);
              nrand = getRandomIntInclusive(accion.length - 1);
              danoNoche[accion[nrand]](jug);
              break;
            }
            case 2: {
              // random
              const accion = Object.keys(randomNoche);
              nrand = getRandomIntInclusive(accion.length - 1);
              randomNoche[accion[nrand]](jug);
              break;
            }
            case 3:
            //console.log("descubrimiento");
            //break;
            case 4: {
              if (jug.protag) {
                const accion = Object.keys(decidirNoche);
                nrand = getRandomIntInclusive(accion.length - 1);
                await decidirNoche[accion[nrand]](jug);
              } else repetir = true;
              break;
            }
            case 5: {
              const accion = Object.keys(relGlobal);
              nrand = getRandomIntInclusive(accion.length - 1);
              relGlobal[accion[nrand]](jug);
              break;
            }
            case 6:
            case 7:
            case 8:
            case 9:
            case 10: {
              if (jug.cantF === 0) repetir = true;
              else {
                nrand = getRandomIntInclusive(jug.cantF - 1);
                delete jug.funciones[nrand]();
                jug.cantF--;
              }
              break;
            }
          }
        } while (repetir);
        if (jug.vida <= 0) muertos.push(jugs[i]);
        i += await esperar(t);
      }
      haySit();
      await esperar(t);
    }
    //else
    if (muertos.length) {
      titulo("<hr><h3>Murieron</h3>", "muertes");
      muertos.forEach((el) => {
        texto(`${lista[el].nombre}`, true);
      });
      finalista = lista[muertos.at(-1)].nombre;
    }
    t = 0.5;
    if (jugs.every((el) => lista[el].vida <= 0)) {
      t = 0.5;
      completo(true, true);
      return;
    }
    completo(true);
  } catch (error) {
    console.error(error);
  }
}
export function final() {
  crearDiv();
  titulo(
    `<h2>El ultimo jugador sobreviviente fue ${finalista}</h2>`,
    "finalista"
  );
}

export function Hola() {
  for (let i = 0; i < jugs.length; i++) {
    const el = jugs[i];
    console.log(lista[el].nombre, lista[el].vida, lista[el].protag);
  }
}
