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

/* ----------------------------------------DAÑO----------------------------------------*/
const DanoGlobal = {
    // nocomer: function (nombre, vida) {
    //   dano = vida;
    //   vida = 1;
    //   texto(`${nombre} se quedo sin comida`);
    //   vidaDefault(vida);
    //   danoInsta(dano);
    //   return vida;
    // },
    conexion: function (jug) {
      dano = jug.vida;
      jug.vida = 0;
      texto(
        `${jug.nombre} pierde la conexion. Al volver le aparece un <strong>Game Over</strong>`
      );
      danoInsta(dano);
      vidaDefault(jug);
    },
    tropezon: function (jug) {
      nrand = getRandomIntInclusive(20);
      if (dano > 11) adicional = "y cae de un precipicio";
      else if (dano > 4) adicional = "y cae desde muy alto";
      else adicional = "";
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} tropieza ${adicional}`);
      danoInsta(dano);
      vidaDefault(jug);
    },
  },
  DanoDiaNoche = {
    lobo: function (jug) {
      dano = getRandomIntInclusive(20);
      jug.vida -= dano;
      dano += jug.vida;
      texto(
        `${jug.nombre} golpea a un lobo, logrando que una manada se abalanzase sobre el`
      );
      danoInsta(dano);
      vidaDefault(jug);
    },
    creeper: function (jug) {
      if (jug.gato)
        texto(
          `Un creeper casi sorprende a ${jug.nombre} por la espalda, pero su gato lo salvo`
        );
      else {
        dano = getRandomIntInclusive(20, 5);
        jug.vida -= dano;
        dano += jug.vida;
        texto(`Un creeper sorpende a ${jug.nombre} por la espalda`);
        danoInsta(dano);
      }
      vidaDefault(jug);
    },
    grava: function (jug) {
      dano = getRandomIntInclusive(5, 1);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`Mientras pica, a ${jug.nombre} le cae grava encima`);
      danoInsta(dano);
      vidaDefault(jug);
    },
    speedrun: function (jug) {
      dano = getRandomIntInclusive(20, 1);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} cae en lava al cavar en linea recta hacia abajo`);
      danoInsta(dano);
      vidaDefault(jug);
    },
    bedrock: function (jug) {
      dano = jug.vida;
      jug.vida = 0;
      texto(`${jug.nombre} intenta romper bedrock, lo consigue y cae al vacio`);
      danoInsta(dano);
      vidaDefault(jug);
    },
    banneado: function (jug) {
      dano = jug.vida;
      jug.vida = 0;
      texto(
        `${jug.nombre} es banneado por usar creativo (y tomar un stock de manzanas de Notch)`
      );
      danoInsta(dano);
      vidaDefault(jug);
    },
    papaenvenenada: function (jug) {
      nrand = getRandomIntInclusive(9);
      nrand <= 5 ? (dano = 4) : (dano = 0); //hay un 60% de propabilidades de perder 2 corazones
      jug.vida -= dano;
      dano += jug.vida;
      if (jug.vida <= 0) jug.vida = 1;
      texto(`${jug.nombre} se ve forzado a comer una papa envenenada`);
      danoInsta(dano);
      vidaDefault(jug);
    },
  };
