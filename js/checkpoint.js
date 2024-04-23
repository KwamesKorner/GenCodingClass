const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
let params = new URLSearchParams(document.location.search);
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
let gameScore = localStorage.getItem('getFruitScore') ? parseInt(localStorage.getItem('getFruitScore')): 0;
let startTime = new Date();
let level = params.get("level");
let levelText = document.getElementById("level")
levelText.innerHTML = `Level ${level} Score: ${gameScore}`
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
        "xml": false,
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
        "xml": false,
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
        "xml": false,
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
        "xml": false,
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
        "xml": false,
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
        "xml": false,
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
        "xml": false,
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
        "xml": false,
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
        "xml": false,
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
        "xml": false,
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
        "xml": false,
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
        "xml": false,
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
      "xml": false,
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
      "xml": false,
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
      "xml": false,
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
      "xml": false,
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
      "xml": false,
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
      "xml": false,
      "alertMessage": "There's more than meets the eye.",
      "loopValidation": true
    },
    "19": {
      "gridHeight": 6,
      "gridWidth": 6,
      "flurbCellX": 0,
      "flurbCellY": 0,
      "fruitCellX": 5,
      "fruitCellY": 5,
      "flurbPosition": { "x": 0, "y": 0 },
      "lavaPos": [[2, 2, "|"], [3, 3, "|"], [4, 1, "|"], [1, 4, "|"], [5, 0, "|"], [0, 5, "|"]],
      "xml": false,
      "alertMessage": "A larger grid awaits! Find your way to the fruit.",
      "loopValidation": true
    },
    "20": {
      "gridHeight": 6,
      "gridWidth": 6,
      "flurbCellX": 0,
      "flurbCellY": 5,
      "fruitCellX": 5,
      "fruitCellY": 0,
      "flurbPosition": { "x": 0, "y": 5 },
      "lavaPos": [[0, 0, "|"], [1, 3, "|"], [3, 3, "|"], [4, 4, "|"], [2, 1, "|"], [2, 4, "|"], [3, 1, "|"], [1, 2, "|"], [5, 5, "|"]],
      "xml": false,
      "alertMessage": "The path is narrower with more obstacles. Tread carefully!",
      "loopValidation": true
    },
    "21": {
      "gridHeight": 7,
      "gridWidth": 7,
      "flurbCellX": 0,
      "flurbCellY": 0,
      "fruitCellX": 6,
      "fruitCellY": 6,
      "flurbPosition": { "x": 0, "y": 0 },
      "lavaPos": [[0, 5, "|"], [5, 0, "|"], [5, 5, "|"], [1, 4, "|"], [4, 1, "|"], [3, 3, "|"], [2, 2, "|"], [4, 6, "|"], [6, 3, "|"]],
      "xml": false,
      "alertMessage": "A growing grid and more lava. Plan your moves wisely!",
      "loopValidation": true
    },
    "22": {
      "gridHeight": 7,
      "gridWidth": 7,
      "flurbCellX": 3,
      "flurbCellY": 3,
      "fruitCellX": 0,
      "fruitCellY": 6,
      "flurbPosition": { "x": 3, "y": 3 },
      "lavaPos": [[1, 1, "|"], [3, 0, "|"], [3, 1, "|"], [2, 5, "|"], [3, 6, "|"], [4, 4, "|"], [5, 5, "|"], [1, 4, "|"], [2, 3, "|"], [4, 3, "|"], [5, 3, "|"], [6, 3, "|"]],
      "xml": false,
      "alertMessage": "Traverse from bottom left to top right. The lava won't make it easy!",
      "loopValidation": true
    },
    "23": {
      "gridHeight": 8,
      "gridWidth": 8,
      "flurbCellX": 0,
      "flurbCellY": 7,
      "fruitCellX": 7,
      "fruitCellY": 0,
      "flurbPosition": { "x": 0, "y": 7 },
      "lavaPos": [[0, 5, "|"], [1, 1, "|"], [1, 4, "|"], [2, 2, "|"], [2, 6, "|"], [3, 1, "|"], [3, 4, "|"], [4, 2, "|"], [4, 5, "|"], [4, 7, "|"], [5, 1, "|"], [5, 4, "|"], [5, 6, "|"], [6, 3, "|"], [6, 7, "|"]],
      "xml": false,
      "alertMessage": "Lava pockets are everywhere. Navigate with precision!",
      "loopValidation": true
    },
    "24": {
      "gridHeight": 8,
      "gridWidth": 8,
      "flurbCellX": 0,
      "flurbCellY": 0,
      "fruitCellX": 7,
      "fruitCellY": 7,
      "flurbPosition": { "x": 0, "y": 0 },
      "lavaPos": [[7,0, "|"],[0,7, "|"], [1, 1, "|"], [2, 3, "|"], [3, 5, "|"], [4, 2, "|"], [4, 6, "|"], [5, 4, "|"], [6, 3, "|"], [6, 6, "|"]],
      "xml": false,
      "alertMessage": "The ultimate challenge on an 8x8 grid. Best of luck!",
      "loopValidation": true
    },
  //   "25": {
  //     gridHeight: 2,
  //     gridWidth: 3,
  //     flurbCellX: 1,
  //     flurbCellY: 1,
  //     fruitCellX: 1,
  //     fruitCellY: 0,
  //     flurbPosition: {x: 1, y: 1},
  //     lavaPos: [],
  //     "xml":
  //       `<xml>
  //         <block type="controls_ifelse">
  //           <value name="IF0">
  //               <block type="logic_compare">
  //                 <field name="OP">EQ</field>
  //                 <value name="A">
  //                     <block type="math_number">
  //                       <field name="NUM">${getRandomInt(10)}</field>
  //                     </block>
  //                 </value>
  //                 <value name="B">
  //                     <block type="math_number">
  //                       <field name="NUM">${getRandomInt(10)}</field>
  //                     </block>
  //                 </value>
  //               </block>
  //           </value>
  //           <statement name="DO0">
  //             <block type="move_up">
  //           </statement>
  //           <statement name="ELSE">
  //             <block type="move_down">
  //           </statement>
  //         </block>
  //       </xml>`,
  //       "dropdown": true,
  //       "readOnly": true,
  //       "alertMessage": "Will the flurb make it to the fruit???"
  // },
  // "26": {
  //     gridHeight: 2,
  //     gridWidth: 3,
  //     flurbCellX: 2,
  //     flurbCellY: 0,
  //     fruitCellX: 2,
  //     fruitCellY: 1,
  //     flurbPosition: {x: 2, y: 0},
  //     lavaPos: [],
  //     "xml":
  //       `<xml>
  //         <block type="controls_ifelse">
  //           <value name="IF0">
  //               <block type="logic_compare">
  //                 <field name="OP">EQ</field>
  //                 <value name="A">
  //                     <block type="math_number">
  //                       <field name="NUM">${getRandomInt(10)}</field>
  //                     </block>
  //                 </value>
  //                 <value name="B">
  //                     <block type="math_number">
  //                       <field name="NUM">${getRandomInt(10)}</field>
  //                     </block>
  //                 </value>
  //               </block>
  //           </value>
  //           <statement name="DO0">
  //             <block type="move_up">
  //           </statement>
  //           <statement name="ELSE">
  //             <block type="move_down">
  //           </statement>
  //         </block>
  //       </xml>`,
  //     "dropdown": true,
  //     "readOnly": true,
  //     "alertMessage": "Will the flurb make it to the fruit???"
  // },
  // "27": {
  //     gridHeight: 2,
  //     gridWidth: 3,
  //     flurbCellX: 0,
  //     flurbCellY: 0,
  //     fruitCellX: 1,
  //     fruitCellY: 1,
  //     flurbPosition: {x: 0, y: 0},
  //     lavaPos: [],
  //     "xml":
  //       `<xml>
  //         <block type="controls_ifelse">
  //           <value name="IF0">
  //               <block type="logic_compare">
  //                 <field name="OP">EQ</field>
  //                 <value name="A">
  //                     <block type="math_number">
  //                       <field name="NUM">${getRandomInt(10)}</field>
  //                     </block>
  //                 </value>
  //                 <value name="B">
  //                     <block type="math_number">
  //                       <field name="NUM">${getRandomInt(10)}</field>
  //                     </block>
  //                 </value>
  //               </block>
  //           </value>
  //           <statement name="DO0">
  //             <block type="move_right">
  //             <next>
  //               <block type="move_up">
  //             </next>
  //           </statement>
  //           <statement name="ELSE">
  //             <block type="move_down">
  //             <next>
  //               <block type="move_right">
  //             </next>
  //           </statement>
  //         </block>
  //       </xml>`,
  //     "dropdown": true,
  //     "readOnly": true,
  //     "alertMessage": "Will the flurb make it to the fruit???"
  // },
  // "28": {
  //     gridHeight: 2,
  //     gridWidth: 3,
  //     flurbCellX: 2,
  //     flurbCellY: 0,
  //     fruitCellX: 0,
  //     fruitCellY: 0,
  //     flurbPosition: {x: 2, y: 0},
  //     lavaPos: [],
  //     "xml":
  //       `<xml>
  //         <block type="controls_ifelse">
  //           <value name="IF0">
  //               <block type="logic_compare">
  //                 <field name="OP">EQ</field>
  //                 <value name="A">
  //                     <block type="math_number">
  //                       <field name="NUM">${getRandomInt(10)}</field>
  //                     </block>
  //                 </value>
  //                 <value name="B">
  //                     <block type="math_number">
  //                       <field name="NUM">${getRandomInt(10)}</field>
  //                     </block>
  //                 </value>
  //               </block>
  //           </value>
  //           <statement name="DO0">
  //             <block type="move_left">
  //             <next>
  //               <block type="move_left">
  //             </next>
  //           </statement>
  //           <statement name="ELSE">
  //             <block type="move_right">
  //             <next>
  //               <block type="move_right">
  //             </next>
  //           </statement>
  //         </block>
  //       </xml>`,
  //     "dropdown": true,
  //     "readOnly": true,
  //     "alertMessage": "Will the flurb make it to the fruit???"
  // },
  // "29": {
  //     gridHeight: 2,
  //     gridWidth: 3,
  //     flurbCellX: 0,
  //     flurbCellY: 0,
  //     fruitCellX: 2,
  //     fruitCellY: 1,
  //     flurbPosition: {x: 0, y: 0},
  //     lavaPos: [],
  //     "xml":
  //       `<xml>
  //         <block type="controls_ifelse">
  //           <value name="IF0">
  //               <block type="logic_compare">
  //                 <field name="OP">GTE</field>
  //                 <value name="A">
  //                     <block type="math_number">
  //                       <field name="NUM">${getRandomInt(10)}</field>
  //                     </block>
  //                 </value>
  //                 <value name="B">
  //                     <block type="math_number">
  //                       <field name="NUM">${getRandomInt(10)}</field>
  //                     </block>
  //                 </value>
  //               </block>
  //           </value>
  //           <statement name="DO0">
  //             <block type="move_left">
  //             <next>
  //               <block type="move_left">
  //               <next>
  //               <block type="move_up">
  //             </next>
  //             </next>
  //           </statement>
  //           <statement name="ELSE">
  //             <block type="move_right">
  //             <next>
  //               <block type="move_right">
  //               <next>
  //               <block type="move_down">
  //             </next>
  //             </next>
  //           </statement>
  //         </block>
  //       </xml>`,
  //     "dropdown": true,
  //     "readOnly": true,
  //     "alertMessage": "Will the flurb make it to the fruit???"
  // },
  // "30": {
  //   "gridHeight": 4,
  //   "gridWidth": 7,
  //   "flurbCellX": 3,
  //   "flurbCellY": 0,
  //   "fruitCellX": 2,
  //   "fruitCellY": 3,
  //   "flurbPosition": { "x": 3, "y": 0 },
  //   "lavaPos": [],
  //   "xml":`
  //   <xml>
  //     <block type="controls_ifelse">
  //       <value name="IF0">
  //           <block type="logic_compare">
  //             <field name="OP">EQ</field>
  //             <value name="A">
  //                 <block type="math_number">
  //                   <field name="NUM">${getRandomInt(10)}</field>
  //                 </block>
  //             </value>
  //             <value name="B">
  //                 <block type="math_number">
  //                   <field name="NUM">${getRandomInt(10)}</field>
  //                 </block>
  //             </value>
  //           </block>
  //       </value>
  //       <statement name="DO0">
  //           <block type="controls_repeat">
  //             <field name="TIMES">3</field>
  //             <statement name="DO">
  //                 <block type="move_down">
  //             </statement>
  //             <next>
  //                 <block type="move_right">
  //             </next>
  //           </block>
  //       </statement>
  //       <statement name="ELSE">
  //           <block type="move_left">
  //             <next>
  //                 <block type="controls_repeat">
  //                   <field name="TIMES">3</field>
  //                   <statement name="DO">
  //                       <block type="move_down">
  //                   </statement>
  //                 </block>
  //             </next>
  //           </block>
  //       </statement>
  //     </block>
  //   </xml>`,
  //   "dropdown": true,
  //   "readOnly": true,
  //   "alertMessage": "Will the flurb make it to the fruit???"
  // },
  // "31": {
  //   "gridHeight": 5,
  //   "gridWidth": 6,
  //   "flurbCellX": 2,
  //   "flurbCellY": 0,
  //   "fruitCellX": 4,
  //   "fruitCellY": 3,
  //   "flurbPosition": { "x": 2, "y": 0 },
  //   "lavaPos": [],
  //   "xml": `
  //     <xml>
  //       <block type="controls_ifelse">
  //         <value name="IF0">
  //           <block type="logic_compare">
  //             <field name="OP">LT</field>
  //             <value name="A">
  //               <block type="math_number">
  //                 <field name="NUM">${getRandomInt(15)}</field>
  //               </block>
  //             </value>
  //             <value name="B">
  //               <block type="math_number">
  //                 <field name="NUM">${getRandomInt(15)}</field>
  //               </block>
  //             </value>
  //           </block>
  //         </value>
  //         <statement name="DO0">
  //           <block type="controls_repeat">
  //             <field name="TIMES">2</field>
  //             <statement name="DO">
  //               <block type="move_right">
  //             </statement>
  //             <next>
  //               <block type="controls_repeat">
  //               <field name="TIMES">3</field>
  //               <statement name="DO">
  //                 <block type="move_down">
  //               </statement>
  //               </block>
  //             </next>
  //           </block>
  //         </statement>
  //         <statement name="ELSE">
  //           <block type="move_left">
  //             <next>
  //               <block type="controls_repeat">
  //                 <field name="TIMES">4</field>
  //                 <statement name="DO">
  //                   <block type="move_down">
  //                 </statement>
  //               </block>
  //             </next>
  //           </block>
  //         </statement>
  //       </block>
  //     </xml>`,
  //   "dropdown": true,
  //   "readOnly": true,
  //   "alertMessage": "Will the flurb make it to the fruit???"
  // },
  // "32": {
  //   "gridHeight": 5,
  //   "gridWidth": 6,
  //   "flurbCellX": 0,
  //   "flurbCellY": 0,
  //   "fruitCellX": 4,
  //   "fruitCellY": 3,
  //   "flurbPosition": { "x": 0, "y": 0 },
  //   "lavaPos": [],
  //   "xml": `
  //     <xml>
  //       <block type="controls_ifelse">
  //         <value name="IF0">
  //           <block type="logic_compare">
  //             <field name="OP">GT</field>
  //             <value name="A">
  //               <block type="math_number">
  //                 <field name="NUM">${getRandomInt(15)}</field>
  //               </block>
  //             </value>
  //             <value name="B">
  //               <block type="math_number">
  //                 <field name="NUM">${getRandomInt(15)}</field>
  //               </block>
  //             </value>
  //           </block>
  //         </value>
  //         <statement name="DO0">
  //           <block type="controls_repeat">
  //             <field name="TIMES">4</field>
  //             <statement name="DO">
  //               <block type="move_right">
  //             </statement>
  //             <next>
  //               <block type="controls_repeat">
  //               <field name="TIMES">3</field>
  //               <statement name="DO">
  //                 <block type="move_down">
  //               </statement>
  //               </block>
  //             </next>
  //           </block>
  //         </statement>
  //         <statement name="ELSE">
  //           <block type="controls_repeat">
  //             <field name="TIMES">4</field>
  //             <statement name="DO">
  //               <block type="move_left">
  //             </statement>
  //             <next>
  //               <block type="controls_repeat">
  //               <field name="TIMES">3</field>
  //               <statement name="DO">
  //                 <block type="move_up">
  //               </statement>
  //               </block>
  //             </next>
  //           </block>
  //         </statement>
  //       </block>
  //     </xml>`,
  //   "dropdown": true,
  //   "readOnly": true,
  //   "alertMessage": "Will the flurb make it to the fruit???"
  // }, 
  "33": {
    "gridHeight": 5,
    "gridWidth": 6,
    "flurbCellX": 2,
    "flurbCellY": 0,
    "fruitCellX": 4,
    "fruitCellY": 3,
    "flurbPosition": { "x": 2, "y": 0 },
    "lavaPos": [],
    "xml": `
      <xml>
        <block type="controls_ifelse">
          <value name="IF0">
            <block type="logic_compare">
              <field name="OP">EQ</field>
              <value name="A">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(15)}</field>
                </block>
              </value>
              <value name="B">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(15)}</field>
                </block>
              </value>
            </block>
          </value>
          <statement name="DO0">
            <block type="controls_repeat">
              <field name="TIMES">4</field>
              <statement name="DO">
                <block type="move_down">
              </statement>
              <next>
                <block type="move_right">
              </next>
            </block>
          </statement>
          <statement name="ELSE">
            <block type="move_left">
              <next>
                <block type="controls_repeat">
                  <field name="TIMES">4</field>
                  <statement name="DO">
                    <block type="move_down">
                  </statement>
                </block>
              </next>
            </block>
          </statement>
        </block>
      </xml>`,
    "dropdown": false,
    "readOnly": false,
    "editDisabled": true,
    "alertMessage": "Update the code so that the flurb makes it to the fruit!"
  },
  "34": {
    "gridHeight": 8,
    "gridWidth": 8,
    "flurbCellX": 0,
    "flurbCellY": 0,
    "fruitCellX": 7,
    "fruitCellY": 7,
    "flurbPosition": { "x": 0, "y": 0 },
    "lavaPos": [[7,0, "|"],[0,7, "|"], [1, 1, "|"], [2, 3, "|"], [3, 5, "|"], [4, 2, "|"], [4, 6, "|"], [5, 4, "|"], [6, 3, "|"], [6, 6, "|"]],
    "xml": `
      <xml>
        <block type="controls_ifelse">
          <value name="IF0">
            <block type="logic_compare">
              <field name="OP">EQ</field>
              <value name="A">
                <block type="math_number">
                  <field name="NUM">7</field>
                </block>
              </value>
              <value name="B">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(15)}</field>
                </block>
              </value>
            </block>
          </value>
          <statement name="DO0">
            <block type="controls_repeat">
              <field name="TIMES">4</field>
              <statement name="DO">
                <block type="move_down">
              </statement>
              <next>
                <block type="move_right">
                <next>
                  <block type="move_left">
              </next>
              </next>
            </block>
          </statement>
          <statement name="ELSE">
            <block type="move_left">
              <next>
                <block type="controls_repeat">
                  <field name="TIMES">4</field>
                  <statement name="DO">
                    <block type="move_down">
                  </statement>
                  <next>
                    <block type="move_right">
                  </next>
                </block>
              </next>
            </block>
          </statement>
        </block>
      </xml>`,
    "dropdown": false,
    "readOnly": false,
    "editDisabled": true,
    "alertMessage": "Update the code so that the flurb makes it to the fruit!"
  },
  "35": {
    "gridHeight": 6,
    "gridWidth": 6,
    "flurbCellX": 0,
    "flurbCellY": 5,
    "fruitCellX": 5,
    "fruitCellY": 0,
    "flurbPosition": { "x": 0, "y": 5 },
    "lavaPos": [[0, 0, "|"], [1, 3, "|"], [3, 3, "|"], [4, 4, "|"], [2, 1, "|"], [2, 4, "|"], [3, 1, "|"], [1, 2, "|"], [5, 5, "|"]],
    "xml": `
      <xml>
        <block type="controls_ifelse">
          <value name="IF0">
            <block type="logic_compare">
              <field name="OP">EQ</field>
              <value name="A">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(15)}</field>
                </block>
              </value>
              <value name="B">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(15)}</field>
                </block>
              </value>
            </block>
          </value>
          <statement name="DO0">
            <block type="controls_repeat">
              <field name="TIMES">2</field>
              <statement name="DO">
                <block type="move_right">
              </statement>
              <next>
                <block type="controls_repeat">
                <field name="TIMES">3</field>
                <statement name="DO">
                  <block type="move_up">
                </statement>
                </block>
              </next>
            </block>
          </statement>
          <statement name="ELSE">
            <block type="move_right">
              <next>
                <block type="controls_repeat">
                  <field name="TIMES">4</field>
                  <statement name="DO">
                    <block type="move_up">
                  </statement>
                </block>
              </next>
            </block>
          </statement>
        </block>
      </xml>`,
    "dropdown": false,
    "readOnly": false,
    "editDisabled": true,
    "alertMessage": "Update the code so that the flurb makes it to the fruit!"
  },
  "36": {
    "gridHeight": 5,
    "gridWidth": 5,
    "flurbCellX": 0,
    "flurbCellY": 0,
    "fruitCellX": 4,
    "fruitCellY": 1,
    "flurbPosition": { "x": 0, "y": 0 },
    "lavaPos": [[0, 1, "|"], [0, 2, "|"], [1, 3, "|"], [2, 0, "|"], [2, 1, "|"], [3, 2, "|"], [3, 3, "|"], [4, 0, "|"]],
    "xml": `
      <xml>
        <block type="controls_ifelse">
          <value name="IF0">
            <block type="logic_compare">
              <field name="OP">EQ</field>
              <value name="A">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(15)}</field>
                </block>
              </value>
              <value name="B">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(15)}</field>
                </block>
              </value>
            </block>
          </value>
          <statement name="DO0">
            <block type="controls_repeat">
              <field name="TIMES">2</field>
              <statement name="DO">
                <block type="move_right">
              </statement>
              <next>
                <block type="controls_repeat">
                <field name="TIMES">3</field>
                <statement name="DO">
                  <block type="move_up">
                </statement>
                <next>
                  <block type="controls_repeat">
                    <field name="TIMES">4</field>
                    <statement name="DO">
                      <block type="move_down">
                    </statement>
                    <next>
                      <block type="move_left">
                    </next>
                  </block>
                </next>
                </block>
              </next>
            </block>
          </statement>
          <statement name="ELSE">
            <block type="move_left">
              <next>
                <block type="controls_repeat">
                  <field name="TIMES">4</field>
                  <statement name="DO">
                    <block type="move_down">
                  </statement>
                  <next>
                    <block type="move_right">
                  </next>
                </block>
              </next>
            </block>
          </statement>
        </block>
      </xml>`,
    "dropdown": false,
    "readOnly": false,
    "editDisabled": true,
    "alertMessage": "Update the code so that the flurb makes it to the fruit!"
  },
  "37": {
    "gridHeight": 8,
    "gridWidth": 8,
    "flurbCellX": 0,
    "flurbCellY": 7,
    "fruitCellX": 7,
    "fruitCellY": 0,
    "flurbPosition": { "x": 0, "y": 7 },
    "lavaPos": [
      [1, 6, "|"], [2, 6, "|"], [3, 6, "|"], [4, 6, "|"], [5, 6, "|"], [6, 6, "|"],
      [2, 5, "|"], [3, 5, "|"], [4, 5, "|"], [5, 5, "|"],
      [1, 3, "|"], [2, 3, "|"], [3, 3, "|"],
      [0, 2, "|"], [1, 2, "|"], [2, 2, "|"],
      [1, 1, "|"], [0, 0, "|"], [7, 7, "|"]
    ],
    "xml": `
      <xml>
        <block type="controls_ifelse">
          <value name="IF0">
            <block type="logic_compare">
              <field name="OP">EQ</field>
              <value name="A">
                <block type="math_number">
                  <field name="NUM">7</field>
                </block>
              </value>
              <value name="B">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(15)}</field>
                </block>
              </value>
            </block>
          </value>
          <statement name="DO0">
            <block type="controls_repeat">
              <field name="TIMES">4</field>
              <statement name="DO">
                <block type="move_up">
              </statement>
              <next>
                <block type="move_right">
                <next>
                  <block type="move_left">
              </next>
              </next>
            </block>
          </statement>
          <statement name="ELSE">
            <block type="move_left">
              <next>
                <block type="controls_repeat">
                  <field name="TIMES">4</field>
                  <statement name="DO">
                    <block type="move_up">
                  </statement>
                  <next>
                    <block type="move_right">
                    <next>
                      <block type="controls_repeat">
                        <field name="TIMES">4</field>
                        <statement name="DO">
                          <block type="move_up">
                        </statement>
                      </block>
                    </next>
                  </next>
                </block>
              </next>
            </block>
          </statement>
        </block>
      </xml>`,
    "dropdown": false,
    "readOnly": false,
    "editDisabled": true,
    "alertMessage": "Update the code so that the flurb makes it to the fruit!"
  },
  "38": {
    "gridHeight": 8,
    "gridWidth": 8,
    "flurbCellX": 0,
    "flurbCellY": 7,
    "fruitCellX": 0,
    "fruitCellY": 0,
    "flurbPosition": { "x": 0, "y": 7 },
    "lavaPos": [
      [1, 7, "|"], [5, 6, "|"],
      [2, 6, "|"], [6, 5, "|"],
      [3, 5, "|"], [7, 4, "|"],
      [1, 3, "|"], [4, 4, "|"],
      [2, 2, "|"], [6, 2, "|"],
      [0, 1, "|"], [5, 1, "|"],
      [3, 0, "|"], [7, 0, "|"],
      [1, 1, "|"], [1, 4, "|"],
      [2, 3, "|"]
    ],
    "xml": `
      <xml>
        <block type="controls_ifelse">
          <value name="IF0">
            <block type="logic_compare">
              <field name="OP">EQ</field>
              <value name="A">
                <block type="math_number">
                  <field name="NUM">7</field>
                </block>
              </value>
              <value name="B">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(15)}</field>
                </block>
              </value>
            </block>
          </value>
          <statement name="DO0">
            <block type="controls_repeat">
              <field name="TIMES">4</field>
              <statement name="DO">
                <block type="move_up">
              </statement>
              <next>
                <block type="move_right">
                <next>
                  <block type="move_up">
              </next>
              </next>
            </block>
          </statement>
          <statement name="ELSE">
            <block type="move_left">
              <next>
                <block type="controls_repeat">
                  <field name="TIMES">4</field>
                  <statement name="DO">
                    <block type="move_up">
                  </statement>
                  <next>
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left">
                      </statement>
                    </block>
                  </next>
                </block>
              </next>
            </block>
          </statement>
        </block>
      </xml>`,
    "dropdown": false,
    "readOnly": false,
    "editDisabled": true,
    "alertMessage": "Update the code so that the flurb makes it to the fruit!"
  },
  "39": {
    "gridHeight": 8,
    "gridWidth": 8,
    "flurbCellX": 7,
    "flurbCellY": 0,
    "fruitCellX": 0,
    "fruitCellY": 7,
    "flurbPosition": {"x": 7, "y": 0},
    "lavaPos": [
      [1, 6, "|"], [2, 5, "|"], [3, 4, "|"], [4, 3, "|"],
      [5, 2, "|"], [6, 1, "|"], [7, 7, "|"], [0, 6, "|"],
      [1, 5, "|"], [2, 4, "|"], [3, 3, "|"], [4, 2, "|"],
      [5, 1, "|"], [6, 0, "|"], [0, 5, "|"], [1, 4, "|"],
      [2, 3, "|"], [3, 2, "|"], [4, 1, "|"], [5, 0, "|"],
      [0, 4, "|"], [1, 3, "|"], [2, 2, "|"], [3, 1, "|"],
      [4, 0, "|"], [0, 3, "|"], [1, 2, "|"], [2, 1, "|"],
      [3, 0, "|"], [0, 2, "|"], [1, 1, "|"], [2, 0, "|"],
      [0, 1, "|"], [1, 0, "|"], [0, 0, "|"]
  ],
    "xml": `
      <xml>
        <block type="controls_ifelse">
          <value name="IF0">
            <block type="logic_compare">
              <field name="OP">EQ</field>
              <value name="A">
                <block type="math_number">
                  <field name="NUM">7</field>
                </block>
              </value>
              <value name="B">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(15)}</field>
                </block>
              </value>
            </block>
          </value>
          <statement name="DO0">
            <block type="controls_repeat">
              <field name="TIMES">4</field>
              <statement name="DO">
                <block type="move_up">
              </statement>
              <next>
                <block type="move_right">
                <next>
                  <block type="move_down">
              </next>
              </next>
            </block>
          </statement>
          <statement name="ELSE">
            <block type="move_left">
              <next>
                <block type="controls_repeat">
                  <field name="TIMES">4</field>
                  <statement name="DO">
                    <block type="move_right">
                  </statement>
                  <next>
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left">
                        <next>
                          <block type="move_down">
                        </next>
                      </statement>
                    </block>
                  </next>
                </block>
              </next>
            </block>
          </statement>
        </block>
      </xml>`,
    "dropdown": false,
    "readOnly": false,
    "editDisabled": true,
    "alertMessage": "Update the code so that the flurb makes it to the fruit!"
  },
  "40": {
    "gridHeight": 8,
    "gridWidth": 8,
    "flurbCellX": 7,
    "flurbCellY": 0,
    "fruitCellX": 0,
    "fruitCellY": 7,
    "flurbPosition": {"x": 7, "y": 0},
    "lavaPos": [
      [0, 0, "|"],
      [1, 0, "|"],
      [2, 0, "|"],
      [3, 0, "|"],
      [4, 0, "|"],
      [5, 0, "|"],
      [6, 0, "|"],
      [0, 1, "|"],
      [0, 2, "|"],
      [3, 2, "|"],
      [7, 2, "|"],
      [0, 3, "|"],
      [2, 3, "|"],
      [3, 3, "|"],
      [4, 3, "|"],
      [5, 3, "|"],
      [7, 3, "|"],
      [0, 4, "|"],
      [1, 4, "|"],
      [5, 4, "|"],
      [7, 4, "|"],
      [0, 5, "|"],
      [3, 5, "|"],
      [7, 5, "|"],
      [0, 6, "|"],
      [2, 6, "|"],
      [7, 6, "|"],
      [2, 7, "|"],
      [3, 7, "|"],
      [4, 7, "|"],
      [5, 7, "|"],
      [6, 7, "|"],
      [7, 7, "|"]
    ],
    "xml": `
      <xml>
        <block type="controls_ifelse">
          <value name="IF0">
            <block type="logic_compare">
              <field name="OP">EQ</field>
              <value name="A">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(15)}</field>
                </block>
              </value>
              <value name="B">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(15)}</field>
                </block>
              </value>
            </block>
          </value>
          <statement name="DO0">
            <block type="controls_repeat">
              <field name="TIMES">4</field>
              <statement name="DO">
                <block type="move_up">
              </statement>
              <next>
                <block type="move_left">
                <next>
                  <block type="move_down">
              </next>
              </next>
            </block>
          </statement>
          <statement name="ELSE">
            <block type="move_left">
              <next>
                <block type="controls_repeat">
                  <field name="TIMES">4</field>
                  <statement name="DO">
                    <block type="move_right">
                  </statement>
                  <next>
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_down">
                      </statement>
                    <next>
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left">
                        <next>
                        <block type="move_down">
                        </next>
                      </statement>
                    </block>
                  </next>
                  </block>
                  </next>
                </block>
              </next>
            </block>
          </statement>
        </block>
      </xml>`,
    "dropdown": false,
    "readOnly": false,
    "editDisabled": true,
    "alertMessage": "Update the code so that the flurb makes it to the fruit!"
  },
  "41": {
    "gridHeight": 8,
    "gridWidth": 8,
    "flurbCellX": 7,
    "flurbCellY": 2,
    "fruitCellX": 1,
    "fruitCellY": 3,
    "flurbPosition": {"x": 7, "y": 0},
    "lavaPos": [
      [0, 0, "|"],
      [1, 0, "|"],
      [2, 0, "|"],
      [3, 0, "|"],
      [4, 0, "|"],
      [5, 0, "|"],
      [6, 0, "|"],
      [7, 0, "|"],
      [0, 1, "|"],
      [0, 2, "|"],
      [1, 2, "|"],
      [2, 2, "|"],
      [4, 2, "|"],
      [5, 2, "|"],
      [6, 2, "|"],
      [0, 3, "|"],
      [2, 3, "|"],
      [4, 3, "|"],
      [6, 3, "|"],
      [7, 3, "|"],
      [0, 4, "|"],
      [2, 4, "|"],
      [4, 4, "|"],
      [5, 4, "|"],
      [7, 4, "|"],
      [0, 6, "|"],
      [1, 6, "|"],
      [2, 6, "|"],
      [3, 6, "|"],
      [4, 6, "|"],
      [5, 6, "|"],
      [6, 6, "|"],
      [0, 7, "|"],
      [1, 7, "|"],
      [2, 7, "|"],
      [7, 7, "|"]
    ],    
    "xml": `
      <xml>
        <block type="controls_ifelse">
          <value name="IF0">
            <block type="logic_compare">
              <field name="OP">EQ</field>
              <value name="A">
                <block type="math_number">
                  <field name="NUM">7</field>
                </block>
              </value>
              <value name="B">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(15)}</field>
                </block>
              </value>
            </block>
          </value>
          <statement name="DO0">
            <block type="controls_repeat">
              <field name="TIMES">4</field>
              <statement name="DO">
                <block type="move_up">
              </statement>
              <next>
                <block type="move_right">
                <next>
                  <block type="move_up">
              </next>
              </next>
            </block>
          </statement>
          <statement name="ELSE">
            <block type="move_left">
              <next>
                <block type="controls_repeat">
                  <field name="TIMES">4</field>
                  <statement name="DO">
                    <block type="move_down">
                  </statement>
                  <next>
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left">
                      </statement>
                      <next>
                        <block type="move_up">
                      </next>
                    </block>
                  </next>
                </block>
              </next>
            </block>
          </statement>
        </block>
      </xml>`,
    "dropdown": false,
    "readOnly": false,
    "editDisabled": true,
    "alertMessage": "Update the code so that the flurb makes it to the fruit!"
  },
  "25": {
    gridHeight: 2,
    gridWidth: 3,
    flurbCellX: 1,
    flurbCellY: 1,
    fruitCellX: 1,
    fruitCellY: 0,
    flurbPosition: {x: 1, y: 1},
    lavaPos: [],
    "xml":
      `<xml>
        <variables>
          <variable>num</variable>
        </variables>
        <block type="variables_set">
          <field name="VAR">num</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="controls_if">
              <mutation else="1"></mutation>
              <value name="IF0">
                <block type="logic_compare">
                  <field name="OP">EQ</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="math_number">
                      <field name="NUM">${getRandomInt(10)}</field>
                    </block>
                  </value>
                </block>
              </value>
              <statement name="DO0">
                <block type="move_up"></block>
              </statement>
              <statement name="ELSE">
                <block type="move_down"></block>
              </statement>
            </block>
          </next>
        </block>
      </xml>`,
      "dropdown": true,
      "readOnly": true,
      "alertMessage": "Will the flurb make it to the fruit???"
  },
  "26": {
    gridHeight: 2,
    gridWidth: 3,
    flurbCellX: 2,
    flurbCellY: 0,
    fruitCellX: 2,
    fruitCellY: 1,
    flurbPosition: {x: 2, y: 0},
    lavaPos: [],
    "xml":
      `<xml>
        <variables>
          <variable>num</variable>
        </variables>
        <block type="variables_set">
          <field name="VAR">num</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="controls_ifelse">
              <value name="IF0">
                <block type="logic_compare">
                  <field name="OP">EQ</field>
                  <value name="A">
                    <block type="math_number">
                      <field name="NUM">${getRandomInt(10)}</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num</field>
                    </block>
                  </value>
                </block>
              </value>
              <statement name="DO0">
                <block type="move_up"></block>
              </statement>
              <statement name="ELSE">
                <block type="move_down"></block>
              </statement>
            </block>
          </next>
        </block>
      </xml>`,
    "dropdown": true,
    "readOnly": true,
    "alertMessage": "Will the flurb make it to the fruit???"
  },
