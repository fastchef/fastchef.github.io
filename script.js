const car = document.getElementById('car');
const gameArea = document.getElementById('game-area');
const coinCountDisplay = document.getElementById('coin-count');
let coinsCollected = 0;

for (let i = 0; i < 5; i++) {
  const coin = document.createElement('img');
  coin.src = 'imagenes/moneda.png'; // Usa tu imagen aquí
  coin.classList.add('coin');
  coin.style.top = `${Math.floor(Math.random() * 350)}px`;
  coin.style.left = `${Math.floor(Math.random() * 580)}px`;
  gameArea.appendChild(coin);
}

let posX = gameArea.offsetWidth / 2 - 20;
let posY = gameArea.offsetHeight - 70;

document.addEventListener('keydown', (e) => {
  const step = 10;
  const key = e.key.toLowerCase();

  if (key === 'arrowleft' || key === 'a') {
    posX -= step;
    rotation = 90;
  }
  if (key === 'arrowright' || key === 'd') {
    posX += step;
    rotation = -90;
  }
  if (key === 'arrowup' || key === 'w') {
    posY -= step;
    rotation = 180;
  }
  if (key === 'arrowdown' || key === 's') {
    posY += step;
    rotation = 0;
  }

  posX = Math.max(0, Math.min(posX, gameArea.offsetWidth - 40));
  posY = Math.max(0, Math.min(posY, gameArea.offsetHeight - 60));

  car.style.left = `${posX}px`;
  car.style.top = `${posY}px`;
  car.style.transform = `rotate(${rotation}deg)`;

  checkCollision();
});


function move(direction) {
  const step = 10;

  if (direction === 'left') {
    posX -= step;
    rotation = 90;
  }
  if (direction === 'right') {
    posX += step;
    rotation = -90;
  }
  if (direction === 'up') {
    posY -= step;
    rotation = 180;
  }
  if (direction === 'down') {
    posY += step;
    rotation = 0;
  }

  posX = Math.max(0, Math.min(posX, gameArea.offsetWidth - 40));
  posY = Math.max(0, Math.min(posY, gameArea.offsetHeight - 60));

  car.style.left = `${posX}px`;
  car.style.top = `${posY}px`;
  car.style.transform = `rotate(${rotation}deg)`;

  checkCollision();
}

function checkCollision() {
  const carRect = car.getBoundingClientRect();
  const coins = document.querySelectorAll('.coin');

  coins.forEach((coin) => {
    const coinRect = coin.getBoundingClientRect();

    // Reducir la hitbox al 50%
    const reducedCoinRect = {
      left: coinRect.left + coinRect.width * 0.50,
      right: coinRect.right - coinRect.width * 0.50,
      top: coinRect.top + coinRect.height * 0.50,
      bottom: coinRect.bottom - coinRect.height * 0.50,
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
        alert('🎉 ¡Felicidades! Recogiste todas las monedas. Tu habilidad merece algo grande... Ahora solo falta tu voto para que ganemos el “Proyecto Popular”. Si ganamos, podrías ser parte de una sorpresa exclusiva solo para los que nos ayudaron. ¡Hacé clic en el botón de Facebook y apoyanos con tu voto! 🙌');
        window.location.href = 'https://motordeal.store';
      }
    }
  });
}

