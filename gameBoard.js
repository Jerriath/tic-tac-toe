
let gameBoard = (function(){
    let board = [[{square: null, value: null}, {square: null, value: null}, {square: null, value: null}],[{square: null, value: null}, {square: null, value: null}, {square: null, value: null}],[{square: null, value: null}, {square: null, value: null}, {square: null, value: null}]];
    
    //cacheDOM
    let container = document.querySelector("#container");
    let clearBtn = document.querySelector("#clear");
    let endMsg = document.querySelector("#endMsg");

    //Bind eventListeners
    clearBtn.addEventListener("click", function(e) {
        clearBoard();
        initBoard();
        render();
    });

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
        _chooseSquare(value, i, j);
    }

    //Function to add markers on the board
    function _chooseSquare(value, i, j) {
        if (board[i][j].value == null)
        {
            board[i][j].value = value;
            render();
            let status = checkGame();
            displayEnd(status);
        }
    }

    //Function to check if game is over; returns 1=playerWin, 2=compWin, 3=draw 0=notOver
    function checkGame() {
        let cols = board[0].length;
        let rows = board.length;
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
                        return 1;
                    }
                    if (value == "o")
                    {
                        return 2;
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
                        return 1;
                    }
                    if (value == "o")
                    {
                        return 2;
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
                return 1;
            }
            else if (value == "o")
            {
                return 2;
            }
        }
        value = board[0][2].value;
        if (value == board[1][1].value && value == board[2][0].value)
        {
            if (value == "x")
            {
                return 1;
            }
            else if (value == "o")
            {
                return 2;
            }
        }
        //Check draw
        let over = checkFull();
        if (over)
        {
            return 3;
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

    //Function to add a message if game is over
    function displayEnd(status)
    {
        if (status == 0)
        {
            return;
        }
        else if (status == 1)
        {
            endMsg.textContent = "Player Wins!";
            endMsg.style.visibility = "visible";
        }
        else if (status == 2)
        {
            endMsg.textContent = "Computer Wins!";
            endMsg.style.visibility = "visible";
        }
        else if (status == 3)
        {
            endMsg.textContent = "Draw!";
            endMsg.style.visibility = "visible";
        }
    }

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
        endMsg.textContent = "";
        endMsg.style.visibility = "hidden";
    }

    //Returns object with public functions
    return {
        render: render,
        initBoard: initBoard,
        clearBoard: clearBoard,
    }
})();





gameBoard.initBoard();
gameBoard.render();