import { Game } from "./game.js";

let game = new Game();

game.game_loop()

let screen = document.getElementById("game_screen").getBoundingClientRect();
let canvas = document.getElementById("test");
let cx = canvas.getContext("2d");
canvas.width = screen.width;
canvas.height = screen.height;

console.log(screen.width, canvas.width);

let img = new Image();
img.src = '../img/grass.png';
img.onload = function (){
    cx.drawImage(img, 0, 0, canvas.width / 20, canvas.width / 20);
    cx.drawImage(img, 100, 0, canvas.width / 20, canvas.width / 20);
};