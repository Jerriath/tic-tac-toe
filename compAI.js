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
        let depth = 0; //Keeps track of the depth of the tree; needed to calculate score
        miniMaxAlgorithm(boardState, depth);

    }

    //Function to recursively look for all possible boardState states their corresponding
    //scores. Scores are found with scoreBoardState function below. (minimax algorithm)
    function miniMaxAlgorithm(boardState, depth) //STILL NEED TO MAKE SCORE ARRAY
    {
        let movesArray = makeMovesArray(boardState);
        if (movesArray.length == 0)
        {

            //scoreBoardState(boardState, depth)
            console.log(boardState);
        }
        console.log(depth);
        depth ++;
        movesArray.forEach(move => miniMaxAlgorithm(makeBoard(boardState, move[0], move[1], depth), depth));

    }

    //Function to create new boardStates
    function makeBoard(boardState, i, j, depth)
    {
        let newBoard = makeDeepCopy(boardState); //Deep copies the original boardState state
        if (depth%2)
        {
            newBoard[i][j] = "o";
        }
        else
        {
            newBoard[i][j] = "x";
        }
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

    //Function to give a score depending on the boardState; +10 = x win, -10 = o win.
    //Similar to function gameBoard.checkGame()
    //Also takes into account the depth of the boardState in the tree.
    function scoreBoardState(boardState, depth)
    {
        let cols = boardState[0].length;
        let rows = boardState.length;
        let returnValue = null;
        //Check columns
        for (let j = 0; j < cols; j++)
        {
            let value = boardState[0][j];
            for (let i = 1; i < rows; i++)
            {
                if (boardState[i][j] != value)
                {
                    break;
                }
                else if (i == 2)
                {
                    if (value == "x")
                    {
                        returnValue = 10;;
                        return;
                    }
                    if (value == "o")
                    {
                        returnValue = -10;
                        return;
                    }
                }
            }
        }
        //Check rows
        for (let i = 0; i < rows; i++)
        {
            let value = boardState[i][0];
            for (let j = 1; j < cols; j++)
            {
                if (boardState[i][j] != value)
                {
                    break;
                }
                else if (j == 2)
                {
                    if (value == "x")
                    {
                        returnValue = 10;;
                        return;
                    }
                    if (value == "o")
                    {
                        returnValue = -10;
                        return;
                    }
                }
            }
        }
        //Check diagonals
        let value = boardState[0][0];
        if (value == boardState[1][1] && value == boardState[2][2] && value != null)
        {
            if (value == "x")
            {
                returnValue = 10;
                return;
            }
            else if (value == "o")
            {
                returnValue = -10;
                return;
            }
        }
        value = boardState[0][2];
        if (value == boardState[1][1] && value == boardState[2][0])
        {
            if (value == "x")
            {
                returnValue = 10;
                return;
            }
            else if (value == "o")
            {
                returnValue = -10;
                return;
            }
        }
        return 0;
    }

    return {
        makeBoard: makeBoard,
        makeMovesArray: makeMovesArray,
        miniMaxAlgorithm: miniMaxAlgorithm,
        makeDeepCopy: makeDeepCopy,
        chooseHard: chooseHard,


    }

})();