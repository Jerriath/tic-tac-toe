
let gameBoard = (function(){
    let board = [[{square: null, value: null}, {square: null, value: null}, {square: null, value: null}],[{square: null, value: null}, {square: null, value: null}, {square: null, value: null}],[{square: null, value: null}, {square: null, value: null}, {square: null, value: null}]];
    
    //cacheDOM
    let container = document.querySelector("#container");
    

    function initBoard() {
        let cols = board.length;
        let rows = board[0].length;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                board[i][j].square = _makeSquare(); //makes squares
                board[i][j].square.addEventListener("click", selectSquare.bind(event, i, j));
            }
        }
    }

    //Function for rendering the board data
    function render() {
        let cols = board.length;
        let rows = board[0].length;
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
        render();
    }

    //Function to add markers on the board
    function _chooseSquare(value, i, j) {
        if (board[i][j].value == null)
        {
            board[i][j].value = value;
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
gameBoard.clearBoard();