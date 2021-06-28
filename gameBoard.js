
let gameBoard = (function(){
    let board = [[{square: null, value: null}, {square: null, value: null}, {square: null, value: null}],[{square: null, value: null}, {square: null, value: null}, {square: null, value: null}],[{square: null, value: null}, {square: null, value: null}, {square: null, value: null}]];
    
    //cacheDOM
    let container = document.querySelector("#container");
    let clearBtn = document.querySelector("#clear");
    let playerName = document.querySelector("#playerName");

    //Bind Events
    events.on("gameStart", initBoard);
    events.on("gameStart", render);
    events.on("compSelect", compSelectSquare);

//---------------PUBLIC METHODS---------------

    function initBoard() {
        let cols = board[0].length;
        let rows = board.length;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                board[i][j].square = _makeSquare(); //makes squares
                board[i][j].square.addEventListener("click", selectSquare.bind(event, i, j));
            }
        }
    }

    clearBtn.addEventListener("click", function(e) {
        clearBoard();
        initBoard();
        render();
    });

    //Function for rendering the board data
    function render() {
        let cols = board[0].length;
        let rows = board.length;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                _fillSquare(board[i][j].square, i, j);
            }
        }
    };

    //Function to clear board
    function clearBoard() {
        let cols = board.length;
        let rows = board[0].length;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                board[i][j].square.removeEventListener("click", selectSquare.bind(event, i, j));
                board[i][j].square.remove();
                board[i][j].square = null;
                board[i][j].value = null;
            }
        }
        events.emit("boardClear", true);
    }


    //Factory function for newSquares
    function _makeSquare() {
        let newSquare = document.createElement("div");
        newSquare.classList.add("square");
        let fillIn = document.createElement("h2");
        fillIn.classList.add("marker");
        newSquare.appendChild(fillIn);
        container.appendChild(newSquare);
        return newSquare;
    }
    
    //Function to fill in square marker depending on board info
    function _fillSquare(newSquare, i, j) {
        let value = board[i][j].value;
        if(value == "x")
        {
            newSquare.firstChild.textContent = "x";
        }
        else if(value == "o")
        {
            newSquare.firstChild.textContent = "o";
        }
    }

    //Function to run for event Listener
    function selectSquare(i, j)  {
        let value = "x";
        let boardState = chooseSquare(value, i, j);
        if (boardState == 0) 
        {
            events.emit("playerSelected", true);
        }
    }

    //Function for computer to select a square
    function compSelectSquare(move) {
        let value = "o";
        chooseSquare(value, move.i, move.j);
    }

    //Function that returns the state of the board (needed for comp ai)
    function returnBoardState() { 
        let boardState = [];
        let cols = board[0].length;
        let rows = board.length;
        for (let i = 0; i < rows; i++) {
            let x = board[i][0].value; //Variables represent values of each row before pushing to array
            let y = board[i][1].value;
            let z = board[i][2].value;
            boardState.push([x, y, z]);
        }
        return boardState;
    }

    //Function to add markers on the board
    function chooseSquare(value, i, j) {
        if (board[i][j].value == null)
        {
            board[i][j].value = value;
            render();
            let boardState = checkGame();
            return boardState;
        }
    }

    //Function to check if game is over; returns 1=playerWin, 2=compWin, 3=draw 0=notOver
    function checkGame() {
        let cols = board[0].length;
        let rows = board.length;
        let returnValue = null;
        //Check columns
        for (let j = 0; j < cols; j++)
        {
            let value = board[0][j].value;
            for (let i = 1; i < rows; i++)
            {
                if (board[i][j].value != value)
                {
                    break;
                }
                else if (i == 2)
                {
                    if (value == "x")
                    {
                        returnValue = 1;
                        events.emit("gameEnded", returnValue);
                        return returnValue;
                    }
                    if (value == "o")
                    {
                        returnValue = 2;
                        events.emit("gameEnded", returnValue);
                        return returnValue;
                    }
                }
            }
        }
        //Check rows
        for (let i = 0; i < rows; i++)
        {
            let value = board[i][0].value;
            for (let j = 1; j < cols; j++)
            {
                if (board[i][j].value != value)
                {
                    break;
                }
                else if (j == 2)
                {
                    if (value == "x")
                    {
                        returnValue = 1;
                        events.emit("gameEnded", returnValue);
                        return returnValue;
                    }
                    if (value == "o")
                    {
                        returnValue = 2;
                        events.emit("gameEnded", returnValue);
                        return returnValue;
                    }
                }
            }
        }
        //Check diagonals
        let value = board[0][0].value;
        if (value == board[1][1].value && value == board[2][2].value && value != null)
        {
            if (value == "x")
            {
                returnValue = 1;
                events.emit("gameEnded", returnValue);
                return returnValue;
            }
            else if (value == "o")
            {
                returnValue = 2;
                events.emit("gameEnded", returnValue);
                return returnValue;
            }
        }
        value = board[0][2].value;
        if (value == board[1][1].value && value == board[2][0].value)
        {
            if (value == "x")
            {
                returnValue = 1;
                events.emit("gameEnded", returnValue);
                return returnValue;
            }
            else if (value == "o")
            {
                returnValue = 2;
                events.emit("gameEnded", returnValue);
                return returnValue;
            }
        }
        //Check draw
        let over = checkFull();
        if (over)
        {
            returnValue = 3;
            events.emit("gameEnded", returnValue);
            return returnValue;
        }
        return 0;
    }

    //Function to check if board is full
    function checkFull() {
        let cols = board[0].length;
        let rows = board.length;
        for (let i = 0; i < rows; i++)
        {
            for (let j = 0; j < cols; j++)
            {
                if (board[i][j].value == null)
                {
                    return false;
                }
            }
        }
        return true;
    }
    return {
        returnBoardState: returnBoardState,

    }
})();