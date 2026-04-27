import { suma } from "./Suma.js";
import { resta } from "./Resta.js";
import { multiplicar } from "./Multiplicar.js";
import { Division } from "./Dividir.js";

const display = document.getElementById("display");
const keys = document.querySelector(".calculator-keys");

function tokenize(expression) {
  const tokens = [];
  let current = "";

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (char === "-" && (i === 0 || "+-*/".includes(expression[i - 1]))) {
      current += char;
    } else if ("+-*/".includes(char)) {
      tokens.push(parseFloat(current));
      tokens.push(char);
      current = "";
    } else {
      current += char;
    }
  }
  tokens.push(parseFloat(current));
  return tokens;
}

function evaluate(tokens) {
  let i = 1;
  while (i < tokens.length) {
    if (tokens[i] === "*" || tokens[i] === "/") {
      const a = tokens[i - 1];
      const b = tokens[i + 1];
      let result;
      if (tokens[i] === "*") {
        result = multiplicar(a, b);
      } else {
        try {
          result = Division(a, b);
        } catch (e) {
          return "Error";
        }
      }
      tokens.splice(i - 1, 3, result);
    } else {
      i += 2;
    }
  }

  i = 1;
  while (i < tokens.length) {
    if (tokens[i] === "+" || tokens[i] === "-") {
      const a = tokens[i - 1];
      const b = tokens[i + 1];
      const result = tokens[i] === "+" ? suma(a, b) : resta(a, b);
      tokens.splice(i - 1, 3, result);
    } else {
      i += 2;
    }
  }

  return tokens[0];
}

keys.addEventListener("click", function (e) {
  const target = e.target;
  if (!target.matches("button")) return;

  if (target.classList.contains("number")) {
    display.value += target.value;
  }

  if (target.classList.contains("operator")) {
    const last = display.value.slice(-1);
    if (target.value === "-" && (display.value === "" || "*/".includes(last))) {
      display.value += target.value;
    } else if (display.value === "" || "+-*/".includes(last)) {
      return;
    } else {
      display.value += target.value;
    }
  }

  if (target.classList.contains("decimal")) {
    const parts = display.value.split(/[+\-*/]/);
    const lastNumber = parts[parts.length - 1];
    if (lastNumber.includes(".")) return;
    display.value += ".";
  }

  if (target.classList.contains("equal-sign")) {
    const expression = display.value;
    if (!expression) return;
    const last = expression.slice(-1);
    if ("+-*/".includes(last)) return;

    const tokens = tokenize(expression);
    const result = evaluate(tokens);
    display.value = result;
  }

  if (target.classList.contains("backspace")) {
    display.value = display.value.slice(0, -1);
  }

  if (target.classList.contains("clear")) {
    display.value = "";
  }
});
