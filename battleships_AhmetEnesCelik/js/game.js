/*
* Easter Egg Hunt - Game Object Class
* @author: Copyright (C) 2018 Carlos Adan Cortes De la Fuente - All Rights Reserved
* @email: krlozadan@gmail.com
* @date: 16/02/2018
*/
'use strict';

const GAME_MODE = {
    ONE_PLAYER : 1,
    TWO_PLAYER : 2
};

// Total amount of eggs to hide in the board / grid
const EGG_BASKET = {
    TINY : 2,
    SMALL : 2,
    MEDIUM : 2,
    LARGE : 1
};

// This represents the outcome of the game
const WINNER = {
    NO_WINNER : 0,
    PLAYER_1 :   1,
    PLAYER_2 :    2
}


const GAME_STATUS = {
    NOT_PLAYING : 0,
    PLAYING : 1
};

class Game {
    constructor() {
        // This represents if there is a match going on
        this.gameRunning = false;

        // General Purpose Game Stuff
        this.audio = new Audio();
        this.scoreboard = new ScoreBoard();
        this.reset();

        // HTML Elements in the screen that are going to be reusable
        this.htmlPickMode = $('#pick-mode');                // Player mode panel
        this.htmlPlayerNames = $('#players-name');          // Players name input panel
        this.form = $('#player-form');                      // Players form
        this.htmlGameStatus = $('#game-status');            // Game status
        this.htmlPlayer2GameStatus = $("#player-2-status")  // Player 2 Game status
        this.htmlBoard1 = $('#board-1');                      // Board player 1
        this.htmlBoard2 = $('#board-2');                      // Board player 2
        this.htmlScoreBoard = $('#scoreboard');             // Score Board

        // Buttons
        this.htmlShowScoreBoardBtn = $('#scoreboard-btn');  // Score Board Button
        this.htmlMusicMuteBtn = $('#volume-off');           // Mute Button
        this.htmlAudioOnBtn = $('#volume-on');              // Turn Volume On Button
        this.htmlPauseBtn = $('#pause-btn');                // Pause Button
        this.htmlPlayBtn = $('#play-btn');                  // Play Button

        // Modals
        this.modalGameOver = $('#game-over');               // Game Over Modal
        this.modalPause = $('#pause-modal');                // Pause Game Modal
    }

    // Start the game simulation
    start(){
        // Starts the audio playback
        this.audio.playMenuMusic();
        this.audio.playAmbientSound();
        // takes care of the first screen of the game
        this.hideSplashScreen();
        // Let's the player select a game mode
        this.selectGameMode();
        // Handles the logic of showing the scoreboard
        this.showAndHideScores();
        // Handles the music on and off control
        this.controlSound();
        // Handles the player go back to main screen from player input
        this.cancelPlayerInputs();
        // Handles form name submission
        this.enterPlayerNames();
        // Handle the play and pause buttons
        this.playAndPauseControl();
    }

    // Resets the game object to go to main menu
    reset() {
        this.gameMode = null;
        this.player1 = null;
        this.player2 = null;
        this.grid1 = null;
        this.grid2 = null;
        this.board1 = null;
        this.board2 = null;
    }

    // Hides the splash screen and shows the main game screen
    hideSplashScreen() {
        $('#intro-btn').click((event) => {
            this.audio.playButtonPressed();
            $('#intro').addClass('hide');
            $('#main-screen').removeClass('hide');
        });
    }

    // Sets the game mode for the game
    selectGameMode() {
        $('button.player-mode').click((event => {
            this.audio.playButtonPressed();
            let mode = event.target.dataset.mode;
            // Sets up the game mode
            if (mode == GAME_MODE.ONE_PLAYER) {
                this.gameMode = GAME_MODE.ONE_PLAYER;
            } else if (mode == GAME_MODE.TWO_PLAYER) {
                this.gameMode = GAME_MODE.TWO_PLAYER;
            }
            this.htmlShowScoreBoardBtn.addClass('hide');
            this.showPlayerNameInputs();
        }));
    }

    // Handles the logic of showing the scoreboard
    showAndHideScores() {
        let hideScoreBoardBtn = $('#scoreboard-exit');

        // Show the score board
        this.htmlShowScoreBoardBtn.click((event) => {
            event.preventDefault();
            this.audio.playButtonPressed();
            this.htmlShowScoreBoardBtn.addClass('hide');
            hideScoreBoardBtn.removeClass('hide');
            this.htmlPickMode.addClass('hide');
            this.htmlScoreBoard.removeClass('hide');
            // Gets the scores
            $('#scores').html(this.scoreboard.generateMarkup());
        });

        // Hides the score boadr and sends the player to main menu
        hideScoreBoardBtn.click((event) => {
            event.preventDefault();
            this.audio.playButtonPressed();
            hideScoreBoardBtn.addClass('hide');
            this.htmlShowScoreBoardBtn.removeClass('hide');
            this.htmlScoreBoard.addClass('hide');
            this.htmlPickMode.removeClass('hide');
        });
    }

