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
import { armadura, materiales, partes } from "./armadura.js";
const nJugRand = (jug) => {
  let num;
  do {
    num = getRandomIntInclusive(Object.keys(lista).length - 1);
  } while (
    lista[jugs[num]].vida <= 0 ||
    lista[jugs[num]].nombre === jug.nombre
  );
  return lista[jugs[num]];
};
let nrand, dano, cura, adicional;

// DAÑO
const danoGlobal = {
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
        `${jug.nombre} perdio la conexion, al volver le aparece un <strong>Game Over</strong>`
      );
      vidaDefault(jug);
      danoInsta(dano);
    },
    tropezon: function (jug) {
      nrand = getRandomIntInclusive(20);
      if (dano > 11) adicional = "y cayo de un precipicio";
      else if (dano > 4) adicional = "y cayo desde muy alto";
      else adicional = "";
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} se tropezo ${adicional}`);
      vidaDefault(jug);
      danoInsta(dano);
    },
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
      dano = getRandomIntInclusive(20, 5);
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
      texto(`Mientras picaba, a ${jug.nombre} le cayo grava encima`);
      vidaDefault(jug);
      danoInsta(dano);
    },
    speedrun: function (jug) {
      dano = getRandomIntInclusive(20, 1);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} cayo en lava al cavar en linea recta hacia abajo`);
      vidaDefault(jug);
      danoInsta(dano);
    },
    bedrock: function (jug) {
      dano = jug.vida;
      jug.vida = 0;
      texto(`${jug.nombre} intenta romper bedrock, lo consigue y cae al vacío`);
      vidaDefault(jug);
      danoInsta(dano);
    },
    banneado: function (jug) {
      dano = jug.vida;
      jug.vida = 0;
      texto(
        `${jug.nombre} es banneado por utilizar creativo (y tomar un stock de manzanas de Notch)`
      );
      vidaDefault(jug);
      danoInsta(dano);
    },
    papaenvenenada: function (jug) {
      nrand = getRandomIntInclusive(9);
      nrand <= 5 ? (dano = 4) : (dano = 0); //hay un 60% de propabilidades de perder 2 corazones
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} se ve forzado a comer una papa envenenada`);
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
      texto(`El golem de la aldea defendió a un aldeano de ${jug.nombre}`);
      vidaDefault(jug);
      danoInsta(dano);
    },
    llamas: function (jug) {
      nrand = getRandomIntInclusive(9);
      nrand <= 6
        ? (nrand = getRandomIntInclusive(10))
        : getRandomIntInclusive(20, 11);
      jug.vida -= dano;
      if (jug.vida <= 0) adicional = "las llamas le escupen hasta morir";
      else if (dano > 12 && dano < 19)
        adicional = "las llamas lo abligan a escapar de alli";
      else if (dano > 4 && dano < 12)
        adicional = "las llamas le dan unos poderosos escupitajos";
      else if (dano > 1) adicional = "es escupido por unas llamas";
      else adicional = "una llama le escupe";
      dano += jug.vida;
      texto(`${jug.nombre} mata a un vendedor ambulante, pero ${adicional}`);
      vidaDefault(jug);
      danoInsta(dano);
    },
  },
  danoNoche = {
    phantoms: function (jug) {
      dano = getRandomIntInclusive(20);
      jug.vida -= dano;
      dano += jug.vida;
      texto(
        `Tras no dormir por tres noches seguidas, ${jug.nombre} sufre daño de los phantoms`
      );
      vidaDefault(jug);
      danoInsta(dano);
    },
    seducir: function (jug) {
      dano = getRandomIntInclusive(12, 2);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} intenta seducir a un enderman`);
      vidaDefault(jug);
      danoInsta(dano);
    },
    dañopeleaes: function (jug) {
      dano = getRandomIntInclusive(5, 1);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} queda atrapado en una pelea entre dos esqueletos`);
      vidaDefault(jug);
      danoInsta(dano);
    },
    zombiebpato: function (jug) {
      dano = getRandomIntInclusive(20, 4);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`Un zombie bebé montado en un pato ataca a${jug.nombre}`);
      vidaDefault(jug);
      danoInsta(dano);
    },
    babyzombie: function (jug) {
      dano = getRandomIntInclusive(9, 4);
      jug.vida -= dano;
      dano += jug.vida;
      jug.vida <= 0
        ? texto(`${jug.nombre} muere por un bebe zombie`)
        : texto(`Aterrorizado, ${jug.nombre} escapa de un bebe zombie`);
      vidaDefault(jug);
      danoInsta(dano);
    },
  };
repetir(danoDia, 2);
repetir(danoNoche, 2);
repetir(danoDiaNoche, 1);
Object.assign(danoDiaNoche, danoGlobal);
Object.assign(danoDia, danoDiaNoche);
Object.assign(danoNoche, danoDiaNoche);

// VIDA
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
      texto(`Un angel bajo del cielo y curo a ${jug.nombre}`);
      vidaDefault(jug);
      ctrl();
      curar(cura);
      jug.vida = cura;
    },
  },
  vidaNoche = {};
repetir(vidaDia, 2);
repetir(vidaNoche, 2);
repetir(vidaDiaNoche, 1);
Object.assign(vidaDiaNoche, vidaGlobal);
Object.assign(vidaDia, vidaDiaNoche);
Object.assign(vidaNoche, vidaDiaNoche);

// RANDOM
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
    cat: function (jug) {
      texto(
        `${jug.nombre} se siente mas optimista tras obtener el disco de música 'Cat'`
      );
      vidaDefault(jug, true);
    },
    recuento: function (jug) {
      texto(
        `${jug.nombre} recuenta sus diamantes pensando en hacerse una armadura`
      );
      vidaDefault(jug, true);
    },
    diamantelava: function (jug) {
      texto(
        `${jug.nombre} tira por error en la lava el único diamante que logra encontrar`
      );
      vidaDefault(jug, true);
    },
  };
export const randomDia = {
    // oveja: function (jug) {
    //   texto(
    //     `${jug.nombre} encuentra una oveja rosa... ahora está pensando en hacerse una cama`
    //   );
    //   vidaDefault(jug, true);
    // },
    // golem: function (jug) {
    //   texto(
    //     `${jug.nombre} golpeó a un aldeano por accidente y huyó del golem que le venía encima`
    //   );
    //   vidaDefault(jug, true);
    // },
    // semillas: function (jug) {
    //   texto(`${jug.nombre} cada vez tiene mas semillas`);
    //   vidaDefault(jug, true);
    // },
    // frasco: function (jug) {
    //   texto(`${jug.nombre} fabrica un frasco para toma agua`);
    //   vidaDefault(jug, true);
    // },
    // pala: function (jug) {
    //   texto(`${jug.nombre} fabrica una pala y se pone a trabajar`);
    //   vidaDefault(jug, true);
    // },
    // caña: function (jug) {
    //   texto(`${jug.nombre} intenta pescar con su nueva caña, pero se rinde y entra al agua, golpeando a los peces con la espada
    //   `);
    //   vidaDefault(jug, true);
    // },
    armado: function (jug) {
      let parte = partes[1],
        material = materiales[1],
        articulo = "un";
      if (parte === "botas") articulo = "unas";
      jug.armadura[parte] = armadura[parte][material];
      texto(`${jug.nombre} se construyo ${articulo} ${parte} de ${material}
      `);
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
    peleaesqueletos: function (jug) {
      texto(
        `Un esqueleto desvía su flecha de ${jug.nombre} y le da a otro esqueleto, generando una pelea entre ambos`
      );
      vidaDefault(jug, true);
    },
    bajotierra: function (jug) {
      texto(`Escapando de los mobs, ${jug.nombre} se refugia bajo tierra`);
      vidaDefault(jug, true);
    },
    pensandodiam: function (jug) {
      texto(`${jug.nombre} no puede dormir pensando en diamantes`);
      vidaDefault(jug, true);
    },
    domesticarpp: function (jug) {
      texto(
        `${jug.nombre} busca esqueletos para conseguir huesos y domesticar a una manada de lobos `
      );
      vidaDefault(jug, true);
    },
    pensandositios: function (jug) {
      texto(`${jug.nombre} piensa en irse y explorar nuevos sitios`);
      vidaDefault(jug, true);
    },
  };
