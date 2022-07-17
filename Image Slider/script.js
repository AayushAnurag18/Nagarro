let prev = document.getElementById("prev");
let next = document.getElementById("next");

let total = 7;
var count = 0;

prev.addEventListener("click", previous);
next.addEventListener("click", next1);

function previous(e) {
  document.getElementById(`${count}`).classList.add("inactive");
  count = (count + total - 1) % total;
  document.getElementById(`${count}`).classList.remove("inactive");
}

function next1(e) {
  document.getElementById(`${count}`).classList.add("inactive");
  count = (count + 1) % total;
  document.getElementById(`${count}`).classList.remove("inactive");
}
