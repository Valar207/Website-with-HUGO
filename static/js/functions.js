let zindex = 0;
function Open(windowId) {
  console.log(windowId);
  let w = document.getElementById(windowId);
  console.log(w);
  w.style.visibility = "visible";
  for (let w of windows) {
    w.classList.remove("active-w");
    w.classList.add("unactive-w");
  }
  w.style.zIndex = zindex++;
  zindex = zindex++;
  document.querySelector("footer").style.zIndex = zindex;
  w.classList.remove("unactive-w");
  w.classList.add("active-w");

  let foldersFooter = document.querySelector(".footer").querySelectorAll("*[id]");
  for (let f of foldersFooter) {
    f.classList.remove("activeFF");
  }
}

function Close(windowId) {
  document.getElementById(windowId).style.visibility = "hidden";
  let foldersFooter = document.querySelector(".footer").querySelectorAll("*[id]");
  for (let f of foldersFooter) {
    f.classList.remove("activeFF");
  }

  //REMOVE FOOTER FOLDER BELOW 9
  let id = windowId.split("folder")[1];
  if (isNaN(id)) {
    var el = document.getElementById("f-" + id);
    el.parentNode.removeChild(el);
  }
}

function Reduire(windowId) {
  document.getElementById(windowId).style.visibility = "hidden";
  let foldersFooter = document.querySelector(".footer").querySelectorAll("*[id]");
  for (let f of foldersFooter) {
    f.classList.remove("activeFF");
  }
}

function FullScreen(w) {
  if (w.classList.contains("window-fullscreen")) {
    w.classList.remove("window-fullscreen");
  } else {
    w.classList.add("window-fullscreen");
  }
}

//OPEN CONTACT
let contact = document.querySelector(".computer");
contact.onclick = function () {
  Open("foldercontact");

  //CHECK IF FOOTER CONTACT ALREADY EXIST
  const checkContactFooter = document.getElementById("f-contact");

  if (!checkContactFooter) {
    let newF = document.createElement("div");
    let p = document.createElement("h5");
    let img = document.createElement("IMG");
    img.setAttribute("src", "images/contact-small.png");
    newF.appendChild(img);
    newF.appendChild(p);
    let node = document.createTextNode(document.querySelector(".computer").attributes["name"].value);
    p.appendChild(node);
    let element = document.querySelector(".left-footer");
    newF.id = "f-contact";
    newF.className = "folder-footer";
    element.appendChild(newF);
    newF.classList.add("activeFF");
  }
  if (checkContactFooter) checkContactFooter.classList.add("activeFF");

  //RESELECT FOLDERS FOOTERS CAUSE THERE IS ONE NEW
  foldersFooter = document.querySelector(".footer").querySelectorAll("*[id]");
  for (let f of foldersFooter) {
    let id = f.id.split("f-")[1];
    document.getElementById(f.id).onclick = function () {
      Open("folder" + id);
      f.classList.add("activeFF");
    };
  }
  updateScroll();
};

//OPEN WINDOWS WITH FOLDER FOOTER
let foldersFooter = document.querySelector(".footer").querySelectorAll("*[id]");

for (let f of foldersFooter) {
  let id = f.id.split("f-")[1];
  document.getElementById(f.id).onclick = function () {
    Open("folder" + id);
    f.classList.add("activeFF");
  };
}

//SCROLL DOWN FOOTER
function updateScroll(){
  var footer = document.querySelector(".left-footer");
  footer.scrollTop = footer.scrollHeight;
}

//OPEN FOLDERS
let fitems = document.querySelectorAll(".folder-item");
for (let f of fitems) {
  f.onclick = function () {
    let folder = f.getAttribute("folderanchor");
    Open(folder);
    let id = folder.split("folder")[1];
    if (document.getElementById("f-" + id)) {
      document.getElementById("f-" + id).classList.add("activeFF");
    } else {
      //CREATE NEW FOOTER FOLDER
      let newF = document.createElement("div");
      let p = document.createElement("h5");
      let img = document.createElement("IMG");
      img.setAttribute("src", "images/dossier-ouvert.png");
      newF.appendChild(img);
      newF.appendChild(p);
      let node = document.createTextNode(f.attributes["name"].value);
      p.appendChild(node);
      let element = document.querySelector(".left-footer");
      newF.id = "f-" + id;
      newF.className = "folder-footer";
      element.appendChild(newF);
      newF.classList.add("activeFF");

      //RESELECT FOLDER FOOTER CAUSE THERE IS ONE NEW
      foldersFooter = document.querySelector(".footer").querySelectorAll("*[id]");
      // console.log(foldersFooter);
      for (let f of foldersFooter) {
        let id = f.id.split("f-")[1];
        document.getElementById(f.id).onclick = function () {
          Open("folder" + id);
          f.classList.add("activeFF");
        };
      }

      updateScroll();
    }
  };
}

//ALL WINDOWS
let windows = document.querySelectorAll(".windows");

for (let w of windows) {
  document.getElementById(w.id).querySelector(".réduire").onclick = function () {
    Reduire(w.id);
  };
  document.getElementById(w.id).querySelector(".croix").onclick = function () {
    Close(w.id);
  };
  document.getElementById(w.id).querySelector(".fullscreen").onclick = function () {
    FullScreen(w);
  };
  //ACTIVE WINDOW
  function activeWindow() {
    for (let w of windows) {
      w.classList.remove("active-w");
      w.classList.add("unactive-w");
    }
    w.style.zIndex = zindex++;
    zindex = zindex++;

    if(!document.querySelector(".bg-active")){
      document.querySelector("footer").style.zIndex = zindex;
    }

    w.classList.remove("unactive-w");
    w.classList.add("active-w");
    let idWin = w.id.split("folder")[1];
    let foldersFooter = document.querySelector(".footer").querySelectorAll("*[id]");
    for (let f of foldersFooter) {
      f.classList.remove("activeFF");
    }
    document.getElementById("f-" + idWin).classList.add("activeFF");
  }
  w.addEventListener("mousedown", activeWindow);
}

