describe('ungamify', function() {
  it('should remove square brackets from board string passed in', function() {
    var ungamified = ungamify('[.X.][X..][..X]');
    expect(ungamified).toEqual('.X.X....X');
  });
});

describe('gamify', function() {
  it('should add square brackets back into the board string', function() {
    expect(gamify('.X.X....X')).toEqual('[.X.][X..][..X]');
    expect(gamify('X..OX...O')).toEqual('[X..][OX.][..O]');
  });
});

describe('getMoveIndexesFor', function () {
  it('get indexes of the char inside board string', function() {
    expect(getMoveIndexesFor('X', '[XXX][...][...]')).toEqual('012')
  });
});

describe('isAWinner', function () {
  it('returns true if the indexes passed in win the game', function() {
    expect(isAWinner('012')).toEqual(true);
    expect(isAWinner('048')).toEqual(true);
    expect(isAWinner('036')).toEqual(true);
    expect(isAWinner('147')).toEqual(true);
    expect(isAWinner('258')).toEqual(true);
    expect(isAWinner('246')).toEqual(true);
    expect(isAWinner('345')).toEqual(true);
    expect(isAWinner('678')).toEqual(true);
    expect(isAWinner('138')).toEqual(false);
    expect(isAWinner('111111')).toEqual(false);
    expect(isAWinner('01')).toEqual(false);
  });
});
