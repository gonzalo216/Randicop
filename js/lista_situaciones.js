import { getRandomIntInclusive } from "./random.js";
const danoGlobal = {
        caida: function(nombre){
            console.log(`${nombre} se cayó`);
        }

    },
    danoDiaNoche = {
        lava: function(nombre){
            console.log(`${nombre} se cayó a un charco de lava`);
        }

    };
export const danoDia = {
        sol: function(nombre){
            console.log(`${nombre} se quemó con el Sol`);
        }

    },
    danoNoche = {
        zombie: function(nombre){
            console.log(`${nombre} se enfrento contra un zombie`);
        }
    
    };
Object.assign(danoDiaNoche, danoGlobal);
Object.assign(danoDia, danoDiaNoche);
Object.assign(danoNoche, danoDiaNoche);

const vidaGlobal = {
        pocion: function(nombre){
            console.log(`${nombre} uso una pocion de curacion`);
        },
        manzana: function(nombre){
            console.log(`${nombre} comió una manzana dorada`);
        }
    },
    vidaDiaNoche = {
        bruja: function(nombre){
            console.log(`Una bruja le tiro una pocion de curación instantánea a ${nombre}`);
        }

    };
export const vidaDia = {
        angel: function(nombre){
            console.log(`Un angel bajo del cielo y curó a ${nombre}`);
        }

    },
    vidaNoche = {
        zombie: function(nombre){
            console.log(`${nombre} se enfrento contra un zombie`);
        }

    };
Object.assign(vidaDiaNoche, vidaGlobal);
Object.assign(vidaDia, vidaDiaNoche);
Object.assign(vidaNoche, vidaDiaNoche);



