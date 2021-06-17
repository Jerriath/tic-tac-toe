let welcome = (function() {

    //cacheDOM
    let welcomePage = document.querySelector("#welcomePage");
    let nameInput = document.querySelector("#nameInput");
    let submit = document.querySelector("#submit");
    let playerName = document.querySelector("#playerName");
    
    //Bind listener
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

})();