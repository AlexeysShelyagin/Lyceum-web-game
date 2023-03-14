export class vec2{
    x;
    y;
    constructor (x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    sum (b){
        return new vec2(this.x + b.x, this.y + b.y);
    }

    sub (b){
        return new vec2(this.x - b.x, this.y - b.y);
    }

    mult (val){
        return new vec2(this.x * val, this.y * val);
    }

    mod (){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize (){
        let mod = this.mod();
        if (mod == 0) return new vec2(0, 0);
        this.x /= mod;
        this.y /= mod;
        return new vec2(this.x, this.y);
    }
}