repetir(randomDia, 2);
repetir(randomNoche, 2);
repetir(randomDiaNoche, 1);
Object.assign(randomDiaNoche, randomGlobal);
Object.assign(randomDia, randomDiaNoche);
Object.assign(randomNoche, randomDiaNoche);

// RELACIONES
export const relGlobal = {
  mirarfeo: function (jug) {
    const jug2 = nJugRand(jug);
    texto(`${jug.nombre} miro feo a ${jug2.nombre}`);
    vidaDefault(jug, true);
    jug.funciones[jug.cantF] = () => {
      texto(`${jug.nombre} odia a ${jug2.nombre}`);
      vidaDefault(jug, true);
    };
    jug.cantF++;
  },
  escapar: function (jug) {
    const jug2 = nJugRand(jug);
    dano = getRandomIntInclusive(10);
    jug.vida -= dano;
    dano += jug.vida;
    texto(`${jug.nombre} es perseguido por ${jug2.nombre}`);
    vidaDefault(jug);
    danoInsta(dano);
  },
};

const relDiaNoche = {
  robarhierro: function (jug) {
    const jug2 = nJugRand(jug);
    texto(`${jug.nombre} roba hierro del horno de ${jug2.nombre}`);
    vidaDefault(jug, true);
  },
  incendiarcasa: function (jug) {
    const jug2 = nJugRand(jug);
    texto(`${jug.nombre} amenaza a ${jug2.nombre} con incendiar su casa`);
    vidaDefault(jug, true);
  },
};

