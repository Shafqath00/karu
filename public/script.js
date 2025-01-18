function ham() {
   const nav_mobile = document.getElementById("nav-mobile");
   const nav_icon = document.getElementById("ham-icon");
   nav_mobile.classList.toggle("active-nav");
   nav_icon.classList.toggle("fa-xmark");
}