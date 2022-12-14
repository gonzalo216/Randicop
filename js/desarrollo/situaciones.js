import { crearProgreso, haySit, texto, titulo } from "./print_lines.js";
import {
  AsignarDanoRandom,
  DanoRandom,
  Decid,
  Rel,
  Vida,
} from "./lista_situaciones.js";
import { desordenar, esperar, getRandomIntInclusive } from "./funciones.js";
import { lista, jugs, dragon } from "./variables.js";
import { completo, crearDiv } from "./print_blocks.js";
import { finalistaData } from "./final.js";
let nrand,
  cont,
  contNether,
  t,
  caso,
  primWorld,
  primNether,
  secondWorld,
  primEnd;
export function verifEvent(variable) {
  if (variable === "primWorld") return primWorld;
  if (variable === "primNether") return primNether;
  if (variable === "secondWorld") return secondWorld;
  if (variable === "primEnd") return primEnd;
}
export function resetEventos() {
  cont = 0;
  contNether = 0;
  t = 0.5;
  caso = 1;
  primWorld = true;
  primNether = true;
  secondWorld = false;
  primEnd = true;
  AsignarDanoRandom();
}
export function apurar() {
  t = 0;
}
async function transicion(evento) {
  await esperar(t);
  titulo(
    `<h3>Los jugadores pasaron al ${evento.toUpperCase()}</h3>`,
    `transicion ${evento}`
  );
  await esperar(t);
  //completo(true);
}
async function eventos(evento, i, cant, muertos) {
  await esperar(t);
  titulo(`<h2>${evento.toUpperCase()}</h2>`, `evento ${evento}`);
  await esperar(t);
  while (i < cant) {
    const jug = lista[jugs[i]];
    let vivos = 0,
      repetir;
    if (jug.funcion.length && (jug.vida > 0 || jug.revivir)) {
      let seguir = jug.funcion[0]();
      jug.funcion.shift();
      if (!seguir) {
        if (jug.vida <= 0) muertos.push(jugs[i]);
        {
          i++;
          continue;
        }
      }
    }
    if (jug.vida <= 0) {
      i++;
      continue;
    }
    jugs.forEach((n) => {
      if (lista[n].vida > 0) vivos++;
    });
    //console.log(jug.nombre);
    do {
      repetir = false;
      if (jug.vida >= 20)
        vivos > 1 //saltea curar
          ? (nrand = getRandomIntInclusive(5, 2))
          : (nrand = getRandomIntInclusive(4, 2));
      else
        vivos > 1
          ? (nrand = getRandomIntInclusive(5))
          : (nrand = getRandomIntInclusive(4)); //saltea relaciones
      switch (nrand) {
        case 0:
        case 1: {
          // cura
          const accion = Object.keys(Vida[evento]);
          nrand = getRandomIntInclusive(accion.length - 1);
          Vida[evento][accion[nrand]](jug);
          //console.log(accion[nrand]);
          break;
        }
        case 2:
        case 3: {
          // da??oRandom;
          const accion = Object.keys(DanoRandom[evento]);
          nrand = getRandomIntInclusive(accion.length - 1);
          DanoRandom[evento][accion[nrand]](jug);
          //console.log(accion[nrand]);
          break;
        }
        case 4: {
          //decisiones
          if (jug.protag) {
            const accion = Object.keys(Decid[evento]);
            nrand = getRandomIntInclusive(accion.length - 1);
            console.log(accion[nrand]);
            await Decid[evento][accion[nrand]](jug);
            //console.log(accion[nrand]);
          } else repetir = true;
          break;
        }
        case 5: {
          //relaciones
          const accion = Object.keys(Rel[evento]);
          nrand = getRandomIntInclusive(accion.length - 1);
          Rel[evento][accion[nrand]](jug);
          //console.log(accion[nrand]);
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
  //if (cont > 3 && primNether) caso = 10; //ir al Nether a partir de los 3 dias transcurridos
  if (cont > 3 && primNether) caso = getRandomIntInclusive(4, 1);
  // 1/4 de chanses de que puedas ir al Nether a partir de los 3 dias transcurridos
  if (contNether > 3 && secondWorld) caso = getRandomIntInclusive(6, 3);
  // 1/4 de chanses de que puedas ir al OverWorld a partir de los 3 dias transcurridos en el nether
  if (cont > 10 && contNether > 3 && primEnd && !secondWorld)
    caso = getRandomIntInclusive(3);
  // 1/4 de chanses de que puedas ir al end a partir de los 10 dias transcurridos en total

  if (caso === 0) {
    // END
    if (primEnd) {
      primEnd = false;
      await transicion("End");
    } else {
      crearProgreso(dragon.vida);
      await eventos("End", 0, cant, muertos);
    }
  } else if (caso < 4) {
    // OVERWORLD
    if (primWorld) {
      primWorld = false;
      await esperar(t);
      titulo(`<h3>Los jugadores spawnearon</h3>`, `transicion Inicio`);
      await esperar(t);
    } else if (secondWorld) {
      secondWorld = false;
      await transicion("OverWorld");
    } else {
      cont++;
      await eventos("Dia", 0, mitad, muertos);
      await eventos("Noche", mitad, cant, muertos);
    }
  } else {
    // NETHER
    if (primNether) {
      primNether = false;
      secondWorld = true;
      await transicion("Nether");
    } else {
      cont++;
      contNether++;
      await eventos("Nether", 0, cant, muertos);
    }
  }
  t = 0.5;
  if (muertos.length) {
    titulo("<hr><h3>Murieron</h3>", "muertes");
    const nombres = [];
    muertos.forEach((el) => nombres.push(lista[el].nombre));
    texto(nombres.join(" - "), false, true);
    finalistaData(lista[muertos.at(-1)]);
  }
  titulo("", "espacio");
  if (jugs.every((el) => lista[el].vida <= 0)) {
    completo(true, true, false);
    return;
  }
  if (dragon.vida <= 0) {
    const finalistas = [];
    jugs.forEach((el) => {
      if (lista[el].vida > 0) finalistas.push(lista[el]);
    });
    finalistaData(finalistas);
    completo(true, true, true);
    return;
  }
  completo(true);
}

export function Hola() {
  for (let i = 0; i < jugs.length; i++) {
    const el = jugs[i];
    console.log(lista[el].nombre, lista[el].vida, lista[el].protag);
  }
}
