import {
  curar,
  danoInsta,
  decidir,
  texto,
  vidaDefault,
  vidaExtra,
} from "./print_lines.js";
import { getRandomIntInclusive, repetir } from "./funciones.js";
import { lista, jugs } from "./variables.js";
const nJugRand = (jug) => {
  let num;
  do {
    num = getRandomIntInclusive(Object.keys(lista).length - 1);
  } while (
    lista[jugs[num]].vida <= 0 ||
    lista[jugs[num]].nombre === jug.nombre
  );
  return jugs[num];
};
let nrand, dano, cura, adicional;
const danoGlobal = {
    // papa: function (nombre, vida) {
    //   nrand = getRandomIntInclusive(9);
    //   nrand <= 5 ? (dano = 2) : (dano = 0);
    //   vida -= dano;
    //   dano += vida;
    //   texto(`${nombre} se vió forzado a comer una papa envenenada`);
    //   vidaDefault(vida);
    //   danoInsta(dano);
    //   return vida;
    // },
    // enderman: function (nombre, vida) {
    //   dano = getRandomIntInclusive(10);
    //   vida -= dano;
    //   dano += vida;
    //   texto(`${nombre} intentó seducir a un enderman`);
    //   vidaDefault(vida);
    //   danoInsta(dano);
    //   return vida;
    // },
    // nocomer: function (nombre, vida) {
    //   dano = vida;
    //   vida = 1;
    //   texto(`${nombre} se quedó sin comida`);
    //   vidaDefault(vida);
    //   danoInsta(dano);
    //   return vida;
    // },
    conexion: function (jug) {
      dano = jug.vida;
      jug.vida = 0;
      texto(
        `${jug.nombre} perdió la conexión, al volver le aparece un <strong>Game Over</strong>`
      );
      vidaDefault(jug);
      danoInsta(dano);
    },
    // tropezon: function (nombre, vida) {
    //   nrand = getRandomIntInclusive(9);
    //   nrand < 9
    //     ? (dano = getRandomIntInclusive(10, 1))
    //     : (dano = getRandomIntInclusive(20, 11));
    //   dano > 11
    //     ? (adicional = "y cayó de un precipicio")
    //     : dano > 4
    //     ? (adicional = "y cayó desde muy alto")
    //     : (adicional = "");
    //   vida -= dano;
    //   dano += vida;
    //   texto(`${nombre} se tropezó ${adicional}`);
    //   vidaDefault(vida);
    //   danoInsta(dano);
    //   return vida;
    // },
  },
  danoDiaNoche = {
    lobo: function (jug) {
      dano = getRandomIntInclusive(20);
      jug.vida -= dano;
      dano += jug.vida;
      texto(
        `${jug.nombre} golpea a un lobo, logrando que una manada se abalanzase sobre él`
      );
      vidaDefault(jug);
      danoInsta(dano);
    },
    creeper: function (jug) {
      dano = getRandomIntInclusive(20, 2);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`Un creeper sorpende a ${jug.nombre} por la espalda`);
      vidaDefault(jug);
      danoInsta(dano);
    },
    grava: function (jug) {
      dano = getRandomIntInclusive(5, 1);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`Mientras picaba, a ${jug.nombre} le cayó grava encima`);
      vidaDefault(jug);
      danoInsta(dano);
    },
    speedrun: function (jug) {
      dano = getRandomIntInclusive(20, 1);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} cayó en lava al cavar en linea recta hacia abajo`);
      vidaDefault(jug);
      danoInsta(dano);
    },
    bedrock: function (jug) {
      dano = 20;
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} intenta romper bedrock, lo consigue y cae al vacío`);
      vidaDefault(jug);
      danoInsta(dano);
    },
  };
export const danoDia = {
    sol: function (jug) {
      dano = getRandomIntInclusive(3, 1);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} se quemó con el Sol`);
      vidaDefault(jug);
      danoInsta(dano);
    },
    charco: function (jug) {
      dano = getRandomIntInclusive(15, 3);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} vió el charco de lava cuando ya era muy tarde`);
      vidaDefault(jug);
      danoInsta(dano);
    },
    golem: function (jug) {
      dano = getRandomIntInclusive(20);
      jug.vida -= dano;
      dano += jug.vida;
      texto(
        `El golem de la aldea defendió a un aldeano al enfrentarse a ${jug.nombre}`
      );
      vidaDefault(jug);
      danoInsta(dano);
    },
  },
  danoNoche = {
    phantoms: function (jug) {
      dano = getRandomIntInclusive(15);
      jug.vida -= dano;
      dano += jug.vida;
      texto(
        `Tras no dormir por tres noches seguidas, ${jug.nombre} sufre daño de los phantoms`
      );
      vidaDefault(jug);
      danoInsta(dano);
    },
  };
repetir(danoDiaNoche, 1);
repetir(danoDia, 2);
repetir(danoNoche, 2);
Object.assign(danoDiaNoche, danoGlobal);
Object.assign(danoDia, danoDiaNoche);
Object.assign(danoNoche, danoDiaNoche);

const ctrl = () => {
    if (cura > 20) cura = 20;
  },
  pocionIns = (vida) => {
    nrand = getRandomIntInclusive(1);
    if (nrand === 0) {
      adicional = "I";
      cura = vida + 4;
    } else {
      adicional = "II";
      cura = vida + 8;
    }
  };