    // Controls if the game is playing music and sounds or not
    controlSound() {
        // Remove sounds and music handler
        this.htmlMusicMuteBtn.click((event) => {
            event.preventDefault();
            this.audio.playButtonPressed();
            this.audio.mute(this.gameRunning);
            this.htmlMusicMuteBtn.addClass('hide');
            this.htmlAudioOnBtn.removeClass('hide');
        });
        // Adds sounds and music handler
        this.htmlAudioOnBtn.click((event) => {
            event.preventDefault();
            this.audio.play(this.gameRunning);
            this.htmlMusicMuteBtn.removeClass('hide');
            this.htmlAudioOnBtn.addClass('hide');
        });
    }

    // Handle the play and pause buttons
    playAndPauseControl() {
        // Pause Game
        this.htmlPauseBtn.click((event) => {
            this.audio.playButtonPressed();
            this.htmlPauseBtn.addClass('hide');
            this.htmlPlayBtn.removeClass('hide');
            this.modalPause.removeClass('hide');
            this.audio.pauseGame();
        });
        // Resume Game
        this.htmlPlayBtn.click((event) => {
            this.audio.playButtonPressed();
            this.htmlPlayBtn.addClass('hide');
            this.htmlPauseBtn.removeClass('hide');
            this.modalPause.addClass('hide');
            this.audio.resumeGame();
        });
    }

    // Shows the html containing the html inputs to put their name in
    showPlayerNameInputs() {
        this.htmlPickMode.addClass('hide');
        this.htmlPlayerNames.removeClass('hide');
        this.form.trigger('reset');
        // Shows a second input for player two
        if(this.gameMode === GAME_MODE.TWO_PLAYER) {
            $('input[name=player-2]').attr('type', 'text');
        } else {
            // Hides the second player input
            $('input[name=player-2]').attr('type', 'hidden');
        }
    }

    // Handles the player go back to main screen from player input
    cancelPlayerInputs() {
        $('#cancel-form').click((event) => {
            this.audio.playButtonPressed();
            this.htmlPlayerNames.addClass('hide');
            this.htmlPickMode.removeClass('hide');
            this.htmlShowScoreBoardBtn.removeClass('hide');
            this.gameMode = null;
        });
    }

    // Handles form name submission
    enterPlayerNames() {
        this.form.submit((event) => {
            event.preventDefault();
            this.audio.playButtonPressed();
            let inputs = this.form.serializeArray();
            // Checks the inputs are valid
            if (this.gameMode === GAME_MODE.ONE_PLAYER && inputs[0].value.trim().length > 0) {
                this.player1 = new Player(inputs[0].value.trim());
                this.runOnePlayerGame();
            } else if (this.gameMode === GAME_MODE.TWO_PLAYER && inputs[0].value.trim().length > 0 && inputs[1].value.trim().length > 0) {
                // Both player's names are correct
                this.player1 = new Player(inputs[0].value.trim());
                this.player2 = new Player(inputs[1].value.trim());
                this.runTwoPlayerGame();
            } else {
                // Any of the names is not correct
                alert('Please enter a valid name');
            }
        });
    }

    // Runs the simulation for 1 player Game Option
    runOnePlayerGame() {
        // Starts Game
        this.gameRunning = true;
        this.audio.playGameplayMusic();
        this.htmlPauseBtn.removeClass('hide');
        // Places the eggs randomly in 1 player game
        this.grid1 = new Grid();
        this.grid1.placeEggsRandomly(EGG_BASKET);

        // Initializes the static user interface
        this.board1 = new Board();
        this.htmlPlayerNames.addClass('hide');
        this.htmlGameStatus.removeClass('hide');
        $('#p1-turn').html(this.player1.name);
        let p1RemainingEggs = $('#p1-remaining-eggs');
        let p1Guesses = $('#p1-guesses');
        this.htmlBoard1.removeClass('hide');
        this.board1.draw(this.grid1.matrix, this.htmlBoard1);
        p1RemainingEggs.html(`${this.grid1.eggsFound} of ${this.grid1.totalEggs}`);
        p1Guesses.html(this.player1.guesses);
        // Attach the listeners
        this.createOnePlayerEventListeners(p1RemainingEggs, p1Guesses);
    }

