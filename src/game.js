import { Player } from "./entities.js"
import { game_keydown, game_keyup, game_visible, keyboard_handler } from "./keyboard.js"

import { map_file } from "../resource/map.js"

export class Map{
    width;
    height;
    field = [];
}

export class Game{
    pause = false;
    player;

    constructor() {
        this.player = new Player(10);
        console.log(map_file);

        document.addEventListener('keydown', game_keydown);
        document.addEventListener('keyup', game_keyup);
        document.addEventListener('visibilitychange', game_visible)
    }

    game_loop() {
        keyboard_handler();

        requestAnimationFrame(this.game_loop.bind(this));
    }
}