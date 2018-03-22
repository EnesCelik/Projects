/*
* Easter Egg Hunt - Score Board Class
* @author: Copyright (C) 2018 Carlos Adan Cortes De la Fuente - All Rights Reserved
* @email: krlozadan@gmail.com
* @date: 16/02/2018
*/
'use strict';

// Defines how many top scores the app is going to save
const TOP_SCORES = 5;

class ScoreBoard {
    constructor(){ }

    // Gets ths scores array
    getScores() {
    	return store.get('scoreboard');
    }

    // Checks if the player has made it to the top scores in the game
    // and inserts the score in the scoreboard
    insertScore(player) {
        let isHighScore = false;

        // New Score object to insert into the table
        let newScore = {
            name : player.name,
            guesses : player.guesses
        };

        // Inserts the first player into the high scores
        let highScores = this.getScores();
    	if (!highScores) {
            store.set('scoreboard', [newScore]);
    		isHighScore = true;
        // There is still room to put the first 5
    	} else if (highScores.length < TOP_SCORES) {
            highScores.push(newScore);
            store.set('scoreboard', this.sortScores(highScores));
            isHighScore = true;
    	} else { // Check if the score makes it into the top 5
            if (newScore.guesses >= highScores[TOP_SCORES - 1].guesses) {
                // Loops over the high scores to compare
        		for (let i = (TOP_SCORES - 1); i >= 0; i--) {
                    // Checks if the current score is better than the one being evaluated
                    // Keeps the scoreboard limited to the number specified by TOP_SCORES variable
        			if(newScore.guesses < highScores[i].guesses) {
                        highScores.splice(i + 1, 0, newScore);
                        highScores.pop();
                        store.set('scoreboard', highScores);
                        isHighScore = true;
                        break;
                    }
                    // This is the new top score
                    if(i == 0 && newScore.guesses > highScores[i].guesses) {
                        highScores.splice(i, 0, newScore);
                        highScores.pop();
                        store.set('scoreboard', highScores);
                        isHighScore = true;
                        break;
                    }
        		}
            }
        }

        return isHighScore;
    }

    // Order the scores from
    sortScores(scores) {
        return scores.sort((a,b) => {
            return b.guesses - a.guesses;
        });
    }

    // Clears the scoreboard from the web browser
    clear() {
        store.clearAll();
    }

    // Generates the markup that is going to created for the score board
    generateMarkup() {
        let scores = this.getScores();
        let markup;
        // There are no scores yet
        if(!scores || scores.length == 0) {
            markup = '<tr><td colspan="2" style="text-align:center; padding: 1rem 0;">No registered scores found</td></tr>';
        } else {
            // Creates scores Markup
            scores.forEach(score => {
                markup += `
                <tr>
                    <td>${score.name}</td>
                    <td>${score.guesses}</td>
                </tr>
                `;
            });
        }
        return markup;
    }
}
