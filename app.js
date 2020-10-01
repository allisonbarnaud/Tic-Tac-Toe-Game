//checklist of every element needed:
//- 3x3 grid, customizable and size accurate
//- clickable boxes, changes content/class
//- player switching after every click, adds a different class to clicked boxes based on turn
//- score tracking after every win
//- system that checks for a win condition after every turn
//-

//!variables!//

//all possible win conditions that should be checked, (checking can be done after first player clicked three times, no point before that)

var winStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//tracking inputs within the grid of both players

var gridTracker = ['', '', '', '', '', '', '', '', ''];

//DOM selectors

var boxes = document.querySelectorAll('div');
var turnDisplay = document.querySelector('h3');
var resetBtn = document.querySelector('.reset');
var winOverlay = document.querySelector('.box2');
var OptionsOverlay = document.querySelector('.box3');
var P1score = document.querySelector('.P1score');
var P2score = document.querySelector('.P2score');
var optionsBtn = document.querySelector('.Options');


//player is between 1 and 2: 1 is o, 2 is x

var player = 1;

//win values P1

var winValuesP1 = [];
var winValuesP2 = [];

var checkWin = [];

//game states

var playerWon = false;
var player1Won = false;
var player2Won = false;
var playerDraw = false;
var playerReset = false;
var options = false;

var player1Score = 0;
var player2Score = 0;

//!functions!//

function handleClick(event) {
    
    if (event.target.className == '' && playerWon == false && playerDraw == false)
    {
        if (player == 1)
        {
            event.target.classList.add('player1')
            turnDisplay.textContent = 'Turn: player 2'
            turnDisplay.style.color = '#F9665E'
            player++
            pushGridValues(event);
        }
        else if (player == 2)
        {
            event.target.classList.add('player2')
            turnDisplay.textContent = 'Turn: player 1'
            turnDisplay.style.color = '#799FCB'
            player--
            pushGridValues(event);
        }   
    } 
}

function pushGridValues(event) {
    gridTracker.splice(event.target.dataset.value, 1, event.target.className)
}

//click events

for (var i = 0; i < boxes.length; i++)
{
    boxes[i].addEventListener('click', handleClick)
    boxes[i].addEventListener('click', winValuesAdder)
    boxes[i].addEventListener('click', overlay)
}

resetBtn.addEventListener('click', resetGame)
optionsBtn.addEventListener('click', Options)

//pushes index values of player1's clicked boxes
//issue with repeating values, fixed by filtering repeated values

function winValuesAdder() 
{
    
    for (var i = 0; i < gridTracker.length; i++)
    {
        if (gridTracker[i] === 'player1')
        {
            winValuesP1.push(i)
            winValuesP1 = winValuesP1.filter(function(item,pos) {
                return winValuesP1.indexOf(item) == pos;
            })
        }
        else if (gridTracker[i] === 'player2')
        {
            winValuesP2.push(i)
            winValuesP2 = winValuesP2.filter(function(item,pos) {
                return winValuesP2.indexOf(item) == pos;
            })
        } 
    }
    compareWithWins()
    draw()
    
}

//use functions .include and .every to check all corresponding values of each sub array?

function compareWithWins() {
    for (j = 0; j < winStates.length; j++)
    {   
        if (playerWon == false && playerDraw == false)
        {
            if (winValuesP1.includes(winStates[j][0]) && winValuesP1.includes(winStates[j][1]) && winValuesP1.includes(winStates[j][2]))
            {
                console.log('player1 won!')
                player1Score ++
                player1Won = true;
                P1score.innerHTML = `Player 1 <br /> ${player1Score}`
            }
            else if (winValuesP2.includes(winStates[j][0]) && winValuesP2.includes(winStates[j][1]) && winValuesP2.includes(winStates[j][2]))
            {
                console.log('player2 won!')
                player2Score ++
                player2Won = true;
                P2score.innerHTML = `Player 2 <br /> ${player2Score}`
            }
            
        }
    }
}

function draw() {
    if (playerWon == false && playerDraw == false)
    {
        if (boxes.length == (document.querySelectorAll('.player1').length + document.querySelectorAll('.player2').length))
        {
            console.log('its a draw!');
            playerDraw = true;
        }
    }
}

function resetGame()
{
    if (options == false)
    {   
        
        for (i = 0; i < boxes.length; i++)
        {
            boxes[i].className = '';
        }
        winValuesP1 = []
        winValuesP2 = []
        gridTracker = ['', '', '', '', '', '', '', '', ''];
        player = 1;
        turnDisplay.textContent = 'Turn: player 1'
        winOverlay.style.display = 'none';
        player1Won = false;
        player2Won = false;
        playerDraw = false;
        if (playerWon == false)
        {
            resetBtn.textContent = 'Reset Game';
        }
        turnDisplay.style.color = '#799FCB'
    }
    else if (options == true)
    {
        var inputName1 = document.querySelector('.p1').value;
        var inputName2 = document.querySelector('.p2').value;
        
        OptionsOverlay.style.display = 'none';
        P1score.innerHTML = `${inputName1} <br /> ${player1Score}`
        P2score.innerHTML = `${inputName2} <br /> ${player2Score}`
        options = false;
        inputName1 = '';
        inputName2 = '';
        resetBtn.textContent = 'Reset Game';
    }
}

function overlay() {
    if (player1Won == true)
    {
        winOverlay.style.display = 'block';
        winOverlay.textContent = `Player 1 Won!`;
        resetBtn.textContent = 'Play Again';
    }
    else if(player2Won == true)
    {
        winOverlay.style.display = 'block';
        winOverlay.textContent = `Player 2 Won!`;
        resetBtn.textContent = 'Play Again';
    }
    else if(playerDraw == true)
    {
        winOverlay.style.display = 'block';
        winOverlay.textContent = `It's a draw!`;
        resetBtn.textContent = 'Play Again';
    }
}

function Options() {
    options = true;
    OptionsOverlay.style.display = 'block';
    resetBtn.textContent = 'Confirm';
}




