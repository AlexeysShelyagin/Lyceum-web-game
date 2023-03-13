import { Game } from "./game.js";

let game = new Game();

game.game_loop()

let cx = document.getElementById("test").getContext("2d");

let img = new Image();
img.src = '../img/grass.png';
img.onload = function (){
    cx.drawImage(img, 0, 0, 50, 50);
    cx.drawImage(img, 50, 0, 50, 50);
};