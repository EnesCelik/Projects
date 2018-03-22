/*
* Easter Egg Hunt - Main entry point to application
* @author: Copyright (C) 2018 Carlos Adan Cortes De la Fuente - All Rights Reserved
* @email: krlozadan@gmail.com
* @date: 16/02/2018
*/
'use strict';

// Wait for the whole page to load
$(document).ready(() => {
    // Create and run the app instance
    let game = new Game();
    game.start();
});
