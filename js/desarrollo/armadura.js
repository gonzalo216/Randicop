import { desordenar } from "./funciones.js";

export const armadura = {
  casco: {
    cuero: 1,
    oro: 2,
    malla: 2,
    hierro: 2,
    diamante: 3,
    netherite: 3,
  },
  peto: {
    cuero: 3,
    oro: 5,
    malla: 5,
    hierro: 6,
    diamante: 8,
    netherite: 8,
  },
  pantalon: {
    cuero: 2,
    oro: 3,
    malla: 4,
    hierro: 5,
    diamante: 6,
    netherite: 6,
  },
  botas: {
    cuero: 1,
    oro: 1,
    malla: 1,
    hierro: 2,
    diamante: 3,
    netherite: 3,
  },
};
const Materiales = Object.keys(armadura.casco);
Materiales.pop();
export const partes = desordenar(Object.keys(armadura)),
  materiales = desordenar(Materiales); //No incluye al Netherite
