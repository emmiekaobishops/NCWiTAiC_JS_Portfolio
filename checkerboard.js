function square(x_val, y_val, width, height, color, sq_array){
    let c = document.getElementById("mainCanvas");
    let ctx = c.getContext("2d");
    ctx.fillStyle = color;
    new_sq = ctx.fillRect(x_val, y_val, width, height);
    return new_sq
}

function draw_board(){
    let sq_width = 30;
    let sq_height = 30;
    let rows = 20;
    let columns = 20;
    let x_val = 0;
    let y_val = 0;

    var sq_array = new Array(rows);

    for (let i = 0; i < rows; i++){
        x_val = 30 * i;
        let color = "";
        sq_array[i] = new Array(columns);
        for (let j = 0; j < columns; j++) {
            if ((i+j) % 2 == 0) {
                color = "#93B7F2";
                index = 0;
            }
            else {
                color = "#A5C4F7";
                index = 1;
            }
            y_val = 30 * j;
            square(x_val, y_val, sq_width, sq_height, color, sq_array);
            sq_array[i][j] = index;
        }
    }
    console.log(sq_array)
    return sq_array
}