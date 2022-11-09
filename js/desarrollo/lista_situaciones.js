import {
  curar,
  danoInsta,
  decidir,
  texto,
  updateProgreso,
  vidaExtra,
} from "./print_lines.js";
import { getRandomIntInclusive, repetir } from "./funciones.js";
import { dragon } from "./variables.js";
import { armadura, materiales, partes } from "./armadura.js";
import {
  banneado,
  danoDragon,
  danoEspadas,
  getArmadura,
  nJugRand,
  pocionIns,
} from "./func_lista.js";
import { verifEvent } from "./situaciones.js";

let nrand, dano, cura, adicional;
/* ----------------------------------------DAnO----------------------------------------*/
const DanoGlobal = {
    nocomer: function (jug) {
      if (jug.comida)
        texto(`${jug.nombre} come ${jug.comida} para saciar su hambre`);
      else {
        dano = jug.vida;
        jug.vida = 1;
        danoInsta(dano);
        texto(`${jug.nombre} se quedo sin comida`, jug);
      }
    },
    conexion: function (jug) {
      dano = jug.vida;
      jug.vida = 0;
      danoInsta(dano);
      texto(
        `${jug.nombre} pierde la conexion. Al volver le aparece un <strong>Game Over</strong>`,
        jug
      );
    },
    tropezon: function (jug) {
      dano = getRandomIntInclusive(20);
      if (dano > 11) adicional = "y cae de un precipicio";
      else if (dano > 4) adicional = "y cae desde muy alto";
      else adicional = "";
      dano -= Math.ceil(dano * ((4 * getArmadura(jug.armadura)) / 100));
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      texto(`${jug.nombre} tropieza ${adicional}`, jug);
    },
  },
  DanoDiaNoche = {
    /* instantaneo */
    bedrock: function (jug) {
      dano = jug.vida;
      jug.vida = 0;
      danoInsta(dano);
      texto(
        `${jug.nombre} intenta romper bedrock, lo consigue y cae al vacio`,
        jug
      );
    },
    /* mobs */
    lobo: function (jug) {
      dano = getRandomIntInclusive(20);
      dano -= Math.ceil(dano * ((4 * getArmadura(jug.armadura)) / 100));
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      texto(
        `${jug.nombre} golpea a un lobo, logrando que una manada se abalanzase sobre el`,
        jug
      );
    },
    creeper: function (jug) {
      if (jug.gato) {
        adicional = `Un creeper casi sorprende a ${jug.nombre} por la espalda, pero su gato lo salva`;
      } else if (jug.escudo) {
        adicional = `${jug.nombre} se protege con su escudo de un creeper que cae delante suyo`;
      } else {
        dano = getRandomIntInclusive(20, 1);
        dano -= Math.ceil(dano * ((4 * getArmadura(jug.armadura)) / 100));
        jug.vida -= dano;
        dano += jug.vida;
        danoInsta(dano);
        if (jug.vida > 0) {
          if (dano === 1)
            adicional = `Antes de que el creeper explote, ${jug.nombre} pone un bloque en el medio`;
          else adicional = `Un creeper explota en frente de ${jug.nombre}`;
        } else adicional = `Un creeper sorpende a ${jug.nombre} por la espalda`;
      }
      texto(adicional, jug);
    },
    creeperCargado: function (jug) {
      dano = jug.vida;
      jug.vida = 0;
      danoInsta(dano);
      texto(
        `${jug.nombre} se encuentra con un creeper electrico e intenta sacarse una foto con el`,
        jug
      );
      const jug2 = nJugRand(jug);
      if (jug2) {
        jug2.funcion.push(() => {
          nrand = getRandomIntInclusive(4);
          if (nrand) {
            texto(`${jug2.nombre} encuentra la cabeza de ${jug.nombre}`, jug2);
            jug2.trofeo = jug.nombre;
            return false;
          } else {
            return true;
          }
        });
      }
    },
    /* grava y lava */
    grava: function (jug) {
      dano = getRandomIntInclusive(3, 1);
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      texto(`Mientras pica, a ${jug.nombre} le cae grava encima`, jug);
    },
    speedrun: function (jug) {
      dano = getRandomIntInclusive(20, 7);
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      texto(
        `${jug.nombre} cae en lava al cavar en linea recta hacia abajo`,
        jug
      );
    },
    /* random */
    papaenvenenada: function (jug) {
      nrand = getRandomIntInclusive(9);
      nrand <= 5 ? (dano = 4) : (dano = 0); //hay un 60% de propabilidades de perder 2 corazones
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      if (jug.vida <= 0) jug.vida = 1;
      texto(`${jug.nombre} se ve forzado a comer una papa envenenada`, jug);
    },
  };
