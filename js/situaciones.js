import { danoDia, danoDiaNoche, danoGlobal } from "./lista_situaciones.js";
import { desordenar, getRandomIntInclusive } from "./random.js";

class Jugador{
    constructor(nombre){
        this.nombre = nombre;
        this.vida = 20;
    }
    sumar(num){
        vida += num;
    }
}

const lista = [
    new Jugador("Juli"),
    new Jugador("Tiago"),
    new Jugador("Nati"),
    new Jugador("Troche"),
    new Jugador("Gonza"),
],
    progreso = ["Overworld", "Nether", "Overworld", "End"],
    jugs = desordenar(lista);
let nrand = getRandomIntInclusive(1,4),
    evento,
    cant = Object.keys(jugs).length,
    xdia = Math.floor(cant /2),
    xnoche = cant - xdia,
    situacion;

if (nrand <= 3)
    evento = "normal";
else
    evento = "aleatorio";

for (let i = 0; i <= 0; i++) { //dia
    nrand = getRandomIntInclusive(1,6);
    switch(nrand)
    {
        case 1: //daño
            nrand = getRandomIntInclusive(1,3)
            switch (nrand) {
                case 1:
                    danoDia(i)
                    break;
                case 2:
                    danoDiaNoche(i)
                    break;
                case 3:
                    danoGlobal(i)
                    break;
            }
            break;
        case 2: 
           console.log("vida");
           break;
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
export function Hola(){
    jugs.forEach(el => console.log(el.nombre, el.vida))
}
//console.log(xdia, xnoche, nrand, evento);
