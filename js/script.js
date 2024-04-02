var canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.left = "0";
canvas.style.top = "0";
canvas.style.zIndex = "1";
document.body.appendChild(canvas);
var context = canvas.getContext("2d");

document.addEventListener("keydown", function (event) {
  if (event.key === "c") {
    clearCanvas();
  }
});

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function resize() {
  var canvasHeightAdjustment = 115;
  canvas.width = window.innerWidth * 2;
  canvas.height = (window.innerHeight - canvasHeightAdjustment) * 2;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight - canvasHeightAdjustment + "px";
  context.scale(2, 2);
}

resize();
var pos = { x: 0, y: 0 };
var colors = [
  "#000000",
  "#FF0000",
  "#DFFF00",
  "#00FF00",
  "#00FFFF",
  "#0000FF",
  "#FF00FF",
  "#FF007F",
  "#FF5733",
  "#C70039",
  "#900C3F",
  "#581845",
  "#DAF7A6",
  "#FFC300",
  "#FF5733",
  "#C70039",
  "#900C3F",
];

document.addEventListener("mousemove", draw);
var textColor = colors[0];
var randomMode = false;

function draw(e) {
  context.font = 'bold 32px "Times New Roman", Times, serif';
  context.fillStyle = textColor;
  context.strokeStyle = "#fff";
  context.lineWidth = 0.7;

  context.fillText("YUGO XYZ", e.clientX, e.clientY);
  context.strokeText("YUGO XYZ", e.clientX, e.clientY);
  if (randomMode) {
    textColor = colors[Math.floor(Math.random() * colors.length)];
  }
}

function createWord() {
  var word = document.createElement("div");
  word.className = "word";
  word.style.position = "absolute";
  word.style.top = "-50px";
  word.style.left =
    Math.random() * document.querySelector("#rain-container").offsetWidth +
    "px";
  word.style.top = "-50px";
  word.style.fontSize = "24px";
  word.style.color = "black";
  word.style.whiteSpace = "nowrap";
  word.style.overflow = "hidden";
  word.style.strokeStyle = "#fff";
  word.innerText = "YUGO XYZ";
  word.style.textShadow = `
    1px 0 0 #fff,
   -1px 0 0 #fff,
    0 1px 0 #fff,
    0 -1px 0 #fff,
    1px 1px #fff,
    -1px -1px 0 #fff,
    1px -1px 0 #fff,
    -1px 1px 0 #fff`;

  var rotation = Math.random() * 30 - 15;
  word.dataset.speed = Math.random() * 2 + 1;
  word.style.transform = `rotate(${rotation}deg)`;
  word.classList.add("word-out-of-view");
  document.querySelector("#rain-container").appendChild(word);
}

function moveWords() {
  var words = document.querySelectorAll(".word-out-of-view");
  words.forEach(function (word) {
    var topPos = parseFloat(word.style.top);
    var speed = parseFloat(word.dataset.speed);
    var newPos = topPos + speed;
    word.style.top = newPos + "px";

    if (newPos > window.innerHeight) {
      word.remove();
    }
  });

  requestAnimationFrame(moveWords);
}
function setupBehavior() {
  if (window.innerWidth >= 600) {
    document.addEventListener("mousemove", draw);
  } else {
    setInterval(createWord, 400);
    moveWords();
  }
}
document.addEventListener("keydown", function (event) {
  if (event.key === "s") {
    clearCanvas();
  } else if (event.key === "w") {
    textColor = colors[0];
    randomMode = false;
  } else if (event.key === "a") {
    textColor = colors[Math.floor(Math.random() * colors.length - 1)];
    randomMode = false;
  } else if (event.key === "d") {
    randomMode = !randomMode;
  }
});

window.addEventListener("resize", function () {
  resize();
  setupBehavior();
});
resize();
setupBehavior();
