import { vec2 } from "./vectors.js"

export class Player{
    pos = new vec2();
    vec = new vec2();
    health;
    max_health;

    constructor (center, health) {
        this.pos = new vec2(center[0], center[1]);
        this.health = this.max_health = health;
    }
}
export class Enemy{
    pos = new vec2();
    vec = new vec2();
    health;
    max_health;
    damage;
    isDead;
    box;

    constructor (center, health, damage, htmlBox) {
        this.pos = new vec2(center[0], center[1]);
        this.health = this.max_health = health;
        this.damage = damage;
        this.isDead = false;
        this.box = htmlBox;
    }
    getDamage(damage){
        this.health -= damage;
        if(this.health <= 0)
        {
            this.die();
        }
    }
    attack(){
        return this.damage;
    }
    die(){
        this.isDead = true;
        this.pos = new vec2(99999,99999);
    }
    moveTo(x, y, speed)
    {
        //console.log("moveTo: " + x + " " + y);
        let targetPos = new vec2(x, y);
        //let direction = (((targetPos.sub(this.pos)).normalize()).mult(speed*10));

        let direction = (((targetPos.sub(this.pos)).normalize()).mult(speed));

        //let direction = ((targetPos.sub(this.pos)));

        this.pos = this.pos.sum(direction);

        this.box.style.top = this.pos.y + 'px';
        this.box.style.left = this.pos.x + 'px';
        //return newPos;
    }

    


}