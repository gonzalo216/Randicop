import { imprimir } from "./imprimir.js";
import { getRandomIntInclusive } from "./random.js";
const danoGlobal = {
        caida: function(nombre){
            imprimir(`${nombre} se cayó`);
        }

    },
    danoDiaNoche = {
        lava: function(nombre){
            imprimir(`${nombre} se cayó a un charco de lava`);
        }

    };
export const danoDia = {
        sol: function(nombre){
            imprimir(`${nombre} se quemó con el Sol`);
        }

    },
    danoNoche = {
        zombie: function(nombre){
            imprimir(`${nombre} se enfrento contra un zombie`);

        }
    
    };
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
Object.assign(randomDiaNoche, randomGlobal);
Object.assign(randomDia, randomDiaNoche);
Object.assign(randomNoche, randomDiaNoche);



