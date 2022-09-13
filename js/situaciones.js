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
]
const jugs = desordenar(lista);
let nrand = getRandomIntInclusive(1,3),
    evento,
    cant = Object.keys(jugs).length,
    dia = Math.floor(cant /2),
    noche = cant - dia;
switch(nrand){
    case 1:
        evento = "normal"
        break;
        case 2:
            evento = "normal"
        break;
    case 3:
        evento = "aleatorio"
        break;
    }
    
export function Hola(){
    jugs.forEach(el => console.log(el.nombre, el.vida))
}
console.log(dia, noche, nrand, evento);
