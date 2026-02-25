const body = document.body;
const modeSwitcher = document.getElementById("switcher");

modeSwitcher.addEventListener("click", (el) => {
  body.classList.toggle("dark-theme");
});
