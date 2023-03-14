import { Map } from "./game.js"

export var load_status = 0;
var sprites = {};
var bg_map = [];
var screen, canvas, cx;
var tiles_vis, scale, aspect_ratio;

export function fit_canvas (){
    screen = document.getElementById("game_screen");
    let screen_dim = screen.getBoundingClientRect();
    canvas = document.getElementById("game");
    cx = canvas.getContext("2d");
    canvas.width = screen_dim.width - 5;
    canvas.height = screen_dim.width / aspect_ratio;
    scale = Math.max(canvas.width, canvas.height) / tiles_vis;
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