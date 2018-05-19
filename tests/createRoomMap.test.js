const createRoomMap = require('../app.js').createRoomMap;

test('test 2d array is returned', (done) => {
    let dirtCoords = [];
    let roomSize = {
        x: 5,
        y: 5
    };
    let expectedArr = [
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ']
    ];
    expect(createRoomMap(dirtCoords, roomSize)).toEqual(expectedArr);
    done();
});

test('test dirt coords get populated into 2d array', (done) => {
    let dirtCoords = [[1, 0], [2, 2], [2, 3]];
    let roomSize = {
        x: 5,
        y: 5
    };
    let expectedArr = [
        [' ', ' ', ' ', ' ', ' '],
        ['dirt', ' ', ' ', ' ', ' '],
        [' ', ' ', 'dirt', 'dirt', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ']
    ];
    expect(createRoomMap(dirtCoords, roomSize)).toEqual(expectedArr);
    done();
});

test('test dirt coords outside of room bounds are not populated', (done) => {
    let dirtCoords = [[1, 0], [2, 2], [2, 3], [8, 8]];
    let roomSize = {
        x: 5,
        y: 5
    };
    let expectedArr = [
        [' ', ' ', ' ', ' ', ' '],
        ['dirt', ' ', ' ', ' ', ' '],
        [' ', ' ', 'dirt', 'dirt', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ']
    ];
    expect(createRoomMap(dirtCoords, roomSize)).toEqual(expectedArr);
    done();
});

