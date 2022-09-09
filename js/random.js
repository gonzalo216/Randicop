export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}// Tanto el valor mínimo como el máximo están incluidos en el resultado.

export function desordenar(array){
  array = array.sort(function() {return Math.random() - 0.5});
  return array;
}
