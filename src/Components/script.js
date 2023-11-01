const input = document.querySelector("input"),
  number = document.querySelector(".number");

input.addEventListener("input", () => {
  number.textContent = input.value;
});