//CLOSE ALL
let B6 = document.querySelector(".B6circle");
B6.onclick = function () {
  for (let w of windows) {
    Reduire(w.id);
  }
};

//SHOW TIME
function showTime() {
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  var time = h + ":" + m;
  document.getElementById("DigitalCLOCK").innerText = time;
  document.getElementById("DigitalCLOCK").textContent = time;

  setTimeout(showTime, 1000);
}
showTime();

// MODAL + CAROUSEL

// var test = document.querySelector('[class^="activeModal"]');
let croix_modal = document.querySelectorAll(".croix_modal");

function createArray(selector, count) {
  var current = 0;
  var arr = [];
  while (++current < count) {
    arr.push(document.querySelector(selector.replace(/\{#\}/g, current)));
  }
  return arr;
}

function createArrayAll(selector, count) {
  var current = 0;
  var arr = [];
  while (++current < count) {
    arr.push(document.querySelectorAll(selector.replace(/\{#\}/g, current)));
  }
  return arr;
}

var modalBtn = createArrayAll(".activeModal{#}", 99);
var modalBg = createArray(".modal-bg{#}", 99);
const prevBtn = createArray("#prevBtn{#}", 99);
const nextBtn = createArray("#nextBtn{#}", 99);
const carouselSlide = createArray(".carousel{#}", 99);
const carouselImages = createArrayAll(".carousel_item{#}", 99);
let counter = 0;

var carouselArrows;

modalBtn.forEach((m, i) => {
  if (m[0]) {
    var size = carouselSlide[i].getBoundingClientRect().width;
    m.forEach((el) => {
      el.addEventListener("click", function (e) {
        document.querySelector("footer").style.zIndex = 1;

        modalBg[i].classList.add("bg-active");
        counter = parseInt(e.target.getAttribute("index"));

        console.log("counter " + counter);
        carouselSlide[i].style.transform = "translateX(" + -size * counter + "px)";
        carouselSlide[i].style.transition = "transform 0s";

        //KEY FOR MODAL NEXT AND PREV
        carouselArrows = (e) => {
          if (e.code === "ArrowRight") {
            if (counter >= carouselImages[i].length - 1) return;
            carouselSlide[i].style.transition = "transform 0.0001s ease-in-out";
            counter++;
            carouselSlide[i].style.transform = "translateX(" + -size * counter + "px)";
          }
          if (e.code === "ArrowLeft") {
            if (counter <= 0) return;
            carouselSlide[i].style.transition = "transform 0.0001s ease-in-out";
            counter--;
            carouselSlide[i].style.transform = "translateX(" + -size * counter + "px)";
          }
          console.log("counter " + counter);
        };

        // window.removeEventListener("keydown", carouselArrows);

        window.addEventListener("keydown", carouselArrows);

        // window.addEventListener("keydown", carouselKey);

        // document.addEventListener("keydown", function (e) {
        //   console.log(e);
        // });
      });
    });

    window.addEventListener("resize", () => {
      carouselSlide[i].style.transition = "none";
      size = carouselSlide[i].clientWidth;
      carouselSlide[i].style.transform = "translateX(" + -size * counter + "px)";
    });

    nextBtn[i].addEventListener("click", () => {
      document.querySelector("footer").style.zIndex = 1;
      if (counter >= carouselImages[i].length - 1) return;
      carouselSlide[i].style.transition = "transform 0.0001s ease-in-out";
      counter++;
      carouselSlide[i].style.transform = "translateX(" + -size * counter + "px)";
      console.log("counter " + counter);
    });
    nextBtn[i].addEventListener("mousedown", () => {
      document.querySelector("footer").style.zIndex = 1;
    });

    prevBtn[i].addEventListener("click", () => {
      document.querySelector("footer").style.zIndex = 1;
      if (counter <= 0) return;
      carouselSlide[i].style.transition = "transform 0.0001s ease-in-out";
      counter--;
      carouselSlide[i].style.transform = "translateX(" + -size * counter + "px)";
      console.log("counter " + counter);
    });
    prevBtn[i].addEventListener("mousedown", () => {
      document.querySelector("footer").style.zIndex = 1;
    });

    carouselSlide[i].addEventListener("transitionend", () => {
      if (carouselImages[i][counter].id === "lastClone") {
        carouselSlide[i].style.transition = "none";
        counter = carouselImages[i].length - 2;
        carouselSlide[i].style.transform = "translateX(" + -size * counter + "px)";
      }
      if (carouselImages[i][counter].id === "firstClone") {
        carouselSlide[i].style.transition = "none";
        counter = carouselImages[i].length - counter;
        carouselSlide[i].style.transform = "translateX(" + -size * counter + "px)";
      }
    });

    window.addEventListener("click", (e) => {
      if (e.target === modalBg[i]) {
        document.querySelector("footer").style.zIndex = zindex;
        modalBg[i].classList.remove("bg-active");
        counter = null;
        window.removeEventListener("keydown", carouselArrows);
      }
    });

    croix_modal.forEach((croix) => {
      croix.addEventListener("click", (e) => {
        document.querySelector("footer").style.zIndex = zindex;
        modalBg[i].classList.remove("bg-active");
        counter = null;
        window.removeEventListener("keydown", carouselArrows);
      });
    });
  }
});