    // Creates the logic for the one player game
    createOnePlayerEventListeners(p1RemainingEggs, p1Guesses) {
        // Adds the event listener to each cell in the board
        $('#board-1 td.cell').click(event => {
            event.preventDefault;
            let coordinate = {
                row : event.target.dataset.row,
                column : event.target.dataset.column
            };
            // Checks the result of the clicked cell
            if (this.grid1.isValidGuessSelection(coordinate)) {
                if (this.grid1.isThereAnEgg(coordinate)) {
                    this.audio.playFoundEggSound();
                    event.target.classList.add('egg');
                    event.target.classList.remove('test');
                } else {
                    this.audio.playGrassSound();
                    event.target.classList.add('empty');
                }
                // Reduces a player selection
                this.player1.guesses--;
            } else {
                this.audio.playErrorSound();
            }
            // Updates the UI to let the player know what happened
            p1RemainingEggs.html(`${this.grid1.eggsFound} of ${this.grid1.totalEggs}`);
            p1Guesses.html(this.player1.guesses);

            // Check if the game is over
            if (this.player1.guesses == 0 && this.grid1.eggsFound != this.grid1.totalEggs) {
                this.finishGame(WINNER.NO_WINNER);
                this.gameRunning = false;
                this.audio.playEndingGameMusic(WINNER.NO_WINNER);
            } else if (this.grid1.eggsFound == this.grid1.totalEggs) {
                this.finishGame(WINNER.PLAYER_1);
                this.gameRunning = false;
                this.audio.playEndingGameMusic(WINNER.PLAYER_1);
            }
        });
    }

    // Finished the game and lets the player know the outcome
    finishGame(winner){
        this.htmlPauseBtn.addClass('hide');
        this.modalGameOver.removeClass('hide');

        // Customizes the view if the player won / lost
        let winnerMsg = $('#winner-msg');
        let gotHighScore = false;
        switch(winner) {
            case WINNER.NO_WINNER:
                winnerMsg.html('You Lose!');
                break;
            case WINNER.PLAYER_1:
                winnerMsg.html(`${this.player1.name} Wins!`);
                gotHighScore = this.scoreboard.insertScore(this.player1);
                break;
            case WINNER.PLAYER_2:
                winnerMsg.html(`${this.player2.name} Wins!`);
                gotHighScore = this.scoreboard.insertScore(this.player2);
                break;
        }
        // Lets the user know he got a High Score
        let scoreBoardMsg = $('#scoreboard-msg');
        if (gotHighScore) {
            scoreBoardMsg.removeClass('hide');
        }

        // Handles the game restarting for each mode
        $('#restart-game').click((event) => {
            this.audio.playButtonPressed();
            if(this.gameMode == GAME_MODE.ONE_PLAYER) {
                this.player1.resetGuesses();
                this.gameRunning = true;
                this.runOnePlayerGame();
            } else if (this.gameMode == GAME_MODE.TWO_PLAYER) {
                this.player1.resetGuesses();
                this.player2.resetGuesses();
                this.gameRunning = true;
                this.runTwoPlayerGame();
            }
            this.modalGameOver.addClass('hide');
            scoreBoardMsg.addClass('hide');
        });
        // Goes to main Menu
        $('#main-menu').click((event) => {
            this.audio.playButtonPressed();
            this.gameRunning = false;
            this.modalGameOver.addClass('hide');
            scoreBoardMsg.addClass('hide');
            this.htmlGameStatus.addClass('hide');
            this.htmlPlayer2GameStatus.addClass('hide');
            this.htmlBoard1.addClass('hide');
            this.htmlBoard2.addClass('hide');
            this.htmlPickMode.removeClass('hide');
            this.htmlShowScoreBoardBtn.removeClass('hide');
            this.audio.playMenuMusic();
            this.reset();
        });
    }

    // Runs the simulation for 1 player Game Option
    runTwoPlayerGame() {
        // TODO: Go to the egg hiding screen
        // TBA : Egg Hiding Screen

        // Starts Game
        this.gameRunning = true;
        this.audio.playGameplayMusic();
        this.htmlPauseBtn.removeClass('hide');

        // Places the eggs randomly for both players
        this.grid1 = new Grid();
        this.grid1.placeEggsRandomly(EGG_BASKET);
        this.grid2 = new Grid();
        this.grid2.placeEggsRandomly(EGG_BASKET);

        // Initializes the static user interface
        this.board1 = new Board();
        this.board2 = new Board();
        this.htmlPlayerNames.addClass('hide');
        this.htmlGameStatus.removeClass('hide');
        this.htmlPlayer2GameStatus.removeClass('hide');
        let p1Turn = $('#p1-turn');
        let p2Turn = $('#p2-turn');
        let p1RemainingEggs = $('#p1-remaining-eggs');
        let p2RemainingEggs = $('#p2-remaining-eggs');
        let p1Guesses = $('#p1-guesses');
        let p2Guesses = $('#p2-guesses');

        this.htmlBoard1.removeClass('hide');
        this.htmlBoard2.addClass('hide');
        this.board1.draw(this.grid1.matrix, this.htmlBoard1);
        this.board2.draw(this.grid2.matrix, this.htmlBoard2);
        p1Turn.html(this.player1.name);
        p1Turn.addClass('turn');
        p2Turn.html(this.player2.name);
        p2Turn.removeClass('turn');
        p1RemainingEggs.html(`${this.grid1.eggsFound} of ${this.grid1.totalEggs}`);
        p2RemainingEggs.html(`${this.grid2.eggsFound} of ${this.grid2.totalEggs}`);
        p1Guesses.html(this.player1.guesses);
        p2Guesses.html(this.player2.guesses);
        // Attach the listeners
        // TODO: Optimze the code for the two player game
        // TODO : Make each player decide the position of the eggs
        this.createTwoPlayerEventListeners(p1Turn, p1RemainingEggs, p1Guesses, p2Turn, p2RemainingEggs, p2Guesses);
    }