"27": {
    gridHeight: 2,
    gridWidth: 3,
    flurbCellX: 0,
    flurbCellY: 0,
    fruitCellX: 1,
    fruitCellY: 1,
    flurbPosition: {x: 0, y: 0},
    lavaPos: [],
    "xml":
      `<xml>
        <variables>
          <variable>steps</variable>
        </variables>
        <block type="variables_set">
          <field name="VAR">steps</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="controls_ifelse">
              <value name="IF0">
                <block type="logic_compare">
                  <field name="OP">EQ</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">steps</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="math_number">
                      <field name="NUM">${getRandomInt(10)}</field>
                    </block>
                  </value>
                </block>
              </value>
              <statement name="DO0">
                <block type="move_right">
                  <next>
                    <block type="move_up"></block>
                  </next>
                </block>
              </statement>
              <statement name="ELSE">
                <block type="move_down">
                  <next>
                    <block type="move_right"></block>
                  </next>
                </block>
              </statement>
            </block>
          </next>
        </block>
      </xml>`,
    "dropdown": true,
    "readOnly": true,
    "alertMessage": "Will the flurb make it to the fruit???"
},
"28": {
    gridHeight: 2,
    gridWidth: 3,
    flurbCellX: 2,
    flurbCellY: 0,
    fruitCellX: 0,
    fruitCellY: 0,
    flurbPosition: {x: 2, y: 0},
    lavaPos: [],
    "xml":
      `<xml>
      <variables>
        <variable>num1</variable>
        <variable>num2</variable>
        <variable>sum</variable>
      </variables>
      <block type="variables_set">
        <field name="VAR">num1</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">${getRandomInt(10)}</field>
          </block>
        </value>
        <next>
          <block type="variables_set">
            <field name="VAR">num2</field>
            <value name="VALUE">
              <block type="math_number">
                <field name="NUM">${getRandomInt(10)}</field>
              </block>
            </value>
            <next>
              <block type="variables_set">
                <field name="VAR">sum</field>
                <value name="VALUE">
                  <block type="math_arithmetic">
                    <field name="OP">ADD</field>
                    <value name="A">
                      <block type="variables_get">
                        <field name="VAR">num1</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="variables_get">
                        <field name="VAR">num2</field>
                      </block>
                    </value>
                  </block>
                </value>
                <next>
                  <block type="controls_ifelse">
                    <value name="IF0">
                      <block type="logic_compare">
                        <field name="OP">EQ</field>
                        <value name="A">
                          <block type="variables_get">
                            <field name="VAR">sum</field>
                          </block>
                        </value>
                        <value name="B">
                          <block type="math_number">
                            <field name="NUM">${getRandomInt(10)}</field>
                          </block>
                        </value>
                      </block>
                    </value>
                    <statement name="DO0">
                      <block type="move_left">
                        <next>
                          <block type="move_left"></block>
                        </next>
                      </block>
                    </statement>
                    <statement name="ELSE">
                      <block type="move_right">
                        <next>
                          <block type="move_right"></block>
                        </next>
                      </block>
                    </statement>
                  </block>
                </next>
              </block>
            </next>
          </block>
        </next>
      </block>
    </xml>`,
    "dropdown": true,
    "readOnly": false,
    "alertMessage": "Will the flurb make it to the fruit???"
},
"29": {
    gridHeight: 2,
    gridWidth: 3,
    flurbCellX: 0,
    flurbCellY: 0,
    fruitCellX: 2,
    fruitCellY: 1,
    flurbPosition: {x: 0, y: 0},
    lavaPos: [],
    "xml":
      `<xml>
        <variables>
          <variable>num1</variable>
          <variable>num2</variable>
          <variable>sum</variable>
        </variables>
        <block type="variables_set">
          <field name="VAR">num1</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">num2</field>
              <value name="VALUE">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(10)}</field>
                </block>
              </value>
              <next>
                <block type="variables_set">
                  <field name="VAR">sum</field>
                  <value name="VALUE">
                    <block type="math_arithmetic">
                      <field name="OP">ADD</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">num1</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="variables_get">
                          <field name="VAR">num2</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <next>
            <block type="controls_ifelse">
              <value name="IF0">
                  <block type="logic_compare">
                    <field name="OP">GTE</field>
                    <value name="A">
                      <block type="variables_get">
                        <field name="VAR">sum</field>
                      </block>
                    </value>
                    <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(10)}</field>
                        </block>
                    </value>
                  </block>
              </value>
              <statement name="DO0">
                <block type="move_left">
                <next>
                  <block type="move_left">
                  <next>
                  <block type="move_up">
                </next>
                </next>
              </statement>
              <statement name="ELSE">
                <block type="move_right">
                <next>
                  <block type="move_right">
                  <next>
                  <block type="move_down">
                </next>
                </next>
              </statement>
              </next>
              </block>
              </next>
              </block>
              </next>
          </block>
        </xml>`,
    "dropdown": true,
    "readOnly": true,
    "alertMessage": "Will the flurb make it to the fruit???"
},
"30": {
  "gridHeight": 4,
  "gridWidth": 7,
  "flurbCellX": 3,
  "flurbCellY": 0,
  "fruitCellX": 2,
  "fruitCellY": 3,
  "flurbPosition": { "x": 3, "y": 0 },
  "lavaPos": [],
  "xml":`
  <xml>
    <variables>
    <variable>num1</variable>
    <variable>num2</variable>
    <variable>sum</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
          <block type="variables_set">
            <field name="VAR">sum</field>
            <value name="VALUE">
              <block type="math_arithmetic">
                <field name="OP">ADD</field>
                <value name="A">
                  <block type="variables_get">
                    <field name="VAR">num1</field>
                  </block>
                </value>
                <value name="B">
                  <block type="variables_get">
                    <field name="VAR">num2</field>
                  </block>
                </value>
              </block>
            </value>
        <next>
      <block type="controls_ifelse">
        <value name="IF0">
            <block type="logic_compare">
              <field name="OP">EQ</field>
              <value name="A">
                  <block type="math_number">
                    <field name="NUM">${getRandomInt(10)}</field>
                  </block>
              </value>
              <value name="B">
                  <block type="variables_get">
                    <field name="VAR">sum</field>
                  </block>
              </value>
            </block>
        </value>
        <statement name="DO0">
            <block type="controls_repeat">
              <field name="TIMES">3</field>
              <statement name="DO">
                  <block type="move_down">
              </statement>
              <next>
                  <block type="move_right">
              </next>
            </block>
        </statement>
        <statement name="ELSE">
            <block type="move_left">
              <next>
                  <block type="controls_repeat">
                    <field name="TIMES">3</field>
                    <statement name="DO">
                        <block type="move_down">
                    </statement>
                  </block>
                  </next>
                  </block>
                  </next>
                  </block>
              </next>
            </block>
        </statement>
      </block>
    </xml>`,
  "dropdown": true,
  "readOnly": true,
  "alertMessage": "Will the flurb make it to the fruit???"
},
"31": {
  "gridHeight": 5,
  "gridWidth": 6,
  "flurbCellX": 2,
  "flurbCellY": 0,
  "fruitCellX": 4,
  "fruitCellY": 3,
  "flurbPosition": { "x": 2, "y": 0 },
  "lavaPos": [],
  "xml": `
  <xml>
  <variables>
  <variable>num1</variable>
  <variable>num2</variable>
  <variable>sum</variable>
  </variables>
  <block type="variables_set">
    <field name="VAR">num1</field>
    <value name="VALUE">
      <block type="math_number">
        <field name="NUM">${getRandomInt(15)}</field>
      </block>
    </value>
    <next>
      <block type="variables_set">
        <field name="VAR">num2</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">${getRandomInt(15)}</field>
          </block>
        </value>
        <next>
        <block type="variables_set">
          <field name="VAR">sum</field>
          <value name="VALUE">
            <block type="math_arithmetic">
              <field name="OP">ADD</field>
              <value name="A">
                <block type="variables_get">
                  <field name="VAR">num1</field>
                </block>
              </value>
              <value name="B">
                <block type="variables_get">
                  <field name="VAR">num2</field>
                </block>
              </value>
            </block>
          </value>
      <next>
      <block type="controls_ifelse">
        <value name="IF0">
          <block type="logic_compare">
            <field name="OP">LT</field>
            <value name="A">
              <block type="variables_get">
                <field name="VAR">sum</field>
              </block>
            </value>
            <value name="B">
              <block type="math_number">
                <field name="NUM">${getRandomInt(15)}</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="DO0">
          <block type="controls_repeat">
            <field name="TIMES">2</field>
            <statement name="DO">
              <block type="move_right">
            </statement>
            <next>
              <block type="controls_repeat">
              <field name="TIMES">3</field>
              <statement name="DO">
                <block type="move_down">
              </statement>
              </block>
            </next>
          </block>
        </statement>
        <statement name="ELSE">
          <block type="move_left">
            <next>
              <block type="controls_repeat">
                <field name="TIMES">4</field>
                <statement name="DO">
                  <block type="move_down">
                </statement>
              </block>
            </next>
            </block>
                  </next>
                  </block>
                  </next>
                  </block>
              </next>
          </block>
        </statement>
      </block>
    </xml>`,
  "dropdown": true,
  "readOnly": true,
  "alertMessage": "Will the flurb make it to the fruit???"
},
"32": {
  "gridHeight": 5,
  "gridWidth": 6,
  "flurbCellX": 0,
  "flurbCellY": 0,
  "fruitCellX": 4,
  "fruitCellY": 3,
  "flurbPosition": { "x": 0, "y": 0 },
  "lavaPos": [],
  "xml": `
  <xml>
  <variables>
  <variable>num1</variable>
  <variable>num2</variable>
  <variable>sum</variable>
  </variables>
  <block type="variables_set">
    <field name="VAR">num1</field>
    <value name="VALUE">
      <block type="math_number">
        <field name="NUM">${getRandomInt(15)}</field>
      </block>
    </value>
    <next>
      <block type="variables_set">
        <field name="VAR">num2</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">${getRandomInt(15)}</field>
          </block>
        </value>
        <next>
        <block type="variables_set">
          <field name="VAR">sum</field>
          <value name="VALUE">
            <block type="math_arithmetic">
              <field name="OP">ADD</field>
              <value name="A">
                <block type="variables_get">
                  <field name="VAR">num1</field>
                </block>
              </value>
              <value name="B">
                <block type="variables_get">
                  <field name="VAR">num2</field>
                </block>
              </value>
            </block>
          </value>
      <next>
      <block type="controls_ifelse">
        <value name="IF0">
          <block type="logic_compare">
            <field name="OP">GT</field>
            <value name="A">
              <block type="variables_get">
                <field name="VAR">sum</field>
              </block>
            </value>
            <value name="B">
              <block type="math_number">
                <field name="NUM">${getRandomInt(15)}</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="DO0">
          <block type="controls_repeat">
            <field name="TIMES">4</field>
            <statement name="DO">
              <block type="move_right">
            </statement>
            <next>
              <block type="controls_repeat">
              <field name="TIMES">3</field>
              <statement name="DO">
                <block type="move_down">
              </statement>
              </block>
            </next>
          </block>
        </statement>
        <statement name="ELSE">
          <block type="controls_repeat">
            <field name="TIMES">4</field>
            <statement name="DO">
              <block type="move_left">
            </statement>
            <next>
              <block type="controls_repeat">
              <field name="TIMES">3</field>
              <statement name="DO">
                <block type="move_up">
              </statement>
              </block>
            </next>
          </block>
        </statement>
        </block>
                  </next>
                  </block>
                  </next>
                  </block>
              </next>
      </block>
    </xml>`,
  "dropdown": true,
  "readOnly": false,
  "alertMessage": "Will the flurb make it to the fruit???"
},
"500": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 1,
  flurbCellY: 1,
  fruitCellX: 1,
  fruitCellY: 0,
  flurbPosition: {x: 1, y: 1},
  lavaPos: [],
  "xml":
    `<xml>
      <variables>
        <variable>num</variable>
      </variables>
      <block type="variables_set">
        <field name="VAR">num</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">${getRandomInt(10)}</field>
          </block>
        </value>
        <next>
          <block type="controls_if">
            <mutation else="1"></mutation>
            <value name="IF0">
              <block type="logic_compare">
                <field name="OP">EQ</field>
                <value name="A">
                  <block type="variables_get">
                    <field name="VAR">num</field>
                  </block>
                </value>
                <value name="B">
                  <block type="math_number">
                    <field name="NUM">${getRandomInt(10)}</field>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO0">
              <block type="move_up"></block>
            </statement>
            <statement name="ELSE">
              <block type="move_down"></block>
            </statement>
          </block>
        </next>
      </block>
    </xml>`,
    "dropdown": true,
    "readOnly": true,
    "alertMessage": "Will the flurb make it to the fruit???"
},
"501": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 2,
  flurbCellY: 0,
  fruitCellX: 2,
  fruitCellY: 1,
  flurbPosition: {x: 2, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
      <variables>
        <variable>num</variable>
      </variables>
      <block type="variables_set">
        <field name="VAR">num</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">${getRandomInt(10)}</field>
          </block>
        </value>
        <next>
          <block type="controls_ifelse">
            <value name="IF0">
              <block type="logic_compare">
                <field name="OP">EQ</field>
                <value name="A">
                  <block type="math_number">
                    <field name="NUM">${getRandomInt(10)}</field>
                  </block>
                </value>
                <value name="B">
                  <block type="variables_get">
                    <field name="VAR">num</field>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO0">
              <block type="move_up"></block>
            </statement>
            <statement name="ELSE">
              <block type="move_down"></block>
            </statement>
          </block>
        </next>
      </block>
    </xml>`,
  "dropdown": true,
  "readOnly": true,
  "alertMessage": "Will the flurb make it to the fruit???"
},
"502": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 0,
  flurbCellY: 0,
  fruitCellX: 1,
  fruitCellY: 1,
  flurbPosition: {x: 0, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
      <variables>
        <variable>steps</variable>
      </variables>
      <block type="variables_set">
        <field name="VAR">steps</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">${getRandomInt(10)}</field>
          </block>
        </value>
        <next>
          <block type="controls_ifelse">
            <value name="IF0">
              <block type="logic_compare">
                <field name="OP">EQ</field>
                <value name="A">
                  <block type="variables_get">
                    <field name="VAR">steps</field>
                  </block>
                </value>
                <value name="B">
                  <block type="math_number">
                    <field name="NUM">${getRandomInt(10)}</field>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO0">
              <block type="move_right">
                <next>
                  <block type="move_up"></block>
                </next>
              </block>
            </statement>
            <statement name="ELSE">
              <block type="move_down">
                <next>
                  <block type="move_right"></block>
                </next>
              </block>
            </statement>
          </block>
        </next>
      </block>
    </xml>`,
  "dropdown": true,
  "readOnly": true,
  "alertMessage": "Will the flurb make it to the fruit???"
},
"503": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 2,
  flurbCellY: 0,
  fruitCellX: 0,
  fruitCellY: 0,
  flurbPosition: {x: 2, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">EQ</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(100)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="move_left">
                      <next>
                        <block type="move_left"></block>
                      </next>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="move_right">
                      <next>
                        <block type="move_right"></block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": true,
  "readOnly": false,
  "alertMessage": "Will the flurb make it to the fruit???"
},
"504": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 0,
  flurbCellY: 0,
  fruitCellX: 2,
  fruitCellY: 1,
  flurbPosition: {x: 0, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
      <variables>
        <variable>num1</variable>
        <variable>num2</variable>
        <variable>product</variable>
      </variables>
      <block type="variables_set">
        <field name="VAR">num1</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">${getRandomInt(10)}</field>
          </block>
        </value>
        <next>
          <block type="variables_set">
            <field name="VAR">num2</field>
            <value name="VALUE">
              <block type="math_number">
                <field name="NUM">${getRandomInt(10)}</field>
              </block>
            </value>
            <next>
              <block type="variables_set">
                <field name="VAR">product</field>
                <value name="VALUE">
                  <block type="math_arithmetic">
                    <field name="OP">MULTIPLY</field>
                    <value name="A">
                      <block type="variables_get">
                        <field name="VAR">num1</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="variables_get">
                        <field name="VAR">num2</field>
                      </block>
                    </value>
                  </block>
                </value>
                <next>
          <block type="controls_ifelse">
            <value name="IF0">
                <block type="logic_compare">
                  <field name="OP">GTE</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">product</field>
                    </block>
                  </value>
                  <value name="B">
                      <block type="math_number">
                        <field name="NUM">${getRandomInt(10)}</field>
                      </block>
                  </value>
                </block>
            </value>
            <statement name="DO0">
              <block type="move_left">
              <next>
                <block type="move_left">
                <next>
                <block type="move_up">
              </next>
              </next>
            </statement>
            <statement name="ELSE">
              <block type="move_right">
              <next>
                <block type="move_right">
                <next>
                <block type="move_down">
              </next>
              </next>
            </statement>
            </next>
            </block>
            </next>
            </block>
            </next>
        </block>
      </xml>`,
  "dropdown": true,
  "readOnly": true,
  "alertMessage": "Will the flurb make it to the fruit???"
},
"505": {
"gridHeight": 4,
"gridWidth": 7,
"flurbCellX": 3,
"flurbCellY": 0,
"fruitCellX": 2,
"fruitCellY": 3,
"flurbPosition": { "x": 3, "y": 0 },
"lavaPos": [],
"xml":`
<xml>
  <variables>
  <variable>num1</variable>
  <variable>num2</variable>
  <variable>product</variable>
  </variables>
  <block type="variables_set">
    <field name="VAR">num1</field>
    <value name="VALUE">
      <block type="math_number">
        <field name="NUM">${getRandomInt(10)}</field>
      </block>
    </value>
    <next>
      <block type="variables_set">
        <field name="VAR">num2</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">${getRandomInt(10)}</field>
          </block>
        </value>
        <next>
        <block type="variables_set">
          <field name="VAR">product</field>
          <value name="VALUE">
            <block type="math_arithmetic">
              <field name="OP">MULTIPLY</field>
              <value name="A">
                <block type="variables_get">
                  <field name="VAR">num1</field>
                </block>
              </value>
              <value name="B">
                <block type="variables_get">
                  <field name="VAR">num2</field>
                </block>
              </value>
            </block>
          </value>
      <next>
    <block type="controls_ifelse">
      <value name="IF0">
          <block type="logic_compare">
            <field name="OP">EQ</field>
            <value name="A">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(100)}</field>
                </block>
            </value>
            <value name="B">
                <block type="variables_get">
                  <field name="VAR">product</field>
                </block>
            </value>
          </block>
      </value>
      <statement name="DO0">
          <block type="controls_repeat">
            <field name="TIMES">3</field>
            <statement name="DO">
                <block type="move_down">
            </statement>
            <next>
                <block type="move_right">
            </next>
          </block>
      </statement>
      <statement name="ELSE">
          <block type="move_left">
            <next>
                <block type="controls_repeat">
                  <field name="TIMES">3</field>
                  <statement name="DO">
                      <block type="move_down">
                  </statement>
                </block>
                </next>
                </block>
                </next>
                </block>
            </next>
          </block>
      </statement>
    </block>
  </xml>`,
"dropdown": true,
"readOnly": true,
"alertMessage": "Will the flurb make it to the fruit???"
},
"506": {
"gridHeight": 5,
"gridWidth": 6,
"flurbCellX": 2,
"flurbCellY": 0,
"fruitCellX": 4,
"fruitCellY": 3,
"flurbPosition": { "x": 2, "y": 0 },
"lavaPos": [],
"xml": 
  `<xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(15)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">LT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(225)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="move_left">
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">4</field>
                          <statement name="DO">
                            <block type="move_down"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">LT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num2</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">4</field>
                          <statement name="DO">
                            <block type="move_down"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">2</field>
                              <statement name="DO">
                                <block type="move_right"></block>
                              </statement>
                              <next>
                                <block type="move_up"></block>
                              </next>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="controls_repeat">
                          <field name="TIMES">2</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_down"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                    </block>
                  </statement>
                </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
