const body = document.body;
const modeSwitcher = document.getElementById("switcher");

modeSwitcher.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
});
