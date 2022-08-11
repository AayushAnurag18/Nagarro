const input = document.getElementById("input");
const clear = document.getElementById("clear");
const del = document.getElementById("del");
const eq = document.getElementById("eq");

const operand = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "+",
  "-",
  "*",
  "/",
  "%",
  ".",
];

const operator = [
  document.getElementById("add"),
  document.getElementById("sub"),
  document.getElementById("mul"),
  document.getElementById("div"),
  document.getElementById("mod"),
  document.getElementById("dec"),
];

const num = [
  document.getElementById("0"),
  document.getElementById("1"),
  document.getElementById("2"),
  document.getElementById("3"),
  document.getElementById("4"),
  document.getElementById("5"),
  document.getElementById("6"),
  document.getElementById("7"),
  document.getElementById("8"),
  document.getElementById("9"),
];

const remove = () => (input.innerText = input.innerText.slice(0, -1));
const removeAll = () => (input.innerText = "");
const calc = () => {
  try {
    input.innerHTML = eval(input.innerText);
  } catch {
    input.innerHTML = "Error";
  }
};

num.forEach((btn) =>
  btn.addEventListener("click", () => (input.innerText += btn.id))
);

operator.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (btn.id === "add") input.innerText += "+";
    else if (btn.id === "sub") input.innerText += "-";
    else if (btn.id === "mul") input.innerText += "*";
    else if (btn.id === "div") input.innerText += "/";
    else if (btn.id === "mod") input.innerText += "%";
    else if (btn.id === "dec") input.innerText += ".";
  })
);

clear.addEventListener("click", removeAll);
del.addEventListener("click", remove);
eq.addEventListener("click", calc);

document.addEventListener("keydown", (e) => {
  if (operand.includes(e.key)) input.innerText += e.key;
  else if (e.key === "Enter") calc();
  else if (e.key === "Escape") removeAll();
  else if (e.key === "Backspace") remove();
});
