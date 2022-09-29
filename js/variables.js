class Jugador {
    constructor(nombre) {
      this.nombre = nombre;
      this.vida = 20;
    }
}
export const lista = {
    jug1: new Jugador("Juli"),
    jug2: new Jugador("Tiago"),
    jug3: new Jugador("Nati"),
    jug4: new Jugador("Troche"),
    jug5: new Jugador("Gonza"),
},
    jugs = Object.keys(lista)