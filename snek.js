var c = document.getElementById("mainCanvas");
var ctx = c.getContext("2d");
var width = 20;
var height = 20;
var current_index = 0;
var speed = 0.8;
var interval_time = 0;
var interval = 0;
var sq_array;
var snek_array;
var should_run;
var snake_run;
// [x direction, y direction, x coord, y coord]
var current_snek = new Array(2);
current_snek[0] = [1, 0, 10, 10];
current_snek[1] = [1, 0, 11, 10];

function create_snek_array(){
    let snek_array = new Array(height);
    for(let i = 0; i < height; i++){
        snek_array[i] = new Array(width);
        for(let j = 0; j < width; j++){
        snek_array[i][j] = 0;
        }
    }
    return snek_array;
}

function random_apple(){
    xRand = Math.floor(Math.random() * 20);
    yRand = Math.floor(Math.random() * 20);
    ctx.fillStyle = "red";
    new_sq = ctx.fillRect(xRand * 30, yRand * 30, 30, 30);
    return [xRand, yRand];
}

function init_snek(current_snek){
    sq_array = draw_board();
    snek_array = create_snek_array();
    [app_x, app_y] = random_apple();
    sq_array[app_x][app_y] += 2;
    ctx.fillStyle = "blue";
    ctx.fillRect(current_snek[0][2] * 30, current_snek[0][3] * 30, 30, 30);
    ctx.fillRect(current_snek[1][2] * 30, current_snek[1][3] * 30, 30, 30);
    snek_array[current_snek[0][2] - 1][current_snek[0][3] - 1] += 1;
    snek_array[current_snek[1][2] - 1][current_snek[1][3] - 1] += 1;
    return [sq_array, snek_array];
}

function move_snek(){ 
    let col_num = current_snek.length - 1;
    console.log(snek_array);

    if(snek_array[current_snek[col_num][2]][current_snek[col_num][3]] == 1){
        console.log("you hit something");
        clearInterval(snake_run);
    }

    if(sq_array[current_snek[col_num][2]][current_snek[col_num][3]] >= 2) {
        sq_array[current_snek[col_num][2]][current_snek[col_num][3]] -= 2;
        [x, y] = random_apple();
        sq_array[x][y] += 2;
    }
    
    else if(sq_array[current_snek[0][2]][current_snek[0][3]] == 0){
        ctx.fillStyle = "#93B7F2";
        ctx.fillRect(current_snek[0][2] * 30, current_snek[0][3] * 30, 30, 30);
        snek_array[current_snek[col_num][2]][current_snek[col_num][3]] -= 1;
        current_snek.shift();
    }
    else if(sq_array[current_snek[0][2]][current_snek[0][3]] == 1){
        ctx.fillStyle = "#A5C4F7";
        ctx.fillRect(current_snek[0][2] * 30, current_snek[0][3] * 30, 30, 30);
        snek_array[current_snek[col_num][2]][current_snek[col_num][3]] -= 1;
        current_snek.shift();
    }
    current_snek.push([current_snek[col_num - 1][0], current_snek[col_num - 1][1], current_snek[col_num -1][2] + current_snek[col_num - 1][0], current_snek[col_num - 1][3] + current_snek[col_num - 1][1]]);
    snek_array[current_snek[col_num - 1][2]][current_snek[col_num - 1][3]] += 1;
    ctx.fillStyle = "blue";
    ctx.fillRect(current_snek[col_num][2] * 30, current_snek[col_num][3] * 30, 30, 30);
    should_run = check_for_hits(col_num);
    if(should_run){
        console.log("you hit something");
        clearInterval(snake_run);
    }
}

function onKeyPress(e){
    let col_num = current_snek.length - 1;
    var kp = e.key;
    // change the LAST row of the array based on key pressed
    if(kp == "ArrowRight"){
        if (current_snek[col_num][0] != -1 && current_snek[col_num][1] != 0){
            current_snek[col_num][0] = 1;
            current_snek[col_num][1] = 0;
        }
    }
    else if(kp == "ArrowLeft"){
        if (current_snek[col_num][0] != 1 && current_snek[col_num][1] != 0){
            current_snek[col_num][0] = -1;
            current_snek[col_num][1] = 0;
        }
    }
    else if(kp == "ArrowUp"){
        if (current_snek[col_num][0] != 0 && current_snek[col_num][1] != 1){
            current_snek[col_num][0] = 0;
            current_snek[col_num][1] = -1;
        }
    }
    else if(kp == "ArrowDown"){
        if (current_snek[col_num][0] != 0 && current_snek[col_num][1] != -1){
            current_snek[col_num][0] = 0;
            current_snek[col_num][1] = 1;
        }
    }
    return current_snek;
}

function check_for_hits(col_num) {
    if(   
        (current_snek[col_num][0] + current_snek[col_num][2] > width && current_snek[col_num][0] == 1) ||
        (current_snek[col_num][0] + current_snek[col_num][2] < 0 && current_snek[col_num][0] == -1) ||
        (current_snek[col_num][1]+ current_snek[col_num][3] > height && current_snek[col_num][1] == 1) ||
        (current_snek[col_num][1] + current_snek[col_num][3] < 0 && current_snek[col_num][1] == -1)
    )
    {
        return true;
    }
    else{
        return false;
    }
}

function main(){
    myCanvas.addEventListener("keydown", onKeyPress);
    [sq_array, snek_array] = init_snek(current_snek);
    snake_run = setInterval(move_snek, 200);
}
main();