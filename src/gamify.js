var gamify = function (boardString) {
  var firstRow = boardString.substr(0, 3);
  var secondRow = boardString.substr(3, 3);
  var thirdRow = boardString.substr(6, 3);
  return '[' + firstRow + '][' + secondRow + '][' + thirdRow + ']';
};

var ungamify = function (boardString) {
  return boardString.replace(/[\[\]]+/g,'');
};

var getMoveIndexesFor = function (player, boardString) {
  var moveIndexes = [];
  boardString = ungamify(boardString);

  for(char in boardString) {
    if(boardString[char] === player) {
      moveIndexes.push(char);
    }
  }

  return moveIndexes.join('');
};

var isAWinner = function (indexes) {
  var winningCombinations = [
    '012',
    '048',
    '036',
    '147',
    '258',
    '246',
    '345',
    '678'
  ]
  return winningCombinations.indexOf(indexes) !== -1
};
