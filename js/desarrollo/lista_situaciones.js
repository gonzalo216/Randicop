import {
  curar,
  danoInsta,
  decidir,
  texto,
  updateProgreso,
  vidaExtra,
} from "./print_lines.js";
import { getRandomIntInclusive, repetir } from "./funciones.js";
import { lista, jugs, dragon } from "./variables.js";
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

/* ----------------------------------------DAnO----------------------------------------*/
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
        `${jug.nombre} pierde la conexion. Al volver le aparece un <strong>Game Over</strong>`,
        jug
      );
      danoInsta(dano);
    },
    tropezon: function (jug) {
      nrand = getRandomIntInclusive(20);
      if (dano > 11) adicional = "y cae de un precipicio";
      else if (dano > 4) adicional = "y cae desde muy alto";
      else adicional = "";
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} tropieza ${adicional}`, jug);
      //   danoInsta(dano);
    },
  },
  DanoDiaNoche = {
    lobo: function (jug) {
      dano = getRandomIntInclusive(10);
      jug.vida -= dano;
      dano += jug.vida;
      texto(
        `${jug.nombre} golpea a un lobo, logrando que una manada se abalanzase sobre el`,
        jug
      );
      danoInsta(dano);
    },
    creeper: function (jug) {
      if (jug.gato) {
        adicional = `Un creeper casi sorprende a ${jug.nombre} por la espalda, pero su gato lo salva`;
        dano = 0;
      } else if (jug.escudo) {
        dano = getRandomIntInclusive(8, 6);
        jug.vida -= dano;
        dano += jug.vida;
        adicional = `${jug.nombre} logra minimizar el daño del creeper que lo sorprende por la espalda con su escudo`;
      } else {
        dano = getRandomIntInclusive(20, 19);
        jug.vida -= dano;
        dano += jug.vida;
        adicional = `Un creeper sorpende a ${jug.nombre} por la espalda`;
      }
      texto(adicional, jug);
      danoInsta(dano);
    },
    creeperCargado: function (jug) {
      dano = jug.vida;
      jug.vida = 0;
      texto(`Mientras pica, a ${jug.nombre} le cae grava encima`, jug);
      danoInsta(dano);
    },
    grava: function (jug) {
      dano = getRandomIntInclusive(3, 1);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`Mientras pica, a ${jug.nombre} le cae grava encima`, jug);
      danoInsta(dano);
    },
    speedrun: function (jug) {
      dano = getRandomIntInclusive(20, 1);
      jug.vida -= dano;
      dano += jug.vida;
      texto(
        `${jug.nombre} cae en lava al cavar en linea recta hacia abajo`,
        jug
      );
      danoInsta(dano);
    },
    bedrock: function (jug) {
      dano = jug.vida;
      jug.vida = 0;
      texto(
        `${jug.nombre} intenta romper bedrock, lo consigue y cae al vacio`,
        jug
      );
      danoInsta(dano);
    },

    papaenvenenada: function (jug) {
      nrand = getRandomIntInclusive(9);
      nrand <= 5 ? (dano = 4) : (dano = 0); //hay un 60% de propabilidades de perder 2 corazones
      jug.vida -= dano;
      dano += jug.vida;
      if (jug.vida <= 0) jug.vida = 1;
      texto(`${jug.nombre} se ve forzado a comer una papa envenenada`, jug);
      danoInsta(dano);
    },
  };
export const Dano = {
  Dia: {
    sol: function (jug) {
      dano = getRandomIntInclusive(3, 1);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} es quemado por el Sol`, jug);
      danoInsta(dano);
    },
    charco: function (jug) {
      dano = getRandomIntInclusive(15, 3);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} vio el charco de lava cuando ya era muy tarde`, jug);
      danoInsta(dano);
    },
    golem: function (jug) {
      dano = getRandomIntInclusive(20);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`El golem de la aldea defiende a un aldeano de ${jug.nombre}`, jug);
      danoInsta(dano);
    },
    llamas: function (jug) {
      dano = getRandomIntInclusive(15, 1);
      jug.vida -= dano;
      dano += jug.vida;
      if (jug.vida <= 0) adicional = "las llamas le escupen hasta morir";
      else if (dano > 12 && dano < 19)
        adicional = "Las llamas lo abligan a escapar de alli";
      else if (dano > 4 && dano < 12)
        adicional = "Las llamas le dan unos poderosos escupitajos";
      else if (dano > 1) adicional = "Le escupen unas llamas";
      else adicional = "Una llama le escupe";
      texto(`${jug.nombre} mata a un vendedor ambulante. ${adicional}`, jug);
      danoInsta(dano);
    },
  },
  Noche: {
    phantoms: function (jug) {
      dano = getRandomIntInclusive(20);
      jug.vida -= dano;
      dano += jug.vida;
      texto(
        `Tras no dormir por tres noches seguidas, ${jug.nombre} sufre dano de los phantoms`,
        jug
      );
      danoInsta(dano);
    },
    seducir: function (jug) {
      dano = getRandomIntInclusive(12, 2);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} intenta seducir a un enderman`, jug);
      danoInsta(dano);
    },
    danopeleaes: function (jug) {
      dano = getRandomIntInclusive(5, 1);
      jug.vida -= dano;
      dano += jug.vida;
      texto(
        `${jug.nombre} queda atrapado en una pelea entre dos esqueletos`,
        jug
      );
      danoInsta(dano);
    },
    zombiebpato: function (jug) {
      if (jug.perro) {
        dano = getRandomIntInclusive(5);
        adicional = `Un zombie bebe montado en un pato se acerca a ${jug.nombre}, pero su perro lo defiende`; //pato?
      } else {
        dano = getRandomIntInclusive(20, 4);
        adicional = `Un zombie bebe montado en una gallina ataca a ${jug.nombre}`; //pato?
      }
      jug.vida -= dano;
      dano += jug.vida;
      texto(adicional, jug);
      danoInsta(dano);
    },
    babyzombie: function (jug) {
      if (jug.perro) {
        dano = getRandomIntInclusive(3);
        adicional = `${jug.nombre} mata a un bebe zombie con ayuda de su perro`;
      } else {
        dano = getRandomIntInclusive(9, 4);
        adicional = `Sintiendo demasiado miedo, ${jug.nombre} escapa de un bebe zombie`;
      }
      jug.vida -= dano;
      dano += jug.vida;
      texto(adicional, jug);
      danoInsta(dano);
    },
    pobrePerro: function (jug) {
      if (jug.perro) {
        texto(
          `El perro de ${jug.nombre} muere defendiendolo de un mob`,
          jug,
          true
        );
        jug.perro--;
      } else {
        dano = getRandomIntInclusive(10, 5);
        jug.vida -= dano;
        dano += jug.vida;
        texto(`${jug.nombre} es herido por un zombie`, jug);
        danoInsta(dano);
      }
    },
  },
  Nether: {
    waterdrop: function (jug) {
      dano = getRandomIntInclusive(8, 2);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} intenta hacer un waterdrop`, jug);
      danoInsta(dano);
    },
    waterdrop: function (jug) {
      dano = getRandomIntInclusive(20, 19);
      jug.vida -= dano;
      dano += jug.vida;
      texto(`${jug.nombre} pone una cama e intenta dormir`, jug);
      danoInsta(dano);
    },
    piglin: function (jug) {
      if (jug.oro) {
        texto(
          `${jug.nombre} camina junto a un grupo de piglins sin ser atacado`,
          jug,
          true
        );
      } else {
        dano = getRandomIntInclusive(14, 5);
        jug.vida -= dano;
        dano += jug.vida;
        texto(
          `${jug.nombre} olvida llevar algo de oro y es atacado por un grupo de piglins`,
          jug
        );
        danoInsta(dano);
      }
    },
  },
  End: {
    vacio: function (jug) {
      dano = jug.vida;
      jug.vida = 0;
      texto(
        `${jug.nombre} olvida poner el siguiente bloque en su camino a la end city y cae al vacio`,
        jug
      );
      danoInsta(dano);
    },
    alas: function (jug) {
      nrand = getRandomIntInclusive(1);
      switch (nrand) {
        case 0:
          jug.vida -= 7;
          dano = jug.vida + 7;
          texto(
            `${jug.nombre} sale volando tras ser golpeado por un aletazo del ender dragon e intenta hacer un waterdrop`,
            jug
          );
          danoInsta(dano);
          break;
        case 1:
          dano = jug.vida;
          jug.vida = 0;
          texto(
            `${jug.nombre} sale volando tras ser golpeado por un aletazo del ender dragon, muriendo al instante`,
            jug
          );
          danoInsta(dano);
          break;
      }
    },
    volarCrystal: function (jug) {
      if (dragon.crystalAct) {
        dano = jug.vida;
        jug.vida = 0;
        texto(
          `${jug.nombre} sale volando de lo alto de un pico del end al golpear un end crystal, pero logra destruirlo`,
          jug
        );
        dragon.crystalAct = dragon.crystalAct - 1;
      } else {
        dano = getRandomIntInclusive(20, 8);
        jug.vida -= dano;
        dano += jug.vida;
        texto(
          `${jug.nombre} cae intentando subir a un pico del end para luchar contra el dragon`,
          jug
        );
      }
      danoInsta(dano);
    },
    espadaDragon: function (jug) {
      if (jug.espadaN) {
        texto(
          `En cuanto el ender dragon se posa sobre el portal inactivo, ${jug.nombre} lo golpea con una espada de netherite`,
          jug,
          true
        );
        dragon.vida = dragon.vida - 9;
        updateProgreso(dragon.vida);
      } else if (jug.espadaD) {
        texto(
          `En cuanto el ender dragon se posa sobre el portal inactivo, ${jug.nombre} lo golpea con una espada de diamante`,
          jug,
          true
        );
        dragon.vida = dragon.vida - 8;
        updateProgreso(dragon.vida);
      } else {
        texto(
          `En cuanto el ender dragon se posa sobre el portal inactivo, ${jug.nombre} lo golpea con una espada de hierro`,
          jug,
          true
        );
        dragon.vida = dragon.vida - 7;
        updateProgreso(dragon.vida);
      }
    },
    camaDragon: function (jug) {
      dragon.vida = dragon.vida - 20;
      updateProgreso(dragon.vida);
      texto(
        `${jug.nombre} hiere al dragon explotando una cama a su lado`,
        jug,
        true
      );
    },
    arcoCrystal: function (jug) {
      if (jug.arco && dragon.crystalAct) {
        texto(
          `${jug.nombre} utiliza su arco para destruir un end crystal`,
          jug,
          true
        );
        dragon.crystalAct = dragon.crystalAct - 1;
      } else {
        texto(
          `${jug.nombre} piensa en intentar herir al dragon con un stack de bolas de nieve...`,
          jug,
          true
        );
      }
    },
    aguaCrystal: function (jug) {
      texto(
        `${jug.nombre} escala a lo alto de un pico usando agua y destruye un end crystal sin salir herido`,
        jug,
        true
      );
      dragon.crystalAct = dragon.crystalAct - 1;
    },
  },
  tntDragon: function (jug) {
    nrand = getRandomIntInclusive(100, 33);
    dragon.vida = dragon.vida - nrand;
    updateProgreso(dragon.vida);
    texto(`${jug.nombre} hiere al dragon explotando TNT a su lado`, jug, true);
  },
  danoDragon: function (jug) {
    nrand = getRandomIntInclusive(32, 8);
    dragon.vida = dragon.vida - nrand;
    updateProgreso(dragon.vida);
    texto(
      `${jug.nombre} logra golpear al dragon algunas veces con su espada`,
      jug,
      true
    );
  },
};
repetir(Dano.Nether, 2);
repetir(Dano.End, 5);
repetir(Dano.Dia, 2);
repetir(Dano.Noche, 2);
repetir(DanoDiaNoche, 1);
Object.assign(DanoDiaNoche, DanoGlobal);
Object.assign(Dano.Dia, DanoDiaNoche);
Object.assign(Dano.Noche, DanoDiaNoche);
Object.assign(Dano.Nether, DanoGlobal);
Object.assign(Dano.End, DanoGlobal);

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
        `${jug.nombre} usa una pocion de <i>curacion instantanea ${adicional}</i>`,
        jug
      );
      ctrl();
      curar(cura);
      jug.vida = cura;
    },
    manzana: function (jug) {
      cura = 4 + jug.vida;
      texto(`${jug.nombre} come una manzana dorada`, jug);
      vidaExtra(4);
      ctrl();
      curar(cura);
      jug.vida = cura;
    },
    Notch: function (jug) {
      texto(`${jug.nombre} toma una manzana de Notch desde el creativo`, jug);
      vidaExtra(16);
      curar(20);
      console.log("notch");
      jug.vida = 20;
      jug.funcion.push(() => {
        nrand = getRandomIntInclusive(1);
        if (nrand) {
          dano = jug.vida;
          jug.vida = 0;
          texto(
            `Los moderadores descubren a ${jug.nombre} por lo que habia hecho`,
            jug
          );
          danoInsta(dano);
          return false;
        } else {
          return true;
        }
      });
    },
  },
  VidaDiaNoche = {
    bruja: function (jug) {
      pocionIns(jug.vida);
      texto(
        `Una bruja se confunde y le tira una pocion splash de <i>curacion instantanea ${adicional}</i> a ${jug.nombre}`,
        jug
      );
      ctrl();
      curar(cura);
      jug.vida = cura;
    },
  };
export const Vida = {
  Dia: {
    angel: function (jug) {
      cura = getRandomIntInclusive(19, 1) + jug.vida;
      texto(`Un angel baja del cielo y cura a ${jug.nombre}`, jug);
      ctrl();
      curar(cura);
      jug.vida = cura;
    },
  },
  Noche: {
    // angel: function (jug) { // dsp hago con cada sopa
    //   cura = 3 + jug.vida;
    //   texto(`una sopa misteriosa hace que ${jug.nombre} se sienta mucho mejor`);
    //   vidaDefault(jug);
    //   ctrl();
    //   curar(cura);
    //   jug.vida = cura;
    // },
  },
  Nether: {
    cofreManzana: function (jug) {
      cura = 4 + jug.vida;
      texto(
        `${jug.nombre} consigue una manzana dorada en el cofre de una fortaleza`,
        jug
      );
      vidaExtra(4);
      ctrl();
      curar(cura);
      jug.vida = cura;
    },
    cofreManzana: function (jug) {
      cura = 4 + jug.vida;
      texto(
        `${jug.nombre} consigue una manzana dorada en el cofre de un bastion`,
        jug
      );
      vidaExtra(4);
      ctrl();
      curar(cura);
      jug.vida = cura;
    },
  },
  End: {
    CrystalCurar: function (jug) {
      if (dragon.crystalAct) {
        // cura = getRandomIntInclusive(50, 20) + dragon.vida;
        // dragon.vida = cura;
        // updateProgreso(dragon.vida);
        // texto(
        //   `${jug.nombre} no puede evitar que el ender dragon recupere vida`,
        //   jug,
        //   true
        // );
      } else {
        texto(
          `${jug.nombre} observa los picos, ahora sin uso para el ender dragon, del end`,
          jug,
          true
        );
      }
    },
  },
};
repetir(Vida.Nether, 4);
repetir(Vida.End, 4);
repetir(Vida.Dia, 2);
repetir(Vida.Noche, 2);
repetir(VidaDiaNoche, 1);
Object.assign(VidaDiaNoche, VidaGlobal);
Object.assign(Vida.Dia, VidaDiaNoche);
Object.assign(Vida.Noche, VidaDiaNoche);
Object.assign(Vida.Nether, VidaGlobal);
Object.assign(Vida.End, VidaGlobal);

/* ----------------------------------------RANDOM----------------------------------------*/
const RandomGlobal = {
    // locura: function (nombre, vida) {
    //   texto(
    //     `${nombre} entra en la locura pensando por que el cubo no tiene forma de cubo`
    //   );
    //   vidaDefault(vida, true);
    // },
    cat: function (jug) {
      if (jug.netheritecrafteo) {
        let parte = partes()[0],
          material = "netherite",
          articulo = parte === "botas" ? "unas" : "un";
        jug.armadura[parte] = armadura[parte][material];
        jug.armourName[parte] = material;
        texto(
          `Con parte de la netherite que habia conseguido en el bastion del nether, ${jug.nombre} craftea ${articulo} ${parte} de ${material}`,
          jug,
          true
        );
        jug.netheritecrafteo = false;
      } else {
        let parte = partes()[1],
          material = "hierro",
          articulo = parte === "botas" ? "unas" : "un";
        jug.armadura[parte] = armadura[parte][material];
        jug.armourName[parte] = material;
        texto(
          `${jug.nombre} desea craftear armadura de netherite, pero en su lugar crea ${articulo} ${parte} de ${material}`,
          jug,
          true
        );
      }
    },
  },
  RandomDiaNoche = {
    // armadura: function (jug) { // un if si tiene armadura de cuero
    //   texto(`${jug.nombre} encanta su armadura de cuero`, jug, true);
    // },
    bedrock: function (jug) {
      texto(`${jug.nombre} pierde el dia intentando romper bedrock`, jug, true);
    },
    cat: function (jug) {
      texto(
        `${jug.nombre} se siente mas optimista tras obtener el disco de musica 'Cat'`,
        jug,
        true
      );
    },
    gatete: function (jug) {
      texto(
        `Paseando cerca de una aldea, ${jug.nombre} descubre a un gato y lo adiestra`,
        jug,
        true
      );
      jug.gato++;
    },
    recuento: function (jug) {
      texto(
        `${jug.nombre} recuenta sus diamantes pensando en hacerse una armadura`,
        jug,
        true
      );
    },
    diamanteLava: function (jug) {
      texto(
        `${jug.nombre} tira por error en la lava el unico diamante que logra encontrar`,
        jug,
        true
      );
    },
    aldea: function (jug) {
      texto(`${jug.nombre} encuentra una aldea`, jug, true);
    },
    diamanteLava: function (jug) {
      texto(
        `${jug.nombre} tira por error en la lava el unico diamante que logra encontrar`,
        jug,
        true
      );
    },
    fabricaDiamante: function (jug) {
      if (jug.espadaD)
        texto(
          `${jug.nombre} piensa en mejorar su espada de diamante`,
          jug,
          true
        );
      else {
        texto(`${jug.nombre} fabrica una espada de diamante`, jug, true);
        jug.espadaD = true;
      }
    },
    todaArmaRandom: function (jug) {
      let material = materiales();
      Object.keys(armadura).forEach((el) => {
        jug.armadura[el] = armadura[el][material];
        jug.armourName[el] = material;
      });
      if ((material = "oro")) jug.oro = true;
      texto(
        `${jug.nombre} logra fabricar toda una armadura de ${material}`,
        jug,
        true
      );
    },
    perroHuesos: function (jug) {
      if (jug.huesos) {
        texto(
          `Con los huesos que habia conseguido, ${jug.nombre} domestica a un lobo`,
          jug,
          true
        );
        jug.perro++;
        jug.huesos = false;
      } else {
        texto(
          `${jug.nombre} camina junto a una manada de lobos deseando domesticar al menos a uno`,
          jug,
          true
        );
      }
    },
    gatoPeces: function (jug) {
      if (jug.huesos) {
        texto(
          `Con los pescados que habia conseguido, ${jug.nombre} domestica a un gato`,
          jug,
          true
        );
        jug.gato = false;
        jug.gato++;
      } else {
        texto(
          `${jug.nombre} camina junto a un gato solitario deseando llevarlo consigo`,
          jug,
          true
        );
      }
    },
  };
export const Random = {
  Dia: {
    oveja: function (jug) {
      texto(
        `${jug.nombre} encuentra una oveja rosa... ahora esta pensando en hacerse una cama`,
        jug,
        true
      );
    },
    golem: function (jug) {
      texto(
        `${jug.nombre} golpea a un aldeano por accidente y huye del golem que le persigue`,
        jug,
        true
      );
    },
    semillas: function (jug) {
      texto(`${jug.nombre} cada vez tiene mas semillas`, jug, true);
    },
    frasco: function (jug) {
      texto(`${jug.nombre} fabrica un frasco para toma agua`, jug, true);
    },
    pala: function (jug) {
      texto(`${jug.nombre} fabrica una pala y se pone a trabajar`, jug, true);
    },
    cana: function (jug) {
      texto(
        `${jug.nombre} intenta pescar con su nueva cana, pero se rinde y entra al agua, golpeando a los peces con la espada
      `,
        jug,
        true
      );
    },
    armado: function (jug) {
      let parte = partes()[0],
        material = materiales(),
        articulo = parte === "botas" ? "unas" : "un";
      jug.armadura[parte] = armadura[parte][material];
      jug.armourName[parte] = material;
      texto(
        `${jug.nombre} se construye ${articulo} ${parte} de ${material}`,
        jug,
        true
      );
    },
  },
  Noche: {
    aldeanoZombie: function (jug) {
      texto(
        `${jug.nombre} deja que un aldeano muera por un zombie para curarlo`,
        jug,
        true
      );
    },
    polloZombie: function (jug) {
      texto(
        `Despues de ver a un mini zombie montando un pollo, ${jug.nombre} intenta hacer lo mismo`,
        jug,
        true
      );
    },
    peleaesqueletos: function (jug) {
      texto(
        `Un esqueleto falla un tiro a ${jug.nombre} y le da a otro esqueleto, generando una pelea entre ambos`,
        jug,
        true
      );
    },
    bajoTierra: function (jug) {
      texto(
        `Escapando de los mobs, ${jug.nombre} se refugia bajo tierra`,
        jug,
        true
      );
    },
    pensandoDiam: function (jug) {
      texto(`${jug.nombre} no puede dormir pensando en diamantes`, jug);
    },
    domesticarPP: function (jug) {
      texto(
        `${jug.nombre} busca esqueletos para conseguir huesos y domesticar a una manada de lobos `,
        jug,
        true
      );
      jug.huesos = true;
    },
    pensandoSitios: function (jug) {
      texto(`${jug.nombre} piensa en irse y explorar nuevos sitios`, jug, true);
    },
    arco: function (jug) {
      texto(`${jug.nombre} se hace con el arco de un esqueleto`, jug, true);
      jug.arco = true;
    },
    domesticarGG: function (jug) {
      texto(
        `${jug.nombre} consigue suficientes pescados para domesticar a un nuevo gato`,
        jug,
        true
      );
      jug.peces = true;
    },
  },
  Nether: {
    tiempoPortal: function (jug) {
      texto(
        `${jug.nombre} pierde la cuenta del tiempo pasado desde que vio por ultima vez un portal`,
        jug,
        true
      );
    },
    esponjas: function (jug) {
      texto(
        `${jug.nombre} pasa todo el dia intentando que las esponjas mojadas no se sequen al ponerlas en el suelo`,
        jug,
        true
      );
    },
    relojRoto: function (jug) {
      texto(
        `${jug.nombre} observa su reloj, pero parece estar roto...`,
        jug,
        true
      );
    },
    explorarStrider: function (jug) {
      if (jug.strider) {
        texto(
          `Con el hongo distorsionado y una montura, ${jug.nombre} recorre los alrededores montando a un strider`,
          jug,
          true
        );
      } else
        texto(
          `${jug.nombre} desea tener un hongo distorsionado para pasear sobre un strider`,
          jug,
          true
        );
    },
    mascotaStrider: function (jug) {
      texto(`${jug.nombre} se encarina con un strider solitario`, jug, true);
    },
    piensaStrider: function (jug) {
      texto(
        `${jug.nombre} piensa en adoptar a un strider como mascota`,
        jug,
        true
      );
    },
    fortaleza: function (jug) {
      texto(
        `${jug.nombre} comienza a construir su propia fortaleza`,
        jug,
        true
      );
    },
    parteArmaNetherite: function (jug) {
      let parte = partes()[0],
        material = "netherite",
        articulo = parte === "peto" ? "unas" : "un";
      jug.armadura[parte] = armadura[parte][material];
      jug.armourName[parte] = material;
      texto(
        `${jug.nombre} logra fabricar ${articulo} ${parte} de ${material}`,
        jug,
        true
      );
    },
    todaArmaNetherite: function (jug) {
      let material = "netherite";
      Object.keys(armadura).forEach((el) => {
        jug.armadura[el] = armadura[el][material];
        jug.armourName[el] = material;
      });
      texto(
        `${jug.nombre} logra fabricar toda una armadura de ${material}`,
        jug,
        true
      );
    },
    crearEspada: function (jug) {
      if (jug.espadaN) {
        texto(`${jug.nombre} fabrica una espada de netherite`, jug, true);
        jug.espadaN = true;
      } else
        texto(
          `${jug.nombre} piensa que podria hacer si consiguiera mas netherite`,
          jug,
          true
        );
    },
    fortaleza: function (jug) {
      texto(
        `${jug.nombre} piensa en recolectar calaveras de esqueletos para invocar al wither`,
        jug,
        true
      );
    },
  },
  End: {
    calabaza: function (jug) {
      //jug.armadura.casco = 0;
      //jug.armourName.casco = "calabaza tallada"
      //boleano para inmune a que los enderman se enojen
      texto(
        `${jug.nombre} observa su inventario cargado de calabazas`, //podria ser mejor "NN se equipa una calabaza tallada"
        jug,
        true
      );
    },
    montar: function (jug) {
      texto(`${jug.nombre} piensa en montar al ender dragon`, jug, true);
    },
    puente: function (jug) {
      texto(
        `${jug.nombre} ignora al dragon y, con el inventario lleno de bloques, piensa en partir en busca de la end city`,
        jug,
        true
      );
    },
    brujula: function (jug) {
      texto(
        `${jug.nombre} se distrae observando su brujula girar sin parar`,
        jug,
        true
      );
    },
    observar: function (jug) {
      texto(
        `${jug.nombre} no puede quitar la vista del ender dragon`,
        jug,
        true
      );
    },
    aguaCrystal: function (jug) {
      if (dragon.crystalAct) {
        texto(
          `${jug.nombre} logra destruir un end crystal solo con bolas de nieve`,
          jug,
          true
        );
        dragon.crystalAct = dragon.crystalAct - 1;
      } else {
        dragon.vida = dragon.vida - 8;
        updateProgreso(dragon.vida);
        texto(
          `${jug.nombre} hiere al ender dragon golpeandolo con un hacha`,
          jug,
          true
        );
      }
    },
    nieveCrystal: function (jug) {
      if (dragon.crystalAct) {
        texto(
          `${jug.nombre} logra destruir un end crystal solo con bolas de nieve`,
          jug,
          true
        );
        dragon.crystalAct = dragon.crystalAct - 1;
      } else {
        dragon.vida = dragon.vida - 8;
        updateProgreso(dragon.vida);
        texto(
          `${jug.nombre} hiere al ender dragon golpeandolo con una espada`,
          jug,
          true
        );
      }
    },
    huevosCrystal: function (jug) {
      if (dragon.crystalAct) {
        texto(
          `${jug.nombre} logra destruir un end crystal solo con huevos`,
          jug,
          true
        );
        dragon.crystalAct = dragon.crystalAct - 1;
      } else {
        dragon.vida = dragon.vida - 8;
        updateProgreso(dragon.vida);
        texto(
          `${jug.nombre} hiere al ender dragon golpeandolo con un hacha`,
          jug,
          true
        );
      }
    },
    dañoCrystal: function (jug) {
      if (dragon.crystalAct) {
        texto(
          `${jug.nombre} trepa a la cima de un pico y destruye un end crystal`,
          jug,
          true
        );
        dragon.crystalAct = dragon.crystalAct - 1;
      } else {
        dragon.vida = dragon.vida - 8;
        updateProgreso(dragon.vida);
        texto(
          `${jug.nombre} hiere al ender dragon golpeandolo con un hacha`,
          jug,
          true
        );
      }
    },
  },
};
repetir(Random.Nether, 10);
repetir(Vida.End, 4);
repetir(Random.Dia, 2);
repetir(Random.Noche, 2);
repetir(RandomDiaNoche, 1);
Object.assign(RandomDiaNoche, RandomGlobal);
Object.assign(Random.Dia, RandomDiaNoche);
Object.assign(Random.Noche, RandomDiaNoche);
Object.assign(Random.Nether, RandomGlobal);
Object.assign(Random.End, RandomGlobal);

/* ----------------------------------------RELACION----------------------------------------*/
export const RelGlobal = {
  escapar: function (jug) {
    const jug2 = nJugRand(jug);
    dano = getRandomIntInclusive(10);
    jug.vida -= dano;
    dano += jug.vida;
    texto(`${jug.nombre} es perseguido por ${jug2.nombre}`, jug);
    danoInsta(dano);
  },
};

const RelDiaNoche = {
  robarhierro: function (jug) {
    const jug2 = nJugRand(jug);
    texto(`${jug.nombre} roba hierro del horno de ${jug2.nombre}`, jug, true);
  },
  incendiarcasa: function (jug) {
    const jug2 = nJugRand(jug);
    texto(
      `${jug.nombre} amenaza a ${jug2.nombre} con incendiar su casa`,
      jug,
      true
    );
  },
  armado: function (jug) {
    const jug2 = nJugRand(jug);
    let parte = partes()[0],
      material = materiales(),
      articulo = parte === "botas" ? "unas" : "un";
    jug.armadura[parte] = armadura[parte][material];
    jug.armourName[parte] = material;
    texto(
      `${jug2.nombre} regala a ${jug.nombre} ${articulo} ${parte} de ${material}`,
      jug,
      true
    );
  },
};

export const Rel = {
  Dia: {
    construircasa: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} ayuda a ${jug2.nombre} con la construccion de su casa`,
        jug,
        true
      );
    },
    vivirjuntos: function (jug) {
      if (jug.conv) {
        if (jug.conv.vida <= 0) {
          texto(
            `${jug.nombre} sigue pensando en ${jug.conv.nombre}, el mejor companero de cuarto que pudo tener`,
            jug,
            true
          );
        }
        nrand = getRandomIntInclusive(1);
        switch (nrand) {
          case 0:
            dano = getRandomIntInclusive(20);
            jug.vida -= dano;
            dano += jug.vida;
            if (jug.vida <= 0)
              texto(
                `${jug.conv.nombre} no puede convivir mas y mata a ${jug.nombre} con un hacha`,
                jug
              );
            else
              texto(
                `Despues de unos dias viviendo juntos, ${jug.conv.nombre} no soporta mas e intenta matar a ${jug.nombre}`,
                jug
              );
            danoInsta(dano);
            jug.conv.conv = null;
            jug.conv = null;
            break;
          case 1:
            texto(`${jug.nombre} y ${jug.conv} agrandan su casa`, jug, true);
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
              `${jug.nombre} intento encontrar un companero, pero no lo logra`,
              jug,
              true
            );
            return;
          }
        } while (jug2.conv);
        texto(
          `${jug.nombre} y ${jug2.nombre} comienzan a vivir juntos`,
          jug,
          true
        );
        jug.conv = jug2;
        jug2.conv = jug;
      }
    },
    florescasa: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} planta flores en el camino principal a la casa de ${jug2.nombre}`,
        jug,
        true
      );
    },
    cazarjuntos: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} convence a ${jug2.nombre} para ir de caza juntos`,
        jug,
        true
      );
    },
  },
  Noche: {
    juntarCamas: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} y ${jug2.nombre} juntan sus camas para dormir`,
        jug,
        true
      );
    },
    buscarMobs: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} y ${jug2.nombre} exploran los alrededores juntos en busca de mobs`,
        jug,
        true
      );
    },
    dejarMobs: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `En cuanto aparecen los mobs, ${jug.nombre} deja solo a ${jug2.nombre}`,
        jug,
        true
      );
    },
  },
  Nether: {
    waterdrop: function (jug) {
      const jug2 = nJugRand(jug);
      dano = jug.vida;
      jug.vida = 0;
      texto(
        `${jug2.nombre} observa a ${jug.nombre} muy cerca de un precipicio y le da un empujon, tirandolo a un mar de lava`,
        jug
      );
      danoInsta(dano);
    },
    camas: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} y ${jug2.nombre} llenan sus inventarios de camas pensando en ir a buscar netherite`,
        jug,
        true
      );
    },
    advertir: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} advierte a ${jug2.nombre} sobre la presencia de un ghast`,
        jug,
        true
      );
    },
    buscarNetherite(jug) {
      const jug2 = nJugRand(jug);
      if (jug.espadaN) {
        texto(
          `${jug2.nombre} acompaña a ${jug.nombre} en busca de netherite`,
          jug,
          true
        );
      } else {
        texto(
          `${jug.nombre} ayuda a ${jug2.nombre} a craftear una espada de netherite tras un dia de exploracion`,
          jug,
          true
        );
        jug.espadaN = true;
      }
    },
  },
  End: {
    calabazaPrestar: function (jug) {
      const jug2 = nJugRand(jug);
      //jug2.armadura.casco = 0;
      //jug2.armourName.casco = "calabaza tallada"
      //boleano para jug2 de inmune a que los enderman se enojen
      texto(`${jug.nombre} le da a ${jug2.nombre} una calabaza tallada`, jug);
    },
    ayudarEnd: function (jug) {
      const jug2 = nJugRand(jug);
      dano = getRandomIntInclusive(20, 10);
      jug.vida -= dano;
      dano += jug.vida;
      texto(
        `${jug.nombre} protege a ${jug2.nombre} de un enderman, saliendo herido`,
        jug
      );
      danoInsta(dano);
    },
    dejarEnd: function (jug) {
      const jug2 = nJugRand(jug);
      dano = jug.vida;
      jug.vida = 0;
      texto(
        `${jug2.nombre} deja que ${jug.nombre} muera a manos de un enderman a pesar de haber podido ayudar`,
        jug
      );
      danoInsta(dano);
    },
    golpearArco: function (jug) {
      const jug2 = nJugRand(jug);
      if (jug.arco) {
        dano = getRandomIntInclusive(6, 4);
        texto(
          `Intentando disparar a un end crystal ${jug2.nombre} golpea por error a ${jug.nombre}`,
          jug
        );
        danoInsta(dano);
      } else
        texto(
          `${jug.nombre} piensa que, si tuviera un arco, atacaria a ${jug.nombre} en lugar de al ender dragon`,
          jug,
          true
        );
    },
    dobleDano: function (jug) {
      const jug2 = nJugRand(jug);
      dano = getRandomIntInclusive(64, 16);
      dragon.vida = dragon.vida - dano;
      updateProgreso(dragon.vida);
      texto(
        `${jug.nombre} y ${jug2.nombre} golpean con espadas reiteradas veces al ender dragon en cuanto se posa a descansar sobre el portal inactivo, hiriendolo`,
        jug,
        true
      );
    },
  },
};

