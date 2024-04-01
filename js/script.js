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
  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  context.scale(2, 2);
}

resize();
var pos = { x: 0, y: 0 };
var colors = ["#00000"];

document.addEventListener("mousemove", draw);

function draw(e) {
  context.font = 'bold 32px "Times New Roman", Times, serif';
  context.fillStyle = "#000";
  context.strokeStyle = "#fff";
  context.lineWidth = 1;

  context.fillText("YUGO XYZ", e.clientX, e.clientY);
  context.strokeText("YUGO XYZ", e.clientX, e.clientY);
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
  word.style.strokeStyle = "#fff";
  word.innerText = "YUGO XYZ";
  word.style.textShadow = `
    1px 0 0 #fff,
   -1px 0 0 #fff,
    0 1px 0 #fff,
    0 -1px 0 #fff,
    2px 2px #fff,
    -2px -2px 0 #fff,
    2px -2px 0 #fff,
    -2px 2px 0 #fff`;

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

if (window.innerWidth < 600) {
    setInterval(createWord, 400); 
    moveWords(); 
  }if (window.innerWidth >= 600) {
    document.addEventListener("mousemove", draw);
    document.addEventListener("keydown", function (event) {
      if (event.key === "c") {
        clearCanvas();
      }
    });
  } else {
    setInterval(createWord, 200); 
    moveWords(); 
  }