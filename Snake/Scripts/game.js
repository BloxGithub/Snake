import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, snakeBody } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'

let lastRenderTime = 0
const gameBoard = document.getElementById('game-board')
let gameOver = false

function main(currentTime) {
    if (gameOver) {
        if (confirm('You died!')) {
            window.location.reload()
        }
        return
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return

    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function updateScore() {
    let counter = -1
    snakeBody.forEach(e => {
        counter = counter + 1
    })
    document.getElementById('score').innerHTML = "Score: " + counter;
}

function update() {
    updateSnake()
    updateFood()
    checkDeath()
    updateScore()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}
