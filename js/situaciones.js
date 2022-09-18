import { completo, crearDiv, imprimir } from "./imprimir.js";
import { danoDia, danoNoche, vidaDia, vidaNoche } from "./lista_situaciones.js";
import { desordenar, esperar, getRandomIntInclusive } from "./funciones.js";

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
let cont = 0,
    t= 1;
export function apurar(){t = 0}
export default async function evento(){
    try {
    
    desordenar(jugs);
    let nrand = getRandomIntInclusive(3),
        cant = Object.keys(jugs).length,
        mitad = Math.floor(cant /2);
    crearDiv();
    imprimir(`<h3>Transcurrieron ${cont} dias</h3>`);
    cont++;


    if (nrand <= 3){ //Eventos Normales
        await esperar(t)
        imprimir("<h2>DIA</h2>");
        await esperar(t)
        for (let i = 0; i < mitad; i+= await esperar(t)) { //DIA
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
                    console.info(accion[nrand]);
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
        imprimir("<h2>NOCHE</h2>")
        await esperar(t)
        for (let i = mitad; i < cant; i+= await esperar(t)) { //NOCHE
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
                    console.info(accion[nrand]);
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
    //else
        
    } catch (error) {
        console.error(error);
    }
    t = 1;
    document.getElementById("sig").textContent = "SIGUIENTE";
    document.getElementById("ant").textContent = "ANTERIOR";
    completo(true);

}


export function Hola(){
    for (let i = 0; i < jugs.length; i++) {
        const el = jugs[i];
        console.log(lista[el].nombre, );
    }
}