export const relDia = {
  construircasa: function (jug) {
    const jug2 = nJugRand(jug);
    texto(
      `${jug.nombre} ayuda a ${jug2.nombre} con la construccion de su casa`
    );
    vidaDefault(jug, true);
  },
  vivirjuntos: function (jug) {
    const jug2 = nJugRand(jug);
    texto(`${jug.nombre} y ${jug2.nombre} comienzan a vivir juntos`);
    vidaDefault(jug, true);
  },
  novivirjuntos: function (jug) {
    const jug2 = nJugRand(jug);
    texto(
      `Despues de unos dias viviendo juntos, ${jug.nombre} no soporta mas e intenta matar a ${jug2.nombre}`
    );
    vidaDefault(jug, true);
  },
  florescasa: function (jug) {
    const jug2 = nJugRand(jug);
    texto(
      `${jug.nombre} planta flores en el camino principal a la casa de ${jug2.nombre}`
    );
    vidaDefault(jug, true);
  },
  cazarjuntos: function (jug) {
    const jug2 = nJugRand(jug);
    texto(`${jug.nombre} convence a ${jug2.nombre} para ir de caza juntos`);
    vidaDefault(jug, true);
  },
};

const relNoche = {
  juntarcamas: function (jug) {
    const jug2 = nJugRand(jug);
    texto(`${jug.nombre} y ${jug2.nombre} juntan sus camas para dormir`);
    vidaDefault(jug, true);
  },
  buscarmobs: function (jug) {
    const jug2 = nJugRand(jug);
    texto(
      `${jug.nombre} y ${jug2.nombre} exploran los alrededores juntos en busca de mobs`
    );
    vidaDefault(jug, true);
  },
  dejarmobs: function (jug) {
    const jug2 = nJugRand(jug);
    texto(
      `${jug.nombre} deja solo a ${jug2.nombre} en cuanto ve al primer mob`
    );
    vidaDefault(jug, true);
  },
};

