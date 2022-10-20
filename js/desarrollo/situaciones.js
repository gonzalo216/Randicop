import { crearBotones, haySit, texto, titulo } from "./print_lines.js";
import { Dano, Decid, Random, Rel, Vida } from "./lista_situaciones.js";
import { desordenar, esperar, getRandomIntInclusive } from "./funciones.js";
import { lista, jugs } from "./variables.js";
import { completo, crearDiv } from "./print_blocks.js";
let nrand,
  cont = 0,
  contNether = 0,
  t = 0.5,
  finalista,
  nether = false,
  caso = 1;
export const resetDias = () => (cont = 0);
export function apurar() {
  t = 0;
}
async function eventos(evento, i, cant, muertos) {
  await esperar(t);
  titulo(`<h2>${evento.toUpperCase()}</h2>`, `evento ${evento}`);
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
          const accion = Object.keys(Vida[evento]);
          nrand = getRandomIntInclusive(accion.length - 1);
          Vida[evento][accion[nrand]](jug);
          break;
        }
        case 1: {
          // daño
          const accion = Object.keys(Dano[evento]);
          nrand = getRandomIntInclusive(accion.length - 1);
          Dano[evento][accion[nrand]](jug);
          break;
        }
        case 2: {
          // random
          const accion = Object.keys(Random[evento]);
          nrand = getRandomIntInclusive(accion.length - 1);
          Random[evento][accion[nrand]](jug);
          break;
        }
        case 3:
        //console.log("descubrimiento");
        //break;
        case 4: {
          if (jug.protag) {
            const accion = Object.keys(Decid[evento]);
            nrand = getRandomIntInclusive(accion.length - 1);
            await Decid[evento][accion[nrand]](jug);
          } else repetir = true;
          break;
        }
        case 5: {
          //relaciones
          const accion = Object.keys(Rel[evento]);
          nrand = getRandomIntInclusive(accion.length - 1);
          Rel[evento][accion[nrand]](jug);
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
export default async function juego() {
  desordenar(jugs);
  const muertos = [];
  let cant = Object.keys(jugs).length,
    mitad = Math.floor(cant / 2);
  crearDiv();
  titulo(`<h3>Transcurrieron ${cont} dias</h3>`, "dias");
  cont++;
  if (cont > 3 && !nether) caso = getRandomIntInclusive(10, 1);
  // 1/10 de chanses de que puedas ir al Nether a partir de los 3 dias transcurridos
  if (contNether > 3 && nether) caso = getRandomIntInclusive(18, 9);
  // 1/10 de chanses de que puedas ir al OverWorld a partir de los 3 dias transcurridos en el nether
  if (cont > 10 && contNether > 3) caso = getRandomIntInclusive(9);
  // 1/10 de chanses de que puedas ir al end a partir de los 10 dias transcurridos en total
  if (caso === 0) {
    // END
    await eventos("End", 0, cant, muertos);
  } else if (caso < 10) {
    // OVERWORLD
    nether = false;
    await eventos("Dia", 0, mitad, muertos);
    await eventos("Noche", mitad, cant, muertos);
  } else {
    // NETHER
    nether = true;
    contNether++;
    await eventos("Nether", 0, cant, muertos);
  }
  t = 0.5;
  if (muertos.length) {
    titulo("<hr><h3>Murieron</h3>", "muertes");
    muertos.forEach((el) => {
      texto(`${lista[el].nombre}`, true);
    });
    finalista = lista[muertos.at(-1)].nombre;
  }
  if (jugs.every((el) => lista[el].vida <= 0)) {
    t = 0.5;
    completo(true, true);
    return;
  }
  completo(true);
}
export function final() {
  crearDiv();
  titulo(
    `<h2>El ultimo jugador sobreviviente fue ${finalista}</h2>`,
    "finalista"
  );
  crearBotones(`<a href="./preinicio.html">Volver</a>`, `Rejugar`, "btn-final");
}

export function Hola() {
  for (let i = 0; i < jugs.length; i++) {
    const el = jugs[i];
    console.log(lista[el].nombre, lista[el].vida, lista[el].protag);
  }
}
