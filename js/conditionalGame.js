//Time will be calculated as (100/levelNumber) * 2 seconds
const levelMapplings = {
    1: {    
        color: "",
        questions: [
            {
                codeBlock: `x = 10
y = 5
var = x > y`,
            variables: [
                {'var': 'True'}
            ],
            values: ['True', 'False']
            },
            {
                codeBlock: `x = 10
y = 5
z = 7
result = x > y`,
            variables: [
                {'result': 'True'}
            ],
            values: ['True', 'False']
            },
            {
                codeBlock: `x = 10
y = 5
z = 20
result = (z < x)`,
                variables: [
                    {'result': 'False'}
                ],
                values: ['True', 'False']
            }
        ]
    }   
        
    ,
    2: {
        color: "",
        questions: [
            {
                codeBlock: `x = 10
y = 5
z = 7
result = (x > y) and (z < y)`,
                variables: [
                    {'result': 'False'}
                ],
                values: ['True', 'False']
            },
            {
                codeBlock: `x = 10
y = 5
z = 7
result = x > y`,
            variables: [
                {'result': 'True'}
            ],
            values: ['True', 'False']
            }
        ]
    },
    3: {

    },
    4: {

    },
    5: {

    },
    6: {

    },
    7: {

    },
    8: {

    },
    9: {

    },
    10: {

    }
}
let level = 1
let lives = 3;
let progressBar = document.getElementById("progress-bar");
let width = 100;
let intervalId = setInterval(decreaseWidth, 1000);

function decreaseWidth() {
  if (width > 0) {
    width -= 3.33;
    progressBar.style.width = width + "%";
  } else {
    clearInterval(intervalId);
    console.log("Time's Up!")
  }
}
