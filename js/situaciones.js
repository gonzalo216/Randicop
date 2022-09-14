import { danoDia, danoNoche, vidaDia, vidaNoche } from "./lista_situaciones.js";
import { desordenar, getRandomInt, getRandomIntInclusive } from "./random.js";

class Jugador{
    constructor(nombre){
        this.nombre = nombre;
        this.vida = 20;
    }
    sumar(num){
        vida += num;
    }
}

//progreso = ["Overworld", "Nether", "Overworld", "End"],
const lista = {
        jug1: new Jugador("Juli"),
        jug2: new Jugador("Tiago"),
        jug3: new Jugador("Nati"),
        jug4: new Jugador("Troche"),
        jug5: new Jugador("Gonza"),
    },
    jugs = Object.keys(lista);
desordenar(jugs);
let nrand = getRandomIntInclusive(3),
    evento,
    cant = Object.keys(jugs).length,
    mitad = Math.floor(cant /2);
if (nrand <= 3){ //Eventos Normales
    for (let i = 0; i < mitad; i++) { //DIA
        nrand = getRandomIntInclusive(2, 1);
        const el = jugs[i];
        let nombre = lista[el].nombre,
            vida = lista[el].vida;
        switch(nrand)
        {
            case 1: {//daño
                const accion = Object.keys(danoDia);
                nrand = getRandomIntInclusive(accion.length-1)
                danoDia[accion[nrand]](nombre);
                break;}
            case 2: {//vida
                const accion = Object.keys(vidaDia);
                nrand = getRandomIntInclusive(accion.length-1)
                vidaDia[accion[nrand]](nombre);
                break;}
            case 3 :
                console.log("relación");
                break;
            case 4:
                console.log("decisivas");
                break;
            case 5:
                console.log("random");
                break;
            case 6:
                console.log("descubrimiento");
                break;
        }  
    }
    for (let i = mitad; i < cant; i++) { //NOCHE
        nrand = getRandomIntInclusive(2, 1);
        const el = jugs[i];
        let nombre = lista[el].nombre,
            vida = lista[el].vida;
        switch(nrand)
        {
            case 1: {//daño
                const accion = Object.keys(danoNoche);
                nrand = getRandomIntInclusive(accion.length-1)
                danoNoche[accion[nrand]](nombre);
                break;}
            case 2: {//vida
                const accion = Object.keys(vidaNoche);
                nrand = getRandomIntInclusive(accion.length-1)
                vidaNoche[accion[nrand]](nombre);
                break;}
            case 3 :
                console.log("relación");
                break;
            case 4:
                console.log("decisivas");
                break;
            case 5:
                console.log("random");
                break;
            case 6:
                console.log("descubrimiento");
                break;
        }  
    }
}
else
    evento = "aleatorio";


export function Hola(){
    for (let i = 0; i < jugs.length; i++) {
        const el = jugs[i];
        console.log(lista[el].nombre, );
    }
}
