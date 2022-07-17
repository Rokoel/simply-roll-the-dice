var level_0 = {
    level: [
        "############################################",
        "#                                          #",
        "#         #      D              #     #    #",
        "#  #   # # # #   ##E ###  # #  # #    #    #",
        "#  # # # ##  #   #   # # # # # ##     #    #",
        "#  # # # #   #   #   # # # # # #           #",
        "#   # #  ### ### ### ### #   # ###    #    #",
        "#                                          #",
        "############################################"
    ],
    text: [
        ["17 1", "Press 'd' to begin!"]
    ]
}

var level_1 = {
    level: [
        "############",
        "#         ##",
        "# D       ##",
        "########E###",
        "############",
    ],
    functional_cells: {
        "grid-id_3_3": [
            "4_3",
            "5_3"
        ]
    },
    functional_cells_sides: {
        "grid-id_3_3": [
            "up"
        ]
    },
    correct_sides: {
        "grid-id_7_3": [
            1
        ]
    },
    text: [
        ["5 1", "Use 'a' and 'd' to move around. You need to get to the red block."]
    ]
};

var level_2 = {
    level: [
        "############",
        "#         ##",
        "# D       ##",
        "##### ##E###",
        "############",
    ],
    text: [
        ["3 1", "You can't go around one-block gaps, but there IS a way to the end."]
    ]
};

var level_3 = {
    level: [
        "#####",
        "#   #",
        "#D  #",
        "##  #",
        "##E##",
    ],
    text: [
        ["1 1", "You are able to finish here in two ways."]
    ]
};

var level_4 = {
    level: [
        "############",
        "#          #",
        "#          #",
        "#D    #    #",
        "#  B# ##E  #",
        "############"
    ],
    functional_cells: {
        "grid-id_3_4": [
            "5_4"
        ]
    },
    functional_cells_sides: {
        "grid-id_3_4": [
            "up"
        ]
    },
    text: [
        ["1 1", "This level will introduce the concept of buttons. They work if you touch them from the specific side."],
        ["3 2", "They create one or several platforms that disappear after 2 seconds."]
    ]
};

var level_5 = {
    level: [
        "############",
        "#          #",
        "#          #",
        "#D         #",
        "#          #",
        "####B  #####",
        "#          #",
        "#          #",
        "#          #",
        "#          #",
        "########E###"
    ],
    functional_cells: {
        "grid-id_4_5": [
            "5_5",
            "6_5"
        ]
    },
    functional_cells_sides: {
        "grid-id_4_5": [
            "up"
        ]
    },
    text: [
        ["1 1", ""]
    ]
};

var level_6 = {
    level: [
        "#####################",
        "#D      # # #       #",
        "#                   #",
        "#                   #",
        "###B  B  B  B  ######",
        "#           #      E#",
        "#       # # #       #",
        "#####################"
    ],
    functional_cells: {
        "grid-id_3_4": [
            "4_4",
            "5_4"
        ],
        "grid-id_6_4": [
            "7_4",
            "8_4"
        ],
        "grid-id_9_4": [
            "10_4",
            "11_4"
        ],
        "grid-id_12_4": [
            "13_4",
            "14_4"
        ]
    },
    functional_cells_sides: {
        "grid-id_3_4": [
            "up"
        ],
        "grid-id_6_4": [
            "up"
        ],
        "grid-id_9_4": [
            "up"
        ],
        "grid-id_12_4": [
            "up"
        ]
    },
    text: [
        ["6 3", "Yes, this level IS completable."]
    ]
};

var level_7 = {
    level: [
        "##############################################",
        "#                                            #",
        "#  ### # # ##  #  # # #    # #          #    #",
        "#   #  ### # # ## # ##     # #        #  #   #",
        "#   #  # # ### # ## # #    # #    #      #   #",
        "#   #  # # # # #  # # #     ##    D   #  #   #",
        "#                                            #",
        "##############################################"
    ],
    text: [
        ["33 3", "FOR PLAYING"]
    ]
}


var levels = [level_0, level_1, level_2, level_3, level_4, level_5, level_6, level_7];
var current_level = 0;
var can_level_be_completed_now = true;
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

