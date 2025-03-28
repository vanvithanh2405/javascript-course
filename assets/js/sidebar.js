// export no default
export const THEME = 'light';

export const OPEN_DRAWER = true;


export function sayHi(name) {
  return "sidebar" + " " + 'Hi' + name
}

export function sum(x, y) {
  return "sidebar" + " " + x + y
}

export function caclulateSquare({ x, y, z }) {
  return "sidebar" + " " + x * y / z
}