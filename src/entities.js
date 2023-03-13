import { vec2 } from "./vectors.js"

export class Player{
    pos = new vec2();
    vec = new vec2();
    health;
    max_health;

    constructor (health) {
        this.health = this.max_health = health;
    }
}