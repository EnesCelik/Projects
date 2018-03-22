/*
* Easter Egg Hunt - Audio Class
* @author: Copyright (C) 2018 Carlos Adan Cortes De la Fuente - All Rights Reserved
* @email: krlozadan@gmail.com
* @date: 16/02/2018
*/
'use strict';

const AUDIO_STATUS = {
    PLAY : 0,
    MUTE : 1
};

class Audio {
    constructor () {
        this.status = AUDIO_STATUS.PLAY;
        // Game Sound Library
        this.musMenu = new Howl({
            src : ['./audio/Music_Menu_Loop_CA.mp3'],
            loop : true
        });
        this.musGameplay = new Howl({
            src : ['./audio/Music_Gameplay_Loop_CA.mp3'],
            loop : true
        });
        this.musEndGame = new Howl({
            src : ['./audio/Music_EndingGameplay_Shot_CA.mp3']
        });
        this.ambientSound = new Howl({
            src : ['./audio/AMB_Background_Loop_CA.mp3'],
            loop : true
        });
        this.sfxError = new Howl({
            src : ['./audio/SFX_Error_CA.mp3']
        });
        this.sfxLoseBoing = new Howl({
            src : ['./audio/SFX_Lose_Shot_CA.mp3']
        });
        this.sfxKidsBoo = new Howl({
            src : ['./audio/SFX_Kids_Boo_CA.mp3']
        });
        this.sfxKidsCheer = new Howl({
            src : ['./audio/SFX_Kids_Cheer_CA.mp3']
        });
        this.sfxFireworks = new Howl({
            src : ['./audio/SFX_Fireworks_Shot_CA.mp3']
        });
        this.sfxGrass1 = new Howl({
            src : ['./audio/SFX_Grass_Shot1_CA.mp3']
        });
        this.sfxGrass2 = new Howl({
            src : ['./audio/SFX_Grass_Shot2_CA.mp3']
        });
        this.sfxGrass3 = new Howl({
            src : ['./audio/SFX_Grass_Shot3_CA.mp3']
        });
        this.sfxFoundEgg1 = new Howl({
            src : ['./audio/SFX_FoundEgg_Shot1_CA.mp3']
        });
        this.sfxFoundEgg2 = new Howl({
            src : ['./audio/SFX_FoundEgg_Shot2_CA.mp3']
        });
        this.sfxFoundEgg3 = new Howl({
            src : ['./audio/SFX_FoundEgg_Shot3_CA.mp3']
        });
        this.sfxFoundEgg4 = new Howl({
            src : ['./audio/SFX_FoundEgg_Shot4_CA.mp3']
        });
        this.sfxButtonPressed = new Howl({
            src : ['./audio/SFX_Button_Pressed_Shot_CA.mp3']
        });
    }

    // Plays Menu Music
    playMenuMusic() {
        // Stops gameplay music
        if(this.musGameplay.playing()) {
            this.musGameplay.stop();
        }
        if(this.status == AUDIO_STATUS.PLAY && !this.musMenu.playing()) {
            this.musMenu.play();
        }
    }

    // Plays Gameplay Music
    playGameplayMusic() {
        // Stops menu music
        if(this.musMenu.playing()) {
            this.musMenu.stop();
        }
        if(this.status == AUDIO_STATUS.PLAY  && !this.musGameplay.playing()) {
            this.musGameplay.play();
        }
    }

    // Plays Background Sounds (Birds and Wind)
    playAmbientSound() {
        if(this.status == AUDIO_STATUS.PLAY) {
            this.ambientSound.play();
        }
    }

    // Mutes the game entirely
    mute(gameRunning) {
        this.status = AUDIO_STATUS.MUTE;
        this.ambientSound.stop();
        // Checks which music to stop playing
        if(!gameRunning) {
            this.musMenu.stop();
        } else {
            this.musGameplay.stop();
        }
    }

    // Unmutes the game
    play(gameRunning) {
        this.status = AUDIO_STATUS.PLAY;
        this.playAmbientSound();
        // Checks which music to start playing
        if(!gameRunning) {
            this.musMenu.play();
        } else {
            this.musGameplay.play();
        }
    }

    // Lowers the sound volume
    pauseGame() {
        this.ambientSound.volume(0.1);
        this.musGameplay.volume(0.1);
    }

    // Increases the sound volume
    resumeGame() {
        this.ambientSound.volume(1);
        this.musGameplay.volume(1);
    }

    // Makes the end game music go
    playEndingGameMusic(playerWon) {
        if(this.status == AUDIO_STATUS.PLAY) {
            this.musGameplay.stop();
            this.musEndGame.play();
            if(!playerWon) {
                this.playLoseSound();
            } else {
                this.playWinSound();
            }
        }
    }

    // Happens When you hit a invalid square
    playErrorSound() {
        if(this.status == AUDIO_STATUS.PLAY) {
            this.sfxError.play();
        }
    }

    // Plays this sound when the player loses
    playLoseSound() {
        this.sfxLoseBoing.play();
        this.sfxKidsBoo.play();
    }

    // Plays this sound whenever a player wins the game
    playWinSound() {
        this.sfxFireworks.play();
        this.sfxKidsCheer.play();
    }

    // Plays a random grass sound
    playGrassSound() {
        if(this.status == AUDIO_STATUS.PLAY) {
            let randomSound = Math.floor((Math.random() * 3) + 1);
            switch (randomSound) {
                case 1:
                    this.sfxGrass1.play();
                    break;
                case 2:
                    this.sfxGrass2.play();
                    break;
                case 3:
                    this.sfxGrass3.play();
                    break;
            }
        }
    }

    // Plays a random egg found sound
    playFoundEggSound() {
        if(this.status == AUDIO_STATUS.PLAY) {
            let randomSound = Math.floor((Math.random() * 4) + 1);
            switch (randomSound) {
                case 1:
                    this.sfxFoundEgg1.play();
                    break;
                case 2:
                    this.sfxFoundEgg2.play();
                    break;
                case 3:
                    this.sfxFoundEgg3.play();
                case 4:
                    this.sfxFoundEgg4.play();
                    break;
            }
        }
    }

    // Plays Button Pressed Sounds
    playButtonPressed() {
        if(this.status == AUDIO_STATUS.PLAY) {
            this.sfxButtonPressed.play();
        }
    }
}
