//htmlcanvas\game.js
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const gameContainer = document.getElementById('game-container');
const obstacleInterval = 1500; // Interval for obstacle creation (milliseconds)
const obstacleSpeed = 3; // Speed of obstacles

let playerTop = 50;
let playerSpeed = 5;
let score = 0;
let isGameOver = false;
let obstacleSpawnTimer;

// Function to update score
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Function to move the player
function movePlayer() {
    if (!isGameOver) {
        playerTop += playerSpeed;
        player.style.top = `${playerTop}px`;
        // Check for game over
        if (playerTop <= 0 || playerTop + player.offsetHeight >= gameContainer.offsetHeight) {
            gameOver();
        }
    }
}

// Function to create and move obstacles
function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle absolute bg-red-500 w-8 h-8';
    obstacle.style.left = `${gameContainer.offsetWidth}px`;
    obstacle.style.top = `${Math.random() * (gameContainer.offsetHeight - 20)}px`;
    gameContainer.appendChild(obstacle);

    let obstacleLeft = gameContainer.offsetWidth;
    const obstacleMoveInterval = setInterval(() => {
        if (!isGameOver) {
            obstacleLeft -= obstacleSpeed;
            obstacle.style.left = `${obstacleLeft}px`;
            // Check for collision
            if (
                playerTop < obstacle.offsetTop + obstacle.offsetHeight &&
                playerTop + player.offsetHeight > obstacle.offsetTop &&
                player.offsetLeft < obstacle.offsetLeft + obstacle.offsetWidth &&
                player.offsetLeft + player.offsetWidth > obstacle.offsetLeft
            ) {
                gameOver();
                clearInterval(obstacleMoveInterval);
            }
            // Remove obstacle when it moves out of the screen
            if (obstacleLeft <= 0) {
                obstacle.remove();
                clearInterval(obstacleMoveInterval);
                score++; // Increment score when obstacle passes
                updateScore();
            }
        } else {
            clearInterval(obstacleMoveInterval);
        }
    }, 20);
}

// Function to start the game
function startGame() {
    isGameOver = false;
    score = 0;
    playerTop = 50;
    player.style.top = `${playerTop}px`;
    updateScore();
    obstacleSpawnTimer = setInterval(createObstacle, obstacleInterval);
}

// Function to end the game
function gameOver() {
    isGameOver = true;
    clearInterval(obstacleSpawnTimer);
    alert(`Game Over! Your score is ${score}`);
    // Reset game
    playerTop = 50;
    player.style.top = `${playerTop}px`;
    updateScore();
    // Remove all obstacles
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obstacle => obstacle.remove());
}

// Event listener for player movement
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp') {
        playerTop -= playerSpeed;
        player.style.top = `${playerTop}px`;
    } else if (event.key === 'ArrowDown') {
        playerTop += playerSpeed;
        player.style.top = `${playerTop}px`;
    }
});

// Start the game
startGame();