export const Dano = {
  Dia: {
    sol: function (jug) {
      dano = getRandomIntInclusive(3, 1);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} es quemado por el Sol`);
      danoInsta(dano);
      vidaDefault(jug);
    },
    charco: function (jug) {
      dano = getRandomIntInclusive(15, 3);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} vio el charco de lava cuando ya era muy tarde`);
      danoInsta(dano);
      vidaDefault(jug);
    },
    golem: function (jug) {
      dano = getRandomIntInclusive(20);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`El golem de la aldea defendio a un aldeano de ${jug.nombre}`);
      danoInsta(dano);
      vidaDefault(jug);
    },
    llamas: function (jug) {
      nrand = getRandomIntInclusive(20, 1);
      jug.vida -= dano;
      if (jug.vida <= 0) adicional = "las llamas le escupen hasta morir";
      else if (dano > 12 && dano < 19)
        adicional = "Las llamas lo abligan a escapar de alli";
      else if (dano > 4 && dano < 12)
        adicional = "Las llamas le dan unos poderosos escupitajos";
      else if (dano > 1) adicional = "Es escupido por unas llamas";
      else adicional = "Una llama le escupe";
      dano += jug.vida;
      texto(`${jug.nombre} mata a un vendedor ambulante. ${adicional}`);
      danoInsta(dano);
      vidaDefault(jug);
    },
  },
  Noche: {
    phantoms: function (jug) {
      dano = getRandomIntInclusive(20);
      jug.vida -= dano;
      dano += jug.vida;
      texto(
        `Tras no dormir por tres noches seguidas, ${jug.nombre} sufre daño de los phantoms`
      );
      danoInsta(dano);
      vidaDefault(jug);
    },
    seducir: function (jug) {
      dano = getRandomIntInclusive(12, 2);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} intenta seducir a un enderman`);
      danoInsta(dano);
      vidaDefault(jug);
    },
    dañopeleaes: function (jug) {
      dano = getRandomIntInclusive(5, 1);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} queda atrapado en una pelea entre dos esqueletos`);
      danoInsta(dano);
      vidaDefault(jug);
    },
    zombiebpato: function (jug) {
      if (jug.perro) {
        dano = getRandomIntInclusive(5);
        texto(
          `Un zombie bebe montado en un pato se acerca a ${jug.nombre}, pero su perro lo defiende`
        );
      } else {
        dano = getRandomIntInclusive(20, 4);
        texto(`Un zombie bebe montado en un pato ataca a ${jug.nombre}`);
      }
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      vidaDefault(jug);
    },
    babyzombie: function (jug) {
      if (jug.perro) {
        dano = getRandomIntInclusive(3);
        texto(`${jug.nombre} mata a un bebe zombie con ayuda de su perro`);
      } else {
        dano = getRandomIntInclusive(9, 4);
        texto(`Aterrorizado, ${jug.nombre} escapa de un bebe zombie`);
      }
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      vidaDefault(jug);
    },
  },
  Nether: {
    waterdrop: function (jug) {
      dano = getRandomIntInclusive(20, 8);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} intenta hacer un waterdrop`);
      danoInsta(dano);
      vidaDefault(jug);
    },
    waterdrop: function (jug) {
      dano = getRandomIntInclusive(20, 4);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} pone una cama e intenta dormir`);
      danoInsta(dano);
      vidaDefault(jug);
    },
    piglin: function (jug) {
      dano = getRandomIntInclusive(16, 8);
      jug.vida -= dano;
      dano += jug.vida;
      texto(
        `${jug.nombre} olvida llevar algo de oro y es atacado por un grupo de piglins`
      );
      danoInsta(dano);
      vidaDefault(jug);
    },
  },
};
repetir(Dano.Nether, 4);
repetir(Dano.Dia, 2);
repetir(Dano.Noche, 2);
repetir(DanoDiaNoche, 1);
Object.assign(DanoDiaNoche, DanoGlobal);
Object.assign(Dano.Dia, DanoDiaNoche);
Object.assign(Dano.Noche, DanoDiaNoche);
Object.assign(Dano.Nether, DanoGlobal);

/* ----------------------------------------VIDA----------------------------------------*/
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
const VidaGlobal = {
    pocionCura: function (jug) {
      pocionIns(jug.vida);
      texto(
        `${jug.nombre} usa una pocion de <i>curacion instantanea ${adicional}</i>`
      );
      ctrl();
      curar(cura);
      vidaDefault(jug);
      jug.vida = cura;
    },
    manzana: function (jug) {
      cura = 4 + jug.vida;
      texto(`${jug.nombre} come una manzana dorada`);
      vidaExtra(4);
      ctrl();
      curar(cura);
      vidaDefault(jug);
      jug.vida = cura;
    },
  },
  VidaDiaNoche = {
    bruja: function (jug) {
      pocionIns(jug.vida);
      texto(
        `Una bruja se confunde y le tira una pocion splash de <i>curacion instantanea ${adicional}</i> a ${jug.nombre}`
      );
      ctrl();
      curar(cura);
      vidaDefault(jug);
      jug.vida = cura;
    },
  };
