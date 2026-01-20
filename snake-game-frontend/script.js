const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake, direction, food, score, gameInterval;

function startGame() {
    const nameInput = document.getElementById("playerName");
    if (!nameInput.value.trim()) {
        alert("Please enter player name");
        return;
    }

    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    food = randomFood();
    score = 0;

    clearInterval(gameInterval);
    gameInterval = setInterval(draw, 120);
}

document.addEventListener("keydown", changeDirection);

function changeDirection(e) {
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function randomFood() {
    return {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.forEach(part => {
        ctx.fillStyle = "green";
        ctx.fillRect(part.x, part.y, box, box);
    });

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let head = { ...snake[0] };

    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = randomFood();
    } else {
        snake.pop();
    }

    if (collision(head)) {
        endGame();
        return;
    }

    snake.unshift(head);
}

function collision(head) {
    return head.x < 0 || head.y < 0 ||
        head.x >= canvas.width || head.y >= canvas.height ||
        snake.some(part => part.x === head.x && part.y === head.y);
}

function endGame() {
    clearInterval(gameInterval);
    saveScore();
    alert("Game Over! Score: " + score);
    loadScores();
}

function saveScore() {
    const playerName = document.getElementById("playerName").value;

    fetch("http://localhost:8080/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerName, score })
    });
}

function loadScores() {
    fetch("http://localhost:8080/api/scores")
        .then(res => res.json())
        .then(scores => {
            const ul = document.getElementById("scoreList");
            ul.innerHTML = "";
            scores.forEach(s =>
                ul.innerHTML += `<li>${s.playerName}: ${s.score}</li>`
            );
        });
}

loadScores();
