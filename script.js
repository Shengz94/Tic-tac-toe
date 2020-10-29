const Gameboard = (() => {
    var board = {'11': 0, '12': 0, '13': 0,
                 '21': 0, '22': 0, '23': 0,
                 '31': 0, '32': 0, '33': 0}
    var player1;
    var player2;
    var playerTurn;
    var numberOfTurn = 0;

    const setPlayer = (p1, p2) => {
        this.player1 = p1;
        this.player2 = p2;
        this.playerTurn = this.player1;
        resetGame();
    }

    const addMove = (squarePosition) => {

        if(this.playerTurn && board[squarePosition] == 0){
            board[squarePosition] = this.playerTurn.playerId;
            numberOfTurn++;
            DisplayController.showMove(squarePosition , this.playerTurn.playerId);
            if(checkWin()){
                player.increaseWins();
                DisplayController.winScreen(player.name);
                resetGame();
            }
            if(numberOfTurn == 9){
                
                setTimeout(function(){DisplayController.drawScreen();resetGame()});
            }
            this.playerTurn = this.playerTurn == this.player1 ? this.player2 : this.player1;
        }

    }

    const checkWin = () => {
        var isWin = false;
        // TODO

        return
    }

    const resetGame = () => {
        numberOfTurn = 0;
        this.playerTurn = this.player1;
        for (index in board){
            board[index] = 0;
        }
        DisplayController.resetView();
    }

    return {setPlayer, addMove}
})()

const DisplayController = (() => {

    const initView = () => {
        document.getElementsByClassName("start-game")[0].
        addEventListener("click", function(){
            var player1 = document.getElementById("player1");
            var player2 = document.getElementById("player2");

            if(player1.value.length > 0 && player2.value.length > 0){
                p1 = Player(player1.value, 1);
                p2 = Player(player2.value, 2);
                Gameboard.setPlayer(p1, p2);
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

    return {initView, winScreen, drawScreen, addMove, showMove, resetView}

})()

const Player = (name, playerId) => {
    var numberOfWins = 0; 

    const increaseWins = () => {
        numberOfWins++;
    }

    return {name, playerId, increaseWins}
}

DisplayController.initView();