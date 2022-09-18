import { imprimir } from "./imprimir.js";
import { repetir } from "./funciones.js";



const danoGlobal = {
        papa: function(nombre, vida){
            imprimir(`${nombre} se vió forzado a comer una papa envenenada`, vida);
        },
        enderman: function(nombre, vida){
            imprimir(`${nombre} intentó seducir a un enderman`, vida);
        },
        nocomer: function(nombre, vida){
            imprimir(`${nombre} se quedó sin comida`, vida);
        },
        conexion: function(nombre, vida){
            imprimir(`${nombre} perdió la conexión, al volver le aparece un <strong>Game Over</strong>`, vida);
        },
        tropezon: function(nombre, vida){
            imprimir(`${nombre} se tropezó`, vida);
        },
    },
    danoDiaNoche = {
        lobo: function(nombre, vida){
            imprimir(`${nombre} golpea a un lobo, logrando que una manada se abalanzase sobre él`, vida);
        },
        creeper: function(nombre, vida){
            imprimir(`Un creeper sorpende a ${nombre} por la espalda`, vida);
        },
        grava: function(nombre, vida){
            imprimir(`Mientras picaba, a ${nombre} le cayó grava encima`, vida);
        },
    };
export const danoDia = {
        sol: function(nombre, vida){
            imprimir(`${nombre} se quemó con el Sol`, vida);
        },
        charco: function(nombre, vida){
            imprimir(`${nombre} vió el charco de lava cuando ya era muy tarde`, vida);
        }

    },
    danoNoche = {
        zombie: function(nombre, vida){
            imprimir(`${nombre} se enfrento contra un zombie`, vida);

        }
    
    };
repetir(danoDiaNoche,1);
repetir(danoDia,2);
repetir(danoNoche,2);
Object.assign(danoDiaNoche, danoGlobal);
Object.assign(danoDia, danoDiaNoche);
Object.assign(danoNoche, danoDiaNoche);

const vidaGlobal = {
        pocion: function(nombre, vida){
            imprimir(`${nombre} uso una pocion de curacion`, vida);
        },
        manzana: function(nombre, vida){
            imprimir(`${nombre} comió una manzana dorada`, vida);
        }
    },
    vidaDiaNoche = {
        bruja: function(nombre, vida){
            imprimir(`Una bruja le tiro una pocion de curación instantánea a ${nombre}`, vida);
        }

    };
export const vidaDia = {
        angel: function(nombre, vida){
            imprimir(`Un angel bajo del cielo y curó a ${nombre}`, vida);
        }

    },
    vidaNoche = {
        zombie: function(nombre, vida){
            imprimir(`${nombre} se enfrento contra un zombie`, vida);
        }

    };
repetir(vidaDiaNoche,1);
repetir(vidaDia,2);
repetir(vidaNoche,2);
Object.assign(vidaDiaNoche, vidaGlobal);
Object.assign(vidaDia, vidaDiaNoche);
Object.assign(vidaNoche, vidaDiaNoche);
/*
const randomGlobal = {
        pocion: function(nombre){
            imprimir(`${nombre} uso una pocion de curacion`);
        },
        manzana: function(nombre){
            imprimir(`${nombre} comió una manzana dorada`);
        }
    },
    randomDiaNoche = {
        bruja: function(nombre){
            imprimir(`Una bruja le tiro una pocion de curación instantánea a ${nombre}`);
        }

    };
export const randomDia = {
        angel: function(nombre){
            imprimir(`Un angel bajo del cielo y curó a ${nombre}`);
        }

    },
    randomNoche = {
        zombie: function(nombre){
            imprimir(`${nombre} se enfrento contra un zombie`);
        }

    };
repetir(randomDiaNoche,1);
repetir(randomDia,2);
repetir(randomNoche,2);
Object.assign(randomDiaNoche, randomGlobal);
Object.assign(randomDia, randomDiaNoche);
Object.assign(randomNoche, randomDiaNoche);

*/