repetir(relDiaNoche, 1);
repetir(relDia, 2);
repetir(relNoche, 2);
Object.assign(relDiaNoche, relGlobal);
Object.assign(relDia, relDiaNoche);
Object.assign(relNoche, relDiaNoche);

// DECIDIR
const decidirGlobal = {};

const decidirDiaNoche = {
  encontrarLobo: async function (jug) {
    const jug2 = nJugRand(jug);
    texto(
      `${jug.nombre} encuentra a un lobo solitario, pero sólo tiene unos pocos huesos en su inventario.`
    );
    vidaDefault(jug, true);
    texto(`¿Debería intentar domesticarlo?`, true);
    let decision = await decidir("Intentar domesticarlo", "Ignorar al lobo");
    if (decision) {
      nrand = getRandomIntInclusive(2);
      switch (nrand) {
        case 0:
          texto(
            `${jug.nombre} gasta todos sus huesos pero no logra domesticarlo`
          );
          vidaDefault(jug, true);
          break;
        case 1:
          texto(`¡Ahora ${jug.nombre} tiene un nuevo perro!`);
          vidaDefault(jug, true);
          break;
        case 2:
          dano = getRandomIntInclusive(4, 1);
          jug.vida -= dano;
          dano += jug.vida;
          texto(`${jug.nombre} confunde las teclas y golpea al lobo`);
          vidaDefault(jug);
          danoInsta(dano);
          break;
      }
    } else {
      nrand = getRandomIntInclusive(1);
      switch (nrand) {
        case 0:
          texto(`${jug.nombre} decide primero conseguir más huesos`);
          vidaDefault(jug, true);
          break;
        case 1:
          texto(`${jug.nombre} es más bien un fanático de los gatos`);
          vidaDefault(jug, true);
          break;
      }
    }
  },
};

