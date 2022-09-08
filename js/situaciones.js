class Jugador{
    constructor(nombre){
        this.nombre = nombre;
        this.vida = 20;
    }
    sumar(num){
        vida += num;
    }
}
const jug = [
    Jugador("Juli"),
    Jugador("Tiago"),
    Jugador("Nati"),
    Jugador("Troche"),
    Jugador("Gonza"),
]
export function Hola(){
    jug.forEach(el => console.log(el.nombre, el.vida))
}