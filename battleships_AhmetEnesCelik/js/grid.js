/*
* Easter Egg Hunt - Grid Class
* @author: Copyright (C) 2018 Carlos Adan Cortes De la Fuente - All Rights Reserved
* @email: krlozadan@gmail.com
* @date: 16/02/2018
*/
'use strict';

// Controls the size of the grid
const GRID = {
    ROWS :    10,
    COLUMNS : 10
};

// It is going to tell how to draw the board everytime it need to be updated
const CELL_STATUS = {
    EMPTY :      0,
    HIDDEN_EGG : 1,
    FOUND_EGG :  2,
    MISSING :    3
};

// Represents the amount of eggs in each group everytime one is created
const EGG_TYPE = {
    TINY :   2,
    SMALL :  3,
    MEDIUM : 4,
    LARGE :  5
};

// Possible egg group directions
const DIRECTION = {
    UP :    0,
    DOWN :  1,
    LEFT :  2,
    RIGHT : 3,
};

class Grid {

    constructor() {
        this.resetGrid();
    }

    // Creates an empty grid
    resetGrid() {
        this.matrix = [];
        this.totalEggs = 0;
        this.eggsFound = 0;
        for(let i = 0; i < GRID.ROWS; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < GRID.COLUMNS; j++) {
                this.matrix[i][j] = CELL_STATUS.EMPTY;
            }
        }
    }

    // Places the eggs randomly inside the grid
    placeEggsRandomly(eggBasket) {
        for (let eggType in eggBasket) {
            let eggGroups = eggBasket[eggType];
            // Generates the possible locations for every egg group in the egg basket
            // And places the egg in the matrix
            for (let i = 0; i < eggGroups; i++) {
                let coordinate = this.generateRandomCoordinate();
                let possibleDirections = this.getPossibleDirections(coordinate, eggType);
                // Tries to get a valid placement for the egg type
                while (!this.isCellEmpty(coordinate.row, coordinate.column) || possibleDirections.length == 0) {
                    coordinate = this.generateRandomCoordinate();
                    possibleDirections = this.getPossibleDirections(coordinate, eggType);
                }
                // Gets a random direction to populate the matrix
                let direction = this.chooseRandomDirection(possibleDirections);
                this.hideEggGroup(coordinate, eggType, direction);
            }
        }
    }

    // Gets a pair of random coordinates between the grid bounds
    generateRandomCoordinate() {
        return {
            row : Math.floor(Math.random() * GRID.ROWS),
            column : Math.floor(Math.random() * GRID.COLUMNS)
        };
    }

    // Returns a random direction value depending on the possible directions provided
    chooseRandomDirection(possibleDirections) {
        // Checks if there is only one direction to return
        if(possibleDirections.length == 1) {
            return possibleDirections[0];
        } else {
            let dir = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
            return possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
        }
    }

    // Hide Egg
    hideEgg(row, column) {
        this.matrix[row][column] = CELL_STATUS.HIDDEN_EGG;
        this.totalEggs++;
    }

    // Hides the egg over a specific direction
    hideEggGroup(initialCoordinate, eggType, direction) {
        switch (DIRECTION[direction]) {
            case DIRECTION.UP:
                for (let i = 0; i < EGG_TYPE[eggType]; i++) {
                    this.hideEgg(initialCoordinate.row - i, initialCoordinate.column);
                }
                break;
            case DIRECTION.DOWN:
                for (let i = 0; i < EGG_TYPE[eggType]; i++) {
                    this.hideEgg(initialCoordinate.row + i, initialCoordinate.column);
                }
                break;
            case DIRECTION.LEFT:
                for (let i = 0; i < EGG_TYPE[eggType]; i++) {
                    this.hideEgg(initialCoordinate.row, initialCoordinate.column - i);
                }
                break;
            case DIRECTION.RIGHT:
                for (let i = 0; i < EGG_TYPE[eggType]; i++) {
                    this.hideEgg(initialCoordinate.row, initialCoordinate.column + i);
                }
                break;
        }
    }

    // Returns the possible directions that the eggGoup can be placed depending on the coordinate
    getPossibleDirections(coordinate, eggType) {
        let possibleDirections = [];
        for (let direction in DIRECTION) {
            switch(DIRECTION[direction]) {
                case DIRECTION.UP:
                    if (this.isUpPossible(coordinate, EGG_TYPE[eggType])) {
                        possibleDirections.push(direction);
                    }
                    break;
                case DIRECTION.DOWN:
                    if (this.isDownPossible(coordinate, EGG_TYPE[eggType])) {
                        possibleDirections.push(direction);
                    }
                    break;
                case DIRECTION.LEFT:
                    if (this.isLeftPossible(coordinate, EGG_TYPE[eggType])) {
                        possibleDirections.push(direction);
                    }
                    break;
                case DIRECTION.RIGHT:
                    if (this.isRightPossible(coordinate, EGG_TYPE[eggType])) {
                        possibleDirections.push(direction);
                    }
                    break;
            }
        }
        return possibleDirections;
    }

    // Checks from the given coordinate to go up placing the egg
    isUpPossible(coordinate, eggsToPlace) {
        let validDirection = false;
        // Checks if the row is too close to the upper boundary
        if (coordinate.row - (eggsToPlace - 1) >= 0) {
            validDirection = true;
            // Checks if the inbetween cells are empty
            for (let i = coordinate.row - 1; i > (coordinate.row - eggsToPlace); i--) {
                if (!this.isCellEmpty(i, coordinate.column)) {
                    validDirection = false;
                    break;
                }
            }
        }
        return validDirection;
    }

    // Checks from the given coordinate to go down placing the egg
    isDownPossible(coordinate, eggsToPlace) {
        let validDirection = false;
        // Checks if the row is too close to the lower boundary
        if (coordinate.row + (eggsToPlace - 1) < GRID.ROWS) {
            validDirection = true;
            // Checks if the inbetween cells are empty
            for (let i = coordinate.row + 1; i < (coordinate.row + eggsToPlace); i++) {
                if (!this.isCellEmpty(i, coordinate.column)) {
                    validDirection = false;
                    break;
                }
            }
        }
        return validDirection;
    }

    // Checks from the given coordinate to go left placing the egg
    isLeftPossible(coordinate, eggsToPlace) {
        let validDirection = false;
        // Checks if the column is too close to the left boundary
        if (coordinate.column - (eggsToPlace - 1) >= 0) {
            validDirection = true;
            // Checks if the inbetween cells are empty
            for (let i = (coordinate.column - 1); i > (coordinate.column - eggsToPlace); i--) {
                if (!this.isCellEmpty(coordinate.row, i)) {
                    validDirection = false;
                    break;
                }
            }
        }
        return validDirection;
    }

    // Checks from the given coordinate to go right placing the egg
    isRightPossible(coordinate, eggsToPlace) {
        let validDirection = false;
        // Checks if the column is too close to the right boundary
        if (coordinate.column + (eggsToPlace - 1) < GRID.COLUMNS) {
            validDirection = true;
            // Checks if the inbetween cells are empty
            for (let i = coordinate.column + 1; i < (coordinate.column + eggsToPlace); i++) {
                if (!this.isCellEmpty(coordinate.row, i)) {
                    validDirection = false;
                    break;
                }
            }
        }
        return validDirection;
    }

    // Returns if the coordinate is empty
    isCellEmpty(row, column) {
        return (this.matrix[row][column] === CELL_STATUS.EMPTY);
    }

    // Let the user know the selection of the cell is valid
    isValidGuessSelection(coordinate) {
        // Checks if the selected coordinate is a valid guess
        return (
            coordinate.row >= 0 &&
            coordinate.row < GRID.ROWS &&
            coordinate.column >= 0 &&
            coordinate.column < GRID.COLUMNS &&
            this.matrix[coordinate.row][coordinate.column] != CELL_STATUS.FOUND_EGG &&
            this.matrix[coordinate.row][coordinate.column] != CELL_STATUS.MISSING)
    }

    // Checks if there's an egg in the cell that the player selected
    isThereAnEgg(coordinate) {
        if(this.matrix[coordinate.row][coordinate.column] == CELL_STATUS.HIDDEN_EGG) {
            this.matrix[coordinate.row][coordinate.column] = CELL_STATUS.FOUND_EGG;
            this.eggsFound++;
            return true;
        } else if(this.matrix[coordinate.row][coordinate.column] == CELL_STATUS.EMPTY) {
            this.matrix[coordinate.row][coordinate.column] = CELL_STATUS.MISSING;
            return false;
        }
    }
}
