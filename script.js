let secretNumber, lower, upper, attemptsLeft = 7;

function startGame() {
  lower = parseInt(document.getElementById('lowerBound').value);
  upper = parseInt(document.getElementById('upperBound').value);

  if (isNaN(lower) || isNaN(upper) || lower >= upper) {
    alert("Enter valid lower and upper bounds (e.g. 10 and 50)");
    return;
  }

  secretNumber = Math.floor(Math.random() * (upper - lower + 1)) + lower;
  attemptsLeft = 7;

  document.getElementById('setupContainer').style.display = 'none';
  document.getElementById('gameContainer').style.display = 'block';
  document.getElementById('rangeInfo').textContent = `Guess the number between ${lower} and ${upper}. You have ${attemptsLeft} tries.`;
  document.getElementById('message').textContent = '';
}

function checkGuess() {
  const guess = Number(document.getElementById('guessInput').value);
  const message = document.getElementById('message');

  if (attemptsLeft <= 0) {
    message.textContent = `❌ Game Over! The number was ${secretNumber}`;
    message.style.color = "red";
    return;
  }

  attemptsLeft--;

  if (guess === secretNumber) {
    message.textContent = "🎉 Correct! You guessed it!";
    message.style.color = "lightgreen";
  } else if (guess < secretNumber) {
    message.textContent = `Too low! ${attemptsLeft} tries left.`;
    message.style.color = "orange";
  } else {
    message.textContent = `Too high! ${attemptsLeft} tries left.`;
    message.style.color = "orange";
  }

  if (attemptsLeft === 0 && guess !== secretNumber) {
    message.textContent = `❌ Out of tries! The number was ${secretNumber}`;
    message.style.color = "red";
  }
}

function restartGame() {
  document.getElementById('gameContainer').style.display = 'none';
  document.getElementById('setupContainer').style.display = 'block';
  document.getElementById('message').textContent = '';
  document.getElementById('lowerBound').value = '';
  document.getElementById('upperBound').value = '';
  document.getElementById('guessInput').value = '';
}

// Matrix animation (same as before)
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let letters = '01'.split('');
let fontSize = 14;
let columns = canvas.width / fontSize;
let drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0F0';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}
setInterval(drawMatrix, 35);
