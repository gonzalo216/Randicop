import {
  completo,
  crearDiv,
  hayEvent,
  texto,
  titulo,
} from "./imprimir.js";
import { danoDia, danoNoche, randomDia, randomNoche, relGlobal, vidaDia, vidaNoche } from "./lista_situaciones.js";
import { desordenar, esperar, getRandomIntInclusive } from "./funciones.js";
import { jugs, lista } from "./variables.js";

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
        const el = jugs[i];
        let nombre = lista[el].nombre,
          vida = lista[el].vida;
        if (vida <= 0) {
          i++;
          continue;
        }
        (vida === 20) 
          ? (nrand = getRandomIntInclusive(3, 1)) //saltea cura
          : (nrand = getRandomIntInclusive(3));
        switch (nrand) {
          case 0: { // cura
            const accion = Object.keys(vidaDia);
            nrand = getRandomIntInclusive(accion.length - 1);
            lista[el].vida = vidaDia[accion[nrand]](nombre, vida);
            break;
          }
          case 1: { // daño
            const accion = Object.keys(danoDia);
            nrand = getRandomIntInclusive(accion.length - 1);
            lista[el].vida = danoDia[accion[nrand]](nombre, vida);
            break;
          }
          case 2: { // random
            const accion = Object.keys(randomDia);
            nrand = getRandomIntInclusive(accion.length - 1);
            randomDia[accion[nrand]](nombre, vida);
            break;
          }
          case 3:{
            const accion = Object.keys(relGlobal);
            nrand = getRandomIntInclusive(accion.length - 1);
            relGlobal[accion[nrand]](nombre, vida, i)
            break;
          }
          case 4:
            console.log("decisivas");
            break;
          case 5:
            console.log("descubrimiento");
            break;
        }
        if (lista[el].vida <= 0) muertos.push(el);
        i += await esperar(t);
      }
      hayEvent();
      await esperar(t);

      titulo("<h2>NOCHE</h2>", "evento noche");
      await esperar(t);
      while (i < cant) {
        const el = jugs[i];
        let nombre = lista[el].nombre,
          vida = lista[el].vida;
        if (vida <= 0) {
          i++;
          continue;
        }
        (vida === 20)
          ? (nrand = getRandomIntInclusive(3, 1))
          : (nrand = getRandomIntInclusive(3));
        switch (nrand) {
          case 0: { // cura
            const accion = Object.keys(vidaNoche);
            nrand = getRandomIntInclusive(accion.length - 1);
            lista[el].vida = vidaNoche[accion[nrand]](nombre, vida);
            break;
          }
          case 1: { // daño
            const accion = Object.keys(danoNoche);
            nrand = getRandomIntInclusive(accion.length - 1);
            lista[el].vida = danoNoche[accion[nrand]](nombre, vida);
            break;
          }
          case 2: { // random
            const accion = Object.keys(randomNoche);
            nrand = getRandomIntInclusive(accion.length - 1);
            randomNoche[accion[nrand]](nombre, vida);
            break;
          }
          case 3:{
            const accion = Object.keys(relGlobal);
            nrand = getRandomIntInclusive(accion.length - 1);
            relGlobal[accion[nrand]](nombre, vida, i)
            break;
          }
          case 4:
            console.log("decisivas");
            break;
          case 5:
            console.log("descubrimiento");
            break;
        }
        if (lista[el].vida <= 0) muertos.push(el);
        i += await esperar(t);
      }
      hayEvent();
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
    `<h1>El ultimo jugador sobreviviente fue ${finalista}</h1>`,
    "finalista"
  );
}

export function Hola() {
  for (let i = 0; i < jugs.length; i++) {
    const el = jugs[i];
    console.log(lista[el].nombre, lista[el].vida);
  }
}
