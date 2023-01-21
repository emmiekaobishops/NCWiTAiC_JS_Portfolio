var c = document.getElementById("mainCanvas");
var ctx = c.getContext("2d");
var width = 20;
var height = 20;
var sq_array;
var snek_array = new Array(height);
var should_run;
var snake_run;
var eat_sound;
var apple_counter = 0;
// [x direction, y direction, x coord, y coord]
var current_snek = new Array(2);
current_snek[0] = [1, 0, width / 2, height / 2];
current_snek[1] = [1, 0, width / 2 + 1, height / 2];

function sound(src) {
    // CREDITS TO W3SCHOOLS FOR SOUND FUNCTION
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

function create_snek_array(){
    for(let i = 0; i < height; i++){
        snek_array[i] = new Array(width);
        for(let j = 0; j < width; j++){
            snek_array[i][j] = 0;
        }
    }
    snek_array[current_snek[0][3]][current_snek[0][2]] = 1;
    return snek_array;
}

function random_apple(){
    xRand = Math.floor(Math.random() * 20);
    yRand = Math.floor(Math.random() * 20);
    while(snek_array[yRand][xRand] == 1){
        xRand = Math.floor(Math.random() * 20);
        yRand = Math.floor(Math.random() * 20); 
    }
    ctx.fillStyle = "red";
    new_sq = ctx.fillRect(xRand * 30, yRand * 30, 30, 30);
    return [xRand, yRand];
}

function init_snek(current_snek){
    sq_array = draw_board();
    create_snek_array();
    [app_x, app_y] = random_apple();
    sq_array[app_x][app_y] += 2;
    ctx.fillStyle = "blue";
    ctx.fillRect(current_snek[0][2] * 30, current_snek[0][3] * 30, 30, 30);
    ctx.fillRect(current_snek[1][2] * 30, current_snek[1][3] * 30, 30, 30);
    return [sq_array, snek_array];
}

function move_snek(){ 
    let col_num = current_snek.length - 1;
    if(snek_array[current_snek[col_num][3]][current_snek[col_num][2]] == 1){
        lose_sound.play();
        you_lose();
        clearInterval(snake_run);
        return;
    }
    else {
        snek_array[current_snek[col_num][3]][current_snek[col_num][2]] += 1;
    }
    if(sq_array[current_snek[col_num][2]][current_snek[col_num][3]] >= 2) {
        apple_counter += 1;
        eat_sound.play();
        sq_array[current_snek[col_num][2]][current_snek[col_num][3]] -= 2;
        [x, y] = random_apple();
        sq_array[x][y] += 2;
    }
    
    else if(sq_array[current_snek[0][2]][current_snek[0][3]] == 0){
        ctx.fillStyle = "#93B7F2";
        ctx.fillRect(current_snek[0][2] * 30, current_snek[0][3] * 30, 30, 30);
        snek_array[current_snek[0][3]][current_snek[0][2]] -= 1;
        current_snek.shift();
    }
    else if(sq_array[current_snek[0][2]][current_snek[0][3]] == 1){
        ctx.fillStyle = "#A5C4F7";
        ctx.fillRect(current_snek[0][2] * 30, current_snek[0][3] * 30, 30, 30);
        snek_array[current_snek[0][3]][current_snek[0][2]] -= 1;
        current_snek.shift();
    }
    col_num = current_snek.length - 1;
    current_snek.push([current_snek[col_num][0], current_snek[col_num][1], current_snek[col_num][2] + current_snek[col_num ][0], current_snek[col_num][3] + current_snek[col_num][1]]);
    ctx.fillStyle = "blue";
    ctx.fillRect(current_snek[col_num + 1][2] * 30, current_snek[col_num + 1][3] * 30, 30, 30);
    should_run = check_for_hits(col_num + 1);
    if(should_run){
        lose_sound.play();
        you_lose();
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
        (current_snek[col_num][0] + current_snek[col_num][2] < -1 && current_snek[col_num][0] == -1) ||
        (current_snek[col_num][1] + current_snek[col_num][3] > height && current_snek[col_num][1] == 1) ||
        (current_snek[col_num][1] + current_snek[col_num][3] < -1 && current_snek[col_num][1] == -1)
    )
    {
        return true;
    }
    else{
        return false;
    }
}

function you_lose(){
    ctx.font = "30px Times New Roman";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("You hit something :(", width * 15, height * 10)
    ctx.fillText("You ate " + apple_counter + " apples.", width * 15, height * 15);
}

function main(){
    myCanvas.addEventListener("keydown", onKeyPress);
    eat_sound = new sound("mixkit-chewing-something-crunchy-2244.wav");
    lose_sound = new sound("mixkit-losing-drums-2023.wav")
    init_snek(current_snek);
    snake_run = setInterval(move_snek, 200);
}
main();