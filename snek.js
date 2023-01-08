let c = document.getElementById("mainCanvas");
let ctx = c.getContext("2d");
let width = 30;
let current_index = 0;
let speed = 0.8;
let interval_time = 0;
let interval = 0;
// [x direction, y direction, x coord, y coord]
let current_snek = [[1, 0, 10, 10], [1, 0, 11, 10]];

function random_apple(){
    xRand = Math.floor(Math.random() * 20)
    yRand = Math.floor(Math.random() * 20)
    ctx.fillStyle = "red";
    new_sq = ctx.fillRect(xRand * 30, yRand * 30, 30, 30);
    return [xRand, yRand]
}

function init_snek(){
    sq_array = draw_board();
    [app_x, app_y] = random_apple();
    sq_array[app_x][app_y] += 2;
    ctx.fillStyle = "blue";
    ctx.fillRect(current_snek[0][2] * 30, current_snek[0][3] * 30, 30, 30);
    ctx.fillRect(current_snek[1][2] * 30, current_snek[1][3] * 30, 30, 30);
    return [sq_array, current_snek];
}

function move_snek(sq_array){
    console.log("move_snek");
    myCanvas.addEventListener("keydown", onKeyPress)
    let col_num = current_snek.length - 1
    if(sq_array[current_snek[0][2]][current_snek[0][3]] == 0){
        current_snek.shift()
        ctx.fillStyle = "#93B7F2"
        ctx.fillRect(current_snek[0][2] * 30, current_snek[0][3] * 30, 30, 30);
    }
    else if(sq_array[current_snek[0][2]][current_snek[0][3]] == 1){
        current_snek.shift()
        ctx.fillStyle = "#A5C4F7"
        ctx.fillRect(current_snek[0][2] * 30, current_snek[0][3] * 30, 30, 30);
    }
    current_snek.push([current_snek[col_num - 2][0], current_snek[col_num - 2][1], current_snek[col_num - 2][2] + current_snek[col_num - 2][0], current_snek[col_num - 2][3] + current_snek[col_num - 2][1]])
    ctx.fillStyle = "blue"
    ctx.fillRect(current_snek[col_num][2] * 30, current_snek[col_num][3] * 30, 30, 30);   
}

function onKeyPress(e){
    let col_num = current_snek.length - 1
    var kp = e.key;
    // change the LAST row of the array based on key pressed
    if(kp == "ArrowRight"){
        current_snek[col_num][0] = 1;
        current_snek[col_num][1] = 0;
    }
    else if(kp == "ArrowLeft"){
        current_snek[col_num][0] = -1;
        current_snek[col_num][1] = 0;
    }
    else if(kp == "ArrowUp"){
        current_snek[col_num][0] = 0;
        current_snek[col_num][1] = -1;
    }
    else if(kp == "ArrowDown"){
        current_snek[col_num][0] = 0;
        current_snek[col_num][1] = 1;
    }
    return current_snek;
}
// DISREGARD
// function check_for_hits(squares) {
//     if(
//         (current_snek[0] + width >= width * width && direction === width) ||
//         (current_snek[0] % width === width - 1 && direction ===1) ||
//         (current_snek[0] % width === 0 && direction === -1) ||
//         (current_snek[0] - width <= 0 && direction === -width) ||
//         squares[current_snek[0] + direction].classList.contains("snake")
//     )
//     {
//         return true;
//     }
//     else{
//         return false;
//     }
// }

function main(){
    [sq_array] = init_snek();
    setInterval(move_snek(current_snek, sq_array), 20);
    
}
main();