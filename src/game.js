import { Player, Enemy, MagicBall } from "./entities.js"
import { game_keydown, game_keyup, game_visible, keyboard_handler } from "./keyboard.js"

import { maps } from "../resource/map.js"
import { vec2 } from "./vectors.js";
import { render_init, render, load_status, fit_canvas, render_hud } from "./rendering.js";

let tile_list = [
    'grass', 'rock'
];

let tile_types = {
    'grass': 1,
    'rock': 2
};

export class Map{
    width;
    height;
    tiles_vis;
    field = [];
    spawn_rate;

    player_health; player_call_down;
    enemy_health; enemy_damage;
    ball_damage;

    constructor (map_file){
        this.width = map_file['size'][0];
        this.height = map_file['size'][1];

        this.tiles_vis = map_file['tiles_on_screen'];
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

        this.spawn_rate = map_file['entities']['ghosts']['spawn_rate'];
        this.enemy_damage = map_file['entities']['ghosts']['damage'];
        this.enemy_health = map_file['entities']['ghosts']['health'];
        this.player_health = map_file['entities']['player']['health'];
        this.player_call_down = map_file['entities']['player']['call_down'];
        this.ball_damage = map_file['entities']['ball']['damage'];
    }
}

export class Game{
    pause = false;
    player;
    map;
    frame;
    call_down = -200;
    entities = [];

    constructor() {
        let map_name = 'map1';
        //let map_name = prompt('enter the map name');
        // TODO: add map selecting
        this.map = new Map(maps[map_name]);
        this.player = new Player(maps[map_name]['start_pos'], this.map.player_health, this.map.player_call_down);

        render_init(this.map);
        this.frame = 0;

        document.addEventListener('keydown', game_keydown);
        document.addEventListener('keyup', game_keyup);
        document.addEventListener('visibilitychange', game_visible);
        window.addEventListener('resize', fit_canvas);
    }

    game_loop() {
        this.frame++;
        if(load_status == 5){ 
            if (((this.frame - 10) % this.map.spawn_rate) == 0){
                this.spawn_enemy(new vec2(
                    Math.random() * this.map.width,
                    Math.random() * this.map.height
                ), this.map.enemy_health, this.map.enemy_damage);
            }

            let key_report = keyboard_handler();
            let vel = key_report[0].mult(0.1);
            this.player.vel = vel;
            
            if (key_report[1] == 'fire' && this.call_down + this.player.call_down <= this.frame){
                this.call_down = this.frame;
                this.spawn_ball(this.player.pos, key_report[0], this.map.ball_damage);
            }

            
            for (let i = 0; i < this.entities.length; i++){
                this.entities[i][0].ent_ai(this.player, this.entities);
            }

            for (let i = 0; i < this.entities.length; i++){
                if(this.entities[i][0].isDead) this.entities.splice(i, 1);
            }

            this.player.check_colision(this.map.width, this.map.height, this.entities);
            this.player.move();
            
            render(this.map, this.player, this.entities);
            render_hud(this.player, this.frame - this.call_down);

            this.player.vel = new vec2();
        }

        if(!this.player.isDead){
            requestAnimationFrame(this.game_loop.bind(this));
        }
        else{
            render_hud(this.player, this.frame - this.call_down);
            alert('You are dead :(');
        }
    }

    spawn_enemy (pos, health, damage){
        this.entities.push( 
            [new Enemy(pos, health, damage), 'enemy']
        );
    }

    spawn_ball (pos, dir, damage){
        if (dir.mod() == 0){
            this.call_down -= 150;
            return;
        }
        this.entities.push(
            [new MagicBall(pos, dir, damage), 'ball']
        )
    }
}