var keyboard_query = {};

function keyboard_handler(){
    for (let key in keyboard_query){
        if(keyboard_query[key] == true){
            const box = document.getElementById('block');
            if (isNaN(parseInt(box.style.left))) box.style.left = '0px';
            if (isNaN(parseInt(box.style.top))) box.style.top = '0px';

            if(key == 65) {
                box.style.left = parseInt(box.style.left) - 5 + 'px';
            }
            else if(key == 68) {
                box.style.left = parseInt(box.style.left) + 5 + 'px';
            }
            else if(key == 87) {
                box.style.top = parseInt(box.style.top) - 5 + 'px';
            }
            else if(key == 83) {
                box.style.top = parseInt(box.style.top) + 5 + 'px';
            }
        }
        else delete keyboard_query[key];
    }
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