import { Player } from "./entities.js"
import { Enemy } from "./entities.js"
import { MagicBall } from "./entities.js"
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
    magicBalls = new Array();
    enemiesSpeed;
    map;
    inp;
    shootingDirection;
    timer;

    constructor() {
        let map_name = 'map1';
        //let map_name = prompt('enter the map name');
        // TODO: add map selecting
        this.map = new Map(maps[map_name]);
        let htmlBox = document.getElementById('block');
        this.player = new Player(maps[map_name]['start_pos'], 10, htmlBox);
        this.enemies = new Array();
        this.magicBalls = new Array();
        this.enemiesSpeed = 2;
        document.addEventListener('keydown', game_keydown);
        document.addEventListener('keyup', game_keyup);
        document.addEventListener('visibilitychange', game_visible)
        this.inp = new vec2(0,0);
        this.shootingDirection = new vec2(1,0);
        //setInterval(this.spawnMagicBall, 2000);
        //setInterval(function() { this.spawnMagicBall(); }, 2000);
        
        //var k = 1;
        //setInterval(function() { k++; if(k > 999999) k = 0; console.log(k); }, 1);
        
        this.timer = 100;

        //this.spawnMagicBall();
    }

    game_loop() {
        this.inp = keyboard_handler();
        if(this.inp.x != 0){
            this.shootingDirection = new vec2(this.inp.x, 0);
            if(this.shootingDirection.x == 1){
                this.player.box.classList.add("player-facing-right");
                this.player.box.classList.remove("player-facing-left");
            }
            else{
                this.player.box.classList.remove("player-facing-right");
                this.player.box.classList.add("player-facing-left"); 
            }

            
        }
            

        this.gameUpdate();
        requestAnimationFrame(this.game_loop.bind(this));
    }

    
    spawnEnemy(pos){
        let htmlBox = document.createElement("div");
        htmlBox.classList.add("enemy");
        document.body.appendChild(htmlBox);
        let enemy = new Enemy(pos, 10, 2, htmlBox);
        enemy.moveTo(500,500,500);
        this.enemies.push(enemy);
        
        
    }
    spawnMagicBall(pos){

        //console.log(this.magicBalls + " ; " + this.player);
        let htmlBox = document.createElement("div");
        htmlBox.classList.add("magicBall");
        document.body.appendChild(htmlBox);
        let ball = new MagicBall(pos, this.shootingDirection, htmlBox);

        
        let x = this.magicBalls.pop();
        if(x != null)
            x.die();
        this.magicBalls.push(ball);
    }
    gameUpdate(){
        for(let enemy of this.enemies){
            if(!enemy.isDead){
                enemy.moveTo(this.player.pos.x, this.player.pos.y, this.enemiesSpeed);
                if(enemy.checkDistanceToAttack(this.player.pos)){
                    this.player.getDamage(enemy.attack());
                }
                else{
                    for(let mball of this.magicBalls){
                        if(enemy.checkDistanceToAttack(mball.pos)){
                            enemy.getDamage(mball.attack());
                            console.log("ball attack");
                            mball.die();
                        }
                    }
                }
            }
                
        }
        if((this.timer % 180) == 0){
            this.spawnMagicBall(this.player.pos);
        }
        for(let bl of this.magicBalls){
            bl.moveTo(8);
        }
        if((this.timer %200) == 0)
        {
            this.spawnEnemy(new vec2(Math.floor(Math.random())*1920,Math.floor(Math.random())*1080));
        }
        this.player.pos = this.player.pos.sum(this.inp.mult(5));
        //this.timer = k;

        this.timer++;
        //console.log(this.timer);
        if(this.timer > 9999999){
            this.timer = 0;
        }

        
    }
}