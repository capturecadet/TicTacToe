describe('the TicTacToeGame class', function() {
  it('should create unique instances', function() {
    var game = new TicTacToeGame();
    var game2 = new TicTacToeGame();
    game.makeMove(2);
    game2.makeMove(5);
    expect(game.getBoardString()).not.toEqual(game2.getBoardString());
  });
});

describe('a new game', function() {
  var game = new TicTacToeGame();
  var players = game.getPlayers();

  it('should have 2 players', function() {
    expect(players.length).toEqual(2);
  });

  it('should have an X and O player', function() {
    expect(players[0]).toEqual('X');
    expect(players[1]).toEqual('O');
  });

  it('should have an empty game board', function() {
    var board = game.getBoard();
    var foundToken = false;
    for (var i = 0; i < board.length; i++) {
      if (board[i] !== null) {
        foundToken = true;
        break;
      }
    }
    expect(foundToken).toBe(false);
  });

  it('should have no winner', function() {
    expect(game.getWinner()).toBeNull();
  });

  it('should expect the X player to go first', function() {
    expect(game.getCurrentPlayer()).toEqual(0);
  });

});

describe('the game board', function() {
  var game = new TicTacToeGame();
  var board = game.getBoard();

  it('should have 9 spaces', function() {
    expect(board.length).toEqual(9);
  });

  it('should be square', function() {
    expect(board.length / 3).toEqual(3);
    expect(board.length % 3).toEqual(0);
  });
});

describe('setting the board state via a string', function() {
  var game = new TicTacToeGame();

  it('should return false and leave the board intact if the passed string is not 15 chars long', function() {
    var set = game.setBoardString('[...][.X][...]');
    expect(set).toBe(false);
    expect(game.getBoardString()).toEqual('[...][...][...]');
  });

  it('should return false and leave the board intact if the passed string contains non-X-or-O tokens', function() {
    var set = game.setBoardString('[...][.Z.][...]');
    expect(set).toBe(false);
    expect(game.getBoardString()).toEqual('[...][...][...]');
  });

  it('should return true and add a X to the centre spot if a string of [...][.X.][...] is passed', function() {
    var set = game.setBoardString('[...][.X.][...]');
    expect(set).toBe(true);
    expect(game.getBoardString()).toEqual('[...][.X.][...]');
  });

  it('should default to expecting the X player to move next', function() {
    var set = game.setBoardString('[...][.X.][...]');
    expect(game.getCurrentPlayer()).toBe(0);
  });

  it('should accept an optional param to set which player moves next', function() {
    var set = game.setBoardString('[...][.X.][...]', 1);
    expect(game.getCurrentPlayer()).toBe(1);
  });
});

describe('making a move', function() {
  var game = new TicTacToeGame();

  it('should return false and leave the board intact if a non-numeric position is passed', function() {
    var move = game.makeMove('foo');
    expect(move).toBe(false);
    expect(game.getBoardString()).toEqual('[...][...][...]');
  });

  it('should return false and leave the board intact if an invalid position is passed', function() {
    var move = game.makeMove(-5);
    expect(move).toBe(false);
    expect(game.getBoardString()).toEqual('[...][...][...]');
  });

  it('should return false and leave the board intact if the game has been won', function() {
    game.setBoardString('[X..][X..][...]');
    game.makeMove(6);
    expect(game.getWinner()).toEqual(0);
    game.makeMove(4);
    expect(game.getBoardString()).toEqual('[X..][X..][X..]');
  });
});

describe('testing win conditions', function() {
  var game;
  beforeEach(function() {
    game = new TicTacToeGame();
  });

  it('should be done automatically after a player makes a valid move', function() {
    spyOn(game, 'checkWin');
    game.makeMove(2);
    expect(game.checkWin).toHaveBeenCalled();
  });

  it('should check only for the player who most recently made a move', function() {
    game.setBoardString('[OOO][...][...]');
    game.makeMove(4);
    expect(game.getWinner()).toBeNull();
  });

  it('should return false if the game is not won', function() {
    game.setBoardString('[X..][X..][...]');
    expect(game.checkWin()).toBe(false);
  });

  it('should return true if the game is won', function() {
    game.setBoardString('[X..][X..][X..]');
    expect(game.checkWin()).toBe(true);
  });

  it('should set the winner to the player who most recently moved if the game is won', function() {
    game.setBoardString('[X..][X..][...]');
    game.makeMove(6);
    expect(game.getWinner()).toEqual(0);
  });

  it('should declare the game a draw if the most recent move filled up the board without winning the game', function() {
    game.setBoardString('[XOX][XO.][OX.]');
    game.makeMove(5);
    game.makeMove(8);
    expect(game.getWinner()).toEqual('draw');
  });
});

describe('flow of play', function() {
  var game = new TicTacToeGame();

  it('placing an X in the centre spot should make the board look like [...][.X.][...]', function() {
    game.makeMove(4);
    var boardString = game.getBoardString();
    expect(boardString).toEqual('[...][.X.][...]');
  });

  it('- and should check if the game is won, and determine it is not', function() {
    expect(game.getWinner()).toBeNull();
  });

  it('- and should pass play to the O player', function() {
    expect(game.getCurrentPlayer()).toEqual(1);
  });

  it('placing an O in the centre spot should fail, as the spot has an X in it, so the board state should still look like [...][.X.][...]', function() {
    game.makeMove(4);
    var boardString = game.getBoardString();
    expect(boardString).toEqual('[...][.X.][...]');
  });

  it('- and should retain the O player as the current turn', function() {
    game.makeMove(4); // remove this
    expect(game.getCurrentPlayer()).toEqual(1);
  });

  it('placing an O in the top right spot should make the board look like [..O][.X.][...]', function() {
    game.makeMove(2);
    var boardString = game.getBoardString();
    expect(boardString).toEqual('[..O][.X.][...]');
  });

  it('- and should check if the game is won, and determine it is not', function() {
    expect(game.getWinner()).toBeNull();
  });

  it('- and should pass play to the X player', function() {
    expect(game.getCurrentPlayer()).toEqual(0);
  });
});

describe('given a board which looks like [OXO][.XO][O..]', function() {
  var game = new TicTacToeGame();
  game.setBoardString('[OXO][.XO][O..]');

  it('placing an X in the bottom spot should make the board look like [OXO][.XO][OX.]', function() {
    game.makeMove(7);
    var boardString = game.getBoardString();
    expect(boardString).toEqual('[OXO][.XO][OX.]');
  });

  it('- and should check if the game is won, and determine it is', function() {
    expect(game.getWinner()).not.toBeNull();
  });

  it('- and should determine the X player as the winner', function() {
    expect(game.getWinner()).toEqual(0);
  });
});
