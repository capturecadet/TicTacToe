String.prototype.replaceAt = function(index, character) {
  return this.substr(0, index) + character + this.substr(index+character.length);
};

var EMPTY = null;

var gamify = function (boardString) {
  var firstRow = boardString.substr(0, 3);
  var secondRow = boardString.substr(3, 3);
  var thirdRow = boardString.substr(6, 3);
  return '[' + firstRow + '][' + secondRow + '][' + thirdRow + ']';
};

var ungamify = function (boardString) {
  return boardString.replace(/[\[\]]+/g,'');
};

var Move = (function() {
  function Move(position) {
    this.position = position;
  }

  Move.prototype.isValid = function() {
    return !isNaN(this.position) && this.position >= 0
  };

  return Move;
})();

var TicTacToeGame = (function() {
  function TicTacToeGame() {
    this.boardString = '[...][...][...]';
    this.currentPlayer = 0;
    this.winner = null;
  }

  TicTacToeGame.prototype = {
    makeMove: function (position) {
      if (this.getWinner() !== null) { return false; }

      var move = new Move(position);

      if (move.isValid()) {
        this.updateBoard(move);
        if (this.checkWin()) {
          this.setWinner(this.getCurrentPlayer());
        }
      }
      return false; // move is invalid
    },

    updateBoard: function(move) {
      var updatedBoardString = ungamify(this.boardString).replaceAt(move.position, this.getCurrentPlayerChar());
      this.setBoardString(gamify(updatedBoardString));
    },

    checkWin: function() {
      var movesByCurrentPlayer = this.getMovesFor(this.getCurrentPlayerChar());
      var winningCombinations = ['012', '048', '036', '147', '258', '246', '345', '678'];
      return winningCombinations.indexOf(movesByCurrentPlayer) !== -1
    },

    getMovesFor: function (player) {
      var moveIndexes = [];
      var boardString = ungamify(this.boardString);

      for(char in boardString) {
        if(boardString[char] === player) {
          moveIndexes.push(char);
        }
      }

      return moveIndexes.join('');
    },

    getBoardString: function () {
      return this.boardString;
    },

    getCurrentPlayerChar: function () {
      return this.getPlayers()[this.currentPlayer];
    },

    getPlayers: function() {
      return ['X', 'O'];
    },

    getBoard: function() {
      return [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY];
    },

    getWinner: function() {
      return this.winner;
    },

    setWinner: function(winner) {
      this.winner = winner;
    },

    getCurrentPlayer: function() {
      return this.currentPlayer;
    },

    setCurrentPlayer: function (player) {
      this.currentPlayer = player;
    },

    setBoardString: function(boardString, player) {
      if (typeof player !== "undefined" && player !== null) {
        this.setCurrentPlayer(player);
      }

      if (boardString.length === 15 && this.isValid(boardString)) {
        this.boardString = boardString;
        return true;
      }

      return false;
    },

    isValid: function (boardString) {
      var validCharacters = ['X', 'O', '.', '[', ']'];

      for(char in boardString) {
        if (boardString.hasOwnProperty(char) && validCharacters.indexOf(boardString[char]) === -1) {
          return false;
        }
      }

      return true;
    }
  }

  return TicTacToeGame;
})();