export const Vida = {
  Dia: {
    angel: function (jug) {
      cura = getRandomIntInclusive(19, 1) + jug.vida;
      texto(`Un angel baja del cielo y cura a ${jug.nombre}`);
      ctrl();
      curar(cura);
      vidaDefault(jug);
      jug.vida = cura;
    },
  },
  Noche: {
    // angel: function (jug) {
    //   cura = 3 + jug.vida;
    //   texto(`una sopa misteriosa hace que ${jug.nombre} se sienta mucho mejor`);
    //   vidaDefault(jug);
    //   ctrl();
    //   curar(cura);
    //   jug.vida = cura;
    // },
  },
  Nether: {},
};
repetir(Vida.Nether, 4);
repetir(Vida.Dia, 2);
repetir(Vida.Noche, 2);
repetir(VidaDiaNoche, 1);
Object.assign(VidaDiaNoche, VidaGlobal);
Object.assign(Vida.Dia, VidaDiaNoche);
Object.assign(Vida.Noche, VidaDiaNoche);
Object.assign(Vida.Nether, VidaGlobal);

/* ----------------------------------------RANDOM----------------------------------------*/
const RandomGlobal = {
    // locura: function (nombre, vida) {
    //   texto(
    //     `${nombre} entra en la locura pensando por que el cubo no tiene forma de cubo`
    //   );
    //   vidaDefault(vida, true);
    // },
  },
  RandomDiaNoche = {
    armadura: function (jug) {
      texto(`${jug.nombre} encanta su armadura de cuero`);
      vidaDefault(jug);
    },
    bedrock: function (jug) {
      texto(`${jug.nombre} pierde el dia intentando romper bedrock`);
      vidaDefault(jug, true);
    },
    cat: function (jug) {
      texto(
        `${jug.nombre} se siente mas optimista tras obtener el disco de musica 'Cat'`
      );
      vidaDefault(jug);
    },
    recuento: function (jug) {
      texto(
        `${jug.nombre} recuenta sus diamantes pensando en hacerse una armadura`
      );
      vidaDefault(jug);
    },
    diamantelava: function (jug) {
      texto(
        `${jug.nombre} tira por error en la lava el unico diamante que logra encontrar`
      );
      vidaDefault(jug);
    },
  };
