gameBoard = (() => {

    const markerArray = Array.apply(null, Array(9)).map(function (){ })

    let buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            button.textContent = game.getActivePlayer().marker;
            game.playMarker(game.getActivePlayer().marker, button.dataset.index);
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

    return {markerArray};
})();

game = (() => {

    const player1 = player(prompt('Enter name for playerX', 'playerX'), 'X');
    const player2 = player(prompt('Enter name for playerO', 'playerO'), 'O');
    const players = [player1, player2];

    let activePlayerIndex = 1;
    let activePlayer = players[activePlayerIndex];

    const playMarker = (markerPlayed, squarePlayed) => {
        gameBoard.markerArray[squarePlayed] = markerPlayed;


        if (checkForWin(markerPlayed, squarePlayed)) {
            if(alert(activePlayer.name + " wins! Refresh to play again")){}
            else    window.location.reload(); 
        }
        
        return checkForWin(markerPlayed, squarePlayed);
    }

    const checkForWin = (markerPlayed, squarePlayed) => {
        return (checkVerticals(markerPlayed, squarePlayed) || checkHorizontals(markerPlayed, squarePlayed) || checkDiagonals(markerPlayed, squarePlayed))
    }

    const checkVerticals = (markerPlayed, squarePlayed) => {

        // take the marker, and check the following: matching marker at +3/+6 on index, matching marker at +3/-3 on index, matching marker at -3/-6 on index

        let counter = 0;

        // for each array, subtract the index from marker (0-2) and remainder 3, if the answer is 0, then it is the correct index. Finding two matches. 

        gameBoard.markerArray.forEach((squareMarker, squareIndex) => {
            if (markerPlayed === squareMarker) {
                if ((squarePlayed - squareIndex) % 3 === 0) {
                    counter++;
                }
            }
        })

        return counter === 3;
    }

    function checkHorizontals(markerPlayed, squarePlayed) {

        // take the marker, and check the following: matching marker at +1/-1 if index is 1/4/7, matching marker at +1/+2 if index is 0/3/6, matching marker at -1/-2 if index is 2/5/8

        if (squarePlayed === 1 || 4 || 7) {
            if (gameBoard.markerArray[squarePlayed - 1] === markerPlayed && gameBoard.markerArray[squarePlayed + 1] === markerPlayed) {
                return true;
            }
        } else if (squarePlayed === 0 || 3 || 6 ) {
            if (gameBoard.markerArray[squarePlayed + 2] === markerPlayed && gameBoard.markerArray[squarePlayed + 1] === markerPlayed) {
                return true;
            }
        } else if (squarePlayed === 2 || 5 || 8 ) {
            if (gameBoard.markerArray[squarePlayed - 2] === markerPlayed && gameBoard.markerArray[squarePlayed - 1] === markerPlayed) {
                return true;
            }
        }

        return false;
    }

    function checkDiagonals(markerPlayed, squarePlayed) {

        // take the marker, and check the following: matching marker at +4/+8 if index is 0, matching marker at +2/+4 if index is 2, matching marker at -2/+2 if index is 4
        // matching marker at -2/-4 if index is 6, matching marker at -4/-8 if index is 8

        if (squarePlayed === 0) {
            if (gameBoard.markerArray[squarePlayed + 4] === markerPlayed && gameBoard.markerArray[squarePlayed + 8] === markerPlayed) {
                return true;
            }
        } else if (squarePlayed === 2) {
            if (gameBoard.markerArray[squarePlayed + 2] === markerPlayed && gameBoard.markerArray[squarePlayed + 4] === markerPlayed) {
                return true;
            }
        } else if (squarePlayed === 4 ) {
            if (gameBoard.markerArray[squarePlayed - 2] === markerPlayed && gameBoard.markerArray[squarePlayed + 2] === markerPlayed) {
                return true;
            }
        } else if (squarePlayed === 6) {
            if (gameBoard.markerArray[squarePlayed - 2] === markerPlayed && gameBoard.markerArray[squarePlayed - 4] === markerPlayed) {
                return true;
            }
        } else if (squarePlayed === 8) {
            if (gameBoard.markerArray[squarePlayed - 4] === markerPlayed && gameBoard.markerArray[squarePlayed - 8] === markerPlayed) {
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


//turn logic: user clicks empty square (disable squares that are not filled), square is updated with marker, check for win or full board, if no win, next turn.

// console.log(game.playMarker(player1.marker, 0));
// console.log(game.playMarker(player2.marker, 5));
// console.log(game.playMarker(player1.marker, 2));
// console.log(game.playMarker(player2.marker, 3));
// console.log(game.playMarker(player1.marker, 4));
// console.log(game.playMarker(player2.marker, 6));
// console.log(game.playMarker(player1.marker, 8));
// console.log(game.playMarker(player2.marker, 7));
// console.log(gameBoard.markerArray);