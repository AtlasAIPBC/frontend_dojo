export function copyObj(src) {
  return JSON.parse(JSON.stringify(src));
}

export function isEven(n) {
   return n % 2 == 0;
}