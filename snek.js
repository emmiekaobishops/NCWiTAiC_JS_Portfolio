let c = document.getElementById("mainCanvas");
let ctx = c.getContext("2d");
let grid = document.querySelector(".grid")
let playAgain = document.querySelector(".playAgain");
let left = document.querySelector(".left");
let bottom = document.querySelector(".bottom");
let right = document.querySelector(".right");
let up = document.querySelector(".up");
let width = 30;
let current_index = 0;
let current_snek = [2, 1, 0];
let direction = 1;
let speed = 0.8;
let interval_time = 0;
let interval = 0;

function random_apple(){
    xRand = Math.floor(Math.random() * 20)
    yRand = Math.floor(Math.random() * 20)
    ctx.fillStyle = "red";
    new_sq = ctx.fillRect(xRand * 30, yRand * 30, 30, 30);
}


function init_snek(){
    sq_array = draw_board();
    random_apple()
    current_snek.forEach((index) => sq_array[index].classList.add("snake"));
    interval = setInterval(moveOutcome, intervalTime);
    return sq_array
}

function move_outcome(){
    let squares = document.querySelectorAll(".grid div");
    if(checkForHits(squares)){
        alert("you died");
        popup.style.display = "flex";
        return clearInterval(interval);
    }
    else{
        move_snek(squares)
    }
}

function move_snek(squares){
    let tail = current_snek.pop();
    squares[tail].classList.remove("snake");
    current_snek.unshift(current_snek[0] + direction);
    eatApple(squares, tail);
    squares[current_snek[0]].classList.add("snake");
}

function checkForHits(squares) {
    if(
        (current_snek[0] + width >= width * width && direction === width) ||
        (current_snek[0] % width === width - 1 && direction ===1) ||
        (current_snek[0] % width === 0 && direction === -1) ||
        (current_snek[0] - width <= 0 && direction === -width) ||
        squares[current_snek[0] + direction].classList.contains("snake")
    ){
        return true;
    }
    else{
        return false;
    }
}

function main(){
    document.addEventListener("DOMContentLoaded", function() {
        document.addEventListener("keyup", control);
        playAgain.addEventListener("click", replay);
    });

    sq_array = init_snek()
}

main()