let compAI = (function () {

    //Bind Events
    events.on("playerSelected", chooseHard);
    

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
                    let move = {i: i, j: j};
                    events.emit("compSelect", move);
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
        let turn = true; //true = player's turn. false = comp's turn
        let output = miniMaxAlgorithm(boardState, depth, turn);
        let move = {i: output.choice[0], j: output.choice[1]}
        events.emit("compSelect", move)
    }

    //Function to recursively look for all possible boardState states their corresponding
    //scores. Scores are found with scoreBoardState function below. (minimax algorithm)
    function miniMaxAlgorithm(boardState, depth, turn)
    {
        turn = !turn;
        let gameOver = checkGameOver(boardState);
        if (gameOver != 0) 
        {
            return score(gameOver, depth);
        }
        depth++;
        let movesArray = [];
        let scoreArray = [];


        //Populate moves and scores array by recursively calling miniMaxAlgorithm
        movesArray = makeMovesArray(boardState);
        for (let i = 0; i < movesArray.length; i++)
        {
            let newBoard = makeBoard(boardState, movesArray[i][0], movesArray[i][1], turn);
            scoreArray.push(miniMaxAlgorithm(newBoard, depth, turn).score)
        }


        //Returns score based on min max calculation
        let output = {choice: null, score: null};
        if (turn) //player's turn
        {
            let maxScoreIndex = findMaxIndex(scoreArray);
            output.choice = movesArray[maxScoreIndex];
            output.score = scoreArray[maxScoreIndex];
            return output;
        }
        else //comp's turn
        {
            let minScoreIndex = findMinIndex(scoreArray);
            output.choice = movesArray[minScoreIndex];
            output.score = scoreArray[minScoreIndex];
            return output;
        }

    }

    //Same function as the checkGame() func in gameBoard.js but repurposed
    function checkGameOver(board) {
        let cols = board[0].length;
        let rows = board.length;
        let returnValue = null;
        //Check columns
        for (let j = 0; j < cols; j++)
        {
            let value = board[0][j];
            for (let i = 1; i < rows; i++)
            {
                if (board[i][j] != value)
                {
                    break;
                }
                else if (i == 2)
                {
                    if (value == "x")
                    {
                        returnValue = 1;
                        
                        return returnValue;
                    }
                    if (value == "o")
                    {
                        returnValue = 2;
                        
                        return returnValue;
                    }
                }
            }
        }
        //Check rows
        for (let i = 0; i < rows; i++)
        {
            let value = board[i][0];
            for (let j = 1; j < cols; j++)
            {
                if (board[i][j] != value)
                {
                    break;
                }
                else if (j == 2)
                {
                    if (value == "x")
                    {
                        returnValue = 1;
                        
                        return returnValue;
                    }
                    if (value == "o")
                    {
                        returnValue = 2;
                        
                        return returnValue;
                    }
                }
            }
        }
        //Check diagonals
        let value = board[0][0];
        if (value == board[1][1] && value == board[2][2] && value != null)
        {
            if (value == "x")
            {
                returnValue = 1;
                
                return returnValue;
            }
            else if (value == "o")
            {
                returnValue = 2;
                
                return returnValue;
            }
        }
        value = board[0][2];
        if (value == board[1][1] && value == board[2][0])
        {
            if (value == "x")
            {
                returnValue = 1;
                
                return returnValue;
            }
            else if (value == "o")
            {
                returnValue = 2;
                
                return returnValue;
            }
        }
        //Check draw
        let over = checkFull(board);
        if (over)
        {
            returnValue = 3;
            
            return returnValue;
        }
        return 0;
    }

    //Same function as checkFull() in gameBoard but repurposed
    function checkFull(board) {
        let cols = board[0].length;
        let rows = board.length;
        for (let i = 0; i < rows; i++)
        {
            for (let j = 0; j < cols; j++)
            {
                if (board[i][j] == null)
                {
                    return false;
                }
            }
        }
        return true;
    }

    //Function to create new boardStates
    function makeBoard(boardState, i, j, turn)
    {
        let newBoard = makeDeepCopy(boardState); //Deep copies the original boardState state
        if (!turn)
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
    function score(value, depth)
    {
        let output = {choice: null, score: null};
        if (value == 1)
        {
            output.score = 10 - depth;
            return output;
        }
        else if (value == 2)
        {
            output.score = depth - 10;
            return output;
        }
        else
        {
            output.score = 0;
            return output;
        }
    }

    //Function for finding the index with the maximum score in the scoreArray
    function findMaxIndex(scoreArray)
    {
        let maxValue = Math.max(...scoreArray);
        for (let i = 0; i < scoreArray.length; i++)
        {
            if (scoreArray[i] == maxValue)
            {
                return i;
            }
        }
    }

    //Function for finding the index with the minimum score in the scoreArray
    function findMinIndex(scoreArray)
    {
        let minValue = Math.min(...scoreArray);
        for (let i = 0; i < scoreArray.length; i++)
        {
            if (scoreArray[i] == minValue)
            {
                return i;
            }
        }
    }

    return {
        makeBoard: makeBoard,
        makeMovesArray: makeMovesArray,
        miniMaxAlgorithm: miniMaxAlgorithm,
        makeDeepCopy: makeDeepCopy,
        chooseHard: chooseHard,
        findMaxIndex: findMaxIndex,
        findMinIndex: findMinIndex,


    }

})();