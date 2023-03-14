import { vec2 } from "./vectors.js";

var keyboard_query = {};

function keyboard_handler(){
    let dir = new vec2(0, 0);
    let res = '';
    
    for (let key in keyboard_query){
        if(keyboard_query[key] == true){

            if(key == 65) { //a
                dir = dir.sum(new vec2(-1, 0));
            }
            else if(key == 68) { //d
                dir = dir.sum(new vec2(1, 0));
            }
            else if(key == 87) { //w
                dir = dir.sum(new vec2(0, -1));
            }
            else if(key == 83) { //s
                dir = dir.sum(new vec2(0, 1));
            }
            else if(key == 32) { //space
                res = 'fire';
            }
        }
        else delete keyboard_query[key];
    }

    dir.normalize();
    return [dir, res];
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