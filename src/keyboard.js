import { Player } from "./entities.js"
import { vec2 } from "./vectors.js";
var keyboard_query = {};

function keyboard_handler(){
    for (let key in keyboard_query){
        if(keyboard_query[key] == true){
            const box = document.getElementById('block');
            if (isNaN(parseInt(box.style.left))) box.style.left = '0px';
            if (isNaN(parseInt(box.style.top))) box.style.top = '0px';

            if(key == 65) {
                box.style.left = parseInt(box.style.left) - 5 + 'px';
                return new vec2(-1,0);
            }
            else if(key == 68) {
                box.style.left = parseInt(box.style.left) + 5 + 'px';
                return new vec2(1,0);
            }
            else if(key == 87) {
                box.style.top = parseInt(box.style.top) - 5 + 'px';
                return new vec2(0,-1);
            }
            else if(key == 83) {
                box.style.top = parseInt(box.style.top) + 5 + 'px';
                return new vec2(0,1);
            }
        }
        else delete keyboard_query[key];
    }
    return new vec2(0,0);
}

function game_keydown(event) {
    keyboard_query[event.keyCode] = true;
}

function game_keyup(event) {
    keyboard_query[event.keyCode] = false;
}

function game_visible(event) {
    //console.log(document.visibilityState);
}

export {keyboard_handler, game_keydown, game_keyup, game_visible}