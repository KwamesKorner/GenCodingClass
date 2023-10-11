const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
let params = new URLSearchParams(document.location.search);

let level = params.get("level")
const levelValues = {
    "1": {
        gridHeight: 2,
        gridWidth: 3,
        flurbCellX: 1,
        flurbCellY: 1,
        fruitCellX: 1,
        fruitCellY: 0,
        flurbPosition: {x: 1, y: 1},
        lavaPos: [],
        alertMessage: "Use the blocks on the right to direct the Flurb to the Fruit"
    },
    "2": {
        gridHeight: 2,
        gridWidth: 3,
        flurbCellX: 2,
        flurbCellY: 0,
        fruitCellX: 2,
        fruitCellY: 1,
        flurbPosition: {x: 2, y: 0},
        lavaPos: [],
        alertMessage: ""
    },
    "3": {
        gridHeight: 2,
        gridWidth: 3,
        flurbCellX: 0,
        flurbCellY: 0,
        fruitCellX: 1,
        fruitCellY: 1,
        flurbPosition: {x: 0, y: 0},
        lavaPos: [],
        alertMessage: "Now you're gonna need more than one block to direct the flurb to the fruit"
    },
    "4": {
        gridHeight: 2,
        gridWidth: 3,
        flurbCellX: 2,
        flurbCellY: 0,
        fruitCellX: 0,
        fruitCellY: 0,
        flurbPosition: {x: 2, y: 0},
        lavaPos: [],
        alertMessage: ""
    },
    "5": {
        gridHeight: 2,
        gridWidth: 3,
        flurbCellX: 0,
        flurbCellY: 0,
        fruitCellX: 2,
        fruitCellY: 1,
        flurbPosition: {x: 0, y: 0},
        lavaPos: [],
        alertMessage: ""
    },
    "6": {
        gridHeight: 2,
        gridWidth: 3,
        flurbCellX: 2,
        flurbCellY: 1,
        fruitCellX: 0,
        fruitCellY: 0,
        flurbPosition: {x: 2, y: 1},
        lavaPos: [],
        alertMessage: ""
    },
    "7": {
        gridHeight: 3,
        gridWidth: 5,
        flurbCellX: 1,
        flurbCellY: 1,
        fruitCellX: 4,
        fruitCellY: 1,
        flurbPosition: {x: 1, y: 1},
        lavaPos: [],
        alertMessage: "Now, use the Repeat Block on the left when coding your directions",
        loopValidation: true
    },
    "8": {
        gridHeight: 3,
        gridWidth: 5,
        flurbCellX: 0,
        flurbCellY: 0,
        fruitCellX: 3,
        fruitCellY: 1,
        flurbPosition: {x: 0, y: 0},
        lavaPos: [],
        alertMessage: "",
        loopValidation: true
    },
    "9": {
        gridHeight: 3,
        gridWidth: 5,
        flurbCellX: 0,
        flurbCellY: 1,
        fruitCellX: 4,
        fruitCellY: 0,
        flurbPosition: {x: 0, y: 1},
        lavaPos: [],
        alertMessage: "",
        loopValidation: true
    },
    "10": {
        gridHeight: 3,
        gridWidth: 5,
        flurbCellX: 0,
        flurbCellY: 0,
        fruitCellX: 4,
        fruitCellY: 0,
        flurbPosition: {x: 0, y: 0},
        lavaPos: [[1,0,"|"], [2,0,"|"], [3,0,"|"], [1,1,"|"], [2,1,"|"], [3,1,"|"]],
        alertMessage: "",
        loopValidation: true
    },
    "11": {
        gridHeight: 3,
        gridWidth: 5,
        flurbCellX: 0,
        flurbCellY: 2,
        fruitCellX: 4,
        fruitCellY: 0,
        flurbPosition: {x: 0, y: 2},
        lavaPos: [[0,0,"|"], [1,0, "|"], [2,0, "|"], [0,1,"|"], [3,2,"|"], [4,2,"|"]],
        alertMessage: "",
        loopValidation: true
    },
    "12": {
        gridHeight: 3,
        gridWidth: 5,
        flurbCellX: 4,
        flurbCellY: 0,
        fruitCellX: 0,
        fruitCellY: 2,
        flurbPosition: {x: 4, y: 0},
        lavaPos: [[0,0,"|"], [1,0,"|"], [2,0,"|"], [3,0,"|"], [0,1,"|"], [1,1,"|"], [3,2,"|"], [4,2,"|"]],
        alertMessage: "",
        loopValidation: true
    },
    "13": {
      "gridHeight": 5,
      "gridWidth": 5,
      "flurbCellX": 0,
      "flurbCellY": 0,
      "fruitCellX": 4,
      "fruitCellY": 4,
      "flurbPosition": { "x": 0, "y": 0 },
      "lavaPos": [[0, 2, "|"], [1, 2, "|"], [2, 0, "|"], [3, 2, "|"], [4, 2, "|"]],
      "alertMessage": "Find the one true path to the Fruit!",
      "loopValidation": true
    },
    "14": {
      "gridHeight": 5,
      "gridWidth": 5,
      "flurbCellX": 0,
      "flurbCellY": 0,
      "fruitCellX": 4,
      "fruitCellY": 1,
      "flurbPosition": { "x": 0, "y": 0 },
      "lavaPos": [[0, 1, "|"], [0, 2, "|"], [1, 3, "|"], [2, 0, "|"], [2, 1, "|"], [3, 2, "|"], [3, 3, "|"], [4, 0, "|"]],
      "alertMessage": "Navigate through the labyrinth to reach the Fruit!",
      "loopValidation": true
    },
    "15": {
      "gridHeight": 5,
      "gridWidth": 5,
      "flurbCellX": 4,
      "flurbCellY": 0,
      "fruitCellX": 0,
      "fruitCellY": 4,
      "flurbPosition": { "x": 4, "y": 0 },
      "lavaPos": [[0, 2, "|"], [1, 0, "|"], [2, 2, "|"], [2, 3, "|"], [3, 0, "|"], [4, 2, "|"]],
      "alertMessage": "Navigate through the lava maze to reach the Fruit!",
      "loopValidation": true
    },
    "16": {
      "gridHeight": 5,
      "gridWidth": 5,
      "flurbCellX": 0,
      "flurbCellY": 2,
      "fruitCellX": 4,
      "fruitCellY": 4,
      "flurbPosition": { "x": 0, "y": 2 },
      "lavaPos": [[0, 3, "|"], [0, 4, "|"], [1, 0, "|"], [1, 2, "|"], [2, 2, "|"], [3, 0, "|"], [3, 3, "|"], [4, 1, "|"]],
      "alertMessage": "Wind your way through to the Fruit!",
      "loopValidation": true
    },
    "17": {
      "gridHeight": 5,
      "gridWidth": 5,
      "flurbCellX": 0,
      "flurbCellY": 2,
      "fruitCellX": 4,
      "fruitCellY": 1,
      "flurbPosition": { "x": 0, "y": 2 },
      "lavaPos": [[1, 0, "|"], [2, 0, "|"], [0, 1, "|"], [4, 0, "|"], [2, 2, "|"], [3, 2, "|"], [0, 3, "|"], [1, 4, "|"], [4, 4, "|"]],
      "alertMessage": "Zigzag to success!",
      "loopValidation": true
    },
    "18": {
      "gridHeight": 5,
      "gridWidth": 5,
      "flurbCellX": 4,
      "flurbCellY": 0,
      "fruitCellX": 0,
      "fruitCellY": 4,
      "flurbPosition": { "x": 4, "y": 0 },
      "lavaPos": [[0, 0, "|"], [2, 0, "|"], [3, 0, "|"], [4, 4, "|"], [2, 2, "|"], [3, 2, "|"], [0, 3, "|"], [3, 3, "|"], [4, 3, "|"], [2, 4, "|"]],
      "alertMessage": "There's more than meets the eye.",
      "loopValidation": true
    },
  
}

