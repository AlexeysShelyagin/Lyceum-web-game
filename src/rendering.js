import { Map } from "./game.js"

export var load_status = 0;
var sprites = {};
var bg_map = [];
var screen, canvas, cx;
var tiles_vis, scale, aspect_ratio;

var hp_div, hp_canvas, hp;
var energy_div, energy_canvas, energy;

export function fit_canvas (){
    screen = document.getElementById("game_screen");
    let screen_dim = screen.getBoundingClientRect();
    canvas = document.getElementById("game");
    cx = canvas.getContext("2d");
    canvas.width = screen_dim.width - 5;
    canvas.height = screen_dim.width / aspect_ratio;
    scale = Math.max(canvas.width, canvas.height) / tiles_vis;

    hp_div = document.getElementById("hp_bar");
    let hp_dim = hp_div.getBoundingClientRect();
    hp_canvas = document.getElementById("hp");
    hp = hp_canvas.getContext("2d");
    hp_canvas.width = hp_dim.width;
    hp_canvas.height = hp_dim.height;

    energy_div = document.getElementById("energy_bar");
    let energy_dim = energy_div.getBoundingClientRect();
    energy_canvas = document.getElementById("energy");
    energy = energy_canvas.getContext("2d");
    energy_canvas.width = energy_dim.width;
    energy_canvas.height = energy_dim.height;
}

export function render_init (map){
    sprites['grass'] = new Image();
    sprites['grass'].onload = function (){
        load_status ++;
    };
    sprites['grass'].src = '../sprites/bg2.png';

    sprites['grass2'] = new Image();
    sprites['grass2'].onload = function (){
        load_status ++;
    };
    sprites['grass2'].src = '../sprites/bg2_flower.png';

    sprites['player'] = new Image();
    sprites['player'].onload = function (){
        load_status ++;
    };
    sprites['player'].src = '../sprites/hero_idle.png';

    sprites['enemy'] = new Image();
    sprites['enemy'].onload = function (){
        load_status ++;
    };
    sprites['enemy'].src = '../sprites/enemy1.png';

    sprites['ball'] = new Image();
    sprites['ball'].onload = function (){
        load_status ++;
    };
    sprites['ball'].src = '../sprites/magicBall.png';

    tiles_vis = map.tiles_vis;
    aspect_ratio = map.width / map.height;
    fit_canvas();

    for (let i = 0; i < map.width; i++){
        bg_map.push([]);
        for(let j = 0; j < map.height; j++){
            bg_map[i].push( (Math.random() * 100 < 15) ? 'grass2' : 'grass' );
        }
    }
}

export function render (map, player, entities){
    for (let i = 0; i < map.width; i++){
        for(let j = 0; j < map.height; j++){
            cx.drawImage(sprites[bg_map[i][j]], i*scale, j*scale, scale, scale);
        }
    }

    let p_x = player.pos.x, p_y = player.pos.y;
    cx.drawImage(sprites['player'], p_x * scale, p_y * scale, scale, scale);

    for(let i = 0; i < entities.length; i++){
        let e_x = entities[i][0].pos.x, e_y = entities[i][0].pos.y;
        cx.drawImage(sprites[entities[i][1]], e_x * scale, e_y * scale, scale, scale);
    }
}

export function render_hud (player, call_down_time){
    hp.clearRect(0, 0, hp_canvas.width, hp_canvas.height);
    hp.fillStyle = 'white';
    let m_hp = player.max_health;

    for(let i = 0; i < player.health; i++){
        hp.fillRect(i * hp.canvas.width / m_hp, 0, hp_canvas.width / m_hp * 0.5, hp_canvas.height);
    }

    energy.clearRect(0, 0, energy_canvas.width, energy_canvas.height)
    energy.fillStyle = 'white';
    energy.strokeStyle = 'white';
    energy.lineWidth = 2;
    energy.strokeRect(3, energy_canvas.height / 3, energy_canvas.width - 6, 2 * energy_canvas.height / 3 - 3);
    energy.fillRect(
        7, 
        energy_canvas.height / 3 + 4, 
        Math.min((call_down_time / player.call_down), 1) * energy_canvas.width - 14,
        2 * energy_canvas.height / 3 - 11
    );
}