gameBoard = (() => {

    const boardArray = Array.apply(null, Array(9)).map(function (){ })

    let buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            button.textContent = game.getActivePlayer().marker;
            console.log(button.dataset.index);
            game.playMarker(game.getActivePlayer(), button.dataset.index);
            game.switchActivePlayer();
            button.disabled = true;
        });
    });

    const endGame = () => {
        buttons.forEach(button => {
            button.disabled = true;
        })
        if (game.winner !== undefined) {
            window.alert(game.winner.name + " wins! Refresh to play again");
        } else {
            window.alert("Tied game. Refresh to play again");
        }
    }

    const getMarkerAtIndex = (index) => {
        console.log(gameBoard.boardArray);
        console.log("index: " + index)
        console.log("marker at: " + boardArray[index])
        return boardArray[index];
    }

    return {boardArray, getMarkerAtIndex};
})();

game = (() => {

    const player1 = player(prompt('Enter name for playerX', 'PlayerX'), 'X');
    const player2 = player(prompt('Enter name for playerO', 'PlayerO'), 'O');
    const players = [player1, player2];

    let activePlayerIndex = 1;
    let activePlayer = players[activePlayerIndex];

    const playMarker = (player, squarePlayed) => {
        gameBoard.boardArray[squarePlayed] = player.marker;

        if (checkForWin(player, squarePlayed)) {
            if(alert(activePlayer.name + " wins! Refresh to play again")){}
            else    window.location.reload(); 
        }

        return 0;
        // return checkForWin(player, squarePlayed);
    }

    const checkForWin = (player, squarePlayed) => {
        return (checkVerticals(player, squarePlayed) || checkHorizontals(player, squarePlayed) || checkDiagonals(player, squarePlayed))
    }

    const checkVerticals = (player, squarePlayed) => {

        // take the marker, and check the following: matching marker at +3/+6 on index, matching marker at +3/-3 on index, matching marker at -3/-6 on index

        let counter = 0;

        // compare the marker played with each square on the board. If the markers match, subtract indexes from each other on the array and remainder 3. 
        // If the answer is 0, that means the two matches are 3 indexes away from each other in either direction, meaning the align vertically. 

        gameBoard.boardArray.forEach((boardMarker, boardIndex) => {
            if (player.marker === boardMarker) {
                if ((squarePlayed - boardIndex) % 3 === 0) {
                    counter++;
                }
            }
        })

        return counter === 3;
    }

    function checkHorizontals(player, squarePlayed) {

        // take the marker, and check the following: matching marker at +1/-1 if index is 1/4/7, matching marker at +1/+2 if index is 0/3/6, matching marker at -1/-2 if index is 2/5/8

        squarePlayed = parseInt(squarePlayed);

        if (squarePlayed === 1 || squarePlayed === 4 || squarePlayed === 7) {
            if (gameBoard.getMarkerAtIndex(squarePlayed - 1) === player.marker && gameBoard.getMarkerAtIndex(squarePlayed + 1) === player.marker) {
                return true;
            }
        } else if (squarePlayed === 0 || squarePlayed === 3 || squarePlayed === 6 ) {
            if (gameBoard.getMarkerAtIndex(squarePlayed + 2) === player.marker && gameBoard.getMarkerAtIndex(squarePlayed + 1) === player.marker) {
                return true;
            }
        } else if (squarePlayed === 2 || squarePlayed === 5 || squarePlayed === 8) {
            if (gameBoard.getMarkerAtIndex(squarePlayed - 2) === player.marker && gameBoard.getMarkerAtIndex(squarePlayed - 1) === player.marker) {
                return true;
            }
        }

        return false;
    }

    function checkDiagonals(player, squarePlayed) {

        squarePlayed = parseInt(squarePlayed);

        // take the marker, and check the following: matching marker at +4/+8 if index is 0, matching marker at +2/+4 if index is 2, matching marker at -2/+2 if index is 4
        // matching marker at -2/-4 if index is 6, matching marker at -4/-8 if index is 8

        if (squarePlayed === 0) {
            if (gameBoard.boardArray[squarePlayed + 4] === player.marker && gameBoard.boardArray[squarePlayed + 8] === player.marker) {
                return true;
            }
        } else if (squarePlayed === 2) {
            if (gameBoard.boardArray[squarePlayed + 2] === player.marker && gameBoard.boardArray[squarePlayed + 4] === player.marker) {
                return true;
            }
        } else if (squarePlayed === 4 ) {
            if (gameBoard.boardArray[squarePlayed - 2] === player.marker && gameBoard.boardArray[squarePlayed + 2] === player.marker) {
                return true;
            }
        } else if (squarePlayed === 6) {
            if (gameBoard.boardArray[squarePlayed - 2] === player.marker && gameBoard.boardArray[squarePlayed - 4] === player.marker) {
                return true;
            }
        } else if (squarePlayed === 8) {
            if (gameBoard.boardArray[squarePlayed - 4] === player.marker && gameBoard.boardArray[squarePlayed - 8] === player.marker) {
                return true;
            }
        } else {
            return false;
        }

    }



    const switchActivePlayer = () => {
        activePlayerIndex = (activePlayerIndex + 1) % 2;
        activePlayer = players[activePlayerIndex];
        return 0;
    }

    const getActivePlayer = () => {
        return activePlayer;
    }


    return {players, activePlayer, playMarker, checkForWin, switchActivePlayer, getActivePlayer};
})();

function player(name, marker) {
    return {name, marker};
}
