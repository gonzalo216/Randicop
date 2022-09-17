export function getRandomIntInclusive(max, min = 0) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}// Tanto el valor mínimo como el máximo están incluidos en el resultado.

export function desordenar(array){
  array = array.sort(function() {return Math.random() - 0.5});
  return array;
}
export function repetir(obj, cant){
  const keys= Object.keys(obj);
  for(let i=1;i<=cant;i++){
      keys.forEach(el => {
          let propiedad = `${el}${i}`;
          obj[propiedad] = function(nombre){obj[el](nombre)};
      });
  }
};