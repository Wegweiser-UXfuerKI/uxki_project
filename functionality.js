// scroll to content when corresponding nav bar button is clicked
function scrollToElement(sectionId) {
  const elem = document.getElementById(sectionId);
  elem.scrollIntoView({ behavior: "smooth" });
}

// event listener to automatically change active section (i.e. colors) while scrolling
window.addEventListener("scroll", function () {
  const sections = document.querySelectorAll(".content-background");
  const navBtns = document.querySelectorAll(".nav-btn");
  const navLines = document.querySelectorAll(".nav-line");

  let currentSection = "";
  sections.forEach(function (section) {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // scrollY = current vertical scroll position of window
    // 1/2 of section should be visible to be considered as active section
    if (scrollY >= sectionTop - sectionHeight / 2) {
      currentSection = section.getAttribute("id");
    }
  });

  // remove active class from all nav-lines, so they stay grey when not active
  navLines.forEach(function (navLine) {
    navLine.classList.remove("active");
  });

  navBtns.forEach(function (navBtn) {
    navBtn.classList.remove("active");
    if (navBtn.getAttribute("onclick").includes(currentSection)) {
      // when section is active (=currentSection), corresponding nav-btn + nav-line get active too (i.e. change color)
      navBtn.classList.add("active");
      document.getElementById("line" + navBtn.id[3]).classList.add("active");
    }
  });
});

// toggle the burger-navbar
function toggleNavbar() {
  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
  burger.classList.toggle("change");
}

// add event listener to the burger menu icon
var burgerMenu = document.getElementById("burger");
burgerMenu.addEventListener("click", toggleNavbar);

// toggle navbar when nav-button is clicked
var navs = document.getElementsByClassName("nav-btn");
for (var i = 0; i < navs.length; i++) {
  navs.item(i).addEventListener("click", toggleNavbar);
}

document.getElementById("toggleDiv").addEventListener("click", function () {
  const div = this;

  // Umschalten zwischen zusammengeklappt und ausgeklappt
  if (div.classList.contains("collapsed")) {
    div.classList.remove("collapsed");
    div.classList.add("expanded");
  } else {
    div.classList.remove("expanded");
    div.classList.add("collapsed");
  }
});