export const Random = {
  Dia: {
    oveja: function (jug) {
      texto(
        `${jug.nombre} encuentra una oveja rosa... ahora esta pensando en hacerse una cama`
      );
      vidaDefault(jug);
    },
    golem: function (jug) {
      texto(
        `${jug.nombre} golpeo a un aldeano por accidente y huyo del golem que le venia encima`
      );
      vidaDefault(jug);
    },
    semillas: function (jug) {
      texto(`${jug.nombre} cada vez tiene mas semillas`);
      vidaDefault(jug);
    },
    frasco: function (jug) {
      texto(`${jug.nombre} fabrica un frasco para toma agua`);
      vidaDefault(jug);
    },
    pala: function (jug) {
      texto(`${jug.nombre} fabrica una pala y se pone a trabajar`);
      vidaDefault(jug);
    },
    caña: function (jug) {
      texto(`${jug.nombre} intenta pescar con su nueva caña, pero se rinde y entra al agua, golpeando a los peces con la espada
      `);
      vidaDefault(jug);
    },
    armado: function (jug) {
      let parte = partes[1],
        material = materiales[1],
        articulo = parte === botas ? "unas" : "un";
      jug.armadura[parte] = armadura[parte][material];
      jug.armourName[parte] = material;
      texto(`${jug.nombre} se construyo ${articulo} ${parte} de ${material}
      `);
      vidaDefault(jug);
    },
  },
  Noche: {
    aldeanozombie: function (jug) {
      texto(
        `${jug.nombre} deja que un aldeano muera por un zombie para curarlo`
      );
      vidaDefault(jug);
    },
    pollozombie: function (jug) {
      texto(
        `Despues de ver a un mini zombie montando un pollo, ${jug.nombre} intenta hacer lo mismo`
      );
      vidaDefault(jug);
    },
    peleaesqueletos: function (jug) {
      texto(
        `Un esqueleto desvia su flecha de ${jug.nombre} y le da a otro esqueleto, generando una pelea entre ambos`
      );
      vidaDefault(jug);
    },
    bajotierra: function (jug) {
      texto(`Escapando de los mobs, ${jug.nombre} se refugia bajo tierra`);
      vidaDefault(jug);
    },
    pensandodiam: function (jug) {
      texto(`${jug.nombre} no puede dormir pensando en diamantes`);
      vidaDefault(jug);
    },
    domesticarpp: function (jug) {
      texto(
        `${jug.nombre} busca esqueletos para conseguir huesos y domesticar a una manada de lobos `
      );
      vidaDefault(jug);
    },
    pensandositios: function (jug) {
      texto(`${jug.nombre} piensa en irse y explorar nuevos sitios`);
      vidaDefault(jug);
    },
    arco: function (jug) {
      texto(`${jug.nombre} se hace con el arco de un esqueleto`);
      vidaDefault(jug);
      jug.arco = true;
    },
  },
  Nether: {
    tiempoPortal: function (jug) {
      texto(
        `${jug.nombre} pierde la cuenta del tiempo pasado desde que vio por ultima vez un portal`
      );
      vidaDefault(jug);
    },
    esponjas: function (jug) {
      texto(
        `${jug.nombre} pasa todo el dia intentando que las esponjas mojadas no se sequen al ponerlas en el suelo`
      );
      vidaDefault(jug);
    },
    relojRoto: function (jug) {
      texto(`${jug.nombre} observa su reloj, pero parece estar roto...`);
      vidaDefault(jug);
    },
    explorarStrider: function (jug) {
      if (jug.strider) {
        texto(
          `Con el hongo distorsionado y una montura, ${jug.nombre} recorre los alrededores montando a un strider`
        );
      }
      vidaDefault(jug);
    },
    mascotaStrider: function (jug) {
      texto(`${jug.nombre} se encariña con un strider solitario`);
      vidaDefault(jug);
    },
    piensaStrider: function (jug) {
      texto(`${jug.nombre} piensa en adoptar a un strider como mascota`);
      vidaDefault(jug);
    },
  },
};
repetir(Random.Nether, 4);
repetir(Random.Dia, 2);
repetir(Random.Noche, 2);
repetir(RandomDiaNoche, 1);
Object.assign(RandomDiaNoche, RandomGlobal);
Object.assign(Random.Dia, RandomDiaNoche);
Object.assign(Random.Noche, RandomDiaNoche);
Object.assign(Random.Nether, RandomGlobal);

/* ----------------------------------------RELACION----------------------------------------*/
export const RelGlobal = {
  mirarfeo: function (jug) {
    const jug2 = nJugRand(jug);
    texto(`${jug.nombre} mira feo a ${jug2.nombre}`);
    vidaDefault(jug);
    jug.funciones[jug.cantF] = () => {
      texto(`${jug.nombre} odia a ${jug2.nombre}`);
      vidaDefault(jug);
    };
    jug.cantF++;
  },
  escapar: function (jug) {
    const jug2 = nJugRand(jug);
    dano = getRandomIntInclusive(10);
    jug.vida -= dano;
    dano += jug.vida;
    texto(`${jug.nombre} es perseguido por ${jug2.nombre}`);
    danoInsta(dano);
    vidaDefault(jug);
  },
};

const RelDiaNoche = {
  robarhierro: function (jug) {
    const jug2 = nJugRand(jug);
    texto(`${jug.nombre} roba hierro del horno de ${jug2.nombre}`);
    vidaDefault(jug);
  },
  incendiarcasa: function (jug) {
    const jug2 = nJugRand(jug);
    texto(`${jug.nombre} amenaza a ${jug2.nombre} con incendiar su casa`);
    vidaDefault(jug);
  },
};

