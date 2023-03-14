import { vec2 } from "./vectors.js"

export class Player{
    pos = new vec2(0, 0);
    vel = new vec2(0, 0);
    health;
    max_health;

    constructor (center, health) {
        this.pos = new vec2(center[0], center[1]);
        this.health = this.max_health = health;
    }

    move_player (){
        this.pos = this.pos.sum(this.vel);
    }

    check_bounding (w, h){
        let corr_vel = new vec2();
        if(this.pos.x <= 0) corr_vel = corr_vel.sum(new vec2(1, 0));
        if(this.pos.x >= w - 1) corr_vel = corr_vel.sum(new vec2(-1, 0));
        if(this.pos.y <= 0) corr_vel = corr_vel.sum(new vec2(0, 1));
        if(this.pos.y >= h - 1) corr_vel = corr_vel.sum(new vec2(0, -1));

        corr_vel.normalize();
        corr_vel = corr_vel.mult(0.1);
        this.vel = this.vel.sum(corr_vel);
    }
}