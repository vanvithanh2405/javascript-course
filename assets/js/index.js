// export "as"

/* export default
Imports without curly braces look nicer.
Can put any name when you use import. 
Can’t export  default more than one in 1 file.
*/

export function sayHi(name) {
  return 'Hi' + name
}

function sum(x, y) {
  return x + y
}

function caclulateSquare({ x, y, z }) {
  return x * y / z
}

export {
  sum as thanhSum,
  caclulateSquare as thanhCaculateSquare
}

export default function getProduct(name) {
  return 'product' + ' ' + name
}