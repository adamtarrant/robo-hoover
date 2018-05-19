const fs = require('fs');

//Read and cleanse new line \r characters in input file - in case anyone runs this on Windows Linux Subsystem
const inputFile = fs.readFileSync(__dirname + '/input.txt').toString().replace(/\r/g, '');

//Check input file has correct number of lines
if (inputFile.match(/\w/g) != null && inputFile.match(/\n/g).length >= 2) {
    const inputArr = inputFile.split('\n');

    //Input variables processed from input.txt file
    const roomSize = {
        x: inputArr[0].split(' ')[0],
        y: inputArr[0].split(' ')[1]
    };
    const startingCoords = inputArr[1].split(' ').map(coord => parseInt(coord));
    const dirtCoords = inputArr.slice(2, -1).map(coord => coord.split(' ').map(char => parseInt(char)));
    const driveInstr = inputArr[inputArr.length - 1].split('');
    
    //Create 2d array of room with dirt patches populated
    let roomMap = createRoomMap(dirtCoords, roomSize);

    //Calculate dirt cleared and last hoover position
    const roboHoover = runDriveInstructions(driveInstr, startingCoords, roomSize, roomMap);
    const lastHooverPos = roboHoover.xPos + ' ' + roboHoover.yPos;

    //Program output
    console.log(lastHooverPos + '\n' + roboHoover.dirtCleared);

} else {
    console.error('Unable to run hoover - please ensure the input.txt file has all data in the correct format');
}

//Named function declarations
//Returns a 2d array map of room with dirt patches populated
function createRoomMap(dirtCoords, roomSize) {
    let roomMap = [];
    for (let i = 0; i < roomSize.x; i++) {
        roomMap[i] = [];
        for (let j = 0; j < roomSize.y; j++) {
            roomMap[i][j] = ' ';
        }
    }
    dirtCoords.forEach(coord => {
        if (coord[0] < roomSize.x && coord[1] < roomSize.y) {
            roomMap[coord[0]][coord[1]] = 'dirt';
        } else {
            console.log('Coordinates "' + coord[0] + ' ' + coord[1] + '" are outside of room bounds and have not been mapped');
        }
    });    
    return roomMap;
}

//Runs through drive instructions for hoover and returns roboHoover object with last position and dirt cleared props
function runDriveInstructions(driveInstr, startingCoords, roomSize, roomMap) {
    //Create robot hoover object
    let roboHoover = {
        'xPos': startingCoords[0],
        'yPos': startingCoords[1],
        'dirtCleared': 0,
        'N': function () { this.yPos < (roomSize.y - 1) && this.yPos++; },
        'S': function () { this.yPos > 0 && this.yPos--; },
        'E': function () { this.xPos < (roomSize.x - 1) && this.xPos++; },
        'W': function () { this.xPos > 0 && this.xPos--; }
    }
    driveInstr.forEach(dir => {
        if (roomMap[roboHoover.xPos][roboHoover.yPos] === 'dirt') {
            roomMap[roboHoover.xPos][roboHoover.yPos] = 'cleared';
            roboHoover.dirtCleared++;
        }
        try {
            roboHoover[dir]();            
        } catch (err) {
            console.log(dir + ' is not a valid driving instruction')
        }
    });
    return roboHoover;
}

//exports modules for test
module.exports = {
    createRoomMap,
    runDriveInstructions
};