const vidaGlobal = {
    pocionCura: function (jug) {
      pocionIns(jug.vida);
      texto(
        `${jug.nombre} usó una pocion de <i>curación instantánea ${adicional}</i>`
      );
      vidaDefault(jug);
      ctrl();
      curar(cura);
      jug.vida = cura;
    },
    manzana: function (jug) {
      cura = 4 + jug.vida;
      texto(`${jug.nombre} comió una manzana dorada`);
      vidaExtra(4);
      vidaDefault(jug);
      ctrl();
      curar(cura);
      jug.vida = cura;
    },
  },
  vidaDiaNoche = {
    bruja: function (jug) {
      pocionIns(jug.vida);
      texto(
        `Una bruja se confunde y le tira una pocion splash de <i>curación instantánea ${adicional}</i> a ${jug.nombre}`
      );
      vidaDefault(jug);
      ctrl();
      curar(cura);
      jug.vida = cura;
    },
  };
export const vidaDia = {
    angel: function (jug) {
      cura = getRandomIntInclusive(19, 1) + jug.vida;
      texto(`Un angel bajo del cielo y curó a ${jug.nombre}`);
      vidaDefault(jug);
      ctrl();
      curar(cura);
      jug.vida = cura;
    },
  },
  vidaNoche = {};
repetir(vidaDiaNoche, 1);
repetir(vidaDia, 2);
repetir(vidaNoche, 2);
Object.assign(vidaDiaNoche, vidaGlobal);
Object.assign(vidaDia, vidaDiaNoche);
Object.assign(vidaNoche, vidaDiaNoche);

const randomGlobal = {
    // locura: function (nombre, vida) {
    //   texto(
    //     `${nombre} entra en la locura pensando por qué el cubo no tiene forma de cubo`
    //   );
    //   vidaDefault(vida, true);
    // },
  },
  randomDiaNoche = {
    armadura: function (jug) {
      texto(`${jug.nombre} encanta su armadura de cuero`);
      vidaDefault(jug, true);
    },
    bedrock: function (jug) {
      texto(`${jug.nombre} pierde el dia intentando romper bedrock`);
      vidaDefault(jug, true);
    },
  };
export const randomDia = {
    oveja: function (jug) {
      texto(
        `${jug.nombre} encuentra una oveja rosa... ahora está pensando en hacerse una cama`
      );
      vidaDefault(jug, true);
    },
    golem: function (jug) {
      texto(
        `${jug.nombre} golpeó a un aldeano por accidente y huyó del golem que le venía encima`
      );
      vidaDefault(jug, true);
    },
    semillas: function (jug) {
      texto(`${jug.nombre} cada vez tiene mas semillas`);
      vidaDefault(jug, true);
    },
    frasco: function (jug) {
      texto(`${jug.nombre} fabrica un frasco para toma agua`);
      vidaDefault(jug, true);
    },
    pala: function (jug) {
      texto(`${jug.nombre} fabricó una pala y se puso a trabajar`);
      vidaDefault(jug, true);
    },
    esclavos: function (jug) {
      texto(`${jug.nombre} ya está esclavizando aldeanos`);
      vidaDefault(jug, true);
    },
  },
  randomNoche = {
    aldeanozombie: function (jug) {
      texto(
        `${jug.nombre} deja que un aldeano muera por un zombie para curarlo`
      );
      vidaDefault(jug, true);
    },
    pollozombie: function (jug) {
      texto(
        `Después de ver a un mini zombie montando un pollo, ${jug.nombre} intenta hacer lo mismo`
      );
      vidaDefault(jug, true);
    },
  };
repetir(randomDiaNoche, 1);
repetir(randomDia, 2);
repetir(randomNoche, 2);
Object.assign(randomDiaNoche, randomGlobal);
Object.assign(randomDia, randomDiaNoche);
Object.assign(randomNoche, randomDiaNoche);

export const relGlobal = {
  mirarfeo: function (jug) {
    const n2 = nJugRand(jug);
    texto(`${jug.nombre} miro feo a ${lista[n2].nombre}`);
    vidaDefault(jug, true);
    jug.funciones[jug.cantF] = () => {
      texto(`${jug.nombre} odia a ${lista[n2].nombre}`);
      vidaDefault(jug, true);
    };
    jug.cantF++;
  },
};

export const decidirDia = {
    entrarCasa: async function (jug) {
      const n2 = nJugRand(jug);
      texto(
        `${jug.nombre} observa a ${lista[n2].nombre} alejarse de su casa, y no cree que vuelva pronto.`
      );
      vidaDefault(jug, true);
      texto(`¿Debería aprovecharse y entrar a su casa?`, true);
      let decision = await decidir("Entrar", "No entrar");
      if (decision) {
        nrand = getRandomIntInclusive(0);
        switch (nrand) {
          case 0:
            texto(
              `Al entrar, encuentra una sala escondida tras un cuadro llena de cofres. Antes de que el dueño regrese, toma todos los diamantes y escapa`
            );
            vidaDefault(jug, true);
            break;

          default:
            break;
        }
      } else {
        texto(`${jug.nombre} deja pasar la oportunidad`);
        vidaDefault(jug, true);
      }
    },
  },
  decidirNoche = {
    entrarCasa: async function (jug) {
      const n2 = nJugRand(jug);
      texto(
        `${jug.nombre} observa a ${lista[n2].nombre} alejarse de su casa, y no cree que vuelva pronto.`
      );
      vidaDefault(jug, true);
      texto(`¿Debería aprovecharse y entrar a su casa?`, true);
      let decision = await decidir("Entrar", "No entrar");
      if (decision) {
        nrand = getRandomIntInclusive(0);
        switch (nrand) {
          case 0:
            texto(
              `Al entrar, encuentra una sala escondida tras un cuadro llena de cofres. Antes de que el dueño regrese, toma todos los diamantes y escapa`
            );
            vidaDefault(jug, true);
            break;

          default:
            break;
        }
      } else {
        texto(`${jug.nombre} deja pasar la oportunidad`);
        vidaDefault(jug, true);
      }
    },
  };
