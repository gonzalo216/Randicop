import { completo, crearDiv, hayEvent, texto, titulo } from "./imprimir.js";
import { danoDia, danoNoche, vidaDia, vidaNoche } from "./lista_situaciones.js";
import { desordenar, esperar, getRandomIntInclusive } from "./funciones.js";

class Jugador{
    constructor(nombre){
        this.nombre = nombre;
        this.vida = 15;
    }
}

//progreso = ["Overworld", "Nether", "Overworld", "End"],


const lista = {
        jug1: new Jugador("Juli"),
        jug2: new Jugador("Tiago"),
        jug3: new Jugador("Nati"),
        jug4: new Jugador("Troche"),
        jug5: new Jugador("Gonza"),
    };
let cont = 0,
    t= 0.5;
export function apurar(){t = 0}
export default async function evento(){
    try {
        const jugs = Object.keys(lista),
            muertos = new Set();
        desordenar(jugs);
        let nrand = getRandomIntInclusive(3),
            cant = Object.keys(jugs).length,
            mitad = Math.floor(cant /2);
        crearDiv();
        titulo(`<h3>Transcurrieron ${cont} dias</h3>`);
        cont++;


        if (nrand <= 3){ //Eventos Normales
            await esperar(t)
            titulo("<h2>DIA</h2>");
            await esperar(t)
            let i = 0;
            while(i<mitad){                
                const el = jugs[i];
                let nombre = lista[el].nombre,
                    vida = lista[el].vida;
                if(vida <=0){
                    i++;
                    continue;
                }
                (vida === 20)
                    ? nrand = getRandomIntInclusive(1, 1)
                    : nrand = getRandomIntInclusive(1);
                switch(nrand)
                {
                    case 0: {//vida
                        const accion = Object.keys(vidaDia);
                        nrand = getRandomIntInclusive(accion.length-1)
                        lista[el].vida = vidaDia[accion[nrand]](nombre, vida);
                        break;}
                    case 1: {//daño
                        const accion = Object.keys(danoDia);
                        nrand = getRandomIntInclusive(accion.length-1)
                        lista[el].vida = danoDia[accion[nrand]](nombre, vida);
                        break;}
                    case 2:
                        console.log("relación");
                        break;
                    case 3:
                        console.log("decisivas");
                        break;
                    case 4:
                        console.log("random");
                        break;
                    case 5:
                        console.log("descubrimiento");
                        break;
                }
                if(lista[el].vida <=0)muertos.add(el);
                i += await esperar(t);
            }
            hayEvent();
            await esperar(t)

            titulo("<h2>NOCHE</h2>")
            await esperar(t)
            while(i<cant){
                const el = jugs[i];
                let nombre = lista[el].nombre,
                    vida = lista[el].vida;
                if(vida <=0){
                    i++;
                    continue;
                }
                (vida === 20)
                    ? nrand = getRandomIntInclusive(1, 1)
                    : nrand = getRandomIntInclusive(1);
                switch(nrand)
                {
                    case 0: {//vida
                        const accion = Object.keys(vidaNoche);
                        nrand = getRandomIntInclusive(accion.length-1)
                        lista[el].vida = vidaNoche[accion[nrand]](nombre, vida);
                        break;}
                    case 1: {//daño
                        const accion = Object.keys(danoNoche);
                        nrand = getRandomIntInclusive(accion.length-1)
                        lista[el].vida = danoNoche[accion[nrand]](nombre, vida);
                        break;}
                    case 2:
                        console.log("relación");
                        break;
                    case 3:
                        console.log("decisivas");
                        break;
                    case 4:
                        console.log("random");
                        break;
                    case 5:
                        console.log("descubrimiento");
                        break;
                }
                if(lista[el].vida <=0)muertos.add(el);
                i += await esperar(t);
            }
            hayEvent();
            await esperar(t);
        }
    //else
        if(muertos.size) {
            titulo("<h3>Murieron</h3>");
            muertos.forEach(el=>{
                texto(`${lista[el].nombre}`, true);
            })
        }
        t = 0.5;
        document.getElementById("sig").textContent = "SIGUIENTE";
        document.getElementById("ant").textContent = "ANTERIOR";
        completo(true);
    } catch (error) {
        console.error(error);
    }
}


export function Hola(){
    for (let i = 0; i < jugs.length; i++) {
        const el = jugs[i];
        console.log(lista[el].nombre, lista[el].vida);
    }
}