var msg = levelValues[level]["alertMessage"]
if(msg){
    alert(msg)
}

const gridHeight = levelValues[level]["gridHeight"]
const gridWidth = levelValues[level]["gridWidth"]
const flurbCellX = levelValues[level]["flurbCellX"]
const flurbCellY = levelValues[level]["flurbCellY"]
const fruitCellX = levelValues[level]["fruitCellX"]
const fruitCellY = levelValues[level]["fruitCellY"]
const lavaPos = levelValues[level]["lavaPos"]
var flurbPosition = levelValues[level]["flurbPosition"]
const loopValidation = levelValues[level]["loopValidation"]

Blockly.defineBlocksWithJsonArray([
    {
        "type": "move_forward",
        "message0": "move_forward",
        "previousStatement": null,
        "nextStatement": null
        },
    {
        "type": "turn_right",
        "message0": "turn right",
        "previousStatement": null,
        "nextStatement": null
    },
    {
        "type": "turn_left",
        "message0": "turn left",
        "previousStatement": null,
        "nextStatement": null
    },
    {
        "type": "move_up",
        "message0": "move up",
        "previousStatement": null,
        "nextStatement": null
        },
    {
        "type": "move_down",
        "message0": "move down",
        "previousStatement": null,
        "nextStatement": null
    },
    {
        "type": "move_left",
        "message0": "move left",
        "previousStatement": null,
        "nextStatement": null
    },
    {
        "type": "move_right",
        "message0": "move right",
        "previousStatement": null,
        "nextStatement": null
    }
]);

Blockly.JavaScript['move_forward'] = function(block) {
    return 'moveForward(); await sleep(500);\n';
};

Blockly.JavaScript['turn_right'] = function(block) {
    return 'turnRight(); await sleep(250);\n';
};

Blockly.JavaScript['turn_left'] = function(block) {
    return 'turnLeft(); await sleep(250);\n';
};

Blockly.JavaScript['move_up'] = function(block) {
    return 'moveUp(); await sleep(250);\n';
};

