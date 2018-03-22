/*
* Easter Egg Hunt - Player Class
* @author: Copyright (C) 2018 Carlos Adan Cortes De la Fuente - All Rights Reserved
* @email: krlozadan@gmail.com
* @date: 16/02/2018
*/
'use-strict';

// Initial guesses the player has to find all eggs
const PLAYER_GUESSES = 50;

class Player {
    constructor(name) {
        this.name = name;
        this.guesses = PLAYER_GUESSES;
    }

    // Resets game guesses
    resetGuesses() {
    	this.guesses = PLAYER_GUESSES;
    }
}
