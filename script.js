gameBoard = (() => {
    const markerArray = Array.apply(null, Array(9)).map(function (){ })

    return {markerArray};
})();

game = (() => {

    const playMarkerLog = () => {
        return markerPlayed + squarePlayed;
    }

    const gameFinished = false;
    // const activePlayer;

    const playMarker = (markerPlayed, squarePlayed) => {
        gameBoard.markerArray[squarePlayed] = markerPlayed;
        return checkForWin(markerPlayed, squarePlayed);
    }

    const checkForWin = (markerPlayed, squarePlayed) => {
        return (checkVerticals(markerPlayed, squarePlayed) || checkHorizontals(markerPlayed, squarePlayed) || checkDiagonals(markerPlayed, squarePlayed))
    }

    const checkVerticals = (markerPlayed, squarePlayed) => {

        console.log(squarePlayed);
        // for each array, subtract the index from marker (0-2) and remainder 3, if the answer is 0, then it is the correct index. Finding two matches. 
        let counter = 0;

        gameBoard.markerArray.forEach((squareMarker, squareIndex) => {
            if (markerPlayed === squareMarker) {
                if ((squarePlayed - squareIndex) % 3 === 0) {
                    counter++;
                }
            }
        })

        return counter === 3;
        // take the marker, and check the following: matching marker at +3/+6 on index, matching marker at +3/-3 on index, matching marker at -3/-6 on index

    }

    function checkHorizontals(marker) {
        return false;
        // take the marker, and check the following: matching marker at +1/-1 if index is 1/4/7, matching marker at +1/+2 if index is 0/3/6, matching marker at -1/-2 if index is 2/5/8

    }

    function checkDiagonals(marker) {
        return false;
        // take the marker, and check the following: matching marker at +4/+8 if index is 0, matching marker at +2/+4 if index is 2, matching marker at -2/+2 if index is 4
        // matching marker at -2/-4 if index is 6, matching marker at -4/-8 if index is 8
    }


    return {playMarker, checkForWin, checkVerticals};
})();

function player(name, marker) {


    return { name, marker };

}

const player1 = player('Kevin', 'X');
const player2 = player('Alex', 'O');



//turn logic: user clicks empty square (disable squares that are not filled), square is updated with marker, check for win or full board, if no win, next turn.

console.log(game.playMarker(player1.marker, 0));
console.log(game.playMarker(player2.marker, 2));
console.log(game.playMarker(player1.marker, 4));
console.log(game.playMarker(player2.marker, 3));
console.log(game.playMarker(player1.marker, 6));
console.log(game.playMarker(player2.marker, 8));
console.log(game.playMarker(player1.marker, 7));
console.log(game.playMarker(player2.marker, 1));
console.log(gameBoard.markerArray);