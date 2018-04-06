"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var expectedStr = /^[\d-(.][\d+\-*/().]+[\d)]$/,
    unexpectedOps = /(?!\*\*)[+\-*/][+/*]\d|[+\-*/]{3,}/,
    parans = /\(([^(]+?)\)/,
    hasMulDiv = /[/*]/,
    mulDiv = /(-?[\d.]+)([/*]*?)(-?[\d.]+)/,
    hasAddSub = /(?!^-)-|\+/,
    addSub = /(-?[\d.]+)([+-])(-?[\d.]+)/;

/**
 * @author Leandro Silva
 * @copyright 2014, 2017-2018 Leandro Silva (http://grafluxe.com)
 * @license MIT
 *
 * @desc Parses a string as a mathematical expression. Supports addition,
 * subtraction, division, multiplication, and exponentiation.
 * @throws	{Error}  The string at/near "&lt;value>" is malformed.
 * @throws	{Error}  The string at/near "&lt;value>" has a malformed operator.
 * @param   {String} str The string to parse.
 * @returns {Number} The end total.
 */
function mathFromString(str) {
  if (!expectedStr.test(str)) {
    throw new Error("The string at/near \"" + str + "\" is malformed.");
  }

  if (unexpectedOps.test(str)) {
    throw new Error("The string at/near \"" + str + "\" has a malformed operator.");
  }

  // Do math inside parentheses first
  while (str.indexOf("(") > -1) {
    var nested = str.match(parans);
    str = str.replace(nested[0], mathFromString(nested[1]));
  }

  // Division and multiplication operators are done first
  while (hasMulDiv.test(str)) {
    str = str.replace(mulDiv, _doMath);
  }

  while (hasAddSub.test(str)) {
    str = str.replace(addSub, _doMath);
  }

  return Number(str);
}

/**
 * Parses math.
 * @private
 * @throws	{Error}  The value "&lt;number>" is not a valid number.
 * @param   {String} match    The matched string.
 * @param   {Number} num1     The first number of the equation.
 * @param   {String} operator The operator.
 * @param   {Number} num2     The second number of the equation.
 * @returns {Number} The equations value.
 */
function _doMath(match, num1, operator, num2) {
  if (isNaN(num1)) {
    throw new Error("The value \"" + num1 + "\" is not a valid number.");
  }

  if (isNaN(num2)) {
    throw new Error("The value \"" + num2 + "\" is not a valid number.");
  }

  switch (operator) {
    case "/":
      return Number(num1) / Number(num2);
    case "*":
      return Number(num1) * Number(num2);
    case "+":
      return Number(num1) + Number(num2);
    case "-":
      return Number(num1) - Number(num2);
    case "**":
      return Math.pow(num1, num2);
  }
}

// Support CJS/Node
if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object" && module.exports) {
  module.exports = mathFromString;
}
