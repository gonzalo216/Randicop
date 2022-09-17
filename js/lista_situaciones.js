import { imprimir } from "./imprimir.js";
import { repetir } from "./funciones.js";



const danoGlobal = {
        papa: function(nombre){
            imprimir(`${nombre} se vió forzado a comer una papa envenenada`);
        },
        enderman: function(nombre){
            imprimir(`${nombre} intentó seducir a un enderman`);
        },
        nocomer: function(nombre){
            imprimir(`${nombre} se quedó sin comida`);
        },
        conexion: function(nombre){
            imprimir(`${nombre} perdió la conexión, al volver le aparece un <strong>Game Over</strong>`);
        },
        tropezon: function(nombre){
            imprimir(`${nombre} se tropezó`);
        },
    },
    danoDiaNoche = {
        lobo: function(nombre){
            imprimir(`${nombre} golpea a un lobo, logrando que una manada se abalanzase sobre él`);
        },
        creeper: function(nombre){
            imprimir(`Un creeper sorpende a ${nombre} por la espalda`);
        },
    };
export const danoDia = {
        sol: function(nombre){
            imprimir(`${nombre} se quemó con el Sol`);
        },
        charco: function(nombre){
            imprimir(`${nombre} vió el charco de lava cuando ya era muy tarde`);
        }

    },
    danoNoche = {
        zombie: function(nombre){
            imprimir(`${nombre} se enfrento contra un zombie`);

        }
    
    };
repetir(danoDiaNoche,1);
repetir(danoDia,2);
repetir(danoNoche,2);
Object.assign(danoDiaNoche, danoGlobal);
Object.assign(danoDia, danoDiaNoche);
Object.assign(danoNoche, danoDiaNoche);

const vidaGlobal = {
        pocion: function(nombre){
            imprimir(`${nombre} uso una pocion de curacion`);
        },
        manzana: function(nombre){
            imprimir(`${nombre} comió una manzana dorada`);
        }
    },
    vidaDiaNoche = {
        bruja: function(nombre){
            imprimir(`Una bruja le tiro una pocion de curación instantánea a ${nombre}`);
        }

    };
export const vidaDia = {
        angel: function(nombre){
            imprimir(`Un angel bajo del cielo y curó a ${nombre}`);
        }

    },
    vidaNoche = {
        zombie: function(nombre){
            imprimir(`${nombre} se enfrento contra un zombie`);
        }

    };
repetir(vidaDiaNoche,1);
repetir(vidaDia,2);
repetir(vidaNoche,2);
Object.assign(vidaDiaNoche, vidaGlobal);
Object.assign(vidaDia, vidaDiaNoche);
Object.assign(vidaNoche, vidaDiaNoche);

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



