//Naive solution 1: recursively calculate all paths
function countPathsRecursively(grid, startRow, startCol) {
    if (startRow === undefined) startRow = 0;
    if (startCol === undefined) startCol = 0;

    //check if off map or blocked path
    if (startRow >= grid.length || startCol >= grid[startRow].length ||  grid[startRow][startCol] === 1) { //invalid square here
        return 0;
    }

    //check if at end
    if (startRow === grid.length-1 && startCol === grid[grid.length-1].length-1){//found end
        return 1;
    } else {
    //recurse
        return countPathsRecursively(grid, startRow +1, startCol) + countPathsRecursively(grid, startRow, startCol+1)
    }
}

//Less Naive solution: memoize paths
function countPathsRecursivelyWithMemo(grid, startRow, startCol, pathsMemo) {
    if (startRow === undefined) startRow = 0;
    if (startCol === undefined) startCol = 0;

    //initialize our paths memory
    if (!pathsMemo) {
        pathsMemo = [];
        for (let i=0; i<grid.length; i++) {
            pathsMemo[i] = [];
        }
    }

    //check if off map or blocked path
    if (startRow >= grid.length || startCol >= grid[startRow].length || grid[startRow][startCol] === 1) { //invalid square here
        return 0;
    }

    if (pathsMemo[startRow][startCol]) {
        return pathsMemo[startRow][startCol];
    }



    //check if at end
    if (startRow === grid.length - 1 && startCol === grid[grid.length - 1].length - 1) {//found end
        pathsMemo[startRow][startCol] = 1;
        return 1;
    } else {
        pathsMemo[startRow+1][startCol] = countPathsRecursively(grid, startRow + 1, startCol, pathsMemo);
        pathsMemo[startRow][startCol+1] = countPathsRecursively(grid, startRow, startCol + 1, pathsMemo);

        return pathsMemo[startRow + 1][startCol] + pathsMemo[startRow][startCol + 1];
    }
}

//non-recursive
function countPathsIteratively(grid) {
    //build grid of same size with paths count to end from each cell
    let pathsGrid = [];
    for (let row in grid) {
        pathsGrid[row] = [];
    }
    let lastRow = grid.length-1;
    let lastCol = grid[lastRow].length -1;


    for (let row=lastRow; row>=0; row--) {
        for (let col=lastCol; col>=0; col--) {
            if (row === lastRow && col === lastCol) {
                pathsGrid[row][col] = 1;
            } else if(cellIsBlocked(grid, row, col)){
                pathsGrid[row][col] = 0;
            }else {
                pathsGrid[row][col] = (pathsGrid[row][col+1] || 0) + (pathsGrid[row+1] ? pathsGrid[row+1][col] : 0)
            }
        }
    }

    return pathsGrid[0][0];

    function cellIsBlocked(grid, row, col) {
        return grid[row][col] === 1
        // return (grid[row] !== undefined) && (grid[row][col] === undefined || grid[row][col] === 1)
    }
}


(function test() {
    let testGrid1 = [
        [0, 0,0],
        [0, 0,1],
        [1, 0,0],
    ];
    let testGrid2 = [
        [0, 0, 1, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 0],
        [1, 0, 0, 0],
    ];
    let startTime, endTime;

    startTime = process.hrtime();
    console.log('Test Grid 1: (has 2 paths) ', countPathsRecursively(testGrid1));
    console.log('Test Grid 2: (has 13 paths) ', countPathsRecursively(testGrid2));
    endTime = process.hrtime();
    console.log('Runtime: Seconds: ', endTime[0] - startTime[0], ' Millis: ', (endTime[1] - startTime[1]) / 1000000, '\n');


    startTime = process.hrtime();
    console.log('Test Grid 1: (has 2 paths) ', countPathsRecursivelyWithMemo(testGrid1));
    console.log('Test Grid 2: (has 13 paths) ', countPathsRecursivelyWithMemo(testGrid2));
    endTime = process.hrtime();
    console.log('Runtime: Seconds: ', endTime[0] - startTime[0], ' Millis: ', (endTime[1] - startTime[1]) / 1000000, '\n');

    startTime = process.hrtime();
    console.log('Test Grid 1: (has 2 paths) ', countPathsIteratively(testGrid1));
    console.log('Test Grid 2: (has 13 paths) ', countPathsIteratively(testGrid2));
    endTime = process.hrtime();
    console.log('Runtime: Seconds: ', endTime[0] - startTime[0], ' Millis: ', (endTime[1] - startTime[1]) / 1000000, '\n');

})();
