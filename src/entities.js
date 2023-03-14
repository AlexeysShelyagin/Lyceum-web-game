import { vec2 } from "./vectors.js"

export class Player{
    pos = new vec2(0, 0);
    vel = new vec2(0, 0);
    vel_buffer = new vec2(0, 0)
    health;
    max_health;
    call_down;
    isDead = false;


    constructor (center, health, call_down) {
        this.pos = new vec2(center[0], center[1]);
        this.health = this.max_health = health;
        this.call_down = call_down;
    }

    move (){
        this.vel = this.vel.sum(this.vel_buffer);
        if (this.vel_buffer.mod() > 0.01) this.vel_buffer = this.vel_buffer.mult(0.9);
        else this.vel_buffer = new vec2(0, 0)

        this.pos = this.pos.sum(this.vel);
    }

    check_colision (w, h, entities){
        let corr_vel = new vec2();
        if(this.pos.x <= 0) corr_vel = corr_vel.sum(new vec2(1, 0));
        if(this.pos.x >= w - 1) corr_vel = corr_vel.sum(new vec2(-1, 0));
        if(this.pos.y <= 0) corr_vel = corr_vel.sum(new vec2(0, 1));
        if(this.pos.y >= h - 1) corr_vel = corr_vel.sum(new vec2(0, -1));

        corr_vel.normalize();
        corr_vel = corr_vel.mult(0.1);
        this.vel = this.vel.sum(corr_vel);

        for(let i = 0; i < entities.length; i++){
            if(entities[i][1] == 'enemy'){
                let delta = this.pos.sub(entities[i][0].pos);
                if(delta.mod() < 0.5){
                    this.get_damage(entities[i][0].damage);
                    delta.normalize();
                    this.vel_buffer = delta.mult(0.2);
                }
            }
        }
    }

    get_damage (damage){
        this.health -= damage;
        if(this.health <= 0) this.die();
    }

    die (){
        this.isDead = true;
    }
}

export class Enemy{
    pos = new vec2();
    vel = new vec2();
    health;
    max_health;
    damage;
    isDead = false;

    constructor (pos, health, damage) {
        this.pos = new vec2(pos.x, pos.y);
        this.health = this.max_health = health;
        this.damage = damage;
        this.isDead = false;
    }

    ent_ai (player, entities){
        let dir = player.pos.sub(this.pos);
        dir.normalize();
        this.vel = dir.mult(0.02);

        this.move();
    }

    move (){
        this.pos = this.pos.sum(this.vel);
    }

    getDamage(damage){
        this.health -= damage;
        if(this.health <= 0) this.die();
    }

    attack(){
        return this.damage;
    }

    die(){
        this.isDead = true;
    }
}

export class MagicBall{
    pos = new vec2();
    vel = new vec2();
    moveVec = new vec2();
    damage;
    isDead = false

    constructor (pos, dir, damage) {
        this.pos = pos;

        this.damage = damage;
        this.vel = dir.normalize().mult(0.15);

    }

    ent_ai (player, entities){
        this.check_colision(entities);
        this.move();
    }

    move (){
        this.pos = this.pos.sum(this.vel);
    }

    check_colision (entities){
        for(let i = 0; i < entities.length; i++){
            if(entities[i][1] == 'enemy'){
                let delta = this.pos.sub(entities[i][0].pos);
                if(delta.mod() < 0.5){
                    entities[i][0].getDamage(this.damage);
                    this.die();
                }
            }
        }
    }

    die(){
        this.isDead = true;
    }

    attack(){
        return this.damage;
    }

}