/* This dice is the main character of the game */
var main_dice = {
    style: document.getElementById("main_dice").style,
    el: document.getElementById("main_dice"),
    is_animated: false,
    main_sides: [1, 3, 6, 4],
    extra_sides: [5, 2],
    pos: [0, 0] // this is dice's position in the grid
};
var gridSizeX, gridSizeY, cell_size, body_width, body_height, xoffset, yoffset, grid;



function levelSetup(cur_level){
    /* Our grid's size */
    gridSizeX = cur_level.level[0].length;
    gridSizeY = cur_level.level.length;

    /* We save cell size in the variable and update it in the css */
    cell_and_body_size = determineCellSize(gridSizeX, gridSizeY);
    cell_size = cell_and_body_size[0];
    body_width = cell_and_body_size[1];
    body_height = cell_and_body_size[2];
    document.documentElement.style.setProperty('--cell-size', String(cell_size) + "px");
    document.documentElement.style.setProperty('--point-size', String(cell_size/5) + "px");

    xoffset = (body_width - cell_size*gridSizeX)/2;
    yoffset = (body_height - cell_size*gridSizeY)/2;

    /* We create a 2d array that will contain every possible cell position */
    grid = create2DArray(gridSizeX, gridSizeY);
    for (var xi = 0; xi < grid.length; xi++){
        for (var yi = 0; yi < grid[xi].length; yi++){
            grid[xi][yi] = [xoffset + xi*cell_size, yoffset + yi*cell_size, ' '];
        }
    }
    for(var i = 0; i < cur_level.text.length; i++){
        var div = document.createElement("div");
        var text_pos = cur_level.text[i][0].split(" ");
        setCellPosition(div, Number(text_pos[0]), Number(text_pos[1]));
        div.innerHTML = cur_level.text[i][1];
        div.classList.add("text_blob");
        document.body.appendChild(div);
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key == 'd' && !main_dice.is_animated){
        main_dice.is_animated = true;
        var success = moveDiceRight(main_dice);
        if(!success){
            main_dice.is_animated = false;
        }
    }
    if (event.key == 'a' && !main_dice.is_animated){
        main_dice.is_animated = true;
        var success = moveDiceLeft(main_dice);
        if(!success){
            main_dice.is_animated = false;
        }
    }
    if (event.key == 'e' && !main_dice.is_animated){
        swapExtraSides(main_dice);
        showCorrectSide(main_dice);
    }
});

const buttonTouchedEvent = new Event('buttonTouched');
main_dice.el.addEventListener('animationend', (event) => {
    if(event.animationName == "moveRight" || event.animationName == "moveLeft" || event.animationName == "moveRightAndDown" || event.animationName == "moveLeftAndDown") {
        setCellPosition(main_dice, main_dice.pos[0], main_dice.pos[1]);
        resetDiceAnimation(main_dice);
        main_dice.is_animated = false;
        if(event.animationName == "moveRight"){
            rotateClockwise(main_dice);
        }
        if(event.animationName == "moveRightAndDown"){
            rotateClockwise(main_dice);
            rotateClockwise(main_dice);
        }
        if(event.animationName == "moveLeft"){
            rotateCounterclockwise(main_dice);
        }
        if(event.animationName == "moveLeftAndDown"){
            rotateCounterclockwise(main_dice);
            rotateCounterclockwise(main_dice);
        }
        showCorrectSide(main_dice);
        var audio = new Audio('./dice_slower.mp3');
        audio.play();
    }

    if(touchesCell(main_dice, 'E').length != 0){
        nextLevel();
    }
    if(touchesCellFromSide(main_dice, 'B').length != 0){
        var touched_cells = touchesCellFromSide(main_dice, 'B');
        for(var i = 0; i < touched_cells.length; i++){
            touched_cells[i].dispatchEvent(buttonTouchedEvent);
        }
    }
});

// main_dice.el.addEventListener('mouseover', (event) => {
//     var bottom = document.getElementById('bottom');
//     var left = document.getElementById('left');
//     var top = document.getElementById('top');
//     var right = document.getElementById('right');

//     bottom.style.display = 'block';
//     left.style.display = 'block';
//     top.style.display = 'block';
//     right.style.display = 'block';
// });

// main_dice.el.addEventListener('mouseout', (event) => {
//     var bottom = document.getElementById('bottom');
//     var left = document.getElementById('left');
//     var top = document.getElementById('top');
//     var right = document.getElementById('right');

