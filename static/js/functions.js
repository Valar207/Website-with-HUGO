let zindex = 0;
function Open(windowId) {
  console.log(windowId);
  let w = document.getElementById(windowId);
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
  Open("contact");
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
      let p = document.createElement("p");
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
      for (let f of foldersFooter) {
        let id = f.id.split("f-")[1];
        document.getElementById(f.id).onclick = function () {
          Open("folder" + id);
          f.classList.add("activeFF");
        };
      }
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
    document.querySelector("footer").style.zIndex = zindex;
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
// console.log(test);
let croix_modal = document.querySelectorAll('.croix_modal')

function createArray(selector, count) {
  var current = 0;
  var arr = []
  while (++current < count) {
      arr.push(document.querySelector(selector.replace(/\{#\}/g, current)));
  }
  return arr;
}

function createArrayAll(selector, count) {
  var current = 0;
  var arr = []
  while (++current < count) {
      arr.push(document.querySelectorAll(selector.replace(/\{#\}/g, current)));
  }
  return arr;
}

var modalBtn = createArrayAll(".activeModal{#}", 99);
var modalBg = createArray(".modal-bg{#}", 99);
const prevBtn = createArray("#prevBtn{#}", 99);
const nextBtn = createArray("#nextBtn{#}", 99);
const carouselSlide = createArray(".carousel-slide{#}", 99);
const carouselImages = createArrayAll(".imgSlide{#}", 99);

modalBtn.forEach((m, i) => {
  if(m[0]){
    var size = carouselImages[i][0].clientWidth;
  m.forEach((el) => {
    el.addEventListener("click", function (e) {
    modalBg[i].classList.add("bg-active");
    console.log(e.target);
    counter = parseInt(e.target.getAttribute("index"));
    console.log(counter);
    carouselSlide[i].style.transform = "translateX(" + -size * counter + "px)";
    carouselSlide[i].style.transition = "transform 0s";
  })
  })
  // console.log(nextBtn[i]);
  nextBtn[i].addEventListener("click", () => {
    console.log(counter);
    if (counter >= carouselImages[i].length - 1) return;
    // console.log(counter);
    carouselSlide[i].style.transition = "transform 0.0001s ease-in-out";
    counter++;
    carouselSlide[i].style.transform = "translateX(" + -size * counter + "px)";
  });
  prevBtn[i].addEventListener("click", () => {
    if (counter <= 0) return;
    // console.log(counter);
    carouselSlide[i].style.transition = "transform 0.0001s ease-in-out";
    counter--;
    carouselSlide[i].style.transform = "translateX(" + -size * counter + "px)";
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
      modalBg[i].classList.remove("bg-active");
      counter = null;
    }
  });

  croix_modal.forEach(croix => {
    croix.addEventListener('click', (e) =>{
      modalBg[i].classList.remove("bg-active");
      counter = null;
    })
  })
}
})




// var modalBtn = [document.querySelectorAll(".activeModal1"), document.querySelectorAll(".activeModal2")];
// var modalBg = [document.querySelector(".modal-bg1"), document.querySelector(".modal-bg2")];
// const prevBtn = [document.querySelector("#prevBtn1"), document.querySelector("#prevBtn2")];
// console.log(prevBtn);
// const nextBtn = [document.querySelector("#nextBtn1"), document.querySelector("#nextBtn2")];
// const carouselSlide = [document.querySelector(".carousel-slide1"), document.querySelector(".carousel-slide2")];
// const carouselImages = [document.querySelectorAll(".imgSlide1"),document.querySelectorAll(".imgSlide2")];

// var modalBtn = document.querySelectorAll(".activeModal");
// var modalBtn1 = document.querySelectorAll(".activeModal1");


// var modalBg = document.querySelector(".modal-bg");
// var modalBg1 = document.querySelector(".modal-bg1");

// const prevBtn = document.querySelector("#prevBtn");
// const prevBtn1 = document.querySelector("#prevBtn1");

// const nextBtn = document.querySelector("#nextBtn");
// const nextBtn1 = document.querySelector("#nextBtn1");


// const carouselSlide = document.querySelector(".carousel-slide");
// const carouselSlide1 = document.querySelector(".carousel-slide1");


// const carouselImages = document.querySelectorAll(".imgSlide");
// const carouselImages1 = document.querySelectorAll(".imgSlide1");


// modalBtn.forEach((el) =>
//   el.addEventListener("click", function (e) {
//     modalBg.classList.add("bg-active");
//     counter = parseInt(e.target.getAttribute("index"));
//     carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
//     carouselSlide.style.transition = "transform 0s";
//   })
// );


// modalBtn1.forEach((el) =>
//   el.addEventListener("click", function (e) {
//     modalBg1.classList.add("bg-active");
//     counter = parseInt(e.target.getAttribute("index"));
//     carouselSlide1.style.transform = "translateX(" + -size * counter + "px)";
//     carouselSlide1.style.transition = "transform 0s";
//   })
// );

// CAROUSEL

// nextBtn.addEventListener("click", () => {
//   if (counter >= carouselImages.length - 1) return;
//   // console.log(counter);
//   carouselSlide.style.transition = "transform 0.4s ease-in-out";
//   counter++;
//   carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
// });
// prevBtn.addEventListener("click", () => {
//   if (counter <= 0) return;
//   console.log(counter);
//   carouselSlide.style.transition = "transform 0.4s ease-in-out";
//   counter--;
//   carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
// });

// nextBtn1.addEventListener("click", () => {
//   if (counter >= carouselImages1.length - 1) return;
//   console.log(counter);
//   carouselSlide1.style.transition = "transform 0.4s ease-in-out";
//   counter++;
//   carouselSlide1.style.transform = "translateX(" + -size * counter + "px)";
// });
// prevBtn1.addEventListener("click", () => {
//   if (counter <= 0) return;
//   console.log(counter);
//   carouselSlide1.style.transition = "transform 0.4s ease-in-out";
//   counter--;
//   carouselSlide1.style.transform = "translateX(" + -size * counter + "px)";
// });

// carouselSlide.addEventListener("transitionend", () => {
//   if (carouselImages[counter].id === "lastClone") {
//     carouselSlide.style.transition = "none";
//     counter = carouselImages.length - 2;
//     carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
//   }
//   if (carouselImages[counter].id === "firstClone") {
//     carouselSlide.style.transition = "none";
//     counter = carouselImages.length - counter;
//     carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
//   }
// });

// carouselSlide1.addEventListener("transitionend", () => {
//   if (carouselImages1[counter].id === "lastClone") {
//     carouselSlide1.style.transition = "none";
//     counter = carouselImages1.length - 2;
//     carouselSlide1.style.transform = "translateX(" + -size * counter + "px)";
//   }
//   if (carouselImages1[counter].id === "firstClone") {
//     carouselSlide1.style.transition = "none";
//     counter = carouselImages1.length - counter;
//     carouselSlide1.style.transform = "translateX(" + -size * counter + "px)";
//   }
// });

//CLOSE MODAL
// window.addEventListener("click", (e) => {
//   if (e.target === modalBg) {
//     modalBg.classList.remove("bg-active");
//     counter = null;
//   }
// });

// window.addEventListener("click", (e) => {
//   if (e.target === modalBg1) {
//     modalBg1.classList.remove("bg-active");
//     counter = null;
//   }
// });




