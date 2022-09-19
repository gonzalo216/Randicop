import { imprimir } from "./imprimir.js";
import { getRandomIntInclusive, repetir } from "./funciones.js";

let nrand, dano, cura, adicional;

const danoGlobal = {
        papa: function(nombre, vida){
            nrand = getRandomIntInclusive(9);
            (nrand <= 5) ? dano = 2 : dano = 0;
            vida -= dano;
            dano += vida;
            imprimir(`${nombre} se vió forzado a comer una papa envenenada`, vida, dano);
        },  
        enderman: function(nombre, vida){
            dano = getRandomIntInclusive(10);
            vida -= dano;
            dano += vida;
            imprimir(`${nombre} intentó seducir a un enderman`, vida, dano);
        },
        nocomer: function(nombre, vida){
            dano = vida
            vida = 1;
            imprimir(`${nombre} se quedó sin comida`, vida, dano);
        },
        conexion: function(nombre, vida){
            dano = vida;
            vida = 0;
            imprimir(`${nombre} perdió la conexión, al volver le aparece un <strong>Game Over</strong>`, vida, dano);
        },
        tropezon: function(nombre, vida){
            nrand = getRandomIntInclusive(9);
            (nrand < 9)
                ? dano = getRandomIntInclusive(10, 1)
                : dano = getRandomIntInclusive(20, 11);
            (dano > 11)
                ? adicional="y cayó de un precipicio"
                : (dano > 4) ? adicional="y cayó desde muy alto" : adicional='';
            vida -= dano;
            dano += vida;

            imprimir(`${nombre} se tropezó ${adicional}`, vida, dano);
        },
    },
    danoDiaNoche = {
        lobo: function(nombre, vida){
            dano = getRandomIntInclusive(20);
            vida -= dano;
            dano += vida;
            imprimir(`${nombre} golpea a un lobo, logrando que una manada se abalanzase sobre él`, vida, dano);
        },
        creeper: function(nombre, vida){
            dano = getRandomIntInclusive(20, 2);
            vida -= dano;
            dano += vida;
            imprimir(`Un creeper sorpende a ${nombre} por la espalda`, vida, dano);
        },
        grava: function(nombre, vida){
            dano = getRandomIntInclusive(5, 1);
            vida -= dano;
            dano += vida;
            imprimir(`Mientras picaba, a ${nombre} le cayó grava encima`, vida, dano);
        },
    };
export const danoDia = {
        sol: function(nombre, vida){
            dano = getRandomIntInclusive(3,1);
            vida -= dano;
            dano += vida;
            imprimir(`${nombre} se quemó con el Sol`, vida, dano);
        },
        charco: function(nombre, vida){
            dano = getRandomIntInclusive(15, 3);
            vida -= dano;
            dano += vida;
            imprimir(`${nombre} vió el charco de lava cuando ya era muy tarde`, vida, dano);
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


const pocionIns = (vida)=>{
    nrand = getRandomIntInclusive(1)
    if (nrand === 0){
        adicional = "I";
        cura = vida + 4;
    } else {
        adicional = "II";
        cura = vida + 8;
    }
}
const vidaGlobal = {
        pocionCura: function(nombre, vida){
            pocionIns(vida);
            imprimir(`${nombre} usó una pocion de <i>curación instantánea ${adicional}</i>`, vida, null ,cura);
            vida = cura;
        },
        manzana: function(nombre, vida){
            cura = 20
            imprimir(`${nombre} comió una manzana dorada`, vida, null, cura, 4);
            vida = cura;
        }
    },
    vidaDiaNoche = {
        bruja: function(nombre, vida){
            pocionIns(vida)
            imprimir(`Una bruja le tiro una pocion splash de <i>curación instantánea ${adicional}</i> a ${nombre}`, vida, null, cura);
            vida = cura;
        }
    };
export const vidaDia = {
        angel: function(nombre, vida){
            imprimir(`Un angel bajo del cielo y curó a ${nombre}`, vida);
        }

    },
    vidaNoche = {
        zombie: function(nombre, vida){
            dano = getRandomIntInclusive(10);
            vida -= dano;
            dano += vida;
            imprimir(`${nombre} se enfrento contra un zombie`, vida, dano);
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