//     bottom.style.display = 'none';
//     left.style.display = 'none';
//     top.style.display = 'none';
//     right.style.display = 'none';
// });

levelSetup(levels[current_level]);
loadLevel(levels[current_level].level);

////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////// 

async function nextLevel(){
    if(!can_level_be_completed_now){
        await sleep(2000);
        nextLevel();
    }
    else{
        var audio = new Audio('./moving_sound.mp3');
        audio.play();
        removeElementsByClass('text_blob');
        removeElementsByClass('basic_cell');
        removeElementsByClass('end_cell');
        removeElementsByClass('button_cell');
        current_level++;
        levelSetup(levels[current_level]);
        loadLevel(levels[current_level].level);
    }
}

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

/* This function decides which cell size to use from grid's size */
function determineCellSize(gridSizeX, gridSizeY) {
    /* Here we get body's width and height */
    var body_width_str = getComputedStyle(document.body).width;
    var body_width = body_width_str.substring(0, body_width_str.length-2);
    var body_height_str = getComputedStyle(document.body).height;
    var body_height = body_height_str.substring(0, body_height_str.length-2);

    /* 
    Here we return the minimum of two possible cell sizes.
    We choose the smaller one because otherwise grid won't fit
    the screen. 
    */
    return [Math.min(body_width/gridSizeX, body_height/gridSizeY), body_width, body_height];
}


/* This function creates a 2d array using given size */
function create2DArray(x, y) {
    var arr = new Array(x);

    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(y);
    }

    return arr;
}

