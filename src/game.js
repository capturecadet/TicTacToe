String.prototype.replaceAt = function(index, character) {
  return this.substr(0, index) + character + this.substr(index+character.length);
};

var TicTacToeGame = (function() {
  function TicTacToeGame() {
    this.boardString = '[...][...][...]';
    this.currentPlayer = 0;
    this.winner = null;
  }

  TicTacToeGame.prototype = {
    makeMove: function (move) {
      if (!isNaN(move) && move >= 0) {
        var this.boardString.replaceAt(move, this.getChar())
        this.setBoardString()
      }
      return false;
    },

    getBoardString: function () {
      return this.boardString;
    },

    getChar: function () {
      return this.getPlayers()[this.currentPlayer];
    },

    getPlayers: function() {
      return ['X', 'O'];
    },

    getBoard: function() {
      return [null, null, null, null, null, null, null, null, null];
    },

    getWinner: function() {
      return this.winner;
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

      if (boardString.length === 15) {
        if(this.isValid(boardString)) {
          this.boardString = boardString;
          return true;
        };
      }

      return false;
    },

    isValid: function (boardString) {
      var validCharacters = ['X', 'O', '.', '[', ']'];
      for(char in boardString) {
        if(validCharacters.indexOf(boardString[char]) === -1) {
          return false;
        }
      }
      return true;
    }
  }

  return TicTacToeGame;
})();