repetir(Rel.Nether, 4);
repetir(Rel.End, 4);
repetir(RelDiaNoche, 1);
repetir(Rel.Dia, 2);
repetir(Rel.Noche, 2);
Object.assign(RelDiaNoche, RelGlobal);
Object.assign(Rel.Dia, RelDiaNoche);
Object.assign(Rel.Noche, RelDiaNoche);
Object.assign(Rel.Nether, RelGlobal);
Object.assign(Rel.End, RelGlobal);

/* ----------------------------------------DECISIoN----------------------------------------*/
const DecidGlobal = {};

const DecidDiaNoche = {
  encontrarLobo: async function (jug) {
    const jug2 = nJugRand(jug);
    texto(
      `${jug.nombre} encuentra a un lobo solitario, pero solo tiene unos pocos huesos en su inventario.`,
      jug,
      true
    );
    texto(`¿Deberia intentar domesticarlo?`, false, true);
    let decision = await decidir("Intentar domesticarlo", "Ignorar al lobo");
    if (decision) {
      nrand = getRandomIntInclusive(2);
      switch (nrand) {
        case 0:
          texto(
            `${jug.nombre} gasta todos sus huesos pero no logra domesticarlo`,
            jug,
            true
          );
          break;
        case 1:
          texto(`¡Ahora ${jug.nombre} tiene un nuevo perro!`, jug, true);
          jug.perro++;
          break;
        case 2:
          dano = getRandomIntInclusive(4, 1);
          jug.vida -= dano;
          dano += jug.vida;
          texto(`${jug.nombre} confunde las teclas y golpea al lobo`, jug);
          danoInsta(dano);
          break;
      }
    } else {
      nrand = getRandomIntInclusive(1);
      switch (nrand) {
        case 0:
          texto(`${jug.nombre} decide primero conseguir mas huesos`, jug, true);
          break;
        case 1:
          texto(
            `${jug.nombre} es mas bien un fanatico de los gatos`,
            jug,
            true
          );
          break;
      }
    }
  },
};

