import { desordenar } from "./funciones.js";

export const armadura = {
  casco: {
    malla: 2,
    cuero: 1,
    oro: 2,
    hierro: 2,
    diamante: 3,
    netherite: 3,
  },
  peto: {
    malla: 5,
    cuero: 3,
    oro: 5,
    hierro: 6,
    diamante: 8,
    netherite: 8,
  },
  pantalon: {
    malla: 4,
    cuero: 2,
    oro: 3,
    hierro: 5,
    diamante: 6,
    netherite: 6,
  },
  botas: {
    malla: 1,
    cuero: 1,
    oro: 1,
    hierro: 2,
    diamante: 3,
    netherite: 3,
  },
};
const Materiales = Object.keys(armadura.casco);
Materiales.pop(); //No incluye al Netherite
Materiales.shift(); //No incluye a la malla
export const partes = () => desordenar(Object.keys(armadura)),
  materiales = () => desordenar(Materiales)[0];
