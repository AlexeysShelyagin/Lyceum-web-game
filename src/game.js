import { Player } from "./entities.js"
import { Enemy } from "./entities.js"
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
    enemies;
    enemiesSpeed;
    map;
    inp;

    constructor() {
        let map_name = 'map1';
        //let map_name = prompt('enter the map name');
        // TODO: add map selecting
        this.map = new Map(maps[map_name]);
        this.player = new Player(maps[map_name]['start_pos'], 10);
        this.enemies = new Array();
        this.enemiesSpeed = 2;
        document.addEventListener('keydown', game_keydown);
        document.addEventListener('keyup', game_keyup);
        document.addEventListener('visibilitychange', game_visible)
        this.inp = new vec2(0,0);
    }

    game_loop() {
        this.inp = keyboard_handler();

        this.gameUpdate();
        requestAnimationFrame(this.game_loop.bind(this));
    }

    
    spawnEnemy(pos){
        let htmlBox = document.createElement("div");
        htmlBox.classList.add("enemy");
        document.body.appendChild(htmlBox);
        let enemy = new Enemy(pos, 10, 2, htmlBox);
        enemy.moveTo(500,500,50);
        this.enemies.push(enemy);
        
        
    }

    gameUpdate(){
        for(let enemy of this.enemies){
            if(!enemy.isDead)
                enemy.moveTo(this.player.pos.x, this.player.pos.y, this.enemiesSpeed);
        }
        
        this.player.pos = this.player.pos.sum(this.inp.mult(5));

    }
}