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
    new Jugador("Juli"),
    new Jugador("Tiago"),
    new Jugador("Nati"),
    new Jugador("Troche"),
    new Jugador("Gonza"),
]
export function Hola(){
    jug.forEach(el => console.log(el.nombre, el.vida))
}