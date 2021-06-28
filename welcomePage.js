let welcome = (function() {

    //cacheDOM
    let welcomePage = document.querySelector("#welcomePage");
    let nameInput = document.querySelector("#nameInput");
    let submit = document.querySelector("#submit");
    let playerName = document.querySelector("#playerName");
    let easyDiff = document.querySelector("#easyDiff");

    easyDiff.checked = true; //This sets the difficulty to easy by default
    
    //Bind listener
    submit.addEventListener("click", setDifficulty)
    submit.addEventListener("click", setName);
    
    //Function to change the default name "Player" to user input
    function setName() {
        let name = nameInput.value;
        if (name == "")
        {
            name = "Player"
        }
        playerName.textContent = name;
        welcomePage.style.display = "none";
        events.emit("gameStart", true);
    }

    //Only checks if easy is checked. If not, will set to hard
    function setDifficulty()
    {
        if (easyDiff.checked)
        {
            events.emit("setDifficulty", "easy");
        }
        else
        {
            events.emit("setDifficulty", "hard");
        }
    }

})();