/* This function sets dice's position using given position from the grid */
function setCellPosition (dice, xi, yi) {
    dice.style.left = String(grid[xi][yi][0]) + "px";
    dice.style.top = String(grid[xi][yi][1]) + "px";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resetDiceAnimation(dice) {
    dice.el.style.animation = 'none';
    dice.el.offsetHeight;
    dice.el.style.animation = null;
    dice.style.transformOrigin = "50% 50%";
}

function moveDiceRight(dice) {
    var dx = dice.pos[0];
    var dy = dice.pos[1];
    if(grid[dx][dy+1][2] != ' ') {
        if(grid[dx+1][dy+1][2] == ' '){
            // Possibility 1:
            // |?? |
            // |D??|
            // |# ?|
            if(grid[dx][dy-1][2] != ' ' ||
            grid[dx+1][dy-1][2] != ' ' ||
            grid[dx+1][dy][2] != ' ' ||
            grid[dx+2][dy][2] != ' ' ||
            grid[dx+2][dy+1][2] != ' '){
                // we can't move right the 1-st way
            }
            else {
                dice.style.transformOrigin = "98% 98%";
                dice.style.animation = "moveRightAndDown 1s ease-in-out";
                grid[dx][dy][2] = ' ';
                grid[dx+1][dy+1][2] = 'D';
                dice.pos = [dx+1, dy+1];
                return true;
            }
        }
        else {
            // Possibility 2:
            // |?? |
            // |D? |
            // |## |
            if(grid[dx][dy-1][2] != ' ' ||
            grid[dx+1][dy-1][2] != ' ' ||
            grid[dx+1][dy][2] != ' '){
                // we can't move right the 2-nd way
            }
            else {
                dice.style.transformOrigin = "98% 98%";
                dice.style.animation = "moveRight 0.5s ease-in-out";
                grid[dx][dy][2] = ' ';
                grid[dx+1][dy][2] = 'D';
                dice.pos = [dx+1, dy];
                return true;
            }
        }
    }
    if(grid[dx][dy-1][2] != ' ') {
        if(grid[dx-1][dy-1][2] == ' '){
            // Possibility 3:
            // |? #|
            // |??D|
            // | ??|
            if(grid[dx][dy+1][2] != ' ' ||
            grid[dx-1][dy+1][2] != ' ' ||
            grid[dx-1][dy][2] != ' ' ||
            grid[dx-2][dy][2] != ' ' ||
            grid[dx-2][dy-1][2] != ' '){
                // we can't move right the 3-rd way
            }
            else {
                dice.style.transformOrigin = "2% 2%";
                dice.style.animation = "moveRightAndDown 1s ease-in-out";
                grid[dx][dy][2] = ' ';
                grid[dx-1][dy-1][2] = 'D';
                dice.pos = [dx-1, dy-1];
                return true;
            }
        }
        else {
            // Possibility 4:
            // | ##|
            // | ?D|
            // | ??|
            if(grid[dx][dy+1][2] != ' ' ||
            grid[dx-1][dy+1][2] != ' ' ||
            grid[dx-1][dy][2] != ' '){
                // we can't move right the 4-th way
            }
            else {
                dice.style.transformOrigin = "2% 2%";
                dice.style.animation = "moveRight 0.5s ease-in-out";
                grid[dx][dy][2] = ' ';
                grid[dx-1][dy][2] = 'D';
                dice.pos = [dx-1, dy];
                return true;
            }
        }
    }
    if(grid[dx+1][dy][2] != ' ') {
        if(grid[dx+1][dy-1][2] == ' '){
            // Possibility 5:
            // | ??|
            // |?? |
            // |?D#|
            if(grid[dx-1][dy][2] != ' ' ||
            grid[dx-1][dy-1][2] != ' ' ||
            grid[dx][dy-1][2] != ' ' ||
            grid[dx][dy-2][2] != ' ' ||
            grid[dx+1][dy-2][2] != ' '){
                // we can't move right the 5-th way
            }
            else {
                dice.style.transformOrigin = "98% 2%";
                dice.style.animation = "moveRightAndDown 1s ease-in-out";
                grid[dx][dy][2] = ' ';
                grid[dx+1][dy-1][2] = 'D';
                dice.pos = [dx+1, dy-1];
                return true;
            }
        }
        else {
            // Possibility 6:
            // |   |
            // |??#|
            // |?D#|
            if(grid[dx-1][dy][2] != ' ' ||
            grid[dx-1][dy-1][2] != ' ' ||
            grid[dx][dy-1][2] != ' '){
                // we can't move right the 6-th way
            }
            else {
                dice.style.transformOrigin = "98% 2%";
                dice.style.animation = "moveRight 0.5s ease-in-out";
                grid[dx][dy][2] = ' ';
                grid[dx][dy-1][2] = 'D';
                dice.pos = [dx, dy-1];
                return true;
            }
        }
    }
    if(grid[dx-1][dy][2] != ' ') {
        if(grid[dx-1][dy+1][2] == ' '){
            // Possibility 7:
            // |#D?|
            // | ??|
            // |?? |
            if(grid[dx+1][dy][2] != ' ' ||
            grid[dx+1][dy+1][2] != ' ' ||
            grid[dx][dy+1][2] != ' ' ||
            grid[dx][dy+2][2] != ' ' ||
            grid[dx-1][dy+2][2] != ' '){
                // we can't move right the 7-th way
            }
            else {
                dice.style.transformOrigin = "2% 98%";
                dice.style.animation = "moveRightAndDown 1s ease-in-out";
                grid[dx][dy][2] = ' ';
                grid[dx-1][dy+1][2] = 'D';
                dice.pos = [dx-1, dy+1];
                return true;
            }
        }
        else {
            // Possibility 8:
            // |#D?|
            // |#??|
            // |   |
            if(grid[dx+1][dy][2] != ' ' ||
            grid[dx+1][dy+1][2] != ' ' ||
            grid[dx][dy+1][2] != ' '){
                // we can't move right the 8-th way
            }
            else {
                dice.style.transformOrigin = "2% 98%";
                dice.style.animation = "moveRight 0.5s ease-in-out";
                grid[dx][dy][2] = ' ';
                grid[dx][dy+1][2] = 'D';
                dice.pos = [dx, dy+1];
                return true;
            }
        }
    }
    return false;
}

function moveDiceLeft(dice) {
    var dx = dice.pos[0];
    var dy = dice.pos[1];
    if(grid[dx][dy-1][2] != ' ') {
        if(grid[dx+1][dy-1][2] == ' '){
            // Possibility 1:
            // |# ?|
            // |D??|
            // |?? |
            if(grid[dx][dy+1][2] != ' ' ||
            grid[dx+1][dy+1][2] != ' ' ||
            grid[dx+1][dy][2] != ' ' ||
            grid[dx+2][dy][2] != ' ' ||
            grid[dx+2][dy-1][2] != ' '){
                // we can't move left the 1-st way
            }
            else {
                dice.style.transformOrigin = "98% 2%";
                dice.style.animation = "moveLeftAndDown 1s ease-in-out";
                grid[dx][dy][2] = ' ';
                grid[dx+1][dy-1][2] = 'D';
                dice.pos = [dx+1, dy-1];
                return true;
            }
        }
        else {
            // Possibility 2:
            // |## |
            // |D? |
            // |?? |
            if(grid[dx][dy+1][2] != ' ' ||
            grid[dx+1][dy+1][2] != ' ' ||
            grid[dx+1][dy][2] != ' '){
                // we can't move left the 2-nd way
            }
            else {
                dice.style.transformOrigin = "98% 2%";
                dice.style.animation = "moveLeft 0.5s ease-in-out";
                grid[dx][dy][2] = ' ';
                grid[dx+1][dy][2] = 'D';
                dice.pos = [dx+1, dy];
                return true;
            }
        }
    }
    if(grid[dx][dy+1][2] != ' ') {
        if(grid[dx-1][dy+1][2] == ' '){
            // Possibility 3:
            // | ??|
            // |??D|
            // |? #|
            if(grid[dx][dy-1][2] != ' ' ||
            grid[dx-1][dy-1][2] != ' ' ||
            grid[dx-1][dy][2] != ' ' ||
            grid[dx-2][dy][2] != ' ' ||
            grid[dx-2][dy+1][2] != ' '){
                // we can't move left the 3-rd way
            }
            else {
                dice.style.transformOrigin = "2% 98%";
                dice.style.animation = "moveLeftAndDown 1s ease-in-out";
                grid[dx][dy][2] = ' ';
                grid[dx-1][dy+1][2] = 'D';
                dice.pos = [dx-1, dy+1];
                return true;
            }
        }
        else {
            // Possibility 4:
            // | ??|
            // | ?D|
            // | ##|
            if(grid[dx][dy-1][2] != ' ' ||
            grid[dx-1][dy-1][2] != ' ' ||
            grid[dx-1][dy][2] != ' '){
                // we can't move left the 4-th way
            }
            else {
                dice.style.transformOrigin = "2% 98%";
                dice.style.animation = "moveLeft 0.5s ease-in-out";
                grid[dx][dy][2] = ' ';
                grid[dx-1][dy][2] = 'D';
                dice.pos = [dx-1, dy];
                return true;
            }
        }
    }
    if(grid[dx-1][dy][2] != ' ') {
        if(grid[dx-1][dy-1][2] == ' '){
            // Possibility 5:
            // |?? |
            // | ??|
            // |#D?|
            if(grid[dx+1][dy][2] != ' ' ||
            grid[dx+1][dy-1][2] != ' ' ||
            grid[dx][dy-1][2] != ' ' ||
            grid[dx][dy-2][2] != ' ' ||
            grid[dx-1][dy-2][2] != ' '){
                // we can't move left the 5-th way
            }
            else {
                dice.style.transformOrigin = "2% 2%";
                dice.style.animation = "moveLeftAndDown 1s ease-in-out";
                grid[dx][dy][2] = ' ';
                grid[dx-1][dy-1][2] = 'D';
                dice.pos = [dx-1, dy-1];
                return true;
            }
        }
        else {
            // Possibility 6:
            // |   |
            // |#??|
            // |#D?|
            if(grid[dx+1][dy][2] != ' ' ||
            grid[dx+1][dy-1][2] != ' ' ||
            grid[dx][dy-1][2] != ' '){
                // we can't move left the 6-th way
            }
            else {
                dice.style.transformOrigin = "2% 2%";
                dice.style.animation = "moveLeft 0.5s ease-in-out";
                grid[dx][dy][2] = ' ';
                grid[dx][dy-1][2] = 'D';
                dice.pos = [dx, dy-1];
                return true;
            }
        }
    }
    if(grid[dx+1][dy][2] != ' ') {
        if(grid[dx+1][dy+1][2] == ' '){
            // Possibility 7:
            // |?D#|
            // |?? |
            // | ??|
            if(grid[dx-1][dy][2] != ' ' ||
            grid[dx-1][dy+1][2] != ' ' ||
            grid[dx][dy+1][2] != ' ' ||
            grid[dx][dy+2][2] != ' ' ||
            grid[dx+1][dy+2][2] != ' '){
                // we can't move left the 7-th way
            }
            else {
                dice.style.transformOrigin = "98% 98%";
                dice.style.animation = "moveLeftAndDown 1s ease-in-out";
                grid[dx][dy][2] = ' ';
                grid[dx+1][dy+1][2] = 'D';
                dice.pos = [dx+1, dy+1];
                return true;
            }
        }
        else {
            // Possibility 8:
            // |?D#|
            // |??#|
            // |   |
            if(grid[dx-1][dy][2] != ' ' ||
            grid[dx-1][dy+1][2] != ' ' ||
            grid[dx][dy+1][2] != ' '){
                // we can't move left the 8-th way
            }
            else {
                dice.style.transformOrigin = "98% 98%";
                dice.style.animation = "moveLeft 0.5s ease-in-out";
                grid[dx][dy][2] = ' ';
                grid[dx][dy+1][2] = 'D';
                dice.pos = [dx, dy+1];
                return true;
            }
        }
    }
    return false;
}

function rotateClockwise(dice){ // right
    dice.main_sides.push(dice.main_sides.shift());

    var bottom = document.getElementById('bottom');
    var left = document.getElementById('left');
    var top = document.getElementById('top');
    var right = document.getElementById('right');

    bottom.innerHTML = String(main_dice.main_sides[0]);
    left.innerHTML = String(main_dice.main_sides[1]);
    top.innerHTML = String(main_dice.main_sides[2]);
    right.innerHTML = String(main_dice.main_sides[3]);
}

function rotateCounterclockwise(dice){ // left
    dice.main_sides.unshift(dice.main_sides.pop());

    var bottom = document.getElementById('bottom');
    var left = document.getElementById('left');
    var top = document.getElementById('top');
    var right = document.getElementById('right');

    bottom.innerHTML = String(main_dice.main_sides[0]);
    left.innerHTML = String(main_dice.main_sides[1]);
    top.innerHTML = String(main_dice.main_sides[2]);
    right.innerHTML = String(main_dice.main_sides[3]);
}

function swapExtraSides(dice) {
    var a = dice.extra_sides[0];
    dice.extra_sides[0] = dice.extra_sides[1];
    dice.extra_sides[1] = a;
}

function showCorrectSide(dice) {
    if(dice.extra_sides[0] == 5){
        document.getElementById('points_for_two_first').style.visibility = 'visible';
        document.getElementById('points_for_two_second').style.visibility = 'visible';
        document.getElementById('central_point').style.visibility = 'visible';
    }
    else{
        document.getElementById('central_point').style.visibility = 'hidden';
        if(dice.main_sides[0] == 1){
            document.getElementById('points_for_two_first').style.visibility = 'visible';
            document.getElementById('points_for_two_second').style.visibility = 'hidden';
        }
        if(dice.main_sides[0] == 6){
            document.getElementById('points_for_two_first').style.visibility = 'visible';
            document.getElementById('points_for_two_second').style.visibility = 'hidden';
        }

        if (dice.main_sides[0] == 3) {
            document.getElementById('points_for_two_first').style.visibility = 'hidden';
            document.getElementById('points_for_two_second').style.visibility = 'visible';
        }
        if (dice.main_sides[0] == 4) {
            document.getElementById('points_for_two_first').style.visibility = 'hidden';
            document.getElementById('points_for_two_second').style.visibility = 'visible';
        }
    }
}

function touchesCell(dice, cell_symbol) {
    var x = dice.pos[0];
    var y = dice.pos[1];
    var touched_cells = new Array();
    if(grid[x-1][y][2] == cell_symbol) {
        var touched_el = document.getElementById("grid-id_" + String(x-1) + "_" + String(y));
        touched_cells.push(touched_el);
    }
    if(grid[x+1][y][2] == cell_symbol) {
        var touched_el = document.getElementById("grid-id_" + String(x+1) + "_" + String(y));
        touched_cells.push(touched_el);
    }
    if(grid[x][y-1][2] == cell_symbol) {
        var touched_el = document.getElementById("grid-id_" + String(x) + "_" + String(y-1));
        touched_cells.push(touched_el);
    }
    if(grid[x][y+1][2] == cell_symbol){
        var touched_el = document.getElementById("grid-id_" + String(x) + "_" + String(y+1));
        touched_cells.push(touched_el);
    }
    return touched_cells;
}

function touchesCellFromSide(dice, cell_symbol) {
    var x = dice.pos[0];
    var y = dice.pos[1];
    var touched_cells = new Array();
    if(grid[x-1][y][2] == cell_symbol) {
        var id = "grid-id_" + String(x-1) + "_" + String(y);
        var side = levels[current_level].functional_cells_sides[id];

        if(side == "left"){
            var touched_el = document.getElementById(id);
            touched_cells.push(touched_el);
        }
    }
    if(grid[x+1][y][2] == cell_symbol) {
        var id = "grid-id_" + String(x+1) + "_" + String(y);
        var side = levels[current_level].functional_cells_sides[id];

        if(side == "right"){
            var touched_el = document.getElementById(id);
            touched_cells.push(touched_el);
        }
    }
    if(grid[x][y-1][2] == cell_symbol) {
        var id = "grid-id_" + String(x) + "_" + String(y-1);
        var side = levels[current_level].functional_cells_sides[id];

        if(side == "down"){
            var touched_el = document.getElementById(id);
            touched_cells.push(touched_el);
        }
    }
    if(grid[x][y+1][2] == cell_symbol){
        var id = "grid-id_" + String(x) + "_" + String(y+1);
        var side = levels[current_level].functional_cells_sides[id];
        if(side == "up"){
            var touched_el = document.getElementById(id);
            touched_cells.push(touched_el);
        }
    }
    return touched_cells;
}

function loadLevel(level) {
    for(var i = 0; i < level.length; i++){
        for(var j = 0; j < level[0].length; j++){
            grid[j][i][2] = level[i][j];
            if(level[i][j] === ' ' || level[i][j] === 'D'){
                if(level[i][j] === ' ') continue;
                else {
                    main_dice.pos = [j, i];
                    setCellPosition(main_dice, j, i);
                }
            }
            else {
                var div = document.createElement("div");
                if(level[i][j] === '#'){
                    div.classList.add("basic_cell");
                    setCellPosition(div, j, i);
                }
                if(level[i][j] === 'B'){
                    div.classList.add("button_cell");
                    div.addEventListener('buttonTouched', (e) => {
                        var affected_cells = levels[current_level].functional_cells[e.target.id];
                        console.log(affected_cells);
                        for (var k = 0; k < affected_cells.length; k++){
                            var temp_div = document.createElement("div");
                            temp_div.setAttribute('id', "temp_cell-id_" + String(k));
                            temp_div.classList.add("temp_cell");
                            setCellPosition(temp_div, Number(affected_cells[k].split('_')[0]), Number(affected_cells[k].split('_')[1]));
                            grid[Number(affected_cells[k].split('_')[0])][Number(affected_cells[k].split('_')[1])][2] = 'T';
                            document.body.appendChild(temp_div);
                            can_level_be_completed_now = false;
                        }
                        position_before_interaction = main_dice.pos;
                        setTimeout(function clearTempCells() {
                            if(touchesCell(main_dice, 'T').length != 0){
                                grid[main_dice.pos[0]][main_dice.pos[1]][2] = ' ';
                                main_dice.pos = position_before_interaction;
                                grid[main_dice.pos[0]][main_dice.pos[1]][2] = 'D';
                                setCellPosition(main_dice, main_dice.pos[0], main_dice.pos[1]);
                            }
                            for (var k = 0; k < affected_cells.length; k++){
                                grid[Number(affected_cells[k].split('_')[0])][Number(affected_cells[k].split('_')[1])][2] = ' ';
                                document.getElementById("temp_cell-id_" + String(k)).remove();
                            }
                            can_level_be_completed_now = true;
                        }, 2000)
                    });
                    setCellPosition(div, j, i);
                }
                if(level[i][j] === 'E'){
                    div.classList.add("end_cell");
                    setCellPosition(div, j, i);
                }
                div.setAttribute('id', "grid-id_" + String(j) + "_" + String(i));
                document.body.appendChild(div);
            }
        }
    }
}