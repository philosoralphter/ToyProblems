

function findZeroedColumnsAndRows (matrix) {
    let zeroedColumns = {};
    let zeroedRows = {};

    for (let r=0; r<matrix.length; r++) {
        for (let c=0; c<matrix.length; c++) {
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

