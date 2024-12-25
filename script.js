// Elements
let welcomeScreen = document.getElementById('welcome-screen');
let gameScreen = document.getElementById('game-screen');
let ghostScreen = document.getElementById('ghost-screen');
let endScreen = document.getElementById('end-screen');
let playButton = document.getElementById('play-button');
let passButton = document.getElementById('pass-button');
let nyancat = document.getElementById('nyancat');
let scoreDisplay = document.getElementById('score');
let score = 0;
let gameOver = false;
let gemInterval, gemFallInterval, onigiriInterval, gemCheckInterval;

// Play Button
playButton.addEventListener('click', function() {
  welcomeScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  startGame();
});

// Pass Button
passButton.addEventListener('click', function() {
  welcomeScreen.style.display = 'none';
  ghostScreen.style.display = 'block'; // Show ghost face
});

// Start the Game
function startGame() {
  gameOver = false;
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;

  // Create falling fish-shaped gems
  gemInterval = setInterval(function() {
    if (gameOver) {
      clearInterval(gemInterval);
      clearInterval(gemFallInterval);
      clearInterval(onigiriInterval);
      clearInterval(gemCheckInterval);
      endScreen.style.display = 'block';
      return;
    }

    let gem = document.createElement('img');
    gem.src = 'fish-gem.png'; // Replace with your fish gem image path
    gem.classList.add('gem');
    gem.style.left = `${Math.random() * 100}%`;
    gem.style.top = '0px';
    gameScreen.appendChild(gem);

    // Gem falling animation
    gemFallInterval = setInterval(function() {
      if (gameOver) {
        clearInterval(gemFallInterval);
        return;
      }

      gem.style.top = `${gem.offsetTop + 5}px`;

      // Check if the gem hits Nyancat
      if (gem.offsetTop > window.innerHeight - 150 && gem.offsetLeft + gem.width > nyancat.offsetLeft && gem.offsetLeft < nyancat.offsetLeft + nyancat.width) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        gem.remove(); // Remove gem if caught
      }

      // If the gem reaches the bottom, it's a fail
      if (gem.offsetTop > window.innerHeight) {
        gameOver = true;
        alert('Game Over! You missed a fish!');
        clearInterval(gemFallInterval);
        endScreen.style.display = 'block';
        onigiriRain();
      }
    }, 20);
  }, 1000);

  // Start the Onigiri Rain
  onigiriInterval = setInterval(createOnigiri, 500); // Faster onigiri rain

  // Start checking for missed fish gems (which triggers the game over condition)
  gemCheckInterval = setInterval(function() {
    if (gameOver) {
      clearInterval(gemCheckInterval);
    }
  }, 1000);
}

// Create Onigiri falling
function createOnigiri() {
  let onigiri = document.createElement('img');
  onigiri.src = 'onigiri.gif'; // Replace with your onigiri image path
  onigiri.classList.add('onigiri');
  onigiri.style.left = `${Math.random() * 100}%`;
  onigiri.style.animationDuration = `${Math.random() * 3 + 3}s`; // Vary the speed of falling onigiri
  endScreen.appendChild(onigiri);
}

// Move Nyancat with mouse
document.addEventListener('mousemove', function(event) {
  let nyancatRect = nyancat.getBoundingClientRect();
  nyancat.style.left = `${event.clientX - nyancatRect.width / 2}px`;
  nyancat.style.top = `${event.clientY - nyancatRect.height / 2}px`;
});

// Onigiri Rain when game ends
function onigiriRain() {
  let onigiriRainInterval = setInterval(function() {
    let onigiri = document.createElement('img');
    onigiri.src = 'onigiri.gif'; // Replace with your onigiri image path
    onigiri.classList.add('onigiri');
    onigiri.style.left = `${Math.random() * 100}%`;
    endScreen.appendChild(onigiri);
  }, 500);
}