"dropdown": true,
"readOnly": true,
"alertMessage": "Will the flurb make it to the fruit???"
},
"507": {
  "gridHeight": 5,
  "gridWidth": 6,
  "flurbCellX": 0,
  "flurbCellY": 0,
  "fruitCellX": 4,
  "fruitCellY": 3,
  "flurbPosition": { "x": 0, "y": 0 },
  "lavaPos": [],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(15)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(225)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num2</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">4</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_down"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_down"></block>
                      </statement>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">3</field>
                          <statement name="DO">
                            <block type="move_up"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": true,
  "readOnly": true,
  "alertMessage": "Will the flurb make it to the fruit???"
}, 
"508": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 2,
  flurbCellY: 0,
  fruitCellX: 0,
  fruitCellY: 0,
  flurbPosition: {x: 2, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">EQ</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(100)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="move_left">
                      <next>
                        <block type="move_right"></block>
                      </next>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="move_right">
                      <next>
                        <block type="move_left"></block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"509": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 0,
  flurbCellY: 0,
  fruitCellX: 2,
  fruitCellY: 1,
  flurbPosition: {x: 0, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
      <variables>
        <variable>num1</variable>
        <variable>num2</variable>
        <variable>product</variable>
      </variables>
      <block type="variables_set">
        <field name="VAR">num1</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">${getRandomInt(10)}</field>
          </block>
        </value>
        <next>
          <block type="variables_set">
            <field name="VAR">num2</field>
            <value name="VALUE">
              <block type="math_number">
                <field name="NUM">${getRandomInt(10)}</field>
              </block>
            </value>
            <next>
              <block type="variables_set">
                <field name="VAR">product</field>
                <value name="VALUE">
                  <block type="math_arithmetic">
                    <field name="OP">MULTIPLY</field>
                    <value name="A">
                      <block type="variables_get">
                        <field name="VAR">num1</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="variables_get">
                        <field name="VAR">num2</field>
                      </block>
                    </value>
                  </block>
                </value>
                <next>
          <block type="controls_ifelse">
            <value name="IF0">
                <block type="logic_compare">
                  <field name="OP">GTE</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">product</field>
                    </block>
                  </value>
                  <value name="B">
                      <block type="math_number">
                        <field name="NUM">${getRandomInt(10)}</field>
                      </block>
                  </value>
                </block>
            </value>
            <statement name="DO0">
              <block type="move_right">
              <next>
                <block type="move_left">
                <next>
                <block type="move_up">
              </next>
              </next>
            </statement>
            <statement name="ELSE">
              <block type="move_right">
              <next>
                <block type="move_left">
                <next>
                <block type="move_down">
              </next>
              </next>
            </statement>
            </next>
            </block>
            </next>
            </block>
            </next>
        </block>
      </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"510": {
"gridHeight": 4,
"gridWidth": 7,
"flurbCellX": 3,
"flurbCellY": 0,
"fruitCellX": 2,
"fruitCellY": 3,
"flurbPosition": { "x": 3, "y": 0 },
"lavaPos": [],
"xml":`
<xml>
  <variables>
  <variable>num1</variable>
  <variable>num2</variable>
  <variable>product</variable>
  </variables>
  <block type="variables_set">
    <field name="VAR">num1</field>
    <value name="VALUE">
      <block type="math_number">
        <field name="NUM">${getRandomInt(10)}</field>
      </block>
    </value>
    <next>
      <block type="variables_set">
        <field name="VAR">num2</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">${getRandomInt(10)}</field>
          </block>
        </value>
        <next>
        <block type="variables_set">
          <field name="VAR">product</field>
          <value name="VALUE">
            <block type="math_arithmetic">
              <field name="OP">MULTIPLY</field>
              <value name="A">
                <block type="variables_get">
                  <field name="VAR">num1</field>
                </block>
              </value>
              <value name="B">
                <block type="variables_get">
                  <field name="VAR">num2</field>
                </block>
              </value>
            </block>
          </value>
      <next>
    <block type="controls_ifelse">
      <value name="IF0">
          <block type="logic_compare">
            <field name="OP">EQ</field>
            <value name="A">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(100)}</field>
                </block>
            </value>
            <value name="B">
                <block type="variables_get">
                  <field name="VAR">product</field>
                </block>
            </value>
          </block>
      </value>
      <statement name="DO0">
          <block type="controls_repeat">
            <field name="TIMES">3</field>
            <statement name="DO">
                <block type="move_down">
            </statement>
            <next>
                <block type="move_right">
            </next>
          </block>
      </statement>
      <statement name="ELSE">
          <block type="move_left">
            <next>
                <block type="controls_repeat">
                  <field name="TIMES">3</field>
                  <statement name="DO">
                      <block type="move_up">
                  </statement>
                </block>
                </next>
                </block>
                </next>
                </block>
            </next>
          </block>
      </statement>
    </block>
  </xml>`,
"dropdown": false,
"readOnly": false,
"editDisabled": true,
"alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"511": {
"gridHeight": 5,
"gridWidth": 6,
"flurbCellX": 2,
"flurbCellY": 0,
"fruitCellX": 4,
"fruitCellY": 3,
"flurbPosition": { "x": 2, "y": 0 },
"lavaPos": [],
"xml": 
  `<xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(15)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">LT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(225)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="move_left">
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">4</field>
                          <statement name="DO">
                            <block type="move_down"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">LT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num2</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">4</field>
                          <statement name="DO">
                            <block type="move_down"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">2</field>
                              <statement name="DO">
                                <block type="move_right"></block>
                              </statement>
                              <next>
                                <block type="move_up"></block>
                              </next>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="controls_repeat">
                          <field name="TIMES">2</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">5</field>
                              <statement name="DO">
                                <block type="move_up"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                    </block>
                  </statement>
                </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
"dropdown": false,
"readOnly": false,
"editDisabled": true,
"alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"512": {
  "gridHeight": 5,
  "gridWidth": 6,
  "flurbCellX": 0,
  "flurbCellY": 0,
  "fruitCellX": 4,
  "fruitCellY": 3,
  "flurbPosition": { "x": 0, "y": 0 },
  "lavaPos": [],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(15)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(225)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num2</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">4</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_up"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_down"></block>
                      </statement>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">3</field>
                          <statement name="DO">
                            <block type="move_up"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"513": {
  "gridHeight": 5,
  "gridWidth": 6,
  "flurbCellX": 0,
  "flurbCellY": 0,
  "fruitCellX": 4,
  "fruitCellY": 3,
  "flurbPosition": { "x": 0, "y": 0 },
  "lavaPos": [],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>num3</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(15)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
        <block type="variables_set">
          <field name="VAR">num3</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(225)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num3</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">5</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_left"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_down"></block>
                      </statement>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">3</field>
                          <statement name="DO">
                            <block type="move_up"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
              </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"514": {
  gridHeight: 3,
  gridWidth: 5,
  flurbCellX: 0,
  flurbCellY: 0,
  fruitCellX: 4,
  fruitCellY: 0,
  flurbPosition: {x: 0, y: 0},
  lavaPos: [[1,0,"|"], [2,0,"|"], [3,0,"|"], [1,1,"|"], [2,1,"|"], [3,1,"|"]],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>num3</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(15)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
        <block type="variables_set">
          <field name="VAR">num3</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(225)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num3</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">5</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_left"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_down"></block>
                      </statement>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">3</field>
                          <statement name="DO">
                            <block type="move_up"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
              </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"515": {
  "gridHeight": 6,
  "gridWidth": 6,
  "flurbCellX": 0,
  "flurbCellY": 5,
  "fruitCellX": 5,
  "fruitCellY": 0,
  "flurbPosition": { "x": 0, "y": 5 },
  "lavaPos": [[0, 0, "|"], [1, 3, "|"], [3, 3, "|"], [4, 4, "|"], [2, 1, "|"], [2, 4, "|"], [3, 1, "|"], [1, 2, "|"], [5, 5, "|"]],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>num3</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(15)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
        <block type="variables_set">
          <field name="VAR">num3</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(225)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num3</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">5</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_right"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_up"></block>
                      </statement>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">3</field>
                          <statement name="DO">
                            <block type="move_up"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
              </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"516": {
  "gridHeight": 8,
  "gridWidth": 8,
  "flurbCellX": 0,
  "flurbCellY": 7,
  "fruitCellX": 7,
  "fruitCellY": 0,
  "flurbPosition": { "x": 0, "y": 7 },
  "lavaPos": [
    [1, 6, "|"], [2, 6, "|"], [3, 6, "|"], [4, 6, "|"], [5, 6, "|"], [6, 6, "|"],
    [2, 5, "|"], [3, 5, "|"], [4, 5, "|"], [5, 5, "|"],
    [1, 3, "|"], [2, 3, "|"], [3, 3, "|"],
    [0, 2, "|"], [1, 2, "|"], [2, 2, "|"],
    [1, 1, "|"], [0, 0, "|"], [7, 7, "|"]
  ],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>num3</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(15)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
        <block type="variables_set">
          <field name="VAR">num3</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(225)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num3</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">5</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_right"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_up"></block>
                      </statement>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">3</field>
                          <statement name="DO">
                            <block type="move_up"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
              </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"517": {
  "gridHeight": 8,
  "gridWidth": 8,
  "flurbCellX": 7,
  "flurbCellY": 2,
  "fruitCellX": 1,
  "fruitCellY": 3,
  "flurbPosition": {"x": 7, "y": 0},
  "lavaPos": [
    [0, 0, "|"], [1, 0, "|"], [2, 0, "|"], [3, 0, "|"], [4, 0, "|"], [5, 0, "|"], 
    [6, 0, "|"], [7, 0, "|"], [0, 1, "|"], [0, 2, "|"], [1, 2, "|"], [2, 2, "|"],
    [4, 2, "|"], [5, 2, "|"], [6, 2, "|"], [0, 3, "|"], [2, 3, "|"], [4, 3, "|"],
    [6, 3, "|"], [7, 3, "|"], [0, 4, "|"], [2, 4, "|"], [4, 4, "|"], [5, 4, "|"],
    [7, 4, "|"], [0, 6, "|"], [1, 6, "|"], [2, 6, "|"], [3, 6, "|"], [4, 6, "|"],
    [5, 6, "|"], [6, 6, "|"], [0, 7, "|"], [1, 7, "|"], [2, 7, "|"], [7, 7, "|"]
  ],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>num3</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(15)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
        <block type="variables_set">
          <field name="VAR">num3</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(225)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num3</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">5</field>
                          <statement name="DO">
                            <block type="move_down"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_right"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_up"></block>
                      </statement>
                      <next>
                          <block type="move_left"></block>
                        </next>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">3</field>
                          <statement name="DO">
                            <block type="move_up"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
              </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"518": {
  "gridHeight": 8,
  "gridWidth": 8,
  "flurbCellX": 7,
  "flurbCellY": 0,
  "fruitCellX": 5,
  "fruitCellY": 6,
  "flurbPosition": { "x": 4, "y": 0 },
  "lavaPos": [[0, 2, "|"], [1, 0, "|"], [2, 2, "|"], [2, 3, "|"], [3, 0, "|"], [4, 2, "|"]
              [4, 2, "|"], [5, 2, "|"], [6, 2, "|"], [0, 3, "|"], [2, 3, "|"], [4, 3, "|"],
              [6, 3, "|"], [7, 3, "|"], [0, 4, "|"], [2, 4, "|"], [4, 4, "|"], [5, 4, "|"],
              [7, 4, "|"], [0, 6, "|"], [1, 6, "|"], [2, 6, "|"], [3, 6, "|"], [4, 6, "|"]],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>num3</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(15)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
        <block type="variables_set">
          <field name="VAR">num3</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(225)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num3</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">5</field>
                          <statement name="DO">
                            <block type="move_right">
                              <next>
                                <block type="move_left">
                                  <next>
                                    <block type="move_down"></block>
                                  </next>
                                </block>
                              </next>
                            </block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_right">
                                  <next>
                                    <block type="move_down"></block>
                                  </next>
                                </block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_up"></block>
                      </statement>
                      <next>
                        <block type="move_down"></block>
                      </next>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                            <block type="move_up"></block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
              </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"519": {
  "gridHeight": 8,
  "gridWidth": 8,
  "flurbCellX": 0,
  "flurbCellY": 7,
  "fruitCellX": 0,
  "fruitCellY": 3,
  "flurbPosition": { "x": 0, "y": 7 },
  "lavaPos": [[0, 5, "|"], [1, 1, "|"], [1, 4, "|"], [2, 2, "|"], [2, 6, "|"], [3, 1, "|"], [3, 4, "|"], [4, 2, "|"], [4, 5, "|"], [4, 7, "|"], [5, 1, "|"], [5, 4, "|"], [5, 6, "|"], [6, 3, "|"], [6, 7, "|"]],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>num3</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(15)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
        <block type="variables_set">
          <field name="VAR">num3</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(225)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num3</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">5</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_right"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_up"></block>
                      </statement>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">3</field>
                          <statement name="DO">
                            <block type="move_up"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
              </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"520": {
  "gridHeight": 5,
  "gridWidth": 5,
  "flurbCellX": 0,
  "flurbCellY": 0,
  "fruitCellX": 4,
  "fruitCellY": 1,
  "flurbPosition": { "x": 0, "y": 0 },
  "lavaPos": [[0, 1, "|"], [0, 2, "|"], [1, 3, "|"], [2, 0, "|"], [2, 1, "|"], [3, 2, "|"], [3, 3, "|"], [4, 0, "|"]],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>num3</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(15)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
        <block type="variables_set">
          <field name="VAR">num3</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(15)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(225)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num3</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">5</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_right"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_down"></block>
                      </statement>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_down"></block>
                      </statement>
                      <next> 
                        <block type="move_up">
                          <next> 
                            <block type="move_up">
                              <next> 
                                <block type="move_up"></block>
                              </next>
                            </block>
                          </next>
                        </block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
              </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},





"400": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 1,
  flurbCellY: 1,
  fruitCellX: 1,
  fruitCellY: 0,
  flurbPosition: {x: 1, y: 1},
  lavaPos: [],
  "xml":
    `<xml>
      <variables>
        <variable>num</variable>
      </variables>
      <block type="variables_set">
        <field name="VAR">num</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">${getRandomInt(10)}</field>
          </block>
        </value>
        <next>
          <block type="controls_if">
            <mutation else="1"></mutation>
            <value name="IF0">
              <block type="logic_compare">
                <field name="OP">EQ</field>
                <value name="A">
                  <block type="variables_get">
                    <field name="VAR">num</field>
                  </block>
                </value>
                <value name="B">
                  <block type="math_number">
                    <field name="NUM">${getRandomInt(10)}</field>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO0">
              <block type="move_up"></block>
            </statement>
            <statement name="ELSE">
              <block type="move_down"></block>
            </statement>
          </block>
        </next>
      </block>
    </xml>`,
    "dropdown": true,
    "readOnly": true,
    "alertMessage": "Will the flurb make it to the fruit???"
},
"401": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 2,
  flurbCellY: 0,
  fruitCellX: 2,
  fruitCellY: 1,
  flurbPosition: {x: 2, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
      <variables>
        <variable>num</variable>
      </variables>
      <block type="variables_set">
        <field name="VAR">num</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">${getRandomInt(10)}</field>
          </block>
        </value>
        <next>
          <block type="controls_ifelse">
            <value name="IF0">
              <block type="logic_compare">
                <field name="OP">EQ</field>
                <value name="A">
                  <block type="math_number">
                    <field name="NUM">${getRandomInt(10)}</field>
                  </block>
                </value>
                <value name="B">
                  <block type="variables_get">
                    <field name="VAR">num</field>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO0">
              <block type="move_up"></block>
            </statement>
            <statement name="ELSE">
              <block type="move_down"></block>
            </statement>
          </block>
        </next>
      </block>
    </xml>`,
  "dropdown": true,
  "readOnly": true,
  "alertMessage": "Will the flurb make it to the fruit???"
},
"402": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 0,
  flurbCellY: 0,
  fruitCellX: 1,
  fruitCellY: 1,
  flurbPosition: {x: 0, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
      <variables>
        <variable>steps</variable>
      </variables>
      <block type="variables_set">
        <field name="VAR">steps</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">${getRandomInt(10)}</field>
          </block>
        </value>
        <next>
          <block type="controls_ifelse">
            <value name="IF0">
              <block type="logic_compare">
                <field name="OP">EQ</field>
                <value name="A">
                  <block type="variables_get">
                    <field name="VAR">steps</field>
                  </block>
                </value>
                <value name="B">
                  <block type="math_number">
                    <field name="NUM">${getRandomInt(10)}</field>
                  </block>
                </value>
              </block>
            </value>
            <statement name="DO0">
              <block type="move_right">
                <next>
                  <block type="move_up"></block>
                </next>
              </block>
            </statement>
            <statement name="ELSE">
              <block type="move_down">
                <next>
                  <block type="move_right"></block>
                </next>
              </block>
            </statement>
          </block>
        </next>
      </block>
    </xml>`,
  "dropdown": true,
  "readOnly": true,
  "alertMessage": "Will the flurb make it to the fruit???"
},
"403": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 2,
  flurbCellY: 0,
  fruitCellX: 0,
  fruitCellY: 0,
  flurbPosition: {x: 2, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">EQ</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(100)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="move_left">
                      <next>
                        <block type="move_left"></block>
                      </next>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="move_right">
                      <next>
                        <block type="move_right"></block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": true,
  "readOnly": false,
  "alertMessage": "Will the flurb make it to the fruit???"
},
"404": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 0,
  flurbCellY: 0,
  fruitCellX: 2,
  fruitCellY: 1,
  flurbPosition: {x: 0, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
      <variables>
        <variable>num1</variable>
        <variable>num2</variable>
        <variable>product</variable>
      </variables>
      <block type="variables_set">
        <field name="VAR">num1</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">${getRandomInt(10)}</field>
          </block>
        </value>
        <next>
          <block type="variables_set">
            <field name="VAR">num2</field>
            <value name="VALUE">
              <block type="math_number">
                <field name="NUM">${getRandomInt(10)}</field>
              </block>
            </value>
            <next>
              <block type="variables_set">
                <field name="VAR">product</field>
                <value name="VALUE">
                  <block type="math_arithmetic">
                    <field name="OP">MULTIPLY</field>
                    <value name="A">
                      <block type="variables_get">
                        <field name="VAR">num1</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="variables_get">
                        <field name="VAR">num2</field>
                      </block>
                    </value>
                  </block>
                </value>
                <next>
          <block type="controls_ifelse">
            <value name="IF0">
                <block type="logic_compare">
                  <field name="OP">GTE</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">product</field>
                    </block>
                  </value>
                  <value name="B">
                      <block type="math_number">
                        <field name="NUM">${getRandomInt(10)}</field>
                      </block>
                  </value>
                </block>
            </value>
            <statement name="DO0">
              <block type="move_left">
              <next>
                <block type="move_left">
                <next>
                <block type="move_up">
              </next>
              </next>
            </statement>
            <statement name="ELSE">
              <block type="move_right">
              <next>
                <block type="move_right">
                <next>
                <block type="move_down">
              </next>
              </next>
            </statement>
            </next>
            </block>
            </next>
            </block>
            </next>
        </block>
      </xml>`,
  "dropdown": true,
  "readOnly": true,
  "alertMessage": "Will the flurb make it to the fruit???"
},
"405": {
"gridHeight": 4,
"gridWidth": 7,
"flurbCellX": 3,
"flurbCellY": 0,
"fruitCellX": 2,
"fruitCellY": 3,
"flurbPosition": { "x": 3, "y": 0 },
"lavaPos": [],
"xml":`
<xml>
  <variables>
  <variable>num1</variable>
  <variable>num2</variable>
  <variable>product</variable>
  </variables>
  <block type="variables_set">
    <field name="VAR">num1</field>
    <value name="VALUE">
      <block type="math_number">
        <field name="NUM">${getRandomInt(10)}</field>
      </block>
    </value>
    <next>
      <block type="variables_set">
        <field name="VAR">num2</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">${getRandomInt(10)}</field>
          </block>
        </value>
        <next>
        <block type="variables_set">
          <field name="VAR">product</field>
          <value name="VALUE">
            <block type="math_arithmetic">
              <field name="OP">MULTIPLY</field>
              <value name="A">
                <block type="variables_get">
                  <field name="VAR">num1</field>
                </block>
              </value>
              <value name="B">
                <block type="variables_get">
                  <field name="VAR">num2</field>
                </block>
              </value>
            </block>
          </value>
      <next>
    <block type="controls_ifelse">
      <value name="IF0">
          <block type="logic_compare">
            <field name="OP">EQ</field>
            <value name="A">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(100)}</field>
                </block>
            </value>
            <value name="B">
                <block type="variables_get">
                  <field name="VAR">product</field>
                </block>
            </value>
          </block>
      </value>
      <statement name="DO0">
          <block type="controls_repeat">
            <field name="TIMES">3</field>
            <statement name="DO">
                <block type="move_down">
            </statement>
            <next>
                <block type="move_right">
            </next>
          </block>
      </statement>
      <statement name="ELSE">
          <block type="move_left">
            <next>
                <block type="controls_repeat">
                  <field name="TIMES">3</field>
                  <statement name="DO">
                      <block type="move_down">
                  </statement>
                </block>
                </next>
                </block>
                </next>
                </block>
            </next>
          </block>
      </statement>
    </block>
  </xml>`,
"dropdown": true,
"readOnly": true,
"alertMessage": "Will the flurb make it to the fruit???"
},
"406": {
"gridHeight": 5,
"gridWidth": 6,
"flurbCellX": 2,
"flurbCellY": 0,
"fruitCellX": 4,
"fruitCellY": 3,
"flurbPosition": { "x": 2, "y": 0 },
"lavaPos": [],
"xml": 
  `<xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">LT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(100)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="move_left">
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">4</field>
                          <statement name="DO">
                            <block type="move_down"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">LT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num2</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">4</field>
                          <statement name="DO">
                            <block type="move_down"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">2</field>
                              <statement name="DO">
                                <block type="move_right"></block>
                              </statement>
                              <next>
                                <block type="move_up"></block>
                              </next>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="controls_repeat">
                          <field name="TIMES">2</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_down"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                    </block>
                  </statement>
                </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
"dropdown": true,
"readOnly": true,
"alertMessage": "Will the flurb make it to the fruit???"
},
"407": {
  "gridHeight": 5,
  "gridWidth": 6,
  "flurbCellX": 0,
  "flurbCellY": 0,
  "fruitCellX": 4,
  "fruitCellY": 3,
  "flurbPosition": { "x": 0, "y": 0 },
  "lavaPos": [],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(100)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num2</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">4</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_down"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_down"></block>
                      </statement>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">3</field>
                          <statement name="DO">
                            <block type="move_up"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": true,
  "readOnly": true,
  "alertMessage": "Will the flurb make it to the fruit???"
}, 
"408": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 2,
  flurbCellY: 0,
  fruitCellX: 0,
  fruitCellY: 0,
  flurbPosition: {x: 2, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">EQ</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(100)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="move_left">
                      <next>
                        <block type="move_right"></block>
                      </next>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="move_right">
                      <next>
                        <block type="move_left"></block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"409": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 0,
  flurbCellY: 0,
  fruitCellX: 2,
  fruitCellY: 1,
  flurbPosition: {x: 0, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
      <variables>
        <variable>num1</variable>
        <variable>num2</variable>
        <variable>product</variable>
      </variables>
      <block type="variables_set">
        <field name="VAR">num1</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">${getRandomInt(10)}</field>
          </block>
        </value>
        <next>
          <block type="variables_set">
            <field name="VAR">num2</field>
            <value name="VALUE">
              <block type="math_number">
                <field name="NUM">${getRandomInt(10)}</field>
              </block>
            </value>
            <next>
              <block type="variables_set">
                <field name="VAR">product</field>
                <value name="VALUE">
                  <block type="math_arithmetic">
                    <field name="OP">MULTIPLY</field>
                    <value name="A">
                      <block type="variables_get">
                        <field name="VAR">num1</field>
                      </block>
                    </value>
                    <value name="B">
                      <block type="variables_get">
                        <field name="VAR">num2</field>
                      </block>
                    </value>
                  </block>
                </value>
                <next>
          <block type="controls_ifelse">
            <value name="IF0">
                <block type="logic_compare">
                  <field name="OP">GTE</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">product</field>
                    </block>
                  </value>
                  <value name="B">
                      <block type="math_number">
                        <field name="NUM">${getRandomInt(10)}</field>
                      </block>
                  </value>
                </block>
            </value>
            <statement name="DO0">
              <block type="move_right">
              <next>
                <block type="move_left">
                <next>
                <block type="move_up">
              </next>
              </next>
            </statement>
            <statement name="ELSE">
              <block type="move_right">
              <next>
                <block type="move_left">
                <next>
                <block type="move_down">
              </next>
              </next>
            </statement>
            </next>
            </block>
            </next>
            </block>
            </next>
        </block>
      </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"410": {
"gridHeight": 4,
"gridWidth": 7,
"flurbCellX": 3,
"flurbCellY": 0,
"fruitCellX": 2,
"fruitCellY": 3,
"flurbPosition": { "x": 3, "y": 0 },
"lavaPos": [],
"xml":`
<xml>
  <variables>
  <variable>num1</variable>
  <variable>num2</variable>
  <variable>product</variable>
  </variables>
  <block type="variables_set">
    <field name="VAR">num1</field>
    <value name="VALUE">
      <block type="math_number">
        <field name="NUM">${getRandomInt(10)}</field>
      </block>
    </value>
    <next>
      <block type="variables_set">
        <field name="VAR">num2</field>
        <value name="VALUE">
          <block type="math_number">
            <field name="NUM">${getRandomInt(10)}</field>
          </block>
        </value>
        <next>
        <block type="variables_set">
          <field name="VAR">product</field>
          <value name="VALUE">
            <block type="math_arithmetic">
              <field name="OP">MULTIPLY</field>
              <value name="A">
                <block type="variables_get">
                  <field name="VAR">num1</field>
                </block>
              </value>
              <value name="B">
                <block type="variables_get">
                  <field name="VAR">num2</field>
                </block>
              </value>
            </block>
          </value>
      <next>
    <block type="controls_ifelse">
      <value name="IF0">
          <block type="logic_compare">
            <field name="OP">EQ</field>
            <value name="A">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(100)}</field>
                </block>
            </value>
            <value name="B">
                <block type="variables_get">
                  <field name="VAR">product</field>
                </block>
            </value>
          </block>
      </value>
      <statement name="DO0">
          <block type="controls_repeat">
            <field name="TIMES">3</field>
            <statement name="DO">
                <block type="move_down">
            </statement>
            <next>
                <block type="move_right">
            </next>
          </block>
      </statement>
      <statement name="ELSE">
          <block type="move_left">
            <next>
                <block type="controls_repeat">
                  <field name="TIMES">3</field>
                  <statement name="DO">
                      <block type="move_up">
                  </statement>
                </block>
                </next>
                </block>
                </next>
                </block>
            </next>
          </block>
      </statement>
    </block>
  </xml>`,
"dropdown": false,
"readOnly": false,
"editDisabled": true,
"alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"411": {
"gridHeight": 5,
"gridWidth": 6,
"flurbCellX": 2,
"flurbCellY": 0,
"fruitCellX": 4,
"fruitCellY": 3,
"flurbPosition": { "x": 2, "y": 0 },
"lavaPos": [],
"xml": 
  `<xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">LT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(100)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="move_left">
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">4</field>
                          <statement name="DO">
                            <block type="move_down"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">LT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num2</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">4</field>
                          <statement name="DO">
                            <block type="move_down"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">2</field>
                              <statement name="DO">
                                <block type="move_right"></block>
                              </statement>
                              <next>
                                <block type="move_up"></block>
                              </next>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="controls_repeat">
                          <field name="TIMES">2</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">5</field>
                              <statement name="DO">
                                <block type="move_up"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                    </block>
                  </statement>
                </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
"dropdown": false,
"readOnly": false,
"editDisabled": true,
"alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"412": {
  "gridHeight": 5,
  "gridWidth": 6,
  "flurbCellX": 0,
  "flurbCellY": 0,
  "fruitCellX": 4,
  "fruitCellY": 3,
  "flurbPosition": { "x": 0, "y": 0 },
  "lavaPos": [],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(100)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num2</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">4</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_up"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_down"></block>
                      </statement>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">3</field>
                          <statement name="DO">
                            <block type="move_up"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"413": {
  "gridHeight": 5,
  "gridWidth": 6,
  "flurbCellX": 0,
  "flurbCellY": 0,
  "fruitCellX": 4,
  "fruitCellY": 3,
  "flurbPosition": { "x": 0, "y": 0 },
  "lavaPos": [],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>num3</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
        <block type="variables_set">
          <field name="VAR">num3</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(100)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num3</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">5</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_left"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_down"></block>
                      </statement>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">3</field>
                          <statement name="DO">
                            <block type="move_up"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
              </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"414": {
  gridHeight: 3,
  gridWidth: 5,
  flurbCellX: 0,
  flurbCellY: 0,
  fruitCellX: 4,
  fruitCellY: 0,
  flurbPosition: {x: 0, y: 0},
  lavaPos: [[1,0,"|"], [2,0,"|"], [3,0,"|"], [1,1,"|"], [2,1,"|"], [3,1,"|"]],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>num3</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
        <block type="variables_set">
          <field name="VAR">num3</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(100)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num3</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">5</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_left"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_down"></block>
                      </statement>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">3</field>
                          <statement name="DO">
                            <block type="move_up"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
              </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"415": {
  "gridHeight": 6,
  "gridWidth": 6,
  "flurbCellX": 0,
  "flurbCellY": 5,
  "fruitCellX": 5,
  "fruitCellY": 0,
  "flurbPosition": { "x": 0, "y": 5 },
  "lavaPos": [[0, 0, "|"], [1, 3, "|"], [3, 3, "|"], [4, 4, "|"], [2, 1, "|"], [2, 4, "|"], [3, 1, "|"], [1, 2, "|"], [5, 5, "|"]],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>num3</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
        <block type="variables_set">
          <field name="VAR">num3</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(100)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num3</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">5</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_right"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_up"></block>
                      </statement>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">3</field>
                          <statement name="DO">
                            <block type="move_up"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
              </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"416": {
  "gridHeight": 8,
  "gridWidth": 8,
  "flurbCellX": 0,
  "flurbCellY": 7,
  "fruitCellX": 7,
  "fruitCellY": 0,
  "flurbPosition": { "x": 0, "y": 7 },
  "lavaPos": [
    [1, 6, "|"], [2, 6, "|"], [3, 6, "|"], [4, 6, "|"], [5, 6, "|"], [6, 6, "|"],
    [2, 5, "|"], [3, 5, "|"], [4, 5, "|"], [5, 5, "|"],
    [1, 3, "|"], [2, 3, "|"], [3, 3, "|"],
    [0, 2, "|"], [1, 2, "|"], [2, 2, "|"],
    [1, 1, "|"], [0, 0, "|"], [7, 7, "|"]
  ],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>num3</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
        <block type="variables_set">
          <field name="VAR">num3</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(100)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num3</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">5</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_right"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_up"></block>
                      </statement>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">3</field>
                          <statement name="DO">
                            <block type="move_up"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
              </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"417": {
  "gridHeight": 8,
  "gridWidth": 8,
  "flurbCellX": 7,
  "flurbCellY": 2,
  "fruitCellX": 1,
  "fruitCellY": 3,
  "flurbPosition": {"x": 7, "y": 0},
  "lavaPos": [
    [0, 0, "|"], [1, 0, "|"], [2, 0, "|"], [3, 0, "|"], [4, 0, "|"], [5, 0, "|"], 
    [6, 0, "|"], [7, 0, "|"], [0, 1, "|"], [0, 2, "|"], [1, 2, "|"], [2, 2, "|"],
    [4, 2, "|"], [5, 2, "|"], [6, 2, "|"], [0, 3, "|"], [2, 3, "|"], [4, 3, "|"],
    [6, 3, "|"], [7, 3, "|"], [0, 4, "|"], [2, 4, "|"], [4, 4, "|"], [5, 4, "|"],
    [7, 4, "|"], [0, 6, "|"], [1, 6, "|"], [2, 6, "|"], [3, 6, "|"], [4, 6, "|"],
    [5, 6, "|"], [6, 6, "|"], [0, 7, "|"], [1, 7, "|"], [2, 7, "|"], [7, 7, "|"]
  ],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>num3</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
        <block type="variables_set">
          <field name="VAR">num3</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(100)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num3</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">5</field>
                          <statement name="DO">
                            <block type="move_down"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_right"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_up"></block>
                      </statement>
                      <next>
                          <block type="move_left"></block>
                        </next>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">3</field>
                          <statement name="DO">
                            <block type="move_up"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
              </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"418": {
  "gridHeight": 8,
  "gridWidth": 8,
  "flurbCellX": 7,
  "flurbCellY": 0,
  "fruitCellX": 5,
  "fruitCellY": 6,
  "flurbPosition": { "x": 4, "y": 0 },
  "lavaPos": [[0, 2, "|"], [1, 0, "|"], [2, 2, "|"], [2, 3, "|"], [3, 0, "|"], [4, 2, "|"]
              [4, 2, "|"], [5, 2, "|"], [6, 2, "|"], [0, 3, "|"], [2, 3, "|"], [4, 3, "|"],
              [6, 3, "|"], [7, 3, "|"], [0, 4, "|"], [2, 4, "|"], [4, 4, "|"], [5, 4, "|"],
              [7, 4, "|"], [0, 6, "|"], [1, 6, "|"], [2, 6, "|"], [3, 6, "|"], [4, 6, "|"]],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>num3</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
        <block type="variables_set">
          <field name="VAR">num3</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(100)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num3</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">5</field>
                          <statement name="DO">
                            <block type="move_right">
                              <next>
                                <block type="move_left">
                                  <next>
                                    <block type="move_down"></block>
                                  </next>
                                </block>
                              </next>
                            </block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_right">
                                  <next>
                                    <block type="move_down"></block>
                                  </next>
                                </block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_up"></block>
                      </statement>
                      <next>
                        <block type="move_down"></block>
                      </next>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                            <block type="move_up"></block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
              </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"419": {
  "gridHeight": 8,
  "gridWidth": 8,
  "flurbCellX": 0,
  "flurbCellY": 7,
  "fruitCellX": 0,
  "fruitCellY": 3,
  "flurbPosition": { "x": 0, "y": 7 },
  "lavaPos": [[0, 5, "|"], [1, 1, "|"], [1, 4, "|"], [2, 2, "|"], [2, 6, "|"], [3, 1, "|"], [3, 4, "|"], [4, 2, "|"], [4, 5, "|"], [4, 7, "|"], [5, 1, "|"], [5, 4, "|"], [5, 6, "|"], [6, 3, "|"], [6, 7, "|"]],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>num3</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
        <block type="variables_set">
          <field name="VAR">num3</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(100)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num3</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">5</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_right"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_up"></block>
                      </statement>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_left"></block>
                      </statement>
                      <next>
                        <block type="controls_repeat">
                          <field name="TIMES">3</field>
                          <statement name="DO">
                            <block type="move_up"></block>
                          </statement>
                        </block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
              </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"420": {
  "gridHeight": 5,
  "gridWidth": 5,
  "flurbCellX": 0,
  "flurbCellY": 0,
  "fruitCellX": 4,
  "fruitCellY": 1,
  "flurbPosition": { "x": 0, "y": 0 },
  "lavaPos": [[0, 1, "|"], [0, 2, "|"], [1, 3, "|"], [2, 0, "|"], [2, 1, "|"], [3, 2, "|"], [3, 3, "|"], [4, 0, "|"]],
  "xml": `
  <xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>num3</variable>
      <variable>product</variable>
    </variables>
    <block type="variables_set">
      <field name="VAR">num1</field>
      <value name="VALUE">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <next>
        <block type="variables_set">
          <field name="VAR">num2</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
        <block type="variables_set">
          <field name="VAR">num3</field>
          <value name="VALUE">
            <block type="math_number">
              <field name="NUM">${getRandomInt(10)}</field>
            </block>
          </value>
          <next>
            <block type="variables_set">
              <field name="VAR">product</field>
              <value name="VALUE">
                <block type="math_arithmetic">
                  <field name="OP">MULTIPLY</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">num1</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="variables_get">
                      <field name="VAR">num2</field>
                    </block>
                  </value>
                </block>
              </value>
              <next>
                <block type="controls_ifelse">
                  <value name="IF0">
                    <block type="logic_compare">
                      <field name="OP">GT</field>
                      <value name="A">
                        <block type="variables_get">
                          <field name="VAR">product</field>
                        </block>
                      </value>
                      <value name="B">
                        <block type="math_number">
                          <field name="NUM">${getRandomInt(100)}</field>
                        </block>
                      </value>
                    </block>
                  </value>
                  <statement name="DO0">
                    <block type="controls_if">
                      <mutation else="1"></mutation>
                      <value name="IF0">
                        <block type="logic_compare">
                          <field name="OP">GT</field>
                          <value name="A">
                            <block type="variables_get">
                              <field name="VAR">num1</field>
                            </block>
                          </value>
                          <value name="B">
                            <block type="variables_get">
                              <field name="VAR">num3</field>
                            </block>
                          </value>
                        </block>
                      </value>
                      <statement name="DO0">
                        <block type="controls_repeat">
                          <field name="TIMES">5</field>
                          <statement name="DO">
                            <block type="move_right"></block>
                          </statement>
                          <next>
                            <block type="controls_repeat">
                              <field name="TIMES">3</field>
                              <statement name="DO">
                                <block type="move_right"></block>
                              </statement>
                            </block>
                          </next>
                        </block>
                      </statement>
                      <statement name="ELSE">
                        <block type="move_down"></block>
                      </statement>
                    </block>
                  </statement>
                  <statement name="ELSE">
                    <block type="controls_repeat">
                      <field name="TIMES">4</field>
                      <statement name="DO">
                        <block type="move_down"></block>
                      </statement>
                      <next> 
                        <block type="move_up"></block>
                      </next>
                    </block>
                  </statement>
                </block>
              </next>
              </block>
              </next>
            </block>
          </next>
        </block>
      </next>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},




"200": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 1,
  flurbCellY: 1,
  fruitCellX: 1,
  fruitCellY: 0,
  flurbPosition: {x: 1, y: 1},
  lavaPos: [],
  "xml":
    `<xml>
    <variables>
      <variable>x</variable>
    </variables>
    <block type="procedures_defnoreturn">
      <mutation>
        <arg name="x"></arg>
      </mutation>
      <field name="NAME">get_fruit</field>
      <comment pinned="false" h="80" w="160">Get the fruit</comment>
      <statement name="STACK">
        <block type="controls_if">
          <mutation else="1"></mutation>
          <value name="IF0">
            <block type="logic_compare">
              <field name="OP">EQ</field>
              <value name="A">
                <block type="variables_get">
                  <field name="VAR">x</field>
                </block>
              </value>
              <value name="B">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(10)}</field>
                </block>
              </value>
            </block>
          </value>
          <statement name="DO0">
            <block type="move_up"></block>
          </statement>
          <statement name="ELSE">
            <block type="move_down"></block>
          </statement>
        </block>
      </statement>
    </block>
    <block type="procedures_callnoreturn" x="48" y="214">
      <mutation name="get_fruit">
        <arg name="x"></arg>
      </mutation>
      <value name="ARG0">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
    </block>
  </xml>`,
    "dropdown": true,
    "readOnly": true,
    "alertMessage": "Will the flurb make it to the fruit???"
},
"201": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 2,
  flurbCellY: 0,
  fruitCellX: 2,
  fruitCellY: 1,
  flurbPosition: {x: 2, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
    <variables>
      <variable>x</variable>
    </variables>
    <block type="procedures_defnoreturn">
      <mutation>
        <arg name="x"></arg>
      </mutation>
      <field name="NAME">get_fruit</field>
      <comment pinned="false" h="80" w="160">Get the fruit</comment>
      <statement name="STACK">
        <block type="controls_if">
          <mutation else="1"></mutation>
          <value name="IF0">
            <block type="logic_compare">
              <field name="OP">EQ</field>
              <value name="A">
                <block type="variables_get">
                  <field name="VAR">x</field>
                </block>
              </value>
              <value name="B">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(10)}</field>
                </block>
              </value>
            </block>
          </value>
          <statement name="DO0">
            <block type="move_up"></block>
          </statement>
          <statement name="ELSE">
            <block type="move_down"></block>
          </statement>
        </block>
      </statement>
    </block>
    <block type="procedures_callnoreturn" x="48" y="214">
      <mutation name="get_fruit">
        <arg name="x"></arg>
      </mutation>
      <value name="ARG0">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
    </block>
  </xml>`,
  "dropdown": true,
  "readOnly": true,
  "alertMessage": "Will the flurb make it to the fruit???"
},
"202": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 0,
  flurbCellY: 0,
  fruitCellX: 1,
  fruitCellY: 1,
  flurbPosition: {x: 0, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
    <variables>
      <variable>steps</variable>
    </variables>
    <block type="procedures_defnoreturn">
      <mutation>
        <arg name="steps"></arg>
      </mutation>
      <field name="NAME">get_fruit</field>
      <comment pinned="false" h="80" w="160">Describe this function...</comment>
      <statement name="STACK">
        <block type="controls_ifelse">
          <value name="IF0">
            <block type="logic_compare">
              <field name="OP">EQ</field>
              <value name="A">
                <block type="variables_get">
                  <field name="VAR">steps</field>
                </block>
              </value>
              <value name="B">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(10)}</field>
                </block>
              </value>
            </block>
          </value>
          <statement name="DO0">
            <block type="move_right">
              <next>
                <block type="move_up"></block>
              </next>
            </block>
          </statement>
          <statement name="ELSE">
            <block type="move_down">
              <next>
                <block type="move_right"></block>
              </next>
            </block>
          </statement>
        </block>
      </statement>
    </block>
    <block type="procedures_callnoreturn" x="80" y="265">
      <mutation name="get_fruit">
        <arg name="steps"></arg>
      </mutation>
      <value name="ARG0">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
    </block>
  </xml>`,
  "dropdown": true,
  "readOnly": true,
  "alertMessage": "Will the flurb make it to the fruit???"
},
"203": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 2,
  flurbCellY: 0,
  fruitCellX: 0,
  fruitCellY: 0,
  flurbPosition: {x: 2, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
    <variables>
      <variable>x</variable>
      <variable>y</variable>
      <variable>product</variable>
    </variables>
    <block type="procedures_defnoreturn">
      <mutation>
        <arg name="x"></arg>
        <arg name="y"></arg>
      </mutation>
      <field name="NAME">eat</field>
      <comment pinned="false" h="80" w="160">Describe this function...</comment>
      <statement name="STACK">
        <block type="variables_set">
          <field name="VAR">product</field>
          <value name="VALUE">
            <block type="math_arithmetic">
              <field name="OP">MULTIPLY</field>
              <value name="A">
                <block type="variables_get">
                  <field name="VAR">x</field>
                </block>
              </value>
              <value name="B">
                <block type="variables_get">
                  <field name="VAR">y</field>
                </block>
              </value>
            </block>
          </value>
          <next>
            <block type="controls_ifelse">
              <value name="IF0">
                <block type="logic_compare">
                  <field name="OP">EQ</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">product</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="math_number">
                      <field name="NUM">${getRandomInt(100)}</field>
                    </block>
                  </value>
                </block>
              </value>
              <statement name="DO0">
                <block type="move_left">
                  <next>
                    <block type="move_left"></block>
                  </next>
                </block>
              </statement>
              <statement name="ELSE">
                <block type="move_right">
                  <next>
                    <block type="move_right"></block>
                  </next>
                </block>
              </statement>
            </block>
          </next>
        </block>
      </statement>
    </block>
    <block type="procedures_callnoreturn" x="25" y="289">
      <mutation name="eat">
        <arg name="x"></arg>
        <arg name="y"></arg>
      </mutation>
      <value name="ARG0">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <value name="ARG1">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
    </block>
  </xml>`,
  "dropdown": true,
  "readOnly": true,
  "alertMessage": "Will the flurb make it to the fruit???"
},
"204": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 0,
  flurbCellY: 0,
  fruitCellX: 2,
  fruitCellY: 1,
  flurbPosition: {x: 0, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>product</variable>
    </variables>
    <block type="procedures_defnoreturn">
      <mutation>
        <arg name="num1"></arg>
        <arg name="num2"></arg>
      </mutation>
      <field name="NAME">do something</field>
      <comment pinned="false" h="80" w="160">Describe this function...</comment>
      <statement name="STACK">
        <block type="variables_set">
          <field name="VAR">product</field>
          <value name="VALUE">
            <block type="math_arithmetic">
              <field name="OP">MULTIPLY</field>
              <value name="A">
                <block type="variables_get">
                  <field name="VAR">num1</field>
                </block>
              </value>
              <value name="B">
                <block type="variables_get">
                  <field name="VAR">num2</field>
                </block>
              </value>
            </block>
          </value>
          <next>
            <block type="controls_ifelse">
              <value name="IF0">
                <block type="logic_compare">
                  <field name="OP">GTE</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">product</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="math_number">
                      <field name="NUM">${getRandomInt(100)}</field>
                    </block>
                  </value>
                </block>
              </value>
              <statement name="DO0">
                <block type="move_left">
                  <next>
                    <block type="move_left">
                      <next>
                        <block type="move_up"></block>
                      </next>
                    </block>
                  </next>
                </block>
              </statement>
              <statement name="ELSE">
                <block type="move_right">
                  <next>
                    <block type="move_right">
                      <next>
                        <block type="move_down"></block>
                      </next>
                    </block>
                  </next>
                </block>
              </statement>
            </block>
          </next>
        </block>
      </statement>
    </block>
    <block type="procedures_callnoreturn" x="33" y="353">
      <mutation name="do something">
        <arg name="num1"></arg>
        <arg name="num2"></arg>
      </mutation>
      <value name="ARG0">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <value name="ARG1">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
    </block>
  </xml>`,
  "dropdown": true,
  "readOnly": true,
  "alertMessage": "Will the flurb make it to the fruit???"
},
"205": {
"gridHeight": 4,
"gridWidth": 7,
"flurbCellX": 3,
"flurbCellY": 0,
"fruitCellX": 2,
"fruitCellY": 3,
"flurbPosition": { "x": 3, "y": 0 },
"lavaPos": [],
"xml":`
<xml>
	<variables>
		<variable>num1</variable>
		<variable>num2</variable>
		<variable>product</variable>
	</variables>
	<block type="procedures_defnoreturn">
		<mutation>
			<arg name="num1"></arg>
			<arg name="num2"></arg>
		</mutation>
		<field name="NAME">do something</field>
		<comment pinned="false" h="80" w="160">Describe this function...</comment>
		<statement name="STACK">
			<block type="variables_set">
				<field name="VAR">product</field>
				<value name="VALUE">
					<block type="math_arithmetic">
						<field name="OP">MULTIPLY</field>
						<value name="A">
							<block type="variables_get">
								<field name="VAR">num1</field>
							</block>
						</value>
						<value name="B">
							<block type="variables_get">
								<field name="VAR">num2</field>
							</block>
						</value>
					</block>
				</value>
				<next>
					<block type="controls_ifelse">
						<value name="IF0">
							<block type="logic_compare">
								<field name="OP">EQ</field>
								<value name="A">
									<block type="math_number">
										<field name="NUM">${getRandomInt(100)}</field>
									</block>
								</value>
								<value name="B">
									<block type="variables_get">
										<field name="VAR">product</field>
									</block>
								</value>
							</block>
						</value>
						<statement name="DO0">
							<block type="controls_repeat">
								<field name="TIMES">3</field>
								<statement name="DO">
									<block type="move_down"></block>
								</statement>
								<next>
									<block type="move_right"></block>
								</next>
							</block>
						</statement>
						<statement name="ELSE">
							<block type="move_left">
								<next>
									<block type="controls_repeat">
										<field name="TIMES">3</field>
										<statement name="DO">
											<block type="move_down"></block>
										</statement>
									</block>
								</next>
							</block>
						</statement>
					</block>
				</next>
			</block>
		</statement>
	</block>
	<block type="procedures_callnoreturn" x="31" y="378">
		<mutation name="do something">
			<arg name="num1"></arg>
			<arg name="num2"></arg>
		</mutation>
		<value name="ARG0">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
		<value name="ARG1">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
	</block>
</xml>`,
"dropdown": true,
"readOnly": true,
"alertMessage": "Will the flurb make it to the fruit???"
},
"206": {
"gridHeight": 5,
"gridWidth": 6,
"flurbCellX": 2,
"flurbCellY": 0,
"fruitCellX": 4,
"fruitCellY": 3,
"flurbPosition": { "x": 2, "y": 0 },
"lavaPos": [],
"xml": 
  `<xml>
	<variables>
		<variable>num1</variable>
		<variable>num2</variable>
		<variable>product</variable>
	</variables>
	<block type="procedures_defnoreturn">
		<mutation>
			<arg name="num1"></arg>
			<arg name="num2"></arg>
		</mutation>
		<field name="NAME">get_fruit</field>
		<comment pinned="false" h="80" w="160">Describe this function...</comment>
		<statement name="STACK">
			<block type="variables_set">
				<field name="VAR">product</field>
				<value name="VALUE">
					<block type="math_arithmetic">
						<field name="OP">MULTIPLY</field>
						<value name="A">
							<block type="variables_get">
								<field name="VAR">num1</field>
							</block>
						</value>
						<value name="B">
							<block type="variables_get">
								<field name="VAR">num2</field>
							</block>
						</value>
					</block>
				</value>
				<next>
					<block type="controls_ifelse">
						<value name="IF0">
							<block type="logic_compare">
								<field name="OP">LT</field>
								<value name="A">
									<block type="variables_get">
										<field name="VAR">product</field>
									</block>
								</value>
								<value name="B">
									<block type="math_number">
										<field name="NUM">${getRandomInt(100)}</field>
									</block>
								</value>
							</block>
						</value>
						<statement name="DO0">
							<block type="move_left">
								<next>
									<block type="controls_repeat">
										<field name="TIMES">4</field>
										<statement name="DO">
											<block type="move_down"></block>
										</statement>
									</block>
								</next>
							</block>
						</statement>
						<statement name="ELSE">
							<block type="procedures_callnoreturn" x="-317" y="-653">
								<mutation name="take_path">
									<arg name="num1"></arg>
									<arg name="num2"></arg>
								</mutation>
								<value name="ARG0">
									<block type="variables_get">
										<field name="VAR">num1</field>
									</block>
								</value>
								<value name="ARG1">
									<block type="variables_get">
										<field name="VAR">num2</field>
									</block>
								</value>
							</block>
						</statement>
					</block>
				</next>
			</block>
		</statement>
	</block>
	<block type="procedures_defnoreturn" x="0" y="350">
		<mutation>
			<arg name="num1"></arg>
			<arg name="num2"></arg>
		</mutation>
		<field name="NAME">take_path</field>
		<comment pinned="false" h="80" w="160">Describe this function...</comment>
		<statement name="STACK">
			<block type="controls_if">
				<mutation else="1"></mutation>
				<value name="IF0">
					<block type="logic_compare">
						<field name="OP">LT</field>
						<value name="A">
							<block type="variables_get">
								<field name="VAR">num1</field>
							</block>
						</value>
						<value name="B">
							<block type="variables_get">
								<field name="VAR">num2</field>
							</block>
						</value>
					</block>
				</value>
				<statement name="DO0">
					<block type="controls_repeat">
						<field name="TIMES">4</field>
						<statement name="DO">
							<block type="move_down"></block>
						</statement>
						<next>
							<block type="controls_repeat">
								<field name="TIMES">2</field>
								<statement name="DO">
									<block type="move_right"></block>
								</statement>
								<next>
									<block type="move_up"></block>
								</next>
							</block>
						</next>
					</block>
				</statement>
				<statement name="ELSE">
					<block type="move_right"></block>
				</statement>
			</block>
		</statement>
	</block>
	<block type="procedures_callnoreturn" x="0" y="665">
		<mutation name="get_fruit">
			<arg name="num1"></arg>
			<arg name="num2"></arg>
		</mutation>
		<value name="ARG0">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
		<value name="ARG1">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
	</block>
</xml>`,
"dropdown": true,
"readOnly": true,
"alertMessage": "Will the flurb make it to the fruit???"
},
"207": {
  "gridHeight": 5,
  "gridWidth": 6,
  "flurbCellX": 0,
  "flurbCellY": 0,
  "fruitCellX": 4,
  "fruitCellY": 3,
  "flurbPosition": { "x": 0, "y": 0 },
  "lavaPos": [],
  "xml": `<xml>
	<variables>
		<variable>num1</variable>
		<variable>num2</variable>
		<variable>product</variable>
	</variables>
	<block type="procedures_defnoreturn">
		<mutation>
			<arg name="num1"></arg>
			<arg name="num2"></arg>
		</mutation>
		<field name="NAME">do something</field>
		<comment pinned="false" h="80" w="160">Describe this function...</comment>
		<statement name="STACK">
			<block type="variables_set">
				<field name="VAR">product</field>
				<value name="VALUE">
					<block type="math_arithmetic">
						<field name="OP">MULTIPLY</field>
						<value name="A">
							<block type="variables_get">
								<field name="VAR">num1</field>
							</block>
						</value>
						<value name="B">
							<block type="variables_get">
								<field name="VAR">num2</field>
							</block>
						</value>
					</block>
				</value>
				<next>
					<block type="controls_ifelse">
						<value name="IF0">
							<block type="logic_compare">
								<field name="OP">GT</field>
								<value name="A">
									<block type="variables_get">
										<field name="VAR">product</field>
									</block>
								</value>
								<value name="B">
									<block type="math_number">
										<field name="NUM">${getRandomInt(100)}</field>
									</block>
								</value>
							</block>
						</value>
						<statement name="DO0">
							<block type="controls_if">
								<mutation else="1"></mutation>
								<value name="IF0">
									<block type="logic_compare">
										<field name="OP">GT</field>
										<value name="A">
											<block type="variables_get">
												<field name="VAR">num1</field>
											</block>
										</value>
										<value name="B">
											<block type="variables_get">
												<field name="VAR">num2</field>
											</block>
										</value>
									</block>
								</value>
								<statement name="DO0">
									<block type="controls_repeat">
										<field name="TIMES">4</field>
										<statement name="DO">
											<block type="move_right"></block>
										</statement>
										<next>
											<block type="controls_repeat">
												<field name="TIMES">3</field>
												<statement name="DO">
													<block type="move_down"></block>
												</statement>
											</block>
										</next>
									</block>
								</statement>
								<statement name="ELSE">
									<block type="move_down"></block>
								</statement>
							</block>
						</statement>
						<statement name="ELSE">
							<block type="controls_repeat">
								<field name="TIMES">4</field>
								<statement name="DO">
									<block type="move_left"></block>
								</statement>
								<next>
									<block type="controls_repeat">
										<field name="TIMES">3</field>
										<statement name="DO">
											<block type="move_up"></block>
										</statement>
									</block>
								</next>
							</block>
						</statement>
					</block>
				</next>
			</block>
		</statement>
	</block>
	<block type="procedures_callnoreturn" x="25" y="550">
		<mutation name="do something">
			<arg name="num1"></arg>
			<arg name="num2"></arg>
		</mutation>
		<value name="ARG0">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
		<value name="ARG1">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
	</block>
</xml>`,
  "dropdown": true,
  "readOnly": true,
  "alertMessage": "Will the flurb make it to the fruit???"
}, 
"208": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 2,
  flurbCellY: 0,
  fruitCellX: 0,
  fruitCellY: 0,
  flurbPosition: {x: 2, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>product</variable>
    </variables>
    <block type="procedures_defnoreturn">
      <mutation>
        <arg name="num1"></arg>
        <arg name="num2"></arg>
      </mutation>
      <field name="NAME">do something</field>
      <comment pinned="false" h="80" w="160">Describe this function...</comment>
      <statement name="STACK">
        <block type="variables_set">
          <field name="VAR">product</field>
          <value name="VALUE">
            <block type="math_arithmetic">
              <field name="OP">MULTIPLY</field>
              <value name="A">
                <block type="variables_get">
                  <field name="VAR">num1</field>
                </block>
              </value>
              <value name="B">
                <block type="variables_get">
                  <field name="VAR">num2</field>
                </block>
              </value>
            </block>
          </value>
          <next>
            <block type="controls_ifelse">
              <value name="IF0">
                <block type="logic_compare">
                  <field name="OP">EQ</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">product</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="math_number">
                      <field name="NUM">${getRandomInt(100)}</field>
                    </block>
                  </value>
                </block>
              </value>
              <statement name="DO0">
                <block type="move_left">
                  <next>
                    <block type="move_right"></block>
                  </next>
                </block>
              </statement>
              <statement name="ELSE">
                <block type="move_right">
                  <next>
                    <block type="move_left"></block>
                  </next>
                </block>
              </statement>
            </block>
          </next>
        </block>
      </statement>
    </block>
    <block type="procedures_callnoreturn" x="42" y="332">
      <mutation name="do something">
        <arg name="num1"></arg>
        <arg name="num2"></arg>
      </mutation>
      <value name="ARG0">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <value name="ARG1">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"209": {
  gridHeight: 2,
  gridWidth: 3,
  flurbCellX: 0,
  flurbCellY: 0,
  fruitCellX: 2,
  fruitCellY: 1,
  flurbPosition: {x: 0, y: 0},
  lavaPos: [],
  "xml":
    `<xml>
    <variables>
      <variable>num1</variable>
      <variable>num2</variable>
      <variable>product</variable>
    </variables>
    <block type="procedures_defnoreturn">
      <mutation>
        <arg name="num1"></arg>
        <arg name="num2"></arg>
      </mutation>
      <field name="NAME">get_fruit</field>
      <comment pinned="false" h="80" w="160">Describe this function...</comment>
      <statement name="STACK">
        <block type="variables_set">
          <field name="VAR">product</field>
          <value name="VALUE">
            <block type="math_arithmetic">
              <field name="OP">MULTIPLY</field>
              <value name="A">
                <block type="variables_get">
                  <field name="VAR">num1</field>
                </block>
              </value>
              <value name="B">
                <block type="variables_get">
                  <field name="VAR">num2</field>
                </block>
              </value>
            </block>
          </value>
          <next>
            <block type="controls_ifelse">
              <value name="IF0">
                <block type="logic_compare">
                  <field name="OP">GTE</field>
                  <value name="A">
                    <block type="variables_get">
                      <field name="VAR">product</field>
                    </block>
                  </value>
                  <value name="B">
                    <block type="math_number">
                      <field name="NUM">${getRandomInt(100)}</field>
                    </block>
                  </value>
                </block>
              </value>
              <statement name="DO0">
                <block type="move_right">
                  <next>
                    <block type="move_left">
                      <next>
                        <block type="move_up"></block>
                      </next>
                    </block>
                  </next>
                </block>
              </statement>
              <statement name="ELSE">
                <block type="move_right">
                  <next>
                    <block type="move_left">
                      <next>
                        <block type="move_down"></block>
                      </next>
                    </block>
                  </next>
                </block>
              </statement>
            </block>
          </next>
        </block>
      </statement>
    </block>
    <block type="procedures_callnoreturn" x="15" y="353">
      <mutation name="get_fruit">
        <arg name="num1"></arg>
        <arg name="num2"></arg>
      </mutation>
      <value name="ARG0">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
      <value name="ARG1">
        <block type="math_number">
          <field name="NUM">${getRandomInt(10)}</field>
        </block>
      </value>
    </block>
  </xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"210": {
"gridHeight": 4,
"gridWidth": 7,
"flurbCellX": 3,
"flurbCellY": 0,
"fruitCellX": 2,
"fruitCellY": 3,
"flurbPosition": { "x": 3, "y": 0 },
"lavaPos": [],
"xml":`<xml>
<variables>
  <variable>num1</variable>
  <variable>num2</variable>
  <variable>product</variable>
</variables>
<block type="procedures_defnoreturn">
  <mutation>
    <arg name="num1"></arg>
    <arg name="num2"></arg>
  </mutation>
  <field name="NAME">get_fruit</field>
  <comment pinned="false" h="80" w="160">Describe this function...</comment>
  <statement name="STACK">
    <block type="variables_set">
      <field name="VAR">product</field>
      <value name="VALUE">
        <block type="math_arithmetic">
          <field name="OP">MULTIPLY</field>
          <value name="A">
            <block type="variables_get">
              <field name="VAR">num1</field>
            </block>
          </value>
          <value name="B">
            <block type="variables_get">
              <field name="VAR">num2</field>
            </block>
          </value>
        </block>
      </value>
      <next>
        <block type="controls_ifelse">
          <value name="IF0">
            <block type="logic_compare">
              <field name="OP">EQ</field>
              <value name="A">
                <block type="math_number">
                  <field name="NUM">${getRandomInt(100)}</field>
                </block>
              </value>
              <value name="B">
                <block type="variables_get">
                  <field name="VAR">product</field>
                </block>
              </value>
            </block>
          </value>
          <statement name="DO0">
            <block type="controls_repeat">
              <field name="TIMES">3</field>
              <statement name="DO">
                <block type="move_down"></block>
              </statement>
              <next>
                <block type="move_right"></block>
              </next>
            </block>
          </statement>
          <statement name="ELSE">
            <block type="procedures_callnoreturn">
              <mutation name="move_flurb"></mutation>
            </block>
          </statement>
        </block>
      </next>
    </block>
  </statement>
</block>
<block type="procedures_defnoreturn" x="22" y="285">
  <field name="NAME">move_flurb</field>
  <comment pinned="false" h="80" w="160">Describe this function...</comment>
  <statement name="STACK">
    <block type="move_left">
      <next>
        <block type="controls_repeat">
          <field name="TIMES">3</field>
          <statement name="DO">
            <block type="move_up"></block>
          </statement>
        </block>
      </next>
    </block>
  </statement>
</block>
<block type="procedures_callnoreturn" x="22" y="445">
  <mutation name="get_fruit">
    <arg name="num1"></arg>
    <arg name="num2"></arg>
  </mutation>
  <value name="ARG0">
    <block type="math_number">
      <field name="NUM">${getRandomInt(10)}</field>
    </block>
  </value>
  <value name="ARG1">
    <block type="math_number">
      <field name="NUM">${getRandomInt(10)}</field>
    </block>
  </value>
</block>
</xml>`,
"dropdown": false,
"readOnly": false,
"editDisabled": true,
"alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"211": {
"gridHeight": 5,
"gridWidth": 6,
"flurbCellX": 2,
"flurbCellY": 0,
"fruitCellX": 4,
"fruitCellY": 3,
"flurbPosition": { "x": 2, "y": 0 },
"lavaPos": [],
"xml": 
  `<xml>
	<variables>
		<variable>num1</variable>
		<variable>num2</variable>
		<variable>product</variable>
	</variables>
	<block type="procedures_defnoreturn">
		<mutation>
			<arg name="num1" varid="?rU=g?Xxon:LB8s^8uU-"></arg>
			<arg name="num2" varid=";mCi$;,8-{/]5I/FGRZc"></arg>
		</mutation>
		<field name="NAME">do something</field>
		<comment pinned="false" h="80" w="160">Describe this function...</comment>
		<statement name="STACK">
			<block type="variables_set">
				<field name="VAR">product</field>
				<value name="VALUE">
					<block type="math_arithmetic">
						<field name="OP">MULTIPLY</field>
						<value name="A">
							<block type="variables_get">
								<field name="VAR">num1</field>
							</block>
						</value>
						<value name="B">
							<block type="variables_get">
								<field name="VAR">num2</field>
							</block>
						</value>
					</block>
				</value>
				<next>
					<block type="controls_ifelse">
						<value name="IF0">
							<block type="logic_compare">
								<field name="OP">LT</field>
								<value name="A">
									<block type="variables_get">
										<field name="VAR">product</field>
									</block>
								</value>
								<value name="B">
									<block type="math_number">
										<field name="NUM">${getRandomInt(100)}</field>
									</block>
								</value>
							</block>
						</value>
						<statement name="DO0">
							<block type="move_left">
								<next>
									<block type="controls_repeat">
										<field name="TIMES">4</field>
										<statement name="DO">
											<block type="move_down"></block>
										</statement>
									</block>
								</next>
							</block>
						</statement>
						<statement name="ELSE">
							<block type="controls_if">
								<mutation else="1"></mutation>
								<value name="IF0">
									<block type="logic_compare">
										<field name="OP">LT</field>
										<value name="A">
											<block type="variables_get">
												<field name="VAR">num1</field>
											</block>
										</value>
										<value name="B">
											<block type="variables_get">
												<field name="VAR">num2</field>
											</block>
										</value>
									</block>
								</value>
								<statement name="DO0">
									<block type="procedures_callnoreturn">
										<mutation name="do something2"></mutation>
									</block>
								</statement>
								<statement name="ELSE">
									<block type="controls_repeat">
										<field name="TIMES">2</field>
										<statement name="DO">
											<block type="move_right"></block>
										</statement>
										<next>
											<block type="controls_repeat">
												<field name="TIMES">5</field>
												<statement name="DO">
													<block type="move_up"></block>
												</statement>
											</block>
										</next>
									</block>
								</statement>
							</block>
						</statement>
					</block>
				</next>
			</block>
		</statement>
	</block>
	<block type="procedures_defnoreturn" x="380" y="100">
		<field name="NAME">do something2</field>
		<comment pinned="false" h="80" w="160">Describe this function...</comment>
		<statement name="STACK">
			<block type="controls_repeat">
				<field name="TIMES">4</field>
				<statement name="DO">
					<block type="move_down"></block>
				</statement>
				<next>
					<block type="controls_repeat">
						<field name="TIMES">2</field>
						<statement name="DO">
							<block type="move_right"></block>
						</statement>
						<next>
							<block type="move_up"></block>
						</next>
					</block>
				</next>
			</block>
		</statement>
	</block>
	<block type="procedures_callnoreturn" x="390" y="325">
		<mutation name="do something">
			<arg name="num1"></arg>
			<arg name="num2"></arg>
		</mutation>
		<value name="ARG0">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
		<value name="ARG1">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
	</block>
</xml>`,
"dropdown": false,
"readOnly": false,
"editDisabled": true,
"alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"212": {
  "gridHeight": 5,
  "gridWidth": 6,
  "flurbCellX": 0,
  "flurbCellY": 0,
  "fruitCellX": 4,
  "fruitCellY": 3,
  "flurbPosition": { "x": 0, "y": 0 },
  "lavaPos": [],
  "xml": `<xml>
	<variables>
		<variable>x</variable>
		<variable>y</variable>
		<variable>product</variable>
		<variable>num1</variable>
		<variable>num2</variable>
	</variables>
	<block type="procedures_defnoreturn" x="32" y="2">
    <mutation>
			<arg name="num1"></arg>
			<arg name="num2"></arg>
		</mutation>
		<field name="NAME">get_fruit</field>
		<comment pinned="false" h="80" w="160">Describe this function...</comment>
		<statement name="STACK">
			<block type="variables_set">
				<field name="VAR">product</field>
				<value name="VALUE">
					<block type="math_arithmetic">
						<field name="OP">MULTIPLY</field>
						<value name="A">
							<block type="variables_get">
								<field name="VAR">num1</field>
							</block>
						</value>
						<value name="B">
							<block type="variables_get">
								<field name="VAR">num2</field>
							</block>
						</value>
					</block>
				</value>
				<next>
					<block type="controls_ifelse">
						<value name="IF0">
							<block type="logic_compare">
								<field name="OP">GT</field>
								<value name="A">
									<block type="variables_get">
										<field name="VAR">product</field>
									</block>
								</value>
								<value name="B">
									<block type="math_number">
										<field name="NUM">${getRandomInt(100)}</field>
									</block>
								</value>
							</block>
						</value>
						<statement name="DO0">
							<block type="controls_if">
								<mutation else="1"></mutation>
								<value name="IF0">
									<block type="logic_compare">
										<field name="OP">GT</field>
										<value name="A">
											<block type="variables_get">
												<field name="VAR">num1</field>
											</block>
										</value>
										<value name="B">
											<block type="variables_get">
												<field name="VAR">num2</field>
											</block>
										</value>
									</block>
								</value>
								<statement name="DO0">
									<block type="controls_repeat">
										<field name="TIMES">4</field>
										<statement name="DO">
											<block type="move_right"></block>
										</statement>
										<next>
											<block type="controls_repeat">
												<field name="TIMES">3</field>
												<statement name="DO">
													<block type="move_up"></block>
												</statement>
											</block>
										</next>
									</block>
								</statement>
								<statement name="ELSE">
									<block type="move_down"></block>
								</statement>
							</block>
						</statement>
						<statement name="ELSE">
							<block type="procedures_callnoreturn">
								<mutation name="move_flurb">
									<arg name="x"></arg>
									<arg name="y"></arg>
								</mutation>
								<value name="ARG0">
									<block type="math_number">
										<field name="NUM">${getRandomInt(10)}</field>
									</block>
								</value>
								<value name="ARG1">
									<block type="math_number">
										<field name="NUM">${getRandomInt(10)}</field>
									</block>
								</value>
							</block>
						</statement>
					</block>
				</next>
			</block>
		</statement>
	</block>
	<block type="procedures_defnoreturn" x="320" y="150">
		<mutation>
			<arg name="x"></arg>
			<arg name="y"></arg>
		</mutation>
		<field name="NAME">move_flurb</field>
		<comment pinned="false" h="80" w="160">Describe this function...</comment>
		<statement name="STACK">
			<block type="controls_repeat_ext">
				<value name="TIMES">
					<block type="variables_get">
						<field name="VAR">x</field>
					</block>
				</value>
				<statement name="DO">
					<block type="move_left"></block>
				</statement>
				<next>
					<block type="controls_repeat_ext">
						<value name="TIMES">
							<block type="variables_get">
								<field name="VAR">y</field>
							</block>
						</value>
						<statement name="DO">
							<block type="move_up"></block>
						</statement>
					</block>
				</next>
			</block>
		</statement>
	</block>
	<block type="procedures_callnoreturn" x="315" y="370">
		<mutation name="get_fruit">
			<arg name="num1"></arg>
			<arg name="num2"></arg>
		</mutation>
		<value name="ARG0">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
		<value name="ARG1">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
	</block>
</xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"213": {
  "gridHeight": 5,
  "gridWidth": 6,
  "flurbCellX": 0,
  "flurbCellY": 0,
  "fruitCellX": 4,
  "fruitCellY": 3,
  "flurbPosition": { "x": 0, "y": 0 },
  "lavaPos": [],
  "xml": `<xml>
	<variables>
		<variable>num1</variable>
		<variable>num2</variable>
		<variable>num3</variable>
		<variable>product</variable>
	</variables>
	<block type="procedures_defnoreturn" x="30" y="7">
		<mutation>
			<arg name="num1"></arg>
			<arg name="num2"></arg>
			<arg name="num3"></arg>
		</mutation>
		<field name="NAME">do something</field>
		<comment pinned="false" h="80" w="160">Describe this function...</comment>
		<statement name="STACK">
			<block type="variables_set">
				<field name="VAR">product</field>
				<value name="VALUE">
					<block type="math_arithmetic">
						<field name="OP">MULTIPLY</field>
						<value name="A">
							<block type="variables_get">
								<field name="VAR">num1</field>
							</block>
						</value>
						<value name="B">
							<block type="variables_get">
								<field name="VAR">num2</field>
							</block>
						</value>
					</block>
				</value>
				<next>
					<block type="controls_ifelse">
						<value name="IF0">
							<block type="logic_compare">
								<field name="OP">GT</field>
								<value name="A">
									<block type="variables_get">
										<field name="VAR">product</field>
									</block>
								</value>
								<value name="B">
									<block type="math_number">
										<field name="NUM">${getRandomInt(100)}</field>
									</block>
								</value>
							</block>
						</value>
						<statement name="DO0">
							<block type="controls_if">
								<mutation else="1"></mutation>
								<value name="IF0">
									<block type="logic_compare">
										<field name="OP">GT</field>
										<value name="A">
											<block type="variables_get">
												<field name="VAR">num1</field>
											</block>
										</value>
										<value name="B">
											<block type="variables_get">
												<field name="VAR">num3</field>
											</block>
										</value>
									</block>
								</value>
								<statement name="DO0">
									<block type="controls_repeat">
										<field name="TIMES">5</field>
										<statement name="DO">
											<block type="move_right"></block>
										</statement>
										<next>
											<block type="controls_repeat">
												<field name="TIMES">3</field>
												<statement name="DO">
													<block type="move_left"></block>
												</statement>
											</block>
										</next>
									</block>
								</statement>
								<statement name="ELSE">
									<block type="move_down"></block>
								</statement>
							</block>
						</statement>
						<statement name="ELSE">
							<block type="controls_repeat">
								<field name="TIMES">4</field>
								<statement name="DO">
									<block type="move_left"></block>
								</statement>
								<next>
									<block type="controls_repeat">
										<field name="TIMES">3</field>
										<statement name="DO">
											<block type="move_up"></block>
										</statement>
									</block>
								</next>
							</block>
						</statement>
					</block>
				</next>
			</block>
		</statement>
	</block>
	<block type="procedures_callnoreturn" x="327" y="228">
		<mutation name="do something">
			<arg name="num1"></arg>
			<arg name="num2"></arg>
			<arg name="num3"></arg>
		</mutation>
		<value name="ARG0">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
		<value name="ARG1">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
		<value name="ARG2">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
	</block>
</xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"214": {
  gridHeight: 3,
  gridWidth: 5,
  flurbCellX: 0,
  flurbCellY: 0,
  fruitCellX: 4,
  fruitCellY: 0,
  flurbPosition: {x: 0, y: 0},
  lavaPos: [[1,0,"|"], [2,0,"|"], [3,0,"|"], [1,1,"|"], [2,1,"|"], [3,1,"|"]],
  "xml": `<xml>
	<variables>
		<variable>num1</variable>
		<variable>num2</variable>
		<variable>num3</variable>
		<variable>product</variable>
	</variables>
	<block type="procedures_defnoreturn" x="33" y="14">
		<mutation>
			<arg name="num1"></arg>
			<arg name="num2"></arg>
			<arg name="num3"></arg>
		</mutation>
		<field name="NAME">get_fruit</field>
		<comment pinned="false" h="80" w="160">Describe this function...</comment>
		<statement name="STACK">
			<block type="variables_set">
				<field name="VAR">product</field>
				<value name="VALUE">
					<block type="math_arithmetic">
						<field name="OP">MULTIPLY</field>
						<value name="A">
							<block type="variables_get">
								<field name="VAR">num1</field>
							</block>
						</value>
						<value name="B">
							<block type="variables_get">
								<field name="VAR">num2</field>
							</block>
						</value>
					</block>
				</value>
				<next>
					<block type="controls_ifelse">
						<value name="IF0">
							<block type="logic_compare">
								<field name="OP">GT</field>
								<value name="A">
									<block type="variables_get">
										<field name="VAR">product</field>
									</block>
								</value>
								<value name="B">
									<block type="math_number">
										<field name="NUM">${getRandomInt(100)}</field>
									</block>
								</value>
							</block>
						</value>
						<statement name="DO0">
							<block type="controls_if">
								<mutation else="1"></mutation>
								<value name="IF0">
									<block type="logic_compare">
										<field name="OP">GT</field>
										<value name="A">
											<block type="variables_get">
												<field name="VAR">num1</field>
											</block>
										</value>
										<value name="B">
											<block type="variables_get">
												<field name="VAR">num3</field>
											</block>
										</value>
									</block>
								</value>
								<statement name="DO0">
									<block type="controls_repeat">
										<field name="TIMES">5</field>
										<statement name="DO">
											<block type="move_right"></block>
										</statement>
										<next>
											<block type="controls_repeat">
												<field name="TIMES">3</field>
												<statement name="DO">
													<block type="move_left"></block>
												</statement>
											</block>
										</next>
									</block>
								</statement>
								<statement name="ELSE">
									<block type="move_down"></block>
								</statement>
							</block>
						</statement>
						<statement name="ELSE">
							<block type="controls_repeat">
								<field name="TIMES">4</field>
								<statement name="DO">
									<block type="move_left"></block>
								</statement>
								<next>
									<block type="controls_repeat">
										<field name="TIMES">3</field>
										<statement name="DO">
											<block type="move_up"></block>
										</statement>
									</block>
								</next>
							</block>
						</statement>
					</block>
				</next>
			</block>
		</statement>
	</block>
	<block type="procedures_callnoreturn" x="309" y="254">
		<mutation name="get_fruit">
			<arg name="num1"></arg>
			<arg name="num2"></arg>
			<arg name="num3"></arg>
		</mutation>
		<value name="ARG0">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
		<value name="ARG1">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
		<value name="ARG2">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
	</block>
</xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"215": {
  "gridHeight": 6,
  "gridWidth": 6,
  "flurbCellX": 0,
  "flurbCellY": 5,
  "fruitCellX": 5,
  "fruitCellY": 0,
  "flurbPosition": { "x": 0, "y": 5 },
  "lavaPos": [[0, 0, "|"], [1, 3, "|"], [3, 3, "|"], [4, 4, "|"], [2, 1, "|"], [2, 4, "|"], [3, 1, "|"], [1, 2, "|"], [5, 5, "|"]],
  "xml": `<xml>
	<variables>
		<variable>num1</variable>
		<variable>num2</variable>
		<variable>num3</variable>
		<variable>x</variable>
		<variable>y</variable>
		<variable>product</variable>
	</variables>
	<block type="procedures_defnoreturn" x="26" y="0">
		<mutation>
			<arg name="num1"></arg>
			<arg name="num2"></arg>
			<arg name="num3"></arg>
		</mutation>
		<field name="NAME">get_fruit</field>
		<comment pinned="false" h="80" w="160">Describe this function...</comment>
		<statement name="STACK">
			<block type="variables_set">
				<field name="VAR">product</field>
				<value name="VALUE">
					<block type="math_arithmetic">
						<field name="OP">MULTIPLY</field>
						<value name="A">
							<block type="variables_get">
								<field name="VAR">num1</field>
							</block>
						</value>
						<value name="B">
							<block type="variables_get">
								<field name="VAR">num2</field>
							</block>
						</value>
					</block>
				</value>
				<next>
					<block type="controls_ifelse">
						<value name="IF0">
							<block type="logic_compare">
								<field name="OP">GT</field>
								<value name="A">
									<block type="variables_get">
										<field name="VAR">product</field>
									</block>
								</value>
								<value name="B">
									<block type="math_number">
										<field name="NUM">${getRandomInt(100)}</field>
									</block>
								</value>
							</block>
						</value>
						<statement name="DO0">
							<block type="controls_if">
								<mutation else="1"></mutation>
								<value name="IF0">
									<block type="logic_compare">
										<field name="OP">GT</field>
										<value name="A">
											<block type="variables_get">
												<field name="VAR">num1</field>
											</block>
										</value>
										<value name="B">
											<block type="variables_get">
												<field name="VAR">num3</field>
											</block>
										</value>
									</block>
								</value>
								<statement name="DO0">
									<block type="controls_repeat">
										<field name="TIMES">5</field>
										<statement name="DO">
											<block type="move_right"></block>
										</statement>
										<next>
											<block type="controls_repeat">
												<field name="TIMES">3</field>
												<statement name="DO">
													<block type="move_right"></block>
												</statement>
											</block>
										</next>
									</block>
								</statement>
								<statement name="ELSE">
									<block type="move_up"></block>
								</statement>
							</block>
						</statement>
						<statement name="ELSE">
							<block type="procedures_callnoreturn">
								<mutation name="move_flurb">
									<arg name="x"></arg>
									<arg name="y"></arg>
								</mutation>
								<value name="ARG0">
									<block type="math_number">
										<field name="NUM">0</field>
									</block>
								</value>
								<value name="ARG1">
									<block type="math_number">
										<field name="NUM">0</field>
									</block>
								</value>
							</block>
						</statement>
					</block>
				</next>
			</block>
		</statement>
	</block>
	<block type="procedures_callnoreturn" x="355" y="360">
		<mutation name="get_fruit">
			<arg name="num1"></arg>
			<arg name="num2"></arg>
			<arg name="num3"></arg>
		</mutation>
		<value name="ARG0">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
		<value name="ARG1">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
		<value name="ARG2">
			<block type="math_number">
				<field name="NUM">${getRandomInt(10)}</field>
			</block>
		</value>
	</block>
	<block type="procedures_defnoreturn" x="300" y="150">
		<mutation>
			<arg name="x"></arg>
			<arg name="y"></arg>
		</mutation>
		<field name="NAME">move_flurb</field>
		<comment pinned="false" h="80" w="160">Describe this function...</comment>
		<statement name="STACK">
			<block type="controls_repeat_ext">
				<value name="TIMES">
					<block type="variables_get">
						<field name="VAR">x</field>
					</block>
				</value>
				<statement name="DO">
					<block type="move_left"></block>
				</statement>
				<next>
					<block type="controls_repeat_ext">
						<value name="TIMES">
							<block type="variables_get">
								<field name="VAR">y</field>
							</block>
						</value>
						<statement name="DO">
							<block type="move_up"></block>
						</statement>
					</block>
				</next>
			</block>
		</statement>
	</block>
</xml>`,
  "dropdown": false,
  "readOnly": false,
  "editDisabled": true,
  "alertMessage": "Update the code so that the flurb makes it to the fruit!"
},
"216": {
        gridHeight: 3,
        gridWidth: 5,
        flurbCellX: 0,
        flurbCellY: 0,
        fruitCellX: 4,
        fruitCellY: 0,
        flurbPosition: {x: 0, y: 0},
        lavaPos: [[1,0,"|"], [2,0,"|"], [3,0,"|"], [1,1,"|"], [2,1,"|"], [3,1,"|"]],
        "xml": false,
        alertMessage: "",
        loopValidation: true,
			functionValidation: true
    },
    "217": {
        gridHeight: 3,
        gridWidth: 5,
        flurbCellX: 0,
        flurbCellY: 2,
        fruitCellX: 4,
        fruitCellY: 0,
        flurbPosition: {x: 0, y: 2},
        lavaPos: [[0,0,"|"], [1,0, "|"], [2,0, "|"], [0,1,"|"], [3,2,"|"], [4,2,"|"]],
        "xml": false,
        alertMessage: "",
        loopValidation: true,
			functionValidation: true
    },
    "218": {
        gridHeight: 3,
        gridWidth: 5,
        flurbCellX: 4,
        flurbCellY: 0,
        fruitCellX: 0,
        fruitCellY: 2,
        flurbPosition: {x: 4, y: 0},
        lavaPos: [[0,0,"|"], [1,0,"|"], [2,0,"|"], [3,0,"|"], [0,1,"|"], [1,1,"|"], [3,2,"|"], [4,2,"|"]],
        "xml": false,
        alertMessage: "",
        loopValidation: true,
			functionValidation: true
    },
    "219": {
      "gridHeight": 5,
      "gridWidth": 5,
      "flurbCellX": 0,
      "flurbCellY": 0,
      "fruitCellX": 4,
      "fruitCellY": 4,
      "flurbPosition": { "x": 0, "y": 0 },
      "lavaPos": [[0, 2, "|"], [1, 2, "|"], [2, 0, "|"], [3, 2, "|"], [4, 2, "|"]],
      "xml": false,
      "alertMessage": "Find the one true path to the Fruit!",
      "loopValidation": true,
		"functionValidation": true
    },
    "220": {
      "gridHeight": 5,
      "gridWidth": 5,
      "flurbCellX": 0,
      "flurbCellY": 0,
      "fruitCellX": 4,
      "fruitCellY": 1,
      "flurbPosition": { "x": 0, "y": 0 },
      "lavaPos": [[0, 1, "|"], [0, 2, "|"], [1, 3, "|"], [2, 0, "|"], [2, 1, "|"], [3, 2, "|"], [3, 3, "|"], [4, 0, "|"]],
      "xml": false,
      "alertMessage": "Navigate through the labyrinth to reach the Fruit!",
      "loopValidation": true,
		"functionValidation": true
    },
    "221": {
      "gridHeight": 5,
      "gridWidth": 5,
      "flurbCellX": 4,
      "flurbCellY": 0,
      "fruitCellX": 0,
      "fruitCellY": 4,
      "flurbPosition": { "x": 4, "y": 0 },
      "lavaPos": [[0, 2, "|"], [1, 0, "|"], [2, 2, "|"], [2, 3, "|"], [3, 0, "|"], [4, 2, "|"]],
      "xml": false,
      "alertMessage": "Navigate through the lava maze to reach the Fruit!",
      "loopValidation": true,
		"functionValidation": true
    },
    "222": {
      "gridHeight": 5,
      "gridWidth": 5,
      "flurbCellX": 0,
      "flurbCellY": 2,
      "fruitCellX": 4,
      "fruitCellY": 4,
      "flurbPosition": { "x": 0, "y": 2 },
      "lavaPos": [[0, 3, "|"], [0, 4, "|"], [1, 0, "|"], [1, 2, "|"], [2, 2, "|"], [3, 0, "|"], [3, 3, "|"], [4, 1, "|"]],
      "xml": false,
      "alertMessage": "Wind your way through to the Fruit!",
      "loopValidation": true,
		"functionValidation": true
    },
    "223": {
      "gridHeight": 5,
      "gridWidth": 5,
      "flurbCellX": 0,
      "flurbCellY": 2,
      "fruitCellX": 4,
      "fruitCellY": 1,
      "flurbPosition": { "x": 0, "y": 2 },
      "lavaPos": [[1, 0, "|"], [2, 0, "|"], [0, 1, "|"], [4, 0, "|"], [2, 2, "|"], [3, 2, "|"], [0, 3, "|"], [1, 4, "|"], [4, 4, "|"]],
      "xml": false,
      "alertMessage": "Zigzag to success!",
      "loopValidation": true,
		"functionValidation": true
    },
    "224": {
      "gridHeight": 5,
      "gridWidth": 5,
      "flurbCellX": 4,
      "flurbCellY": 0,
      "fruitCellX": 0,
      "fruitCellY": 4,
      "flurbPosition": { "x": 4, "y": 0 },
      "lavaPos": [[0, 0, "|"], [2, 0, "|"], [3, 0, "|"], [4, 4, "|"], [2, 2, "|"], [3, 2, "|"], [0, 3, "|"], [3, 3, "|"], [4, 3, "|"], [2, 4, "|"]],
      "xml": false,
      "alertMessage": "There's more than meets the eye.",
      "loopValidation": true,
		"functionValidation": true
    },
    "225": {
      "gridHeight": 6,
      "gridWidth": 6,
      "flurbCellX": 0,
      "flurbCellY": 0,
      "fruitCellX": 5,
      "fruitCellY": 5,
      "flurbPosition": { "x": 0, "y": 0 },
      "lavaPos": [[2, 2, "|"], [3, 3, "|"], [4, 1, "|"], [1, 4, "|"], [5, 0, "|"], [0, 5, "|"]],
      "xml": false,
      "alertMessage": "A larger grid awaits! Find your way to the fruit.",
      "loopValidation": true,
		"functionValidation": true
    },
    "226": {
      "gridHeight": 6,
      "gridWidth": 6,
      "flurbCellX": 0,
      "flurbCellY": 5,
      "fruitCellX": 5,
      "fruitCellY": 0,
      "flurbPosition": { "x": 0, "y": 5 },
      "lavaPos": [[0, 0, "|"], [1, 3, "|"], [3, 3, "|"], [4, 4, "|"], [2, 1, "|"], [2, 4, "|"], [3, 1, "|"], [1, 2, "|"], [5, 5, "|"]],
      "xml": false,
      "alertMessage": "The path is narrower with more obstacles. Tread carefully!",
      "loopValidation": true,
		"functionValidation": true
    },
    "227": {
      "gridHeight": 7,
      "gridWidth": 7,
      "flurbCellX": 0,
      "flurbCellY": 0,
      "fruitCellX": 6,
      "fruitCellY": 6,
      "flurbPosition": { "x": 0, "y": 0 },
      "lavaPos": [[0, 5, "|"], [5, 0, "|"], [5, 5, "|"], [1, 4, "|"], [4, 1, "|"], [3, 3, "|"], [2, 2, "|"], [4, 6, "|"], [6, 3, "|"]],
      "xml": false,
      "alertMessage": "A growing grid and more lava. Plan your moves wisely!",
      "loopValidation": true,
		"functionValidation": true
    },
    "228": {
      "gridHeight": 7,
      "gridWidth": 7,
      "flurbCellX": 3,
      "flurbCellY": 3,
      "fruitCellX": 0,
      "fruitCellY": 6,
      "flurbPosition": { "x": 3, "y": 3 },
      "lavaPos": [[1, 1, "|"], [3, 0, "|"], [3, 1, "|"], [2, 5, "|"], [3, 6, "|"], [4, 4, "|"], [5, 5, "|"], [1, 4, "|"], [2, 3, "|"], [4, 3, "|"], [5, 3, "|"], [6, 3, "|"]],
      "xml": false,
      "alertMessage": "Traverse from bottom left to top right. The lava won't make it easy!",
      "loopValidation": true,
		"functionValidation": true
    },
    "229": {
      "gridHeight": 8,
      "gridWidth": 8,
      "flurbCellX": 0,
      "flurbCellY": 7,
      "fruitCellX": 7,
      "fruitCellY": 0,
      "flurbPosition": { "x": 0, "y": 7 },
      "lavaPos": [[0, 5, "|"], [1, 1, "|"], [1, 4, "|"], [2, 2, "|"], [2, 6, "|"], [3, 1, "|"], [3, 4, "|"], [4, 2, "|"], [4, 5, "|"], [4, 7, "|"], [5, 1, "|"], [5, 4, "|"], [5, 6, "|"], [6, 3, "|"], [6, 7, "|"]],
      "xml": false,
      "alertMessage": "Lava pockets are everywhere. Navigate with precision!",
      "loopValidation": true,
		"functionValidation": true
    },
    "230": {
      "gridHeight": 8,
      "gridWidth": 8,
      "flurbCellX": 0,
      "flurbCellY": 0,
      "fruitCellX": 7,
      "fruitCellY": 7,
      "flurbPosition": { "x": 0, "y": 0 },
      "lavaPos": [[7,0, "|"],[0,7, "|"], [1, 1, "|"], [2, 3, "|"], [3, 5, "|"], [4, 2, "|"], [4, 6, "|"], [5, 4, "|"], [6, 3, "|"], [6, 6, "|"]],
      "xml": false,
      "alertMessage": "The ultimate challenge on an 8x8 grid. Best of luck!",
      "loopValidation": true,
		"functionValidation": true
    }
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
const xml = levelValues[level]["xml"]
const readOnly = levelValues[level]["readOnly"]
const editDisabled = levelValues[level]["editDisabled"]
const dropdown = levelValues[level]["dropdown"]
const loopValidation = levelValues[level]["loopValidation"]
const functionValidation = levelValues[level]["functionValidation"]

if(dropdown) {
  document.getElementById("condition").style.display = "block";
  document.getElementById("condition-label").style.display = "block";
}

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
    return 'moveForward(); if(alerts.size > 0){return;} await sleep(500);\n';
};

Blockly.JavaScript['turn_right'] = function(block) {
    return 'turnRight(); if(alerts.size > 0){return;} await sleep(250);\n';
};

Blockly.JavaScript['turn_left'] = function(block) {
    return 'turnLeft(); if(alerts.size > 0){return;} await sleep(250);\n';
};

Blockly.JavaScript['move_up'] = function(block) {
    return 'moveUp(); if(alerts.size > 0){return;} await sleep(250);\n';
};

Blockly.JavaScript['move_down'] = function(block) {
    // return 'setTimeout(() => { moveDown(); }, 2000);\n'
    return 'moveDown(); if(alerts.size > 0){return;} await sleep(250);\n';
};

Blockly.JavaScript['move_left'] = function(block) {
    return 'moveLeft(); if(alerts.size > 0){return;} await sleep(250);\n';
};

Blockly.JavaScript['move_right'] = function(block) {
    return 'moveRight(); if(alerts.size > 0){return;} await sleep(250);\n';
};

var alerts = new Set()
var gameArea = document.getElementById('game-area');
var flurbCell;  // This will store the table cell that the flurb is in
// console.log(lavaPos.toString())
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

var workspace = (!readOnly && !editDisabled) ? Blockly.inject('blocklyDiv', {
  toolbox: document.getElementById('toolbox')
}): Blockly.inject('blocklyDiv', {});

if (xml) {
  var xml_ws = Blockly.utils.xml.textToDom(xml);
  Blockly.Xml.domToWorkspace(xml_ws, workspace);
  workspace.options.readOnly = readOnly;
}

function calculateScore() {
  endTime = new Date();
  let timeTaken = (endTime - startTime) / 1000; // Time in seconds
  const basePoints = 1000;
  const deductionPerSecond = 0.02; // 2% per second
  const minimumPoints = 300;

  let deduction = basePoints * deductionPerSecond * timeTaken;
  let finalScore = basePoints - deduction;
  return finalScore > minimumPoints ? finalScore : minimumPoints;
}

async function runCode() {
  var xmlDom = Blockly.Xml.workspaceToDom(workspace);
  var xmlText = Blockly.Xml.domToText(xmlDom);
  console.log(xmlText);
  var code = Blockly.JavaScript.workspaceToCode(workspace);
  code = code.replace(/^function/gm, "async function")
  code = code.replace(/([a-zA-Z0-9_]+_[a-zA-Z0-9_]+\([0-9,\s]*\);)/gm, "await $1")
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
	 if(functionValidation) {
        if(code.indexOf("function") == -1) {
            alert("You got the fruit, but you didn't use the Function Block. Try Again!");
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
    else if (document.getElementById("condition").value == "no") {
      await sleep(500)
      alert("Try Again!");
      if (dropdown){
        location.reload()
      }
      flurbPosition = {x: flurbCellX, y: flurbCellY};
      updateFlurbPosition()
		return;
    }
    flurbCell.removeChild(flurbCell.querySelector('#apple'));
    await sleep(100)
    let score = Math.floor(calculateScore())
    alert(`Success! - Points Earned: ${score}`)
    gameScore += score;
    localStorage.setItem('getFruitScore', gameScore);
    let level_val = Number(level)
    if (level_val < 520) {
      location.href = `flurb.html?level=${level_val+1}`;
    } else {
      alert("you beat the game! congratulations!!!")
    }
  } else if (document.getElementById("condition").value == "no") {
    await sleep(100)
    let score = calculateScore()
    alert(`Success! - Points Earned: ${score}`)
    gameScore += score;
    localStorage.setItem('getFruitScore', gameScore);
    let level_val = Number(level)
    if (level_val < 520) {
      location.href = `flurb.html?level=${level_val+1}`;
    } else {
      alert("you beat the game! congratulations!!!")
    }
  } 
  
  else {
    await sleep(500)
    for(var error of alerts){
        alert(error)
    }
    alert("Try Again!");
    alerts.clear();
    if (dropdown){
      location.reload()
    }
    flurbPosition = {x: flurbCellX, y: flurbCellY};
    updateFlurbPosition()
  }
}
