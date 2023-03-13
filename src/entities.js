import { vec2 } from "./vectors.js"

export class Player{
    pos = new vec2();
    vec = new vec2();
    health;
    max_health;
    box;
    damage;

    constructor (center, health, htmlBox) {
        this.pos = new vec2(center[0], center[1]);
        this.health = this.max_health = health;
        this.box = htmlBox;
    }

    getDamage(damage){
        this.health -= damage;
        if(this.health <= 0)
        {
            this.die();
        }
    }
    checkDistanceToAttack(targetPos){
        return (targetPos.sub(this.pos).mod() < 0.1);
        // if(targetPos.sub(this.pos).mod() < 0.1){
        //     this.attack();
        // }
    }
    attack(){
        //return this.damage;
    }
    die(){
        this.isDead = true;
        this.pos = new vec2(99999,99999);
        this.moveBox();
        console.log('you are dead');
    }
    moveBox(){
        this.box.style.top = this.pos.y + 'px';
        this.box.style.left = this.pos.x + 'px';
    }

    // shootMagicBall(){
    //     let htmlBox = document.createElement("div");
    //     htmlBox.classList.add("magicBall");
    //     document.body.appendChild(htmlBox);
    //     let magicBall = new MagicBall(pos, new vec2(1,0), htmlBox);
        
    // }
}
export class MagicBall{
    pos = new vec2();
    vec = new vec2();
    moveVec = new vec2();
    damage;
    box;

    constructor (center, moveVec, htmlBox) {
        this.pos = center;
        
        this.damage = 2;
        this.moveVec = moveVec;
        this.box = htmlBox;
        this.moveBox();
    }
    moveTo(speed)
    {
        let direction = (this.moveVec).mult(speed);
        this.pos = this.pos.sum(direction);
        this.moveBox();
        //return newPos;
    }
    moveBox(){
        this.box.style.top = this.pos.y + 'px';
        this.box.style.left = this.pos.x + 'px';
    }
    die(){
        this.box.remove();
    }
    
    attack(){
        return this.damage;
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
    checkDistanceToAttack(targetPos){
        return ((targetPos.sub(this.pos)).mod() < 20);
        // if(targetPos.sub(this.pos).mod() < 0.1){
        //     this.attack();
        // }
    }
    attack(){
        return this.damage;
    }
    die(){
        this.isDead = true;
        this.pos = new vec2(99999,99999);
        this.moveBox();
        this.box.remove();
    }
    moveTo(x, y, speed)
    {
        //console.log("moveTo: " + x + " " + y);
        let targetPos = new vec2(x, y);
        //let direction = (((targetPos.sub(this.pos)).normalize()).mult(speed*10));

        let direction = (((targetPos.sub(this.pos)).normalize()).mult(speed));

        //let direction = ((targetPos.sub(this.pos)));

        this.pos = this.pos.sum(direction);

        this.moveBox();
        //return newPos;
    }
    moveBox(){
        this.box.style.top = this.pos.y + 'px';
        this.box.style.left = this.pos.x + 'px';
    }

    


}