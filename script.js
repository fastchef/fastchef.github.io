const car = document.getElementById("car");
const coins = document.querySelectorAll(".coin");
const coinCountDisplay = document.getElementById("coinCount");
const gameContainer = document.getElementById("gameContainer");

let carX = 100;
let carY = 100;
let carAngle = 180;
let speed = 4;
let coinsCollected = 0;

car.style.left = carX + "px";
car.style.top = carY + "px";

// Posicionar monedas aleatoriamente dentro del área visible
function positionCoins() {
  const padding = 60;
  coins.forEach((coin) => {
    const maxX = gameContainer.clientWidth - 40 - padding;
    const maxY = gameContainer.clientHeight - 40 - padding;
    const x = Math.floor(Math.random() * maxX) + padding / 2;
    const y = Math.floor(Math.random() * maxY) + padding / 2;
    coin.style.left = x + "px";
    coin.style.top = y + "px";
  });
}

positionCoins();

// Movimiento por teclado
let keys = {};

document.addEventListener("keydown", (e) => {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key.toLowerCase())) {
    e.preventDefault();
    keys[e.key.toLowerCase()] = true;
  }
});

document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

// Movimiento del auto
function moveCar() {
  if (keys["arrowup"] || keys["w"]) {
    carY -= speed;
    carAngle = 0;
  }
  if (keys["arrowdown"] || keys["s"]) {
    carY += speed;
    carAngle = 180;
  }
  if (keys["arrowleft"] || keys["a"]) {
    carX -= speed;
    carAngle = 270;
  }
  if (keys["arrowright"] || keys["d"]) {
    carX += speed;
    carAngle = 90;
  }

  car.style.left = carX + "px";
  car.style.top = carY + "px";
  car.style.transform = `rotate(${carAngle}deg)`;

  checkCollision();
  requestAnimationFrame(moveCar);
}

moveCar();

// Detección de colisión con hitbox reducida (50%)
function checkCollision() {
  const carRect = car.getBoundingClientRect();

  coins.forEach((coin) => {
    const coinRect = coin.getBoundingClientRect();

    const reducedCoinRect = {
      left: coinRect.left + coinRect.width * 0.25,
      right: coinRect.right - coinRect.width * 0.25,
      top: coinRect.top + coinRect.height * 0.25,
      bottom: coinRect.bottom - coinRect.height * 0.25,
    };

    const overlap = !(
      carRect.right < reducedCoinRect.left ||
      carRect.left > reducedCoinRect.right ||
      carRect.bottom < reducedCoinRect.top ||
      carRect.top > reducedCoinRect.bottom
    );

    if (overlap) {
      coin.remove();
      coinsCollected++;
      coinCountDisplay.textContent = `Monedas recogidas: ${coinsCollected} / 5`;
      if (coinsCollected === 5) {
        alert("🎉 ¡Felicidades! Recogiste todas las monedas. Tu habilidad merece algo grande... Ahora solo falta tu voto para que ganemos el “Proyecto Popular”. Si ganamos, podrías ser parte de una sorpresa exclusiva solo para los que nos ayudaron. ¡Hacé clic en el botón de Facebook y apoyanos con tu voto! 🙌");
        window.location.href = " https://www.facebook.com/share/171NxZ5iez/?mibextid=wwXIfr "; // Reemplazá por tu link
      }
    }
  });
}

// Joystick virtual para móviles
const joystick = nipplejs.create({
  zone: document.getElementById('joystick'),
  mode: 'static',
  position: { left: '60px', bottom: '60px' },
  color: 'white'
});

joystick.on('dir', (evt, data) => {
  if (data.direction) {
    switch (data.direction.angle) {
      case 'up':
        carY -= speed;
        carAngle = 0;
        break;
      case 'down':
        carY += speed;
        carAngle = 180;
        break;
      case 'left':
        carX -= speed;
        carAngle = 270;
        break;
      case 'right':
        carX += speed;
        carAngle = 90;
        break;
    }

    car.style.left = carX + "px";
    car.style.top = carY + "px";
    car.style.transform = `rotate(${carAngle}deg)`;

    checkCollision();
  }
});