export const Rel = {
  Dia: {
    construircasa: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} ayuda a ${jug2.nombre} con la construccion de su casa`
      );
      vidaDefault(jug);
    },
    vivirjuntos: function (jug) {
      console.log("casa");
      if (jug.conv) {
        if (jug.conv.vida <= 0) {
          texto(
            `${jug.nombre} sigue pensando en ${jug.conv.nombre}, el mejor companero de cuarto que pudo tener`
          );
          vidaDefault(jug);
        }
        nrand = getRandomIntInclusive(1);
        switch (nrand) {
          case 0:
            dano = getRandomIntInclusive(20);
            jug.vida -= dano;
            dano += jug.vida;
            if (jug.vida <= 0)
              texto(
                `${jug.conv.nombre} no puede convivir mas y mata a ${jug.nombre} con un hacha`
              );
            else
              texto(
                `Despues de unos dias viviendo juntos, ${jug.conv.nombre} no soporta mas e intenta matar a ${jug.nombre}`
              );
            danoInsta(dano);
            vidaDefault(jug);
            jug.conv.conv = null;
            jug.conv = null;
            break;
          case 1:
            texto(`${jug.nombre} y ${jug.conv} agrandan su casa`);
            vidaDefault(jug);
            break;
        }
      } else {
        let jug2,
          i = 0;
        do {
          jug2 = nJugRand(jug);
          i++;
          if (i > 10) {
            texto(
              `${jug.nombre} Intento encontrar un compañero, pero no lo logro`
            );
            vidaDefault(jug);
          }
        } while (jug2.conv);
        texto(`${jug.nombre} y ${jug2.nombre} comienzan a vivir juntos`);
        vidaDefault(jug);
        jug.conv = jug2;
        jug2.conv = jug;
      }
    },
    florescasa: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} planta flores en el camino principal a la casa de ${jug2.nombre}`
      );
      vidaDefault(jug);
    },
    cazarjuntos: function (jug) {
      const jug2 = nJugRand(jug);
      texto(`${jug.nombre} convence a ${jug2.nombre} para ir de caza juntos`);
      vidaDefault(jug);
    },

    // vivirHacha: function (jug) {
    //   const jug2 = nJugRand(jug);
    //   texto(
    //     `${jug2.nombre} no puede convivir mas y mata a ${jug.nombre} con un hacha`
    //   );
    //   vidaDefault(jug);
    //   danoInsta(dano);
    // },
    // casaAgrandar: function (jug) {
    //   const jug2 = nJugRand(jug);
    //   texto(
    //     `$${jug.nombre} y ${jug2.nombre} agrandan su casa`
    //   );
    //   vidaDefault(jug, true);
    // },
    // vivirJuntos: function (jug) {
    //   const jug2 = nJugRand(jug);
    //   texto(
    //     `$${jug.nombre} y ${jug2.nombre} comienzan a vivir juntos`
    //   );
    //   vidaDefault(jug, true);
    // },
  },
  Noche: {
    juntarcamas: function (jug) {
      const jug2 = nJugRand(jug);
      texto(`${jug.nombre} y ${jug2.nombre} juntan sus camas para dormir`);
      vidaDefault(jug);
    },
    buscarmobs: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} y ${jug2.nombre} exploran los alrededores juntos en busca de mobs`
      );
      vidaDefault(jug);
    },
    dejarmobs: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `En cuanto aparecen los mobs, ${jug.nombre} deja solo a ${jug2.nombre}`
      );
      vidaDefault(jug);
    },
  },
  Nether: {
    waterdrop: function (jug) {
      const jug2 = nJugRand(jug);
      dano = jug.vida;
      jug.vida = 0;
      texto(
        `${jug2.nombre} observa a ${jug.nombre} muy cerca de un precipicio y le da un empujon, tirandolo a un mar de lava`
      );
      danoInsta(dano);
      vidaDefault(jug);
    },
  },
};

repetir(Rel.Nether, 4);
repetir(RelDiaNoche, 1);
repetir(Rel.Dia, 2);
repetir(Rel.Noche, 2);
Object.assign(RelDiaNoche, RelGlobal);
Object.assign(Rel.Dia, RelDiaNoche);
Object.assign(Rel.Noche, RelDiaNoche);
Object.assign(Rel.Nether, RelGlobal);

/* ----------------------------------------DECISIoN----------------------------------------*/
const DecidGlobal = {};

const DecidDiaNoche = {
  encontrarLobo: async function (jug) {
    const jug2 = nJugRand(jug);
    texto(
      `${jug.nombre} encuentra a un lobo solitario, pero solo tiene unos pocos huesos en su inventario.`
    );
    vidaDefault(jug);
    texto(`¿Deberia intentar domesticarlo?`, true);
    let decision = await decidir("Intentar domesticarlo", "Ignorar al lobo");
    if (decision) {
      nrand = getRandomIntInclusive(2);
      switch (nrand) {
        case 0:
          texto(
            `${jug.nombre} gasta todos sus huesos pero no logra domesticarlo`
          );
          vidaDefault(jug);
          break;
        case 1:
          texto(`¡Ahora ${jug.nombre} tiene un nuevo perro!`);
          vidaDefault(jug);
          jug.perro = true;
          break;
        case 2:
          dano = getRandomIntInclusive(4, 1);
          jug.vida -= dano;
          dano += jug.vida;
          texto(`${jug.nombre} confunde las teclas y golpea al lobo`);
          danoInsta(dano);
          vidaDefault(jug);
          break;
      }
    } else {
      nrand = getRandomIntInclusive(1);
      switch (nrand) {
        case 0:
          texto(`${jug.nombre} decide primero conseguir mas huesos`);
          vidaDefault(jug);
          break;
        case 1:
          texto(`${jug.nombre} es mas bien un fanatico de los gatos`);
          vidaDefault(jug);
          break;
      }
    }
  },
};

export const Decid = {
  Dia: {
    entrarCasa: async function (jug) {
      const jug2 = nJugRand(jug);
      const jug3 = nJugRand(jug);
      while (jug3 == jug2) {
        const jug3 = nJugRand(jug);
      }
      texto(
        `${jug.nombre} observa a ${jug2.nombre} alejarse de su casa, y no cree que vuelva pronto.`
      );
      vidaDefault(jug);
      texto(`¿Deberia aprovecharse y entrar a su casa?`, true);
      let decision = await decidir("Entrar", "No entrar");
      if (decision) {
        nrand = getRandomIntInclusive(7);
        switch (nrand) {
          case 0:
            texto(
              `Al entrar, encuentra una sala escondida tras un cuadro llena de cofres. Rapido, toma todos los diamantes y escapa`
            );
            vidaDefault(jug);
            break;
          case 1:
            dano = getRandomIntInclusive(4, 1);
            jug.vida -= dano;
            dano += jug.vida;
            texto(
              `${jug2.nombre} regresa mucho antes de lo esperado y golpea a ${jug.nombre} con los puños`
            );
            danoInsta(dano);
            vidaDefault(jug);
            break;
          case 2:
            texto(
              `${jug.nombre} descubre que ${jug3.nombre} ha tenido la misma idea y se encuentra buscando entre los cofres. Deciden dividir los objetos que toman`
            );
            vidaDefault(jug);
            break;
          case 3:
            pocionIns(jug.vida);
            texto(
              `${jug.nombre} encuentra un soporte de pociones en la casa y crea una pocion de <i>curacion instantanea ${adicional}</i>, bebiendola al instante`
            );
            ctrl();
            curar(cura);
            vidaDefault(jug);
            jug.vida = cura;
            break;
          case 4:
            dano = jug.vida;
            jug.vida = 0;
            texto(
              `${jug.nombre} se toma demasiado tiempo y ${jug2.nombre} regresa, golpeandolo con su hacha hasta morir`
            );
            danoInsta(dano);
            vidaDefault(jug);
            break;
          case 5:
            texto(
              `${jug.nombre} piensa en tomar todo lo que encuentre, pero se siente culpable y decide no traicionar a ${jug2.nombre}`
            );
            vidaDefault(jug);
            break;
          case 6:
            texto(
              `Antes de que ${jug2.nombre} regrese, ${jug.nombre} llena su casa de TNT, activando el mechero y alejandose`
            );
            vidaDefault(jug);
            break;
          case 7:
            texto(
              `Cuando ${jug2.nombre} regresa se sorprende al encontrar su casa llena de ovejas`
            );
            vidaDefault(jug);
            break;
        }
      } else {
        texto(`${jug.nombre} deja pasar la oportunidad`);
        vidaDefault(jug);
      }
    },
    entrarTemplo: async function (jug) {
      const jug2 = nJugRand(jug);
      texto(`Paseando por el desierto, ${jug.nombre} ve a lo lejos un templo.`);
      vidaDefault(jug, true);
      texto(`¿Deberia adentrarse en el?`, true);
      let decision = await decidir("Entrar", "No entrar");
      if (decision) {
        nrand = getRandomIntInclusive(4);
        switch (nrand) {
          case 0:
            texto(
              `${jug.nombre} baja picando en forma de escalera en torno al gran agujero en el centro del templo, consiguiendo gran cantidad de objetos de los 4 cofres ocultos`
            );
            vidaDefault(jug);
            break;
          case 1:
            texto(
              ` ${jug.nombre} entra a la sala principal del templo pero no ve nada especial y se aleja sin ningun cambio`
            );
            vidaDefault(jug);
            break;
          case 2:
            texto(
              `${jug.nombre} se aleja con el inventario cargado de polovora mientras se imagina a ${jug2.nombre} volando por los aires`
            );
            //Que tiene que ver NN2?
            vidaDefault(jug);
            break;
          case 3:
            texto(
              `${jug.nombre} no va a tener que preocuparse por la comida, ahora tiene carne podrida de sobra`
            );
            vidaDefault(jug);
            break;
          case 4:
            dano = jug.vida;
            jug.vida = 0;
            texto(
              `${jug.nombre} se planta en el centro del templo y pica hacia abajo, cayendo directo sobre una placa de presion. Antes de entender que ocurre, vuela por los aires`
            );
            danoInsta(dano);
            vidaDefault(jug);
            break;
        }
      } else {
        texto(
          `${jug.nombre} cree que es una perdida de tiempo y cambia el rumbo`
        );
        vidaDefault(jug);
      }
    },
  },
  Noche: {
    spawner: async function (jug) {
      texto(
        `Cuando esta por abandonar una mina, ${jug.nombre} da con una gran cantidad de zombies y cree que se trata a un spawner oculto en las cercanias.`
      );
      vidaDefault(jug);
      texto(`¿Deberia ir a buscarlo?`, true);
      let decision = await decidir("Buscar spawner", "Seguir de largo");
      if (decision) {
        nrand = getRandomIntInclusive(4);
        switch (nrand) {
          case 0:
            texto(
              `${jug.nombre} recorre los alrededores pero no encuentra ningun spawner. Deja la cueva con las manos vacias`
            );
            vidaDefault(jug);
            break;
          case 1:
            texto(
              ` ${jug.nombre} planta una antorcha sobre el spawner sin perder vida y, despues de tomar los objetos de los cofres, piensa en crear una granja de experiencia`
            );
            vidaDefault(jug);
            break;
          case 2:
            texto(
              `Pensando en no morir, ${jug.nombre} rompe el spawner, perdiendo la posibilidad de crear una granja de experiencia`
            );
            vidaDefault(jug);
            break;
          case 3:
            dano = getRandomIntInclusive(15, 3);
            jug.vida -= dano;
            texto(
              `Cansado de no encontrar el spawner, ${jug.nombre} comienza a picar en todas las direcciones, cayendo sobre lava`
            );
            danoInsta(dano);
            vidaDefault(jug);
            break;
          case 4:
            dano = jug.vida;
            jug.vida = 0;
            texto(
              `${jug.nombre} ve el spawner a lo lejos, pero antes de lograr acercarse un grupo de zombies lo ataca, asesinandolo`
            );
            //creo que preferiria con un getRandomIntInclusive(-, -);
            danoInsta(dano);
            vidaDefault(jug);
            break;
        }
      } else {
        nrand = getRandomIntInclusive(2);
        switch (nrand) {
          case 0:
            texto(`${jug.nombre} se aleja de la zona antes de ser atacado`);
            vidaDefault(jug);
            break;
          case 1:
            dano = getRandomIntInclusive(10, 4);
            jug.vida -= dano;
            texto(
              `${jug.nombre} cree haberse alejado lo suficiente cuando un grupo de zombies lo ataca por la espalda`
            );
            danoInsta(dano);
            vidaDefault(jug);
            break;
          case 2:
            dano = jug.vida;
            jug.vida = 0;
            texto(
              `Aunque ${jug.nombre} cree haber ido por el camino opuesto, termina dentro del spawner. Antes de poder hacer algo, es asesinado por un grupo de zombies`
            );
            danoInsta(dano);
            vidaDefault(jug);
            break;
        }
      }
    },
  },
  Nether: {
    bosqueDis: async function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} quiere ir en busca del bosque distorsionado, tierra de los enderman, y conseguir enderpearls,`
      );
      vidaDefault(jug);
      texto(`¿Deberia partir?`, true);
      let decision = await decidir("Ir en su busqueda", "Pensar en otra cosa");
      if (decision) {
        nrand = getRandomIntInclusive(8);
        switch (nrand) {
          case 0:
            texto(
              `${jug.nombre} camina durante lo que parecen ser siglos pero no encuentra ningun enderman`
            );
            vidaDefault(jug);
            break;
          case 1:
            texto(
              `Tras una larga caminata, ${jug.nombre} cree haber conseguido enderpearls suficientes para comenzar la busqueda del End en un futuro cercano`
            );
            vidaDefault(jug);
            break;
          case 2:
            texto(
              `${jug.nombre} convence a ${jug2.nombre} para que explore con el. Ambos consiguen una gran cantidad de enderpearls`
            );
            vidaDefault(jug);
            break;
          case 3:
            dano = getRandomIntInclusive(15, 8);
            jug.vida -= dano;
            jug.vida += 4;
            texto(
              `${jug.nombre} es herido por los enderman ocultos en el bosque, pero logra huir con una gran cantidad de enderpearls`
            );
            danoInsta(dano);
            vidaDefault(jug);
            break;
          case 4:
            dano = jug.vida;
            jug.vida = 0;
            texto(
              `${jug.nombre} convence a ${jug2.nombre} para que explore con el. Tras alcanzar su meta, ${jug2.nombre} mata a ${jug.nombre} y se queda con los stacks de enderpearls para el solo`
            );
            danoInsta(dano);
            vidaDefault(jug);
            break;
          case 5:
            dano = jug.vida;
            jug.vida = 0;
            texto(
              `${jug.nombre} se topa con el bosque distorsionado casi al instante, pero antes de comenzar a llenar su inventario es asesinado por un enderman`
            );
            danoInsta(dano);
            vidaDefault(jug);
            break;
          case 6:
            texto(
              `${jug.nombre} se topa con el bosque distorsionado casi al instante, pero antes de comenzar a llenar su inventario es intimidado por un enderman, huyendo sin heridas`
            );
            vidaDefault(jug);
            break;
          case 7:
            texto(
              `En lugar de enderpearls, ${jug.nombre} se aleja de los enderman cargado de hongos distorsionados. ¿Que podria hacer con eso?`
            );
            vidaDefault(jug);
            jug.strider = true;
            break;
          case 8:
            texto(
              `${jug.nombre} pierde tanto tiempo buscando endermans que, al encontrarlos, mata a unos pocos y se aleja cansado`
            );
            vidaDefault(jug);
            break;
        }
      } else {
        nrand = getRandomIntInclusive(1);
        switch (nrand) {
          case 0:
            texto(
              `${jug.nombre} decide que aun no es tiempo para pensar en el End`
            );
            vidaDefault(jug);
            break;
          case 1:
            texto(
              `${jug.nombre} ve a la distancia lo que podria ser un bosque distorsionado, pero prefiere dar la vuelta`
            );
            vidaDefault(jug);
            break;
        }
      }
    },
  },
};
repetir(Decid.Nether, 4);
repetir(DecidDiaNoche, 1);
repetir(Decid.Dia, 2);
repetir(Decid.Noche, 2);
Object.assign(DecidDiaNoche, DecidGlobal);
Object.assign(Decid.Dia, DecidDiaNoche);
Object.assign(Decid.Noche, DecidDiaNoche);
Object.assign(Decid.Nether, DecidGlobal);
