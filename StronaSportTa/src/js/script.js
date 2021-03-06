//menu hamburger
const navMenuBtn = document.querySelector(".nav__menu");
const flyoutMenu = document.querySelector(".flyout-menu");
const navContainer = document.querySelector(".nav");
const navDetails = document.querySelector(".nav__company-details");
let activeMenu = false;
navMenuBtn.addEventListener("click" , ()=>{
    if(activeMenu){
        flyoutMenu.style.display ="none";
        navDetails.style.display ="block"
        activeMenu = false;
    }else{
        flyoutMenu.style.display ="flex";
        if(window.innerWidth <= 928 && !activeMenu){
            navDetails.style.display ="none";
        }
        activeMenu = true;
    }
  
    navContainer.classList.toggle("opacity");
    navMenuBtn.classList.toggle("active");
    
});
window.addEventListener("resize" , ()=>{
    if(window.innerWidth <= 928 && activeMenu){
        navDetails.style.display ="none";
    }
});
window.addEventListener("scroll" , ()=>{
    if (window.innerWidth > 928){
        if(window.scrollY > 150 && !activeMenu){
            navContainer.classList.add("scroll-down");
        }else{
            navContainer.classList.remove("scroll-down"); 
        }
    }
});