export const Decid = {
  Dia: {
    entrarCasa: async function (jug) {
      const jug2 = nJugRand(jug);
      let jug3;
      do {
        jug3 = nJugRand(jug);
      } while (jug3 === jug2);
      texto(
        `${jug.nombre} observa a ${jug2.nombre} alejarse de su casa, y no cree que vuelva pronto.`,
        jug,
        true
      );
      texto(`¿Deberia aprovecharse y entrar a su casa?`, false, true);
      let decision = await decidir("Entrar", "No entrar");
      if (decision) {
        nrand = getRandomIntInclusive(7);
        switch (nrand) {
          case 0:
            let parte = partes()[0],
              material = materiales(),
              articulo = parte === "botas" ? "unas" : "un";
            jug.armadura[parte] = armadura[parte][material];
            jug.armourName[parte] = material;
            texto(
              `Al entrar, encuentra una sala escondida tras un cuadro llena de cofres. Rapido, toma ${articulo} ${parte} de ${material} y escapa`,
              jug,
              true
            );
            break;
          case 1:
            dano = getRandomIntInclusive(4, 1);
            jug.vida -= dano;
            dano += jug.vida;
            texto(
              `${jug2.nombre} regresa mucho antes de lo esperado y golpea a ${jug.nombre} con los punos`,
              jug
            );
            danoInsta(dano);
            break;
          case 2:
            //   // hay que revisarlo
            // texto(
            //   `${jug.nombre} descubre que ${jug3.nombre} ha tenido la misma idea y se encuentra buscando entre los cofres. Deciden dividir los objetos que toman.`,
            //   jug,
            //   true
            // ); //Deberia haber algun booleano o deberia conseguir armadura en vez de diamantes
            texto(
              `${jug.nombre} se interna en la casa sin inconvenientes, pero descubre que los cofres de ${jug2.nombre} se encontraban vacios`,
              jug
            );
            break;
          case 3:
            pocionIns(jug.vida);
            texto(
              `${jug.nombre} encuentra un soporte de pociones en la casa y crea una pocion de <i>curacion instantanea ${adicional}</i>, bebiendola al instante`,
              jug
            );
            ctrl();
            curar(cura);
            jug.vida = cura;
            break;
          case 4:
            dano = jug.vida;
            jug.vida = 0;
            texto(
              `${jug.nombre} se toma demasiado tiempo y ${jug2.nombre} regresa, golpeandolo con su hacha hasta morir`,
              jug
            );
            danoInsta(dano);
            break;
          case 5:
            texto(
              `${jug.nombre} piensa en tomar todo lo que encuentre, pero se siente culpable y decide no traicionar a ${jug2.nombre}`,
              jug,
              true
            );
            break;
          case 6:
            texto(
              `Antes de que ${jug2.nombre} regrese, ${jug.nombre} llena su casa de TNT, activando el mechero y alejandose`,
              jug,
              true
            );
            break;
          case 7:
            texto(
              `Cuando ${jug2.nombre} regresa se sorprende al encontrar su casa llena de ovejas`,
              jug,
              true
            );
            break;
        }
      } else {
        texto(`${jug.nombre} deja pasar la oportunidad`, jug, true);
      }
    },
    entrarTemplo: async function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `Paseando por el desierto, ${jug.nombre} ve a lo lejos un templo.`,
        jug,
        true
      );
      texto(`¿Deberia adentrarse en el?`, false, true);
      let decision = await decidir("Entrar", "No entrar");
      if (decision) {
        nrand = getRandomIntInclusive(4);
        switch (nrand) {
          case 0:
            if (jug.espadaD) {
              texto(
                `${jug.nombre} baja picando en forma de escalera en torno al gran agujero en el centro del templo, consiguiendo gran cantidad de objetos de los 4 cofres ocultos`,
                jug,
                true
              );
            } else {
              texto(
                `${jug.nombre} baja picando en forma de escalera en torno al gran agujero en el centro del templo, consiguiendo diamantes suficientes para craftear una nueva espada`,
                jug,
                true
              );
              jug.espadaD = true;
            }
            break;
          case 1:
            texto(
              ` ${jug.nombre} entra a la sala principal del templo pero no ve nada especial y se aleja sin ningun cambio`,
              jug,
              true
            );
            break;
          case 2:
            texto(
              `${jug.nombre} se aleja con el inventario cargado de polovora mientras se imagina a ${jug2.nombre} volando por los aires`,
              jug
            );
            break;
          case 3:
            texto(
              `${jug.nombre} no va a tener que preocuparse por la comida, ahora tiene carne podrida de sobra`,
              jug,
              true
            ); //booleano para de q tiene comida
            break;
          case 4:
            dano = jug.vida;
            jug.vida = 0;
            texto(
              `${jug.nombre} se planta en el centro del templo y pica hacia abajo, cayendo directo sobre una placa de presion. Antes de entender que ocurre, vuela por los aires`,
              jug
            );
            danoInsta(dano);
            break;
        }
      } else {
        texto(
          `${jug.nombre} cree que es una perdida de tiempo y cambia el rumbo`,
          jug,
          true
        );
      }
    },
  },
  Noche: {
    spawner: async function (jug) {
      texto(
        `Cuando esta por abandonar una mina, ${jug.nombre} da con una gran cantidad de zombies y cree que se trata a un spawner oculto en las cercanias.`,
        jug,
        true
      );
      texto(`¿Deberia ir a buscarlo?`, false, true);
      let decision = await decidir("Buscar spawner", "Seguir de largo");
      if (decision) {
        nrand = getRandomIntInclusive(4);
        switch (nrand) {
          case 0:
            texto(
              `${jug.nombre} recorre los alrededores pero no encuentra ningun spawner. Deja la cueva con las manos vacias`,
              jug,
              true
            );
            break;
          case 1:
            texto(
              ` ${jug.nombre} planta una antorcha sobre el spawner sin perder vida y, despues de tomar los objetos de los cofres, piensa en crear una granja de experiencia`,
              jug,
              true
            ); //Consiguio objetos? booleano o armadura ;)
            break;
          case 2:
            texto(
              `Pensando en no morir, ${jug.nombre} rompe el spawner, perdiendo la posibilidad de crear una granja de experiencia`,
              jug,
              true
            );
            break;
          case 3:
            dano = getRandomIntInclusive(15, 6); //un mayor dano minimo?
            jug.vida -= dano;
            texto(
              `Cansado de no encontrar el spawner, ${jug.nombre} comienza a picar en todas las direcciones, cayendo sobre lava`,
              jug
            );
            danoInsta(dano);
            break;
          case 4:
            dano = jug.vida;
            jug.vida = 0;
            texto(
              `${jug.nombre} ve el spawner a lo lejos, pero antes de lograr acercarse un grupo de zombies lo ataca, asesinandolo`,
              jug
            );
            //creo que preferiria con un getRandomIntInclusive(-, -);
            danoInsta(dano);
            break;
        }
      } else {
        nrand = getRandomIntInclusive(2);
        switch (nrand) {
          case 0:
            texto(
              `${jug.nombre} se aleja de la zona antes de ser atacado`,
              jug,
              true
            );
            break;
          case 1:
            dano = getRandomIntInclusive(10, 4);
            jug.vida -= dano;
            texto(
              `${jug.nombre} cree haberse alejado lo suficiente cuando un grupo de zombies lo ataca por la espalda`,
              jug
            );
            danoInsta(dano);
            break;
          case 2:
            dano = jug.vida;
            jug.vida = 0;
            texto(
              `Aunque ${jug.nombre} cree haber ido por el camino opuesto, termina dentro del spawner. Antes de poder hacer algo, es asesinado por un grupo de zombies`,
              jug
            );
            danoInsta(dano);
            break;
        }
      }
    },
  },
  Nether: {
    bosqueDis: async function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} quiere ir en busca del bosque distorsionado, tierra de los enderman, y conseguir enderpearls,`,
        jug,
        true
      );
      texto(`¿Deberia partir?`, false, true);
      let decision = await decidir("Ir en su busqueda", "Pensar en otra cosa");
      if (decision) {
        nrand = getRandomIntInclusive(8);
        switch (nrand) {
          case 0:
            texto(
              `${jug.nombre} camina durante lo que parecen ser siglos pero no encuentra ningun enderman`,
              jug,
              true
            );
            break; //Funcion para que en el siguiente siga caminando
          case 1:
            texto(
              `Tras una larga caminata, ${jug.nombre} cree haber conseguido enderpearls suficientes para comenzar la busqueda del End en un futuro cercano`,
              jug,
              true
            );
            break;
          case 2:
            texto(
              `${jug.nombre} convence a ${jug2.nombre} para que explore con el. Ambos consiguen una gran cantidad de enderpearls`,
              jug,
              true
            );
            break; //booleano para ambos?
          case 3:
            dano = getRandomIntInclusive(15, 8);
            jug.vida -= dano;
            dano += jug.vida;
            texto(
              `${jug.nombre} es herido por los enderman ocultos en el bosque, pero logra huir con una gran cantidad de enderpearls`,
              jug
            );
            danoInsta(dano);
            break; //Booleano?
          case 4:
            dano = jug.vida;
            jug.vida = 0;
            texto(
              `${jug.nombre} convence a ${jug2.nombre} para que explore con el. Tras alcanzar su meta, ${jug2.nombre} mata a ${jug.nombre} y se queda con los stacks de enderpearls para el solo`,
              jug
            );
            danoInsta(dano);
            break; //booleano para jug2?
          case 5:
            dano = jug.vida;
            jug.vida = 0;
            texto(
              `${jug.nombre} se topa con el bosque distorsionado casi al instante, pero antes de comenzar a llenar su inventario es asesinado por un enderman`,
              jug
            );
            danoInsta(dano);
            break;
          case 6:
            texto(
              `${jug.nombre} se topa con el bosque distorsionado casi al instante, pero antes de comenzar a llenar su inventario es intimidado por un enderman, huyendo sin heridas`,
              jug,
              true
            );
            break;
          case 7:
            texto(
              `En lugar de enderpearls, ${jug.nombre} se aleja de los enderman cargado de hongos distorsionados. ¿Que podria hacer con eso?`,
              jug,
              true
            );
            jug.strider = true;
            break;
          case 8:
            texto(
              `${jug.nombre} pierde tanto tiempo buscando endermans que, al encontrarlos, mata a unos pocos y se aleja cansado`,
              jug,
              true
            );
            break;
        }
      } else {
        nrand = getRandomIntInclusive(1);
        switch (nrand) {
          case 0:
            texto(
              `${jug.nombre} decide que aun no es tiempo para pensar en el End`,
              jug,
              true
            );
            break;
          case 1:
            texto(
              `${jug.nombre} ve a la distancia lo que podria ser un bosque distorsionado, pero prefiere dar la vuelta`,
              jug,
              true
            );
            break;
        }
      }
    },
    bastion: async function (jug) {
      const jug2 = nJugRand(jug);
      texto(`${jug.nombre} encuentra un bastion del nether`, jug, true);
      texto(`¿Deberia explorarlo?`, false, true);
      let decision = await decidir("Entrar", "Ignorar");
      if (decision) {
        nrand = getRandomIntInclusive(6);
        switch (nrand) {
          case 0:
            let parte = partes[1],
              material = "oro",
              articulo = parte === "botas" ? "unas" : "un";
            jug.armadura[parte] = armadura[parte][material];
            jug.armourName[parte] = material;
            texto(
              `Abriendo el primer cofre que encuentra por casualidad, se apresura a tomar ${articulo} ${parte} de ${material} y huye de un grupo amenazante de piglins`,
              jug,
              true
            );
            jug.oro = true;
            break;
          case 1:
            dano = jug.vida;
            jug.vida = 0;
            texto(
              `${jug.nombre} intenta abrir un cofre pero, antes de tomar algo, un grupo de piglins lo descubre y se encarga de asesinarlo`,
              jug
            );
            danoInsta(dano);
            break;
          case 2:
            texto(
              `${jug.nombre} descubre que ${jug2.nombre} estaba detras suyo y ambos se turnan para defender y tomar los objetos de los cofres`,
              jug,
              true
            );
            texto(
              `Ambos consiguen netherite suficiente para intentar craftear algo`,
              jug,
              true
            );
            jug.netheritecrafteo = true;
            break;
          case 3:
            dano = getRandomIntInclusive(20, 15);
            jug.vida -= dano;
            dano += jug.vida;
            texto(
              `${jug.nombre} se topa con un grupo de piglins brutos en la entrada al bastion. Entrar deja de ser una opcion`,
              jug
            );
            danoInsta(dano);
            break;
          case 4:
            texto(
              `${jug.nombre} logra equipar unas botas de oro justo a tiempo para que un grupo de piglins lo ataquen. No mucho despues se rompen y huye sin tomar nada`,
              jug,
              vida
            );
            danoInsta(dano);
            break;
          case 5:
            texto(
              `${jug.nombre} se aleja del bastion preguntandose que puede hacer con tanto oro`,
              jug,
              true
            );
            break;
        }
      } else {
        nrand = getRandomIntInclusive(1);
        switch (nrand) {
          case 0:
            texto(
              `${jug.nombre} piensa que es mejor no enfrentarse a los piglins`,
              jug,
              true
            );
            break;
          case 1:
            texto(
              `${jug.nombre} decide buscar otra forma de encontrar materiales`,
              jug,
              true
            );
            break;
        }
      }
    },
  },
  End: {
    // falta terminar
    ataques: async function (jug) {
      const jug2 = nJugRand(jug);
      texto(`${jug.nombre} debe enfrentarse al ender dragon`, jug, true);
      texto(`¿Deberia atacarlo de cerca o de lejos?`, false, true);
      let decision = await decidir("Cerca", "Lejos");
      if (decision) {
        nrand = getRandomIntInclusive(2);
        switch (nrand) {
          case 0:
            dano = jug.vida;
            jug.vida = 0;
            dragon.vida = dragon.vida - 20;
            updateProgreso(dragon.vida);
            texto(
              `Confiado, ${jug.nombre} pone una cama junto al dragon cuando este se encuentra cerca, pero ambos reciben el impacto`,
              jug
            );
            danoInsta(dano);
            break;
          case 1:
            dano = getRandomIntInclusive(20, 6);
            jug.vida -= dano;
            dano += jug.vida;
            texto(`El ender dragon ataca a ${jug.nombre} de cerca`, jug);
            danoInsta(dano);
            break;
          case 2:
            dano = getRandomIntInclusive(15, 10);
            jug.vida -= dano;
            dano += jug.vida;
            dragon.vida = dragon.vida - 8;
            updateProgreso(dragon.vida);
            texto(
              `El ender dragon se dirige en picada hacia ${jug.nombre}. Aunque logra golpearlo, ambos pierden vida`,
              jug
            );
            danoInsta(dano);
            break;
        }
      } else {
        nrand = getRandomIntInclusive(1);
        switch (nrand) {
          case 0:
            dano = getRandomIntInclusive(18, 3);
            jug.vida -= dano;
            dano += jug.vida;
            texto(`El ender dragon ataca a ${jug.nombre} con su aliento`, jug);
            danoInsta(dano);
            break;
          case 1:
            dragon.vida = dragon.vida - 9;
            updateProgreso(dragon.vida);
            texto(
              `${jug.nombre} utiliza un arco a punto de romperse que llevaba en su inventario para herir al dragon, aunque este se parte al instante`,
              jug
            );
            danoInsta(dano);
            break;
        }
      }
    },
  },
};
repetir(Decid.Nether, 4);
repetir(Decid.End, 4);
repetir(DecidDiaNoche, 1);
repetir(Decid.Dia, 2);
repetir(Decid.Noche, 2);
Object.assign(DecidDiaNoche, DecidGlobal);
Object.assign(Decid.Dia, DecidDiaNoche);
Object.assign(Decid.Noche, DecidDiaNoche);
Object.assign(Decid.Nether, DecidGlobal);
Object.assign(Decid.End, DecidGlobal);
