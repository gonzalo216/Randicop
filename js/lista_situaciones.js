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
        speedrun: function(nombre, vida){
            dano = getRandomIntInclusive(20, 1);
            vida -= dano;
            dano += vida;
            texto(`${nombre} cayó en lava al cavar en linea recta hacia abajo`);
            vidaDefault(vida);
            danoInsta(dano);
            return vida;
        },
        bedrock: function(nombre, vida){
            dano = 20;
            vida -= dano;
            dano += vida;
            texto(`${nombre} intenta romper bedrock, lo consigue y cae al vacío`);
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
        },
        golem: function(nombre, vida){
            dano = getRandomIntInclusive(20)
            vida -= dano;
            dano += vida;
            texto(`El golem de la aldea defendió a un aldeano al enfrentarse a ${nombre}`);
            vidaDefault(vida);
            danoInsta(dano);
            return vida;
        }

    },
    danoNoche = {
        phantoms: function(nombre, vida){
            dano = getRandomIntInclusive(15);
            vida -= dano;
            dano += vida;
            texto(`Tras no dormir por tres noches seguidas, ${nombre} sufre daño de los phantoms`);
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

const randomGlobal = {
        locura: function(nombre, vida){
            texto(`${nombre} entra en la locura pensando por qué el cubo no tiene forma de cubo`);
            vidaDefault(vida)
        }
    },
    randomDiaNoche = {
        armadura: function(nombre, vida){
            texto(`${nombre} encanta su armadura de cuero`);
            vidaDefault(vida)
        },
        bedrock: function(nombre, vida){
            texto(`${nombre} pierde el dia intentando romper bedrock`);
            vidaDefault(vida)
        },

    };
export const randomDia = {
        oveja: function(nombre, vida){
            texto(`${nombre} encuentra una oveja rosa... ahora está pensando en hacerse una cama`);
            vidaDefault(vida)
        },
        golem: function(nombre, vida){
            texto(`${nombre} golpeó a un aldeano por accidente y huyó del golem que le venía encima`);
            vidaDefault(vida)
        },
        semillas: function(nombre, vida){
            texto(`${nombre} cada vez tiene mas semillas`);
            vidaDefault(vida)
        },
        frasco: function(nombre, vida){
            texto(`${nombre} fabrica un frasco para toma agua`);
            vidaDefault(vida)
        },
        pala: function(nombre, vida){
            texto(`${nombre} NN fabricó una pala y se puso a trabajar`);
            vidaDefault(vida)
        },
        esclavos: function(nombre, vida){
            texto(`${nombre} NN ya está esclavizando aldeanos`);
            vidaDefault(vida)
        },
    },
    randomNoche = {
        aldeanozombie: function(nombre, vida){
            texto(`${nombre} deja que un aldeano muera por un zombie para curarlo`);
            vidaDefault(vida)
        },
    };
repetir(randomDiaNoche,1);
repetir(randomDia,2);
repetir(randomNoche,2);
Object.assign(randomDiaNoche, randomGlobal);
Object.assign(randomDia, randomDiaNoche);
Object.assign(randomNoche, randomDiaNoche);


