let compAI = (function () {

    //Bind Events
    events.on("playerSelected", chooseEasy);
    

    //Function for easy computer to select a square
    function chooseEasy()
    {
        let boardState = gameBoard.returnBoardState();
        let rows = boardState.length;
        let cols = boardState[0].length;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (boardState[i][j] == null)
                {
                    gameBoard.compSelectSquare(i, j);
                    return;
                }
            }
        }
    }

    //Function to choose a square (hard difficulty; impossible for player to win)
    function chooseHard()
    {
        let boardState = gameBoard.returnBoardState();
        let rows = boardState.length;
        let cols = boardState[0].length;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (boardState[i][j] == null)
                {
                    gameBoard.compSelectSquare(i, j);
                    return;
                }
            }
        }
    }

    //Function to recursively look for all possible board states their corresponding
    //scores. Scores are found with findScore function below. (minimax algorithm)
    function miniMaxAlgorithm(boardState)
    {
        let movesArray = makeMovesArray(boardState);
        console.log(movesArray);
        movesArray.forEach(move => miniMaxAlgorithm(makeBoard(boardState, move[0], move[1])));

    }

    //Function to create new boardStates
    function makeBoard(boardState, i, j)
    {
        let newBoard = makeDeepCopy(boardState); //Deep copies the original board state
        newBoard[i][j] = "o"
        return newBoard;
    }

    //Function to create a deep copy of a boardState
    function makeDeepCopy(boardState)
    {
        let newBoard = [[null, null, null], [null, null, null], [null, null, null]];
        let rows = boardState.length;
        let cols = boardState[0].length;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                newBoard[i][j] = boardState[i][j];
            }
        }
        return newBoard;
    }

    //Function for figuring out number of available moves
    function makeMovesArray(boardState)
    {
        let rows = boardState.length;
        let cols = boardState[0].length;
        let movesArray = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (boardState[i][j] == null)
                {
                    movesArray.push([i, j]);
                }
            }
        }
        return movesArray;
    }

    return {
        makeBoard: makeBoard,
        makeMovesArray: makeMovesArray,
        miniMaxAlgorithm: miniMaxAlgorithm,
        makeDeepCopy: makeDeepCopy,

    }

})();