export const decidirDia = {
    entrarCasa: async function (jug) {
      const jug2 = nJugRand(jug);
      const jug3 = nJugRand(jug);
      texto(
        `${jug.nombre} observa a ${jug2.nombre} alejarse de su casa, y no cree que vuelva pronto.`
      );
      vidaDefault(jug, true);
      texto(`¿Debería aprovecharse y entrar a su casa?`, true);
      let decision = await decidir("Entrar", "No entrar");
      if (decision) {
        nrand = getRandomIntInclusive(7);
        switch (nrand) {
          case 0:
            texto(
              `Al entrar, encuentra una sala escondida tras un cuadro llena de cofres. Antes de que el dueño regrese, toma todos los diamantes y escapa`
            );
            vidaDefault(jug, true);
            break;
          case 1:
            dano = getRandomIntInclusive(4, 1);
            jug.vida -= dano;
            dano += jug.vida;
            jug.vida <= 0
              ? (adicional = ", terminandolo matando")
              : (adicional = " hasta que abandona la casa");
            texto(
              `${jug2.nombre} egresa mucho antes de lo esperado y golpea a ${jug.nombre} con los puños`
            );
            vidaDefault(jug);
            danoInsta(dano);
            break;
          case 2:
            texto(
              `${jug.nombre} descubre que ${jug3.nombre} ha tenido la misma idea y se encuentra buscando entre los cofres. Deciden dividir los objetos que toman`
            );
            vidaDefault(jug, true);
            break;
          case 3:
            pocionIns(jug.vida);
            texto(
              `${jug.nombre} encuentra un soporte de pociones en la casa y crea una pocion de <i>curación instantánea ${adicional}</i>, bebiéndola al instante`
            );
            vidaDefault(jug);
            ctrl();
            curar(cura);
            jug.vida = cura;
            break;
          case 4:
            dano = jug.vida;
            jug.vida = 0;
            texto(
              `${jug.nombre} se toma demasiado tiempo y ${jug2.nombre} regresa, golpeándolo con su hacha hasta morir`
            );
            vidaDefault(jug);
            danoInsta(dano);
            break;
          case 5:
            texto(
              `${jug.nombre} piensa en tomar todo lo que encuentre, pero se siente culpable y decide no traicionar a ${jug2.nombre}`
            );
            vidaDefault(jug, true);
            break;
          case 6:
            texto(
              `Antes de que ${jug2.nombre} regrese, ${jug.nombre} llena su casa de TNT, activando el mechero y alejándose`
            );
            vidaDefault(jug, true);
            break;
          case 7:
            texto(
              `Cuando ${jug2.nombre} regresa se sorprende al encontrar su casa llena de ovejas`
            );
            vidaDefault(jug, true);
            break;
        }
      } else {
        texto(`${jug.nombre} deja pasar la oportunidad`);
        vidaDefault(jug, true);
      }
    },
    entrarTemplo: async function (jug) {
      const jug2 = nJugRand(jug);
      texto(`Paseando por el desierto, ${jug.nombre} ve a lo lejos un templo.`);
      vidaDefault(jug, true);
      texto(`¿Debería adentrarse en él?`, true);
      let decision = await decidir("Entrar", "No entrar");
      if (decision) {
        nrand = getRandomIntInclusive(4);
        switch (nrand) {
          case 0:
            texto(
              `${jug.nombre} baja picando en forma de escalera en torno al gran agujero en el centro del templo, consiguiendo gran cantidad de objetos de los 4 cofres ocultos`
            );
            vidaDefault(jug, true);
            break;
          case 1:
            texto(
              ` ${jug.nombre} entra a la sala principal del templo pero no ve nada especial y se aleja sin ningún cambio`
            );
            vidaDefault(jug, true);
            break;
          case 2:
            texto(
              `${jug.nombre} se aleja con el inventario cargado de pólovora mientras se imagina a ${jug2.nombre} volando por los aires`
            );
            vidaDefault(jug, true);
            break;
          case 3:
            texto(
              `${jug.nombre} no va a tener que preocuparse por la comida, ahora tiene carne podrida de sobra`
            );
            vidaDefault(jug, true);
            break;
          case 4:
            dano = jug.vida;
            jug.vida = 0;
            texto(
              `${jug.nombre} se planta en el centro del templo y pica hacia abajo, cayendo directo sobre una placa de presión. Antes de entender qué ocurre, vuela por los aires`
            );
            vidaDefault(jug);
            danoInsta(dano);
            break;
        }
      } else {
        texto(
          `${jug.nombre} cree que es una pérdida de tiempo y cambia el rumbo`
        );
        vidaDefault(jug, true);
      }
    },
  },
  decidirNoche = {
    // entrarCasa: async function (jug) {
    //   const jug2 = nJugRand(jug);
    //   texto(
    //     `${jug.nombre} observa a ${jug2.nombre} alejarse de su casa, y no cree que vuelva pronto.`
    //   );
    //   vidaDefault(jug, true);
    //   texto(`¿Debería aprovecharse y entrar a su casa?`, true);
    //   let decision = await decidir("Entrar", "No entrar");
    //   if (decision) {
    //     nrand = getRandomIntInclusive(0);
    //     switch (nrand) {
    //       case 0:
    //         texto(
    //           `Al entrar, encuentra una sala escondida tras un cuadro llena de cofres. Antes de que el dueño regrese, toma todos los diamantes y escapa`
    //         );
    //         vidaDefault(jug, true);
    //         break;
    //       default:
    //         break;
    //     }
    //   } else {
    //     texto(`${jug.nombre} deja pasar la oportunidad`);
    //     vidaDefault(jug, true);
    //   }
    // },
  };
repetir(decidirDiaNoche, 1);
repetir(decidirDia, 2);
repetir(decidirNoche, 2);
Object.assign(decidirDiaNoche, decidirGlobal);
Object.assign(decidirDia, decidirDiaNoche);
Object.assign(decidirNoche, decidirDiaNoche);