    // Creates the logic for the one player game
    createTwoPlayerEventListeners(p1Turn, p1RemainingEggs, p1Guesses, p2Turn, p2RemainingEggs, p2Guesses) {
        // Adds the event listener to each cell in the board
        $('#board-1 td.cell').click(event => {
            event.preventDefault;
            let coordinate = {
                row : event.target.dataset.row,
                column : event.target.dataset.column
            };
            // Checks the result of the clicked cell
            if (this.grid1.isValidGuessSelection(coordinate)) {
                if (this.grid1.isThereAnEgg(coordinate)) {
                    this.audio.playFoundEggSound();
                    event.target.classList.add('egg');
                    event.target.classList.remove('test');
                } else {
                    this.audio.playGrassSound();
                    event.target.classList.add('empty');
                }
                // Reduces a player selection
                this.player1.guesses--;
                // Updates the UI to let the player know what happened
                p1RemainingEggs.html(`${this.grid1.eggsFound} of ${this.grid1.totalEggs}`);
                p1Guesses.html(this.player1.guesses);
                p1Turn.removeClass('turn');
                p2Turn.addClass('turn');
                this.htmlBoard1.addClass('hide');
                this.htmlBoard2.removeClass('hide');
            } else {
                this.audio.playErrorSound();
            }
            // Check if the game is over
            if (this.player1.guesses == 0 && this.grid1.eggsFound != this.grid1.totalEggs && this.player2.guesses == 0 && this.grid2.eggsFound != this.grid2.totalEggs) {
                this.finishGame(WINNER.NO_WINNER);
                this.gameRunning = false;
                this.audio.playEndingGameMusic(WINNER.NO_WINNER);
            } else if (this.grid1.eggsFound == this.grid1.totalEggs) {
                p2Turn.removeClass('turn');
                p1Turn.addClass('turn');
                this.finishGame(WINNER.PLAYER_1);
                this.gameRunning = false;
                this.audio.playEndingGameMusic(WINNER.PLAYER_1);
            }
        });

        // Adds the event listener to each cell in the board
        $('#board-2 td.cell').click(event => {
            event.preventDefault;
            let coordinate = {
                row : event.target.dataset.row,
                column : event.target.dataset.column
            };
            // Checks the result of the clicked cell
            if (this.grid2.isValidGuessSelection(coordinate)) {
                if (this.grid2.isThereAnEgg(coordinate)) {
                    this.audio.playFoundEggSound();
                    event.target.classList.add('egg');
                    event.target.classList.remove('test');
                } else {
                    this.audio.playGrassSound();
                    event.target.classList.add('empty');
                }
                // Reduces a player selection
                this.player2.guesses--;
                // Updates the UI to let the player know what happened
                p2RemainingEggs.html(`${this.grid2.eggsFound} of ${this.grid2.totalEggs}`);
                p2Guesses.html(this.player2.guesses);
                p2Turn.removeClass('turn');
                p1Turn.addClass('turn');
                this.htmlBoard2.addClass('hide');
                this.htmlBoard1.removeClass('hide');
            } else {
                this.audio.playErrorSound();
            }

            // Check if the game is over
            if (this.player1.guesses == 0 && this.grid1.eggsFound != this.grid1.totalEggs && this.player2.guesses == 0 && this.grid2.eggsFound != this.grid2.totalEggs) {
                this.finishGame(WINNER.NO_WINNER);
                this.gameRunning = false;
                this.audio.playEndingGameMusic(WINNER.NO_WINNER);
            } else if (this.grid2.eggsFound == this.grid2.totalEggs) {
                p1Turn.removeClass('turn');
                p2Turn.addClass('turn');
                this.finishGame(WINNER.PLAYER_2);
                this.gameRunning = false;
                this.audio.playEndingGameMusic(WINNER.PLAYER_2);
            }
        });
    }
}
