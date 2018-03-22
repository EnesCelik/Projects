/*
* Easter Egg Hunt - Board Class
* @author: Copyright (C) 2018 Carlos Adan Cortes De la Fuente - All Rights Reserved
* @email: krlozadan@gmail.com
* @date: 16/02/2018
*/
'use strict';

class Board {
    constructor () {}
    // Draws the board
    draw(matrix, element) {
        let markup = '<table><tbody>';
        for (let row = 0; row < GRID.ROWS; row++) {
            markup += '<tr>';
            for (let column = 0; column < GRID.COLUMNS; column++) {
                // Checks the status of the cell to draw the correct image
                // TODO: REMOVE
                if(matrix[row][column] == CELL_STATUS.HIDDEN_EGG) {
                    markup += `<td data-row="${row}" data-column="${column}" class="cell test"></td>`;
                } else {
                    markup += `<td data-row="${row}" data-column="${column}" class="cell"></td>`;
                }
            }
            markup += '</tr>';
        }
        markup += '</tbody></table>'
        element.html(markup);
    }
}
