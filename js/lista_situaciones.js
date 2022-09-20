import { curar, danoInsta, texto, vidaDefault, vidaExtra, vidaTotal } from "./imprimir.js";
import { getRandomIntInclusive, repetir } from "./funciones.js";

let nrand, dano, cura, adicional;

const danoGlobal = {
        papa: function(nombre, vida){
            nrand = getRandomIntInclusive(9);
            (nrand <= 5) ? dano = 2 : dano = 0;
            vida -= dano;
            dano += vida;
            texto(`${nombre} se vió forzado a comer una papa envenenada`);
            vidaDefault(vida);
            danoInsta(dano);
            return vida;
        },  
        enderman: function(nombre, vida){
            dano = getRandomIntInclusive(10);
            vida -= dano;
            dano += vida;
            texto(`${nombre} intentó seducir a un enderman`);
            vidaDefault(vida);
            danoInsta(dano);
            return vida;
        },
        nocomer: function(nombre, vida){
            dano = vida;
            vida = 1;
            texto(`${nombre} se quedó sin comida`);
            vidaDefault(vida);
            danoInsta(dano);
            return vida;
        },
        conexion: function(nombre, vida){
            dano = vida;
            vida = 0;
            texto(`${nombre} perdió la conexión, al volver le aparece un <strong>Game Over</strong>`);
            vidaDefault(vida);
            danoInsta(dano);
            return vida;
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
            texto(`${nombre} se tropezó ${adicional}`);
            vidaDefault(vida)
            danoInsta(dano)
            return vida;
        },
    },
    danoDiaNoche = {
        lobo: function(nombre, vida){
            dano = getRandomIntInclusive(20);
            vida -= dano;
            dano += vida;
            texto(`${nombre} golpea a un lobo, logrando que una manada se abalanzase sobre él`);
            vidaDefault(vida);
            danoInsta(dano);
            return vida;
        },
        creeper: function(nombre, vida){
            dano = getRandomIntInclusive(20, 2);
            vida -= dano;
            dano += vida;
            texto(`Un creeper sorpende a ${nombre} por la espalda`);
            vidaDefault(vida);
            danoInsta(dano);
            return vida;
        },
        grava: function(nombre, vida){
            dano = getRandomIntInclusive(5, 1);
            vida -= dano;
            dano += vida;
            texto(`Mientras picaba, a ${nombre} le cayó grava encima`);
            vidaDefault(vida);
            danoInsta(dano);
            return vida;
        },
    };
export const danoDia = {
        sol: function(nombre, vida){
            dano = getRandomIntInclusive(3,1);
            vida -= dano;
            dano += vida;
            texto(`${nombre} se quemó con el Sol`);
            vidaDefault(vida);
            danoInsta(dano);
            return vida;
        },
        charco: function(nombre, vida){
            dano = getRandomIntInclusive(15, 3);
            vida -= dano;
            dano += vida;
            texto(`${nombre} vió el charco de lava cuando ya era muy tarde`);
            vidaDefault(vida);
            danoInsta(dano);
            return vida;
        }

    },
    danoNoche = {
        zombie: function(nombre, vida){
            dano = getRandomIntInclusive(10);
            vida -= dano;
            dano += vida;
            texto(`${nombre} se enfrento contra un zombie`);
            vidaDefault(vida);
            danoInsta(dano);
            return vida;
        }
    
    };
repetir(danoDiaNoche,1);
repetir(danoDia,2);
repetir(danoNoche,2);
Object.assign(danoDiaNoche, danoGlobal);
Object.assign(danoDia, danoDiaNoche);
Object.assign(danoNoche, danoDiaNoche);


const ctrl = ()=> {if(cura > 20) cura = 20},
    pocionIns = (vida)=>{
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
            texto(`${nombre} usó una pocion de <i>curación instantánea ${adicional}</i>`);
            vidaDefault(vida);
            ctrl();
            curar(cura);
            return cura;
        },
        manzana: function(nombre, vida){
            cura = 4 + vida;
            texto(`${nombre} comió una manzana dorada`);
            vidaExtra(4);
            vidaDefault(vida);
            ctrl();
            curar(cura);
            return cura;
        }
    },
    vidaDiaNoche = {
        bruja: function(nombre, vida){
            pocionIns(vida)
            texto(`Una bruja le tiro una pocion splash de <i>curación instantánea ${adicional}</i> a ${nombre}`);
            vidaDefault(vida);
            ctrl();
            curar(cura);
            return cura;
        }
    };
export const vidaDia = {
        angel: function(nombre, vida){
            cura = getRandomIntInclusive(19, 1)
            texto(`Un angel bajo del cielo y curó a ${nombre}`);
            vidaDefault(vida);
            ctrl();
            curar(cura);
            return cura;

        }

    },
    vidaNoche = {
        zombie: function(nombre, vida){
            cura = getRandomIntInclusive(1) + vida;
            texto(`${nombre} nose`);
            vidaDefault(vida)
            ctrl();
            curar(cura);
            return cura;

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

