let game = (function() {

    //cache DOM
    let playerScore = document.querySelector("#playerScore");
    let compScore = document.querySelector("#compScore");
    let clearBtn = document.querySelector("#clear");
    let endMsg = document.querySelector("#endMsg");

    //Bind Events and Listeners
    events.on("gameEnded", _displayEnd);
    events.on("gameEnded", changeScore);
    events.on("boardClear", clearEndMsg);

    //Function to add a message if game is over
    function _displayEnd(status)
    {
        if (status == 1)
        {
            let name = playerName.textContent;
            endMsg.textContent = name +  " Wins!";
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

    //Function to change the score depending on who won
    function changeScore(status) 
    {
        let currentPlayer = parseInt(playerScore.textContent);
        let currentComp = parseInt(compScore.textContent);
        if (status == 1)
        {
            playerScore.textContent = ++currentPlayer;
        }
        else if (status == 2)
        {
            compScore.textContent = ++currentComp;
        }
    }

    //Function to clear the endGame message
    function clearEndMsg()
    {
        endMsg.textContent = "";
        endMsg.style.visibility = "hidden";
    }


})();