export const Dano = {
  Dia: {
    charco: function (jug) {
      dano = getRandomIntInclusive(3, 1);
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      texto(`${jug.nombre} vio el charco de lava cuando ya era muy tarde`, jug);
    },
    golem: function (jug) {
      nrand = getRandomIntInclusive(1);
      if (nrand) {
        dano = getRandomIntInclusive(20, 10);
        dano -= Math.ceil(dano * ((4 * getArmadura(jug.armadura)) / 100));
        jug.vida -= dano;
        dano += jug.vida;
        danoInsta(dano);
        texto(
          `El golem de la aldea defiende a un aldeano de ${jug.nombre}`,
          jug
        );
      } else
        texto(
          `${jug.nombre} golpea a un aldeano por accidente y huye del golem que le persigue`,
          jug
        );
    },
    llamas: function (jug) {
      dano = getRandomIntInclusive(15);
      if (dano > 12) adicional = "Las llamas lo abligan a escapar de alli";
      else if (dano > 4)
        adicional = "Las llamas le dan unos poderosos escupitajos";
      else if (dano > 1) adicional = "Le escupen unas llamas";
      else if (dano) adicional = "Una llama le escupe";
      else adicional = "";
      dano -= Math.ceil(dano * ((4 * getArmadura(jug.armadura)) / 100));
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      if (jug.vida <= 0) adicional = "Las llamas le escupen hasta morir";
      texto(`${jug.nombre} mata a un vendedor ambulante. ${adicional}`, jug);
    },
    sol: function (jug) {
      dano = getRandomIntInclusive(3, 1);
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      texto(`${jug.nombre} se quema por el Sol`, jug);
    },
  },
  Noche: {
    phantoms: function (jug) {
      dano = getRandomIntInclusive(20, 5);
      dano -= Math.ceil(dano * ((4 * getArmadura(jug.armadura)) / 100));
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      texto(
        `Tras no dormir por tres noches seguidas, ${jug.nombre} sufre de los phantoms`,
        jug
      );
    },
    seducir: function (jug) {
      dano = getRandomIntInclusive(20, 5);
      dano -= Math.ceil(dano * ((4 * getArmadura(jug.armadura)) / 100));
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      texto(`${jug.nombre} intenta seducir a un enderman`, jug);
    },
    danopeleaes: function (jug) {
      dano = getRandomIntInclusive(5, 1);
      dano -= Math.ceil(dano * ((4 * getArmadura(jug.armadura)) / 100));
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      texto(
        `${jug.nombre} queda atrapado en una pelea entre dos esqueletos`,
        jug
      );
    },
    zombiebpato: function (jug) {
      if (jug.perro) {
        dano = getRandomIntInclusive(5);
        adicional = `Un zombie bebe sobre un pollo se acerca a ${jug.nombre}, pero su perro lo defiende`;
      } else {
        dano = getRandomIntInclusive(20, 5);
        adicional = `Un zombie bebe sobre un pollo ataca a ${jug.nombre}`;
      }
      dano -= Math.ceil(dano * ((4 * getArmadura(jug.armadura)) / 100));
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      texto(adicional, jug);
    },
    babyzombie: function (jug) {
      if (jug.perro) {
        dano = getRandomIntInclusive(3);
        adicional = `${jug.nombre} mata a un bebe zombie con ayuda de su perro`;
      } else {
        dano = getRandomIntInclusive(9, 4);
        adicional = `${jug.nombre} corre por su vida de un bebe zombie`;
      }
      dano -= Math.ceil(dano * ((4 * getArmadura(jug.armadura)) / 100));
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      texto(adicional, jug);
    },
    pobrePerro: function (jug) {
      if (jug.perro) {
        texto(`El perro de ${jug.nombre} muere defendiendolo de un mob`, jug);
        jug.perro--;
      } else {
        dano = getRandomIntInclusive(10, 3);
        dano -= Math.ceil(dano * ((4 * getArmadura(jug.armadura)) / 100));
        jug.vida -= dano;
        dano += jug.vida;
        danoInsta(dano);
        texto(`${jug.nombre} es herido por un zombie`, jug);
      }
    },
  },
  Nether: {
    /* mobs */
    piglin: function (jug) {
      if (Object.values(jug.armadura).includes("oro")) {
        texto(
          `${jug.nombre} camina junto a un grupo de piglins sin ser atacado`,
          jug
        );
      } else {
        dano = getRandomIntInclusive(20, 5);
        dano -= Math.ceil(dano * ((4 * getArmadura(jug.armadura)) / 100));
        jug.vida -= dano;
        dano += jug.vida;
        danoInsta(dano);
        texto(
          `${jug.nombre} olvida llevar algo de oro y es atacado por un grupo de piglins`,
          jug
        );
      }
    },
    waterdrop: function (jug) {
      dano = getRandomIntInclusive(10, 5);
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      texto(`${jug.nombre} intenta hacer un waterdrop`, jug);
    },
    cama: function (jug) {
      dano = getRandomIntInclusive(20, 15);
      dano -= Math.ceil(dano * ((4 * getArmadura(jug.armadura)) / 100));
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      texto(`${jug.nombre} pone una cama e intenta dormir`, jug);
    },
  },
  End: {
    vacio: function (jug) {
      dano = jug.vida;
      jug.vida = 0;
      danoInsta(dano);
      texto(
        `${jug.nombre} olvida poner el siguiente bloque en su camino a la end city y cae al vacio`,
        jug
      );
    },
    alas: function (jug) {
      nrand = getRandomIntInclusive(2);
      switch (nrand) {
        case 0:
          dano = getRandomIntInclusive(20, 7);
          adicional = "";
          break;
        case 1:
          dano = 5;
          adicional = " y lanza una perla de ender para salvarse";
          break;
        case 2:
          dano = 0;
          adicional = ", pero logra hacer un waterdrop";
          break;
      }
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      texto(
        `${jug.nombre} sale volando tras ser golpeado por un aletazo del ender dragon${adicional}`,
        jug
      );
    },
    volarCrystal: function (jug) {
      let adicional2 = "";
      if (dragon.crystalAct) {
        adicional2 = "sale volando de";
        switch (nrand) {
          case 0:
            dano = getRandomIntInclusive(20, 7);
            if (jug.vida === 0)
              adicional =
                "lo alto de un pico al destruir un end crystal, muriendo al instante";
            else adicional = "un pico bajo al destruir un end crystal";
            break;
          case 1:
            dano = 5;
            adicional =
              "un pico al destruir un end crystal y lanza una perla de ender para salvarse";
            break;
          case 2:
            dano = 0;
            adicional =
              "un pico al destruir un end crystal, pero logra hacer un waterdrop";
            break;
        }
        dragon.crystalAct -= 1;
      } else {
        dano = getRandomIntInclusive(20, 3);
        adicional = `${jug.nombre} cae intentando subir a un pico del end para luchar contra el dragon`;
      }
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      texto(`${jug.nombre} ${adicional2} ${adicional}`, jug);
    },
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
const VidaGlobal = {
    pocionCura: function (jug) {
      adicional = pocionIns(jug.vida);
      texto(
        `${jug.nombre} usa una pocion de <i>curacion instantanea ${adicional}</i>`,
        jug
      );
      jug.vida += adicional === "I" ? 4 : 8;
    },
    manzana: function (jug) {
      cura = 4 + jug.vida;
      vidaExtra(4);
      curar(cura);
      texto(`${jug.nombre} come una manzana dorada`, jug);
      jug.vida = cura;
    },
    Notch: function (jug) {
      console.log("Notch");
      if (jug.vida > 15) {
        banneado(jug, 5);
        adicional = "dorada";
        vidaExtra(4);
      } else {
        banneado(jug, 1);
        adicional = "de Notch";
        vidaExtra(16);
      }
      curar(20);
      texto(
        `${jug.nombre} toma una manzana ${adicional} desde el creativo`,
        jug
      );
      jug.vida = 20;
    },
  },
  VidaDiaNoche = {
    bruja: function (jug) {
      adicional = pocionIns(jug.vida);
      texto(
        `Una bruja se confunde y le tira una pocion splash de <i>curacion instantanea ${adicional}</i> a ${jug.nombre}`,
        jug
      );
      jug.vida += adicional === "I" ? 4 : 8;
    },
  };
export const Vida = {
  Dia: {
    angel: function (jug) {
      cura = getRandomIntInclusive(19, 1) + jug.vida;
      curar(cura);
      texto(`Un angel baja del cielo y cura a ${jug.nombre}`, jug);
      jug.vida = cura;
    },
  },
  Noche: {
    // angel: function (jug) { // dsp hago con cada sopa
    //   cura = 3 + jug.vida;
    //   texto(`una sopa misteriosa hace que ${jug.nombre} se sienta mucho mejor`);
    //   vidaDefault(jug);
    //   curar(cura);
    //   jug.vida = cura;
    // },
  },
  Nether: {
    cofreManzana: function (jug) {
      cura = 4 + jug.vida;
      vidaExtra(4);
      curar(cura);
      texto(
        `${jug.nombre} consigue una manzana dorada en el cofre de una fortaleza`,
        jug
      );
      jug.vida = cura;
    },
    cofreManzana: function (jug) {
      cura = 4 + jug.vida;
      vidaExtra(4);
      curar(cura);
      texto(
        `${jug.nombre} consigue una manzana dorada en el cofre de un bastion`,
        jug
      );
      jug.vida = cura;
    },
  },
  End: {},
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
    locura: function (jug) {
      texto(
        `${jug.nombre} entra en la locura pensando por que el cubo no tiene forma de cubo`,
        jug
      );
    },
  },
  RandomDiaNoche = {
    /* Sin Cambios */
    bedrock: function (jug) {
      texto(`${jug.nombre} pierde el dia intentando romper bedrock`, jug);
    },
    cat: function (jug) {
      texto(
        `${jug.nombre} se siente mas optimista tras obtener el disco de musica 'Cat'`,
        jug
      );
    },
    diamanteLava: function (jug) {
      texto(
        `${jug.nombre} tira por error en la lava el unico diamante que logra encontrar`,
        jug
      );
    },
    /* Armadura */
    //completa
    upgrade: function (jug) {
      if (jug.netherite) {
        console.log("mejora");
        const nPartes = [];
        let i = 0;
        adicional = "Se pregunta que hacer con el netherite que tiene";
        for (const parte in jug.armadura) {
          if (jug.armadura[parte] === "diamante" && jug.netherite) {
            if (!i)
              adicional =
                "Logro mejorar las siguientes partes de su armadura: ";
            jug.armadura[parte] = "netherite";
            nPartes[i] = parte;
            i++;
          }
        }
        texto(`${adicional}${nPartes.join(", ")}`);
      } else {
        texto(`${jug.nombre} esta pensando en netherite`, jug);
      }
    },
    todaArmad: function (jug) {
      let material = materiales();
      Object.keys(armadura).forEach((el) => {
        jug.armadura[el] = armadura[el][material];
        jug.armourName[el] = material;
      });
      texto(
        `${jug.nombre} logra fabricar toda una armadura de ${material}`,
        jug
      );
    },
    //parte
    aldea: function (jug) {
      let parte = partes()[0],
        material = materiales(),
        articulo = parte === "botas" ? "unas" : "un";
      jug.armadura[parte] = armadura[parte][material];
      jug.armourName[parte] = material;
      texto(
        `En una aldea, ${jug.nombre} se encuentra ${articulo} ${parte} de ${material}`,
        jug
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
        jug
      );
    },
    //espada
    upEspada: function (jug) {
      console.log(jug)
      if (jug.espada === "diamante") {
        if (jug.netherite) {
          texto(`${jug.nombre} mejora su espada, ahora es de netherite`, jug);
          jug.netherite--;
          jug.espada = "netherite";
        } else if (getRandomIntInclusive(1))
          texto(
            `${jug.nombre} quiere mejorar su espada de diamante, pero no tiene netherite`,
            jug
          );
        else
          texto(
            `${jug.nombre} esta conforme con su espada de ${jug.espada}`,
            jug
          );
      } else if (jug.espada === "hierro") {
        if (jug.diamante > 1) {
          texto(`${jug.nombre} fabrica una espada de diamante`, jug);
          jug.espada = "diamante";
          jug.diamante -= 2;
        } else texto(`${jug.nombre} ansia tener una espada mejor`, jug);
      } else texto(`${jug.nombre} afila su espada de netherite`, jug);
    },
    /* Booleanos */
    gatete: function (jug) {
      texto(
        `Paseando cerca de una aldea, ${jug.nombre} descubre a un gato y lo adiestra`,
        jug
      );
      jug.gato++;
    },
    recuento: function (jug) {
      texto(`${jug.nombre} se la paso minando diamantes`, jug);
      jug.diamante += getRandomIntInclusive(64, 2);
    },
    perroHuesos: function (jug) {
      if (jug.huesos) {
        texto(
          `Con los huesos que habia conseguido, ${jug.nombre} domestica a un lobo`,
          jug
        );
        jug.perro++;
        jug.huesos = false;
      } else {
        texto(
          `${jug.nombre} camina junto a una manada de lobos deseando domesticar al menos a uno`,
          jug
        );
      }
    },
    domesticarGG: function (jug) {
      texto(`${jug.nombre} fue a pescar y consigue muchos pescados`, jug);
      jug.peces = true;
    },
    gatoPeces: function (jug) {
      if (jug.peces) {
        texto(
          `Con los pescados que habia conseguido, ${jug.nombre} domestica a un gato`,
          jug
        );
        jug.peces = false;
        jug.gato++;
      } else {
        texto(
          `${jug.nombre} camina junto a un gato solitario deseando llevarlo consigo`,
          jug
        );
      }
    },
  };
export const Random = {
  Dia: {
    oveja: function (jug) {
      texto(
        `${jug.nombre} encuentra una oveja rosa... ahora esta pensando en hacerse una cama`,
        jug
      );
    },
    semillas: function (jug) {
      texto(`${jug.nombre} cada vez tiene mas semillas`, jug);
    },
    frasco: function (jug) {
      texto(`${jug.nombre} fabrica un frasco para toma agua`, jug);
    },
    pala: function (jug) {
      texto(`${jug.nombre} fabrica una pala y se pone a trabajar`, jug);
    },
    cana: function (jug) {
      texto(
        `${jug.nombre} intenta pescar con su nueva cana, pero se rinde y entra al agua, golpeando a los peces con los punos
      `,
        jug
      );
    },
  },
  Noche: {
    aldeanoZombie: function (jug) {
      texto(
        `${jug.nombre} deja que un aldeano muera por un zombie para curarlo`,
        jug
      );
    },
    polloZombie: function (jug) {
      texto(
        `Despues de ver a un mini zombie montando un pollo, ${jug.nombre} intenta hacer lo mismo`,
        jug
      );
    },
    peleaesqueletos: function (jug) {
      texto(
        `Un esqueleto falla un tiro a ${jug.nombre} y le da a otro esqueleto, generando una pelea entre ambos`,
        jug
      );
    },
    bajoTierra: function (jug) {
      texto(`Escapando de los mobs, ${jug.nombre} se refugia bajo tierra`, jug);
    },
    pensandoDiam: function (jug) {
      texto(`${jug.nombre} no puede dormir pensando en diamantes`, jug);
    },
    pensandoSitios: function (jug) {
      texto(`${jug.nombre} piensa en irse y explorar nuevos sitios`, jug);
    },
    /* booleano */
    arco: function (jug) {
      texto(`${jug.nombre} se hace con el arco de un esqueleto`, jug);
      jug.arco = true;
    },
    domesticarPP: function (jug) {
      texto(
        `${jug.nombre} busca esqueletos y consigue huesos para en un futuro domesticar a una manada de lobos `,
        jug
      );
      jug.huesos = true;
    },
  },
  Nether: {
    tiempoPortal: function (jug) {
      texto(
        `${jug.nombre} pierde la cuenta del tiempo pasado desde que vio por ultima vez un portal`,
        jug
      );
      jug.funcion.push(() => {
        console.log("sigueSinPortal");
        if (!verifEvent("secondWorld")) {
          if (getRandomIntInclusive(1)) {
            texto(`${jug.nombre} sigue sin encontrar un portal`);
            return false;
          } else return true;
        }
        return true;
      });
    },
    esponjas: function (jug) {
      texto(
        `${jug.nombre} pasa todo el dia intentando que las esponjas mojadas no se sequen al ponerlas en el suelo`,
        jug
      );
    },
    relojRoto: function (jug) {
      texto(`${jug.nombre} observa su reloj, pero parece estar roto...`, jug);
    },
    fortaleza: function (jug) {
      texto(`${jug.nombre} comienza a construir su propia fortaleza`, jug);
    },
    fortaleza: function (jug) {
      texto(
        `${jug.nombre} piensa en recolectar calaveras de esqueletos para invocar al wither`,
        jug
      );
    },
    /* booleano */
    explorarStrider: function (jug) {
      if (jug.hongo) {
        texto(
          `Con el hongo distorsionado y una montura, ${jug.nombre} recorre los alrededores montando a un strider`,
          jug
        );
      } else {
        switch (getRandomIntInclusive(2)) {
          case 0:
            adicional = `${jug.nombre} desea tener un hongo distorsionado para pasear sobre un strider`;
            break;
          case 1:
            adicional = `${jug.nombre} se encarina con un strider solitario`;
            break;
          case 2:
            adicional = `${jug.nombre} piensa en adoptar a un strider como mascota`;
            break;
        }
        texto(adicional, jug);
      }
    },
  },
  End: {
    /* sin cambios */
    montar: function (jug) {
      texto(`${jug.nombre} piensa en montar al ender dragon`, jug);
    },
    puente: function (jug) {
      texto(
        `${jug.nombre} ignora al dragon y, con el inventario lleno de bloques, piensa en partir en busca de la end city`,
        jug
      );
    },
    brujula: function (jug) {
      texto(
        `${jug.nombre} se distrae observando su brujula girar sin parar`,
        jug
      );
    },
    observar: function (jug) {
      texto(`${jug.nombre} no puede quitar la vista del ender dragon`, jug);
    },
    /* booleano */
    calabaza: function (jug) {
      jug.armadura.casco = 0;
      jug.armourName.casco = "calabaza tallada";
      jug.noEnderman = true;
      texto(`${jug.nombre} se equipa una calabaza tallada"`, jug);
    },
    /* Dragon */
    //cristales || cristales && danoDragon
    nieveCrystal: function (jug) {
      if (dragon.crystalAct) {
        texto(
          `${jug.nombre} logra destruir un end crystal solo con bolas de nieve`,
          jug
        );
        dragon.crystalAct -= 1;
      } else {
        nrand = danoDragon(jug.espada);
        texto(
          `${jug.nombre} hiere al ender dragon con ${nrand} golpes de su espada de ${jug.espada}`,
          jug
        );
      }
    },
    huevosCrystal: function (jug) {
      if (dragon.crystalAct) {
        texto(
          `${jug.nombre} logra destruir un end crystal solo con huevos`,
          jug
        );
        dragon.crystalAct -= 1;
      } else {
        nrand = danoDragon(jug.espada);
        texto(
          `${jug.nombre} hiere al ender dragon con ${nrand} golpes de su espada de ${jug.espada}`,
          jug
        );
      }
    },
    dañoCrystal: function (jug) {
      if (dragon.crystalAct) {
        texto(
          `${jug.nombre} trepa a la cima de un pico y destruye un end crystal`,
          jug
        );
        dragon.crystalAct -= 1;
      } else {
        nrand = danoDragon(jug.espada);
        texto(
          `${jug.nombre} hiere al ender dragon con ${nrand} golpes de su espada de ${jug.espada}`,
          jug
        );
      }
    },
    arcoCrystal: function (jug) {
      if (jug.arco) {
        if (dragon.crystalAct) {
          texto(
            `${jug.nombre} utiliza su arco para destruir un end crystal`,
            jug
          );
          dragon.crystalAct -= 1;
        } else {
          nrand = getRandomIntInclusive(7, 3); //no se cuanto daño hace un arco
          dragon.vida -= 5 * nrand;
          updateProgreso();
          texto(`${jug.nombre} le acierta al Dragon ${nrand} flechazos`, jug);
        }
      } else {
        texto(
          `${jug.nombre} intenta herir al dragon con un stack de bolas de nieve...`,
          jug
        );
      }
    },
    aguaCrystal: function (jug) {
      texto(
        `${jug.nombre} escala a lo alto de un pico usando agua y destruye un end crystal sin salir herido`,
        jug
      );
      dragon.crystalAct -= 1;
    },
    //danoDragon
    tntDragon: function (jug) {
      dano = getRandomIntInclusive(100, 33);
      dragon.vida -= dano;
      updateProgreso();
      texto(`${jug.nombre} hiere al dragon explotando TNT a su lado`, jug);
    },
    danarDragon: function (jug) {
      nrand = danoDragon(jug.espada);
      texto(
        `${jug.nombre} logra golpear al dragon ${nrand} veces con su espada de ${jug.espada}`,
        jug
      );
    },
    espadaDragon: function (jug) {
      nrand = danoDragon(jug.espada);
      texto(
        `En cuanto el ender dragon se posa sobre el portal inactivo, ${jug.nombre} lo golpea con una espada de ${jug.espada} ${nrand} veces`,
        jug
      );
    },
    camaDragon: function (jug) {
      dragon.vida -= getRandomIntInclusive(25, 15);
      updateProgreso();
      texto(`${jug.nombre} hiere al dragon explotando una cama a su lado`, jug);
    },
    //curaDragon
    CrystalCurar: function (jug) {
      if (dragon.crystalAct) {
        cura = getRandomIntInclusive(30, 10) + dragon.vida;
        dragon.vida = cura;
        updateProgreso();
        texto(
          `${jug.nombre} no puede evitar que el ender dragon recupere vida`,
          jug
        );
      } else {
        texto(
          `${jug.nombre} observa los picos, ahora sin uso para el ender dragon`,
          jug
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
    dano = getRandomIntInclusive(20);
    dano -= dano * ((4 * getArmadura(jug.armadura)) / 100);
    jug.vida -= dano;
    dano += jug.vida;
    danoInsta(dano);
    texto(`${jug.nombre} es perseguido por ${jug2.nombre}`, jug);
  },
};

const RelDiaNoche = {
  /* Sin cambio */
  robarhierro: function (jug) {
    const jug2 = nJugRand(jug);
    texto(`${jug.nombre} roba hierro del horno de ${jug2.nombre}`, jug);
  },
  incendiarcasa: function (jug) {
    const jug2 = nJugRand(jug);
    texto(`${jug.nombre} amenaza a ${jug2.nombre} con incendiar su casa`, jug);
  },
  /* armadura */
  armado: function (jug) {
    const jug2 = nJugRand(jug);
    let parte = partes()[0],
      material = materiales(),
      articulo = parte === "botas" ? "unas" : "un";
    jug.armadura[parte] = armadura[parte][material];
    jug.armourName[parte] = material;
    texto(
      `${jug2.nombre} regala a ${jug.nombre} ${articulo} ${parte} de ${material}`,
      jug
    );
  },
  /* daño */
};

export const Rel = {
  Dia: {
    /* sin cambio */
    construircasa: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} ayuda a ${jug2.nombre} con la construccion de su casa`,
        jug
      );
    },
    florescasa: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} planta flores en el camino principal a la casa de ${jug2.nombre}`,
        jug
      );
    },
    cazarjuntos: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} convence a ${jug2.nombre} para ir de caza juntos`,
        jug
      );
    },
    /* daño */
    vivirjuntos: function (jug) {
      if (jug.conv) {
        if (jug.conv.vida <= 0) {
          texto(
            `${jug.nombre} sigue pensando en ${jug.conv.nombre}, el mejor companero de cuarto que pudo tener`,
            jug
          );
        }
        nrand = getRandomIntInclusive(1);
        switch (nrand) {
          case 0:
            dano = getRandomIntInclusive(20);
            dano -= dano * ((4 * getArmadura(jug.armadura)) / 100);
            jug.vida -= dano;
            dano += jug.vida;
            danoInsta(dano);
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
            jug.conv.conv = null;
            jug.conv = null;
            break;
          case 1:
            texto(`${jug.nombre} y ${jug.conv.nombre} agrandan su casa`, jug);
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
              jug
            );
            return;
          }
        } while (jug2.conv);
        texto(`${jug.nombre} y ${jug2.nombre} comienzan a vivir juntos`, jug);
        jug.conv = jug2;
        jug2.conv = jug;
      }
    },
  },
  Noche: {
    /* sin cambio */
    juntarCamas: function (jug) {
      const jug2 = nJugRand(jug);
      texto(`${jug.nombre} y ${jug2.nombre} juntan sus camas para dormir`, jug);
    },
    buscarMobs: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} y ${jug2.nombre} exploran los alrededores juntos en busca de mobs`,
        jug
      );
    },
    dejarMobs: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `En cuanto aparecen los mobs, ${jug.nombre} deja solo a ${jug2.nombre}`,
        jug
      );
    },
  },
  Nether: {
    /* sin cambio */
    camas: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} y ${jug2.nombre} llenan sus inventarios de camas pensando en ir a buscar netherite`,
        jug
      );
    },
    advertir: function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `${jug.nombre} advierte a ${jug2.nombre} sobre la presencia de un ghast`,
        jug
      );
    },
    /* armadura */
    buscarNetherite(jug) {
      const jug2 = nJugRand(jug);
      if (jug.espada === "netherite") {
        texto(
          `${jug2.nombre} acompaña a ${jug.nombre} en busca de netherite`,
          jug
        );
      } else {
        texto(
          `${jug.nombre} ayuda a ${jug2.nombre} a craftear una espada de netherite tras un dia de exploracion`,
          jug
        );
        jug2.espada = "netherite";
      }
    },
    /* daño */
    empujon: function (jug) {
      const jug2 = nJugRand(jug);
      dano = jug.vida;
      jug.vida = 0;
      danoInsta(dano);
      texto(
        `${jug2.nombre} observa a ${jug.nombre} muy cerca de un precipicio y le da un empujon, tirandolo a un mar de lava`,
        jug
      );
    },
  },
  End: {
    /* armadura */
    calabazaPrestar: function (jug) {
      const jug2 = nJugRand(jug);
      jug2.armadura.casco = 0;
      jug2.armourName.casco = "calabaza tallada";
      jug2.noEnderman = true;
      texto(`${jug.nombre} le da a ${jug2.nombre} una calabaza tallada`, jug);
    },
    /* daño */
    ayudarEnd: function (jug) {
      const jug2 = nJugRand(jug);
      dano = getRandomIntInclusive(20, 10);
      dano -= dano * ((4 * getArmadura(jug.armadura)) / 100);
      jug.vida -= dano;
      dano += jug.vida;
      danoInsta(dano);
      texto(
        `${jug.nombre} protege a ${jug2.nombre} de un enderman, saliendo herido`,
        jug
      );
    },
    dejarEnd: function (jug) {
      const jug2 = nJugRand(jug);
      dano = jug.vida;
      jug.vida = 0;
      danoInsta(dano);
      texto(
        `${jug2.nombre} deja que ${jug.nombre} muera a manos de un enderman a pesar de haber podido ayudar`,
        jug
      );
    },
    golpearArco: function (jug) {
      const jug2 = nJugRand(jug);
      if (jug2.arco) {
        dano = getRandomIntInclusive(6, 4);
        dano -= dano * ((4 * getArmadura(jug.armadura)) / 100);
        jug.vida -= dano;
        dano += jug.vida;
        danoInsta(dano);
        texto(
          `Intentando disparar a un end crystal ${jug2.nombre} golpea por error a ${jug.nombre}`,
          jug
        );
      } else
        texto(
          `${jug2.nombre} piensa que, si tuviera un arco, atacaria a ${jug.nombre} en lugar de al ender dragon`,
          jug
        );
    },
    /* dragon */
    dobleDano: function (jug) {
      const jug2 = nJugRand(jug);
      danoDragon(jug.espada);
      danoDragon(jug2.espada);
      texto(
        `${jug.nombre} y ${jug2.nombre} golpean con espadas reiteradas veces al ender dragon en cuanto se posa sobre el portal`,
        jug
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
    if (jug.huesos) {
      texto(
        `Con los huesos que habia conseguido, ${jug.nombre} domestica a un lobo`,
        jug
      );
      jug.perro++;
      jug.huesos = false;
    } else {
      texto(
        `${jug.nombre} encuentra a un lobo solitario, pero solo tiene unos pocos huesos en su inventario.`,
        jug
      );
      texto(`¿Deberia intentar domesticarlo?`, false);
      let decision = await decidir("Intentar domesticarlo", "Ignorar al lobo");
      if (decision) {
        nrand = getRandomIntInclusive(2);
        switch (nrand) {
          case 0:
            texto(
              `${jug.nombre} gasta todos sus huesos pero no logra domesticarlo`,
              jug
            );
            break;
          case 1:
            texto(`¡Ahora ${jug.nombre} tiene un nuevo perro!`, jug);
            jug.perro++;
            break;
          case 2:
            dano = getRandomIntInclusive(10);
            adicional = dano ? "" : ", matandolo de un golpe";
            jug.vida -= dano;
            dano += jug.vida;
            danoInsta(dano);
            texto(
              `${jug.nombre} confunde las teclas y golpea al lobo${adicional}`,
              jug
            );
            break;
        }
      } else {
        nrand = getRandomIntInclusive(1);
        switch (nrand) {
          case 0:
            texto(`${jug.nombre} decide primero conseguir mas huesos`, jug);
            break;
          case 1:
            texto(`${jug.nombre} es mas bien un fanatico de los gatos`, jug);
            break;
        }
      }
    }
  },
};

export const Decid = {
  Dia: {
    entrarCasa: async function (jug) {
      const jug2 = nJugRand(jug);

      texto(
        `${jug.nombre} observa a ${jug2.nombre} alejarse de su casa, y no cree que vuelva pronto.`,
        jug
      );
      texto(`¿Deberia aprovecharse y entrar a su casa?`, false);
      let decision = await decidir("Entrar", "No entrar");
      if (decision) {
        nrand = getRandomIntInclusive(8);
        switch (nrand) {
          case 0:
            let parte = partes()[0],
              material = materiales(),
              articulo = parte === "botas" ? "unas" : "un";
            jug.armadura[parte] = armadura[parte][material];
            jug.armourName[parte] = material;
            texto(
              `Al entrar, encuentra una sala escondida tras un cuadro llena de cofres. Rapido, toma ${articulo} ${parte} de ${material} y escapa`,
              jug
            );
            break;
          case 1:
            nrand = getRandomIntInclusive(64, 2);
            texto(
              `Al entrar, encuentra una sala escondida tras un cuadro llena de cofres. Rapido, toma los ${nrand} diamantes que habia y escapa.`,
              jug,
              true
            );
            jug.diamante += nrand;
            break;
          case 2: {
            const jug3 = nJugRand(jug, jug2);
            nrand = getRandomIntInclusive(64, 2);
            texto(
              `${jug.nombre} descubre que ${jug3.nombre} ha tenido la misma idea y se encuentra buscando entre los cofres. Deciden dividir los ${nrand} diamantes que encuentran.`,
              jug,
              true
            );
            jug.diamante += Math.ceil(nrand / 2);
            jug3.diamante += Math.floor(nrand / 2);
            break;
          }
          case 3:
            texto(
              `${jug.nombre} se interna en la casa sin inconvenientes, pero descubre que los cofres se encontraban vacios`,
              jug
            );
            break;
          case 4:
            adicional = pocionIns(jug.vida);
            texto(
              `${jug.nombre} encuentra un soporte de pociones en la casa y crea una pocion de <i>curacion instantanea ${adicional}</i>, bebiendola al instante`,
              jug
            );
            jug.vida = cura;
            break;
          case 5:
            dano = jug.vida;
            jug.vida = 0;
            danoInsta(dano);
            texto(
              `${jug.nombre} se toma demasiado tiempo y ${jug2.nombre} regresa, golpeandolo con su hacha hasta morir`,
              jug
            );
            break;
          case 6:
            texto(
              `${jug.nombre} piensa en tomar todo lo que encuentre, pero se siente culpable y decide no traicionar a ${jug2.nombre}`,
              jug
            );
            break;
          case 7:
            texto(
              `Antes de que ${jug2.nombre} regrese, ${jug.nombre} llena su casa de TNT, activandola y alejandose`,
              jug
            );
            break;
          case 8:
            texto(
              `Cuando ${jug2.nombre} regresa se sorprende al encontrar su casa llena de ovejas`,
              jug
            );
            break;
          case 9:
            dano = getRandomIntInclusive(4, 1);
            dano -= dano * ((4 * getArmadura(jug.armadura)) / 100);
            jug.vida -= dano;
            dano += jug.vida;
            danoInsta(dano);
            texto(
              `${jug2.nombre} regresa mucho antes de lo esperado y golpea a ${jug.nombre} con los punos`,
              jug
            );
            break;
        }
      } else {
        texto(`${jug.nombre} deja pasar la oportunidad`, jug);
      }
    },
    entrarTemplo: async function (jug) {
      const jug2 = nJugRand(jug);
      texto(
        `Paseando por el desierto, ${jug.nombre} ve a lo lejos un templo.`,
        jug
      );
      texto(`¿Deberia adentrarse en el?`, false);
      let decision = await decidir("Entrar", "No entrar");
      if (decision) {
        nrand = getRandomIntInclusive(4);
        switch (nrand) {
          case 0:
            console.log("templo");
            nrand = getRandomIntInclusive(5);
            adicional = nrand ? `Entre estos, ${nrand} diamantes` : "";
            texto(
              `${jug.nombre} baja picando en forma de escalera en torno al gran agujero en el centro del templo, consiguiendo gran cantidad de objetos de los 4 cofres ocultos.` +
                adicional,
              jug
            );
            jug.diamante += nrand;
            jug.funcion.push(() => RandomDiaNoche.upEspada());
            break;
          case 1:
            texto(
              ` ${jug.nombre} entra a la sala principal del templo pero no ve nada especial y se aleja sin ningun cambio`,
              jug
            );
            break;
          case 2:
            texto(
              `${jug.nombre} se aleja con el inventario cargado de polvora mientras se imagina a ${jug2.nombre} volando por los aires`,
              jug
            );
            break;
          case 3:
            texto(
              `${jug.nombre} no va a tener que preocuparse por la comida, ahora tiene carne podrida de sobra`,
              jug
            );
            this.comida = "carne podrida";
            break;
          case 4:
            dano = jug.vida;
            jug.vida = 0;
            danoInsta(dano);
            texto(
              `${jug.nombre} se planta en el centro del templo y pica hacia abajo, cayendo directo sobre una placa de presion. Antes de entender que ocurre, vuela por los aires`,
              jug
            );
            break;
        }
      } else {
        texto(
          `${jug.nombre} cree que es una perdida de tiempo y cambia el rumbo`,
          jug
        );
      }
    },
  },
  Noche: {
    spawner: async function (jug) {
      texto(
        `Cuando esta por abandonar una mina, ${jug.nombre} da con una gran cantidad de zombies y cree que se trata a un spawner oculto en las cercanias.`,
        jug
      );
      texto(`¿Deberia ir a buscarlo?`, false);
      let decision = await decidir("Buscar spawner", "Seguir de largo");
      if (decision) {
        nrand = getRandomIntInclusive(4);
        switch (nrand) {
          case 0:
            texto(
              `${jug.nombre} recorre los alrededores pero no encuentra ningun spawner. Deja la cueva con las manos vacias`,
              jug
            );
            break;
          case 1:
            texto(
              ` ${jug.nombre} planta una antorcha sobre el spawner sin perder vida y, despues de tomar los objetos de los cofres, piensa en crear una granja de experiencia`,
              jug
            ); //Consiguio objetos? booleano o armadura ;)
            break;
          case 2:
            texto(
              `Pensando en no morir, ${jug.nombre} rompe el spawner, perdiendo la posibilidad de crear una granja de experiencia`,
              jug
            );
            break;
          case 3:
            dano = getRandomIntInclusive(15, 6);
            jug.vida -= dano;
            dano += jug.vida;
            danoInsta(dano);
            texto(
              `Cansado de no encontrar el spawner, ${jug.nombre} comienza a picar en todas las direcciones, cayendo sobre lava`,
              jug
            );
            break;
          case 4:
            dano = jug.vida;
            jug.vida = 0;
            danoInsta(dano);
            texto(
              `${jug.nombre} ve el spawner a lo lejos, pero antes de lograr acercarse un grupo de zombies lo ataca, asesinandolo`,
              jug
            );
            //creo que preferiria con un getRandomIntInclusive(-, -);
            break;
        }
      } else {
        nrand = getRandomIntInclusive(2);
        switch (nrand) {
          case 0:
            texto(
              `${jug.nombre} se aleja de la zona antes de ser atacado`,
              jug
            );
            break;
          case 1:
            dano = getRandomIntInclusive(15, 4);
            dano -= dano * ((4 * getArmadura(jug.armadura)) / 100);
            jug.vida -= dano;
            dano += jug.vida;
            danoInsta(dano);
            texto(
              `${jug.nombre} cree haberse alejado lo suficiente cuando un grupo de zombies lo ataca por la espalda`,
              jug
            );
            break;
          case 2:
            dano = jug.vida;
            jug.vida = 0;
            danoInsta(dano);
            texto(
              `Aunque ${jug.nombre} cree haber ido por el camino opuesto, termina dentro del spawner. Antes de poder hacer algo, es asesinado por un grupo de zombies`,
              jug
            );
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
        jug
      );
      texto(`¿Deberia partir?`, false);
      let decision = await decidir("Ir en su busqueda", "Pensar en otra cosa");
      if (decision) {
        nrand = getRandomIntInclusive(8);
        switch (nrand) {
          case 0:
            texto(
              `${jug.nombre} camina durante lo que parecen ser siglos pero no encuentra ningun enderman`,
              jug
            );
            break; //Funcion para que en el siguiente siga caminando
          case 1:
            texto(
              `Tras una larga caminata, ${jug.nombre} cree haber conseguido enderpearls suficientes para comenzar la busqueda del End en un futuro cercano`,
              jug
            );
            break;
          case 2:
            texto(
              `${jug.nombre} convence a ${jug2.nombre} para que explore con el. Ambos consiguen una gran cantidad de enderpearls`,
              jug
            );
            break; //booleano para ambos?
          case 3:
            dano = getRandomIntInclusive(15, 8);
            dano -= dano * ((4 * getArmadura(jug.armadura)) / 100);
            jug.vida -= dano;
            dano += jug.vida;
            danoInsta(dano);
            texto(
              `${jug.nombre} es herido por los enderman ocultos en el bosque, pero logra huir con una gran cantidad de enderpearls`,
              jug
            );
            break; //Booleano?
          case 4:
            dano = jug.vida;
            jug.vida = 0;
            danoInsta(dano);
            texto(
              `${jug.nombre} convence a ${jug2.nombre} para que explore con el. Tras alcanzar su meta, ${jug2.nombre} mata a ${jug.nombre} y se queda con los stacks de enderpearls para el solo`,
              jug
            );
            break; //booleano para jug2?
          case 5:
            dano = jug.vida;
            jug.vida = 0;
            danoInsta(dano);
            texto(
              `${jug.nombre} se topa con el bosque distorsionado casi al instante, pero antes de comenzar a llenar su inventario es asesinado por un enderman`,
              jug
            );
            break;
          case 6:
            texto(
              `${jug.nombre} se topa con el bosque distorsionado casi al instante, pero antes de comenzar a llenar su inventario es intimidado por un enderman, huyendo sin heridas`,
              jug
            );
            break;
          case 7:
            texto(
              `En lugar de enderpearls, ${jug.nombre} se aleja de los enderman cargado de hongos distorsionados. ¿Que podria hacer con eso?`,
              jug
            );
            jug.hongo = true;
            break;
          case 8:
            texto(
              `${jug.nombre} pierde tanto tiempo buscando endermans que, al encontrarlos, mata a unos pocos y se aleja cansado`,
              jug
            );
            break;
        }
      } else {
        nrand = getRandomIntInclusive(1);
        switch (nrand) {
          case 0:
            texto(
              `${jug.nombre} decide que aun no es tiempo para pensar en el End`,
              jug
            );
            break;
          case 1:
            texto(
              `${jug.nombre} ve a la distancia lo que podria ser un bosque distorsionado, pero prefiere dar la vuelta`,
              jug
            );
            break;
        }
      }
    },
    bastion: async function (jug) {
      const jug2 = nJugRand(jug);
      texto(`${jug.nombre} encuentra un bastion del nether`, jug);
      texto(`¿Deberia explorarlo?`, false);
      let decision = await decidir("Entrar", "Ignorar");
      if (decision) {
        nrand = getRandomIntInclusive(6);
        switch (nrand) {
          case 0:
            let parte = partes()[1],
              material = materiales(),
              articulo = parte === "botas" ? "unas" : "un";
            jug.armadura[parte] = armadura[parte][material];
            jug.armourName[parte] = material;
            texto(
              `Abriendo el primer cofre que encuentra por casualidad, se apresura a tomar ${articulo} ${parte} de ${material} y huye de un grupo amenazante de piglins`,
              jug
            );
            jug.oro = true;
            break;
          case 1:
            dano = jug.vida;
            jug.vida = 0;
            danoInsta(dano);
            texto(
              `${jug.nombre} intenta abrir un cofre pero, antes de tomar algo, un grupo de piglins lo descubre y se encarga de asesinarlo`,
              jug
            );
            break;
          case 2:
            texto(
              `${jug.nombre} descubre que ${jug2.nombre} estaba detras suyo y ambos se turnan para defender y tomar los objetos de los cofres<br/>
              Ambos consiguen netherite suficiente para intentar craftear algo`,
              jug
            );
            jug.netherite++;
            break;
          case 3:
            texto(
              `${jug.nombre} se topa con un grupo de piglins brutos en la entrada al bastion. Entrar deja de ser una opcion`,
              jug
            );
            break;
          case 4:
            dano = getRandomIntInclusive(20, 10);
            dano -= dano * ((4 * getArmadura(jug.armadura)) / 100);
            jug.vida -= dano;
            dano += jug.vida;
            danoInsta(dano);
            texto(
              `${jug.nombre} logra equipar unas botas de oro justo a tiempo para que un grupo de piglins lo ataquen. No mucho despues se rompen y huye herido sin tomar nada`,
              jug
            );
            break;
          case 5:
            texto(
              `${jug.nombre} se aleja del bastion preguntandose que puede hacer con tanto oro`,
              jug
            );
            break;
        }
      } else {
        nrand = getRandomIntInclusive(1);
        switch (nrand) {
          case 0:
            texto(
              `${jug.nombre} piensa que es mejor no enfrentarse a los piglins`,
              jug
            );
            break;
          case 1:
            texto(
              `${jug.nombre} decide buscar otra forma de encontrar materiales`,
              jug
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
      texto(`${jug.nombre} debe enfrentarse al ender dragon`, jug);
      texto(`¿Deberia atacarlo de cerca o de lejos?`, false);
      let decision = await decidir("Cerca", "Lejos");
      if (decision) {
        nrand = getRandomIntInclusive(2);
        switch (nrand) {
          case 0:
            dano = jug.vida;
            jug.vida = 0;
            dragon.vida = dragon.vida - 20;
            updateProgreso();
            danoInsta(dano);
            texto(
              `Confiado, ${jug.nombre} pone una cama junto al dragon cuando este se encuentra cerca, pero ambos reciben el impacto`,
              jug
            );
            break;
          case 1:
            dano = getRandomIntInclusive(20, 6);
            dano -= dano * ((4 * getArmadura(jug.armadura)) / 100);
            jug.vida -= dano;
            dano += jug.vida;
            danoInsta(dano);
            texto(`El ender dragon ataca a ${jug.nombre} de cerca`, jug);
            break;
          case 2:
            dano = getRandomIntInclusive(15, 10);
            dano -= dano * ((4 * getArmadura(jug.armadura)) / 100);
            jug.vida -= dano;
            dano += jug.vida;
            dragon.vida = dragon.vida - 8;
            updateProgreso();
            danoInsta(dano);
            texto(
              `El ender dragon se dirige en picada hacia ${jug.nombre}. Aunque logra golpearlo, ambos pierden vida`,
              jug
            );
            break;
        }
      } else {
        nrand = getRandomIntInclusive(1);
        switch (nrand) {
          case 0:
            dano = getRandomIntInclusive(18, 3);
            dano -= dano * ((4 * getArmadura(jug.armadura)) / 100);
            jug.vida -= dano;
            dano += jug.vida;
            danoInsta(dano);
            texto(`El ender dragon ataca a ${jug.nombre} con su aliento`, jug);
            break;
          case 1:
            dragon.vida = dragon.vida - 9;
            updateProgreso();
            danoInsta(dano);
            texto(
              `${jug.nombre} utiliza un arco a punto de romperse que llevaba en su inventario para herir al dragon, aunque este se parte al instante`,
              jug
            );
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
