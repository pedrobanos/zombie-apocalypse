class Zombie {
    constructor(ctx,x,y){

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 50;
        this.vx= 3;
        this.vy = 3;

    }

    draw(){

        this.ctx.save()
        
        
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.ctx.restore()
        

    }

    move(){

        this.y += this.vy;
        this.x += this.vx;
    }
}