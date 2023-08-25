gameBoard = (() => {
    const markerArray = Array.apply(null, Array(9)).map(function (){ })

    return {markerArray};
})();

game = (() => {
    const playMarker = (marker, square) => {
        gameBoard.markerArray[square] = marker;
        return 0;
    }

    const checkForWin = (player) => {
        (checkVerticals(player.marker) || checkHorizontals(player.marker) || checkDiagonals(player.marker)) ? true : false
    }

    function checkVerticals(marker) {

        // take the marker, and check the following: matching marker at +3/+6 on index, matching marker at +3/-3 on index, matching marker at -3/-6 on index

    }

    function checkHorizontals(marker) {

        // take the marker, and check the following: matching marker at +1/-1 if index is 1/4/7, matching marker at +1/+2 if index is 0/3/6, matching marker at -1/-2 if index is 2/5/8

    }

    function checkDiagonals(marker) {
        // take the marker, and check the following: matching marker at +4/+8 if index is 0, matching marker at +2/+4 if index is 2, matching marker at -2/+2 if index is 4
        // matching marker at -2/-4 if index is 6, matching marker at -4/-8 if index is 8
    }


    return {playMarker, checkForWin};
})();

function player(name, marker) {


    return { name, marker };

}

const player1 = player('Kevin', 'X');
const player2 = player('Alex', 'O');

console.log(player1.marker);

// 

//

console.log(gameBoard.markerArray);

squareSelected = 7;

game.playMarker(player1.marker, squareSelected);

console.log(gameBoard.markerArray);