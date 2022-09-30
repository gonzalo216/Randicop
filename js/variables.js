class Jugador {
    constructor(nombre) {
      this.nombre = nombre;
      this.vida = 20;
      this.cantF = 0;
      this.funciones = new Object;
    }
    set setFunction(funcion){
        this.cantF ++;
        this.funciones[this.cantF] = funcion;
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