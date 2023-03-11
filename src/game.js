class Game{
    pause = false;
    
    constructor() {
        document.addEventListener('keydown', game_keydown);
        document.addEventListener('keyup', game_keyup);
        document.addEventListener('visibilitychange', game_visible)
    }

    game_loop() {
        keyboard_handler();

        requestAnimationFrame(this.game_loop.bind(this));
    }
}

let game = new Game();

game.game_loop();