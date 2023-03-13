import { Player } from "./entities.js"
import { game_keydown, game_keyup, game_visible, keyboard_handler } from "./keyboard.js"

import { maps } from "../resource/map.js"
import { vec2 } from "./vectors.js";

let tile_list = [
    'grass', 'rock'
];

let tile_types = {
    'grass': 1,
    'rock': 2
};

class Map{
    width;
    height;
    field = [];

    constructor (map_file){
        this.width = map_file['size'][0];
        this.height = map_file['size'][1];

        let defalt_tile = tile_types[map_file['default_tile']];
        
        for (let i = 0; i < this.width; i++){
            this.field.push([]);
            for(let j = 0; j < this.height; j++){
                this.field[i].push(defalt_tile);
            }
        }
        
        for(let i = 0; i < tile_list.length; i++){
            let cur_tile = map_file['tiles'][tile_list[i]];
            if (cur_tile === undefined) continue;
            let tile_n = tile_types[tile_list[i]];

            for(let j = 0; j < cur_tile.length; j++){
                this.field[cur_tile[j][0]][cur_tile[j][1]] = tile_n;
            }
        }
    }
}

export class Game{
    pause = false;
    player;
    map;

    constructor() {
        let map_name = 'map1';
        //let map_name = prompt('enter the map name');
        // TODO: add map selecting
        this.map = new Map(maps[map_name]);
        this.player = new Player(maps[map_name]['start_pos'], 10);

        document.addEventListener('keydown', game_keydown);
        document.addEventListener('keyup', game_keyup);
        document.addEventListener('visibilitychange', game_visible)
    }

    game_loop() {
        keyboard_handler();

        requestAnimationFrame(this.game_loop.bind(this));
    }
}