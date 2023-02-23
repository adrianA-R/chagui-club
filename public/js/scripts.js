const pointsMenu = document.querySelector(".menu");
const mobileMenu = document.querySelector(".navbar-mobile");

pointsMenu.addEventListener('click',addMobilMenu);

function addMobilMenu(){
  mobileMenu.classList.toggle("inactive");
}

