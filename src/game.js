String.prototype.replaceAt = function(index, character) {
  return this.substr(0, index) + character + this.substr(index+character.length);
};

var EMPTY = null;

var addBrackets = function (boardString) {
  return '[' + boardString.substr(0, 3) + ']' +
         '[' + boardString.substr(3, 3) + ']' +
         '[' + boardString.substr(6, 3) + ']';
};

var removeBrackets = function (boardString) {
  return boardString.replace(/[\[\]]+/g,'');
};

var TicTacToeGame = (function() {
  function TicTacToeGame() {
    this.boardString = '.........';
    this.currentPlayer = 0;
    this.winner = null;
  }

  TicTacToeGame.prototype = {
    makeMove: function (position) {
      if (this.getWinner() !== null) { return false; }

      if (typeof position === 'number' && position >= 0) {
        this.updateBoard(position);

        if (this.checkWin()) {
          this.setWinner(this.getCurrentPlayer());
        } else if(this.boardIsFull()) {
          this.setWinner('draw');
        }

        this.setCurrentPlayer(this.nextPlayer());
        return true;
      }

      return false;
    },

    updateBoard: function(position) {
      this.boardString = this.boardString.replaceAt(position, this.getCurrentPlayerSymbol());
    },

    checkWin: function() {
      return this.winningCombinations().indexOf(this.getMovesForCurrentPlayer()) !== -1;
    },

    getMovesForCurrentPlayer: function() {
      return this.getMovesFor(this.getCurrentPlayerSymbol());
    },

    getMovesFor: function (player) {
      return this.boardString.split('').map(function(char, index) {
        if (char === player) return index;
      }).join('');
    },

    getPlayers: function() {
      return ['X', 'O'];
    },

    getCurrentPlayer: function() {
      return this.currentPlayer;
    },

    getCurrentPlayerSymbol: function () {
      return this.getPlayers()[this.currentPlayer];
    },

    setCurrentPlayer: function (player) {
      this.currentPlayer = player;
    },

    nextPlayer: function() {
      return (this.getCurrentPlayer() === 0) ? 1 : 0;
    },

    getBoard: function() {
      return [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY];
    },

    getBoardString: function () {
      return addBrackets(this.boardString);
    },

    setBoardString: function(boardString, player) {
      if (typeof player !== "undefined" && player !== null) {
        this.setCurrentPlayer(player);
      }

      if (boardString.length === 15 && this.isValid(boardString)) {
        this.boardString = removeBrackets(boardString);
        return true;
      }

      return false;
    },

    isValid: function (boardString) {
      for (var i = 0, l = boardString.length; i < l; i++) {
        if(['X', 'O', '.', '[', ']'].indexOf(boardString[i]) === -1) {
          return false;
        }
      }

      return true;
    },

    getWinner: function() {
      return this.winner;
    },

    setWinner: function(winner) {
      this.winner = winner;
    },

    winningCombinations: function() {
      return ['012', '048', '036', '147', '258', '246', '345', '678'];
    },

    boardIsFull: function() {
      return !this.boardString.includes('.');
    }
  }

  return TicTacToeGame;
})();
