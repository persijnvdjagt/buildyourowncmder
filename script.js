// Elementen ophalen
const skinLayer = document.getElementById("lichaam");
const hairLayer = document.getElementById("haar");
const shirtLayer = document.getElementById("shirt");
const pantsLayer = document.getElementById("broek");
const shoesLayer = document.getElementById("schoenen");

const startButton = document.getElementById("startButton");
const audio = document.getElementById("retail");

// Arrays met bestandsnamen
const shirts = ["shirt-1", "shirt-2", "shirt-3", "shirt-4"];
const pants = ["broek-1", "broek-2", "broek-3", "broek-4"];
const shoes = ["schoenen-1", "schoenen-2", "schoenen-3", "schoenen-4"];
const skins = ["lichaam-1", "lichaam-2", "lichaam-3", "lichaam-4"];
const hairs = ["haar-1", "haar-2", "haar-3", "haar-4"];

let skinIndex = 0;
let hairIndex = 0;
let shirtIndex = 0;
let pantsIndex = 0;
let shoesIndex = 0;

// Startknop functie
function startGame() {
  audio.play();
  document.getElementById("startscherm").classList.add("hidden");
  document.getElementById("aanpassen").classList.remove("hidden");
}

// Wisselfuncties met behulp van Filip Hensels
function changeSkin() {
  skinIndex = (skinIndex + 1) % skins.length;
  skinLayer.src = `images/${skins[skinIndex]}.png`;
}
function changeHair() {
  hairIndex = (hairIndex + 1) % hairs.length;
  hairLayer.src = `images/${hairs[hairIndex]}.png`;
}
function changeShirt() {
  shirtIndex = (shirtIndex + 1) % shirts.length;
  shirtLayer.src = `images/${shirts[shirtIndex]}.png`;
}
function changePants() {
  pantsIndex = (pantsIndex + 1) % pants.length;
  pantsLayer.src = `images/${pants[pantsIndex]}.png`;
}
function changeShoes() {
  shoesIndex = (shoesIndex + 1) % shoes.length;
  shoesLayer.src = `images/${shoes[shoesIndex]}.png`;
}

// Event listeners
document.getElementById("skinButton").addEventListener("click", changeSkin);
document.getElementById("hairButton").addEventListener("click", changeHair);
document.getElementById("shirtButton").addEventListener("click", changeShirt);
document.getElementById("pantsButton").addEventListener("click", changePants);
document.getElementById("shoesButton").addEventListener("click", changeShoes);
startButton.addEventListener("click", startGame);

// Download functie
document
  .getElementById("downloadButton")
  .addEventListener("click", downloadAvatar);

function downloadAvatar() {
  const canvas = document.createElement("canvas");
  canvas.width = 458;
  canvas.height = 687;
  const ctx = canvas.getContext("2d");

  const layers = [
    document.getElementById("broek"),
    document.getElementById("schoenen"),
    document.getElementById("shirt"),
    document.getElementById("lichaam"),
    document.getElementById("haar"),
  ];

  let loadedImages = 0;

  layers.forEach((img) => {
    if (!img.complete) {
      img.onload = checkAllLoaded;
    } else {
      loadedImages++;
    }
  });

  if (loadedImages === layers.length) {
    drawAndDownload();
  }

  function checkAllLoaded() {
    loadedImages++;
    if (loadedImages === layers.length) {
      drawAndDownload();
    }
  }

  function drawAndDownload() {
    layers.forEach((img) => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    });

    const link = document.createElement("a");
    link.download = "jouw-cmd'er.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }
}
