const runDriveInstructions = require('../app.js').runDriveInstructions;

test('test it returns correct last hoover position', (done) => {
    let driveInstr = ['N', 'N', 'E', 'S', 'E', 'E', 'S', 'W', 'N', 'W', 'W'];
    let startingCoords = [ 1, 2 ];
    let roomSize = {
        x: 5,
        y: 5
    };
    let roomMap = [
        [' ', ' ', ' ', ' ', ' '],
        ['dirt', ' ', ' ', ' ', ' '],
        [' ', ' ', 'dirt', 'dirt', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ']
    ];
    let expectedObj = {
        'xPos': 1,
        'yPos': 3,
    }
    expect(runDriveInstructions(driveInstr, startingCoords, roomSize, roomMap)).toMatchObject(expectedObj);
    done();
});

test('test that it returns correct count of dirt patches cleared', (done) => {
    let driveInstr = ['N', 'N', 'E', 'S', 'E', 'E', 'S', 'W', 'N', 'W', 'W'];
    let startingCoords = [ 1, 2 ];
    let roomSize = {
        x: 5,
        y: 5
    };
    let roomMap = [
        [' ', ' ', ' ', ' ', ' '],
        ['dirt', ' ', ' ', ' ', ' '],
        [' ', ' ', 'dirt', 'dirt', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ']
    ];
    let expectedObj = {
        'dirtCleared': 1
    }
    expect(runDriveInstructions(driveInstr, startingCoords, roomSize, roomMap)).toMatchObject(expectedObj);
    done();
});

test('test that robo hoover does not go beyond room bounds', (done) => {
    let driveInstr = ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'];
    let startingCoords = [ 1, 2 ];
    let roomSize = {
        x: 5,
        y: 5
    };
    let roomMap = [
        [' ', ' ', ' ', ' ', ' '],
        ['dirt', ' ', ' ', ' ', ' '],
        [' ', ' ', 'dirt', 'dirt', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ']
    ];
    let expectedObj = {
        'xPos': 0,
        'yPos': 4
    }
    expect(runDriveInstructions(driveInstr, startingCoords, roomSize, roomMap)).toMatchObject(expectedObj);
    done();
});



