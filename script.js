const Gameboard = (() => {
    var board = {'11': 0, '12': 0, '13': 0,
                 '21': 0, '22': 0, '23': 0,
                 '31': 0, '32': 0, '33': 0}
    var playerCollection = [];
    var player1;
    var player2;
    var playerTurn;
    var numberOfTurn = 0;

    const setPlayer = (player1, player2) => {
        this.player1 = newUser(player1, 1);
        this.player2 = newUser(player2, 2);
        this.playerTurn = this.player1;
        resetGame();
    }

    const addMove = (squarePosition) => {

        if(this.playerTurn && board[squarePosition] == 0){
            board[squarePosition] = this.playerTurn.playerId;
            numberOfTurn++;
            DisplayController.showMove(squarePosition , this.playerTurn.playerId);
            if(checkWin(squarePosition)){
                this.playerTurn.increaseWins();
                DisplayController.updateWins(this.playerTurn.playerId, this.playerTurn.winGetter());
                setTimeout(function(){
                    DisplayController.winScreen(this.playerTurn.name);
                    resetGame();
                }, 1);
            }
            else if(numberOfTurn == 9){
                setTimeout(function(){
                    DisplayController.drawScreen();
                    resetGame();
                }, 1);
            }
            else{
                this.playerTurn = this.playerTurn == this.player1 ? this.player2 : this.player1;
            }
        }

    }

    const checkWin = (squarePosition) => {
        [column, row] = squarePosition.split("");
        return rowCheck(row) || columnCheck(column) || diagonalCheck();
    }

    const resetGame = () => {
        numberOfTurn = 0;
        this.playerTurn = this.player1;
        for (index in board){
            board[index] = 0;
        }
        DisplayController.resetView();
    }

    const rowCheck = (row) => {
        var rowMatch = true;
        
        for(var column = 1; column < 4; column++){
            if(board["" + column + row] != this.playerTurn.playerId){
                rowMatch = false;
                break;
            }
        }
        
        return rowMatch;
    }

    const columnCheck = (column) => {
        var columnMatch = true;

        for(var row = 1; row < 4; row++){
            if(board["" + column + row] != this.playerTurn.playerId){
                columnMatch = false;
                break;
            }
        }
        
        return columnMatch;
    }

    const diagonalCheck = () => {
        return ((this.playerTurn.playerId == board["11"] &&
                this.playerTurn.playerId == board["22"] &&
                this.playerTurn.playerId == board["33"]) || 
                (this.playerTurn.playerId == board["13"] &&
                this.playerTurn.playerId == board["11"] &&
                this.playerTurn.playerId == board["31"]));
    }

    const newUser = (name, id) => {
        player = Player(name, id);
        DisplayController.updateWins(id, player.winGetter());
        playerCollection.push(name);
        localStorage.setItem("tic-tac-toePlayers",JSON.stringify(playerCollection))

        return player;
    }

    rawData = localStorage.getItem("tic-tac-toePlayers");
    if(rawData != null){
        playerCollection = JSON.parse(rawData);
        //DisplayController.initRanking(playerCollection);
    }

    return {setPlayer, addMove, newUser}
})()

const DisplayController = (() => {

    const initView = () => {
        document.getElementsByClassName("start-game")[0].
        addEventListener("click", function(){
            var player1 = document.getElementById("player1");
            var player2 = document.getElementById("player2");

            if(player1.value.length > 0 && player2.value.length > 0 && player1.value != player2.value){
                Gameboard.setPlayer(player1.value, player2.value);
                document.getElementsByClassName("disabled")[0].classList.remove("disabled");
            }
            else{
                alert("Please, Introduce both player's name");
            }
        })

        for(var i = 1; i < 4; i++){
            for(var j = 1; j < 4; j++){
                var squarePosition = "" + i + j;
                var square = document.getElementById(squarePosition);
                square.addEventListener("click", DisplayController.addMove.bind(null, squarePosition));
            }
        }
    }

    const winScreen = winner => {
        alert(winner + " Win!!")
    }
    const drawScreen = () => { 
        alert("Oh, it's a draw!!")
    }

    const addMove = (squarePosition) => {
        Gameboard.addMove(squarePosition)
    }

    const showMove = (squarePosition, playerId) => {
        var square = document.getElementById(squarePosition).children[0];
        if(playerId == 1){ // id = 1 -> X
            square.innerHTML = "X";
        }
        else{ // id = 2 -> O
            square.innerHTML = "O";
        } 
    }

    const resetView = () => {
        var squares = document.getElementsByClassName("mark");
        for(index in squares){
            squares[index].innerHTML = "";
        }
    }

    const updateWins = (playerId, wins) => {
        var label = document.getElementById("player" + playerId + "Win");
        label.innerHTML = wins;
    }

    const initRanking = players => {
        for(index in players){
            localplayers[index]
        }
    }
    const updateRanking = player => {

    }

    return {initView, winScreen, drawScreen, addMove, showMove, resetView, updateWins, initRanking, updateRanking}

})()

const Player = (name, playerId) => {
    var numberOfWins = localStorage.getItem("tiptactoe-" + name) || 0;

    const winGetter = () => {
        return numberOfWins;
    }

    const increaseWins = () => {
        numberOfWins++;
        localStorage.setItem("tiptactoe-" + name, numberOfWins);
    }

    return {name, playerId, winGetter, increaseWins}
}

DisplayController.initView();