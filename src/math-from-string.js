/**
 * @author Leandro Silva
 * @copyright 2014, 2017 Leandro Silva (http://grafluxe.com)
 * @license MIT
 *
 * @desc Parses a string as a mathematical expression. Supports addition,
 *       subtraction, division, and multiplication.
 * @throws	{Error} Spaces and letters are not allowed.
 * @throws	{Error} Your string has two consecutive operators.
 * @param   {String} str The string to parse.
 * @returns {Number} The end value.
 */
function mathFromString(str) {
  if (/[A-Za-z\s]/.test(str)) {
    throw new Error("Spaces and letters are not allowed.");
  }

  if (/[+\-*/]{3,}/.test(str)) {
    throw new Error("Your string has two consecutive operators.");
  }

  if (/[\\*+-]$|^[\\*+]/.test(str)) {
    throw new Error("Your string is malformed.");
  }

  // Do math inside parentheses first
  while (/\(/.test(str)) {
    let nested = str.match(/\(([^(]+?)\)/)[1];

    str = str.replace(`(${nested})`, mathFromString(nested));
  }

  // Division and multiplication operators are done first
  while (/\/|\*/.test(str)) {
    str = str.replace(/(-?\d+)([/*])(-?\d+)/, _doMath);
  }

  while (/(?!^-)-|\+/.test(str)) {
    str = str.replace(/(-?\d+)([+-])(-?\d+)/, _doMath);
  }

  return str;
}

/**
 * Performs math for the parseMath method.
 * @private
 * @param   {String} match    The matched string.
 * @param   {Number} num1     The first number of the equation.
 * @param   {String} operator The operator.
 * @param   {Number} num2     The second number of the equation.
 * @returns {Number} The end total.
 */
function _doMath(match, num1, operator, num2) {
  switch (operator) {
    case "/":
      return Number(num1) / Number(num2);
    case "*":
      return Number(num1) * Number(num2);
    case "+":
      return Number(num1) + Number(num2);
    case "-":
      return Number(num1) - Number(num2);
  }
}

// Support CJS/Node
if (typeof module === "object" && module.exports) {
  module.exports = mathFromString;
}
