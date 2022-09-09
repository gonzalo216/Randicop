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
jugs.forEach(el =>{
    let nrand = getRandomIntInclusive(1,20)
    switch(nrand){
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
    }
})
export function Hola(){
    jugs.forEach(el => console.log(el.nombre, el.vida))
}