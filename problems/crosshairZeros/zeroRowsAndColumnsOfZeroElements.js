

function zeroZeroedColumnsAndRows (matrix) {
    let zeroedColumns = {};
    let zeroedRows = {};

    for (let r=0; r<matrix.length; r++) {
        for (let c=0; c<matrix[r].length; c++) {
            if (matrix[r][c] === 0) {
                zeroedColumns[c] = true;
                zeroedRows[r] = true;
            }
        }
    }

    zeroColumns(matrix, zeroedColumns);
    zeroRows(matrix, zeroedRows);
    return matrix;

}


function zeroRows (matrix, rows) {
    for (let row in rows) {
        for (let i=0; i<matrix[row].length; i++) {
            matrix[row][i] = 0;
        }
    }
}

function zeroColumns (matrix, columns) {
    for (let column in columns) {
        for (let i=0; i<matrix.length; i++) {
            matrix[i][column] = 0;
        }
    }
}

let matrix1 = [
    [0,2,3,4,6,3,5,4,8,6],
    [7,2,3,4,6,3,5,4,8,5],
    [4,2,3,4,0,3,4,9,8,3],
    [9,2,3,4,6,3,5,3,8,2],
    [9,2,3,4,6,3,5,4,8,5],
    [6,2,3,4,6,3,5,0,8,9],
]
console.log(zeroZeroedColumnsAndRows(matrix1));