Blockly.JavaScript['move_down'] = function(block) {
    return 'moveDown(); await sleep(250);\n';
};

Blockly.JavaScript['move_left'] = function(block) {
    return 'moveLeft(); await sleep(250);\n';
};

Blockly.JavaScript['move_right'] = function(block) {
    return 'moveRight(); await sleep(250);\n';
};

var alerts = new Set()
var gameArea = document.getElementById('game-area');
var flurbCell;  // This will store the table cell that the flurb is in
console.log(lavaPos.toString())
for (var y = 0; y < gridHeight; y++) {
  var row = document.createElement('tr');
  for (var x = 0; x < gridWidth; x++) {
    var cell = document.createElement('td');
    if (x === flurbCellX && y === flurbCellY) {
      // This is the starting cell, so create the flurb here
      flurbCell = cell;
      var flurb = document.createElement('img');
      flurb.src = 'img/alien.png';
      flurb.id = 'flurb';
      cell.appendChild(flurb);
    }
    if (x === fruitCellX && y === fruitCellY) {
        // This is the starting cell, so create the flurb here
        var apple = document.createElement('img');
        apple.src = 'img/apple.png';
        apple.id = 'apple';
        cell.appendChild(apple);
      }
    if (lavaPos.toString().indexOf([x,y].toString()) != -1) {
        cell.style = "background-color: orangered;"
    }
    row.appendChild(cell);
  }
  gameArea.appendChild(row);
}

// var flurbPosition = {x: 0, y: 0}; // Start at the top-left corner
// var flurbDirection = 0; // Start facing right
// var directions = [{x: 1, y: 0}, {x: 0, y: 1}, {x: -1, y: 0}, {x: 0, y: -1}]; // EAST, SOUTH, WEST, NORTH

// function moveForward() {
//   flurbPosition.x += directions[flurbDirection].x;
//   flurbPosition.y += directions[flurbDirection].y;
//   if (checkBounds()) {
//     updateFlurbPosition();
//   }
// }

// function turnRight() {
//   flurbDirection = (flurbDirection + 1) % 4;
// }

// function turnLeft() {
//   flurbDirection = (flurbDirection + 3) % 4; // "+3" is the same as "-1", but handles negative numbers correctly
// }

/*Easier Commands -- Up, Down, Left, Right*/

function moveUp() {
    flurbPosition.y -= 1;
    if (checkBounds().success) {
      updateFlurbPosition();
    } else {
      alerts.add(checkBounds().msg)
    }
}

function moveDown() {
    flurbPosition.y += 1;
    if (checkBounds().success) {
      updateFlurbPosition();
    } else {
      alerts.add(checkBounds().msg)
    }
}

function moveLeft() {
    flurbPosition.x -= 1;
    if (checkBounds().success) {
      updateFlurbPosition();
    } else {
      alerts.add(checkBounds().msg)
    }
}

function moveRight() {
    flurbPosition.x += 1;
    if (checkBounds().success) {
      updateFlurbPosition();
    } else {
      alerts.add(checkBounds().msg)
    }
}

function checkBounds() {
  if (flurbPosition.x < 0 || flurbPosition.y < 0 || flurbPosition.x > gridWidth - 1 || flurbPosition.y > gridHeight - 1) {
    // alert("Flurb went out of bounds!");
    return {
      "success": false,
      "msg": "Flurb went out of bounds!"
    }
  }
  else if (lavaPos.toString().indexOf([flurbPosition.x, flurbPosition.y].toString()) != -1) {
    // alert("Flurb fell into lava!");
    return {
      "success": false,
      "msg": "Flurb fell into lava!"
    }
  }
  return {
    "success": true
  }
}

function updateFlurbPosition() {
    // Remove the flurb from its old cell
    var flurb = document.getElementById('flurb');
    flurbCell.removeChild(flurb);
    // Add the flurb to its new cell
    var rows = gameArea.getElementsByTagName('tr');
    var cells = rows[flurbPosition.y].getElementsByTagName('td');
    flurbCell = cells[flurbPosition.x];
    flurbCell.appendChild(flurb);
}

var workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox')
  });

async function runCode() {
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  console.log(code)
  await eval("(async () => {" + code + "})()");
  if(flurbCell.querySelector('#flurb') && flurbCell.querySelector('#apple')) {
    if(loopValidation) {
        if(code.indexOf("for") == -1) {
            alert("You got the fruit, but you didn't use the Repeat Block. Try Again!");
            flurbPosition = {x: flurbCellX, y: flurbCellY};
            updateFlurbPosition()
            return;
        }
    }
    else if(alerts.size > 0) {
      for(var error of alerts){
        alert(error)
      }
      alerts.clear()
      flurbPosition = {x: flurbCellX, y: flurbCellY};
      updateFlurbPosition()
      return;
    }
    flurbCell.removeChild(flurbCell.querySelector('#apple'));
    await sleep(100)
    alert("Success!")
  } else {
    await sleep(500)
    alert("Try Again!");
    flurbPosition = {x: flurbCellX, y: flurbCellY};
    updateFlurbPosition()
  }
}