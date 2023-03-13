import { Map } from "./game.js"

export var load_status = 0;
var sprites = {};

export function render_init (){
    sprites['grass'] = new Image();
    sprites['grass'].onload = function (){
        load_status = 1;
    };
    sprites['grass'].src = '../sprites/bg2.png';

    sprites['grass2'] = new Image();
    sprites['grass2'].onload = function (){
        load_status = 1;
    };
    sprites['grass2'].src = '../sprites/bg2_flower.png';
}

export function render (map, frame){
    let screen = document.getElementById("game_screen").getBoundingClientRect();
    let canvas = document.getElementById("game");
    let cx = canvas.getContext("2d");
    canvas.width = screen.width;
    canvas.height = screen.height;

    let scale = Math.max(canvas.width, canvas.height) / map.tiles_vis;

    for (let i = 0; i < map.width; i++){
        for(let j = 0; j < map.height; j++){
            let tile = (i % 5) ? sprites['grass'] : sprites['grass2']
            cx.drawImage(tile, i*scale - frame / 2 % 200, j*scale, scale, scale);
        }
    }
}