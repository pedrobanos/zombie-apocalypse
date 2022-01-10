class Zombie {
    constructor(ctx,x,y){

        this.ctx = ctx
        this.x = x
        this.y = y
        this.height = 60
        this.width = 60
        this.vx= 2
        this.vy = 2

        this.maxY = 610

        this.img = new Image()
        this.img.src = './images/sprites/skeleton sprite.jpeg'
        this.img.isReady = false
        this.img.onload = () => {
            this.img.isReady = true
        }

        this.horizontalFrames = 3
        this.verticalFrames = 4

        this.xFrame = 0
        this.yFrame = 3

        

        this.tick = 0
    }

    draw(){
        if (this.img.isReady) {
            this.ctx.drawImage(
              this.img,
              (this.img.width * this.xFrame) / this.horizontalFrames,
              (this.img.height * this.yFrame) / this.verticalFrames,
              this.img.width / this.horizontalFrames,
              this.img.height / this.verticalFrames,
              this.x,
              this.y,
              this.width,
              this.height
            )
            

            this.tick++
          }
        }
        


    move(){
        this.y += this.vy;
        this.x += this.vx;

        if (this.x <= 0) {
            this.x = 0
            this.vy = Math.floor(Math.random() * 4 - 2)
            this.vx = Math.floor(Math.random() * 2)
            this.checkOrientation()
        }
        if (this.x + this.width >= this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.width
            this.vy = Math.floor(Math.random()* 4 - 2)
            this.vx = Math.floor(Math.random()* - 2)
            this.checkOrientation()
        }
        if (this.y <= 260) {
            this.y = 261;
            this.vy = this.vy * - 1;
            this.vx = Math.floor(Math.random() * 4 - 2)
            this.checkOrientation()
        }

        if (this.y >= this.maxY) {
            this.y = this.maxY - 1;
            this.vy = this.vy * - 1;
            this.vx = Math.floor(Math.random() * 4 - 2)
            this.checkOrientation()
        }

        if (this.tick % 10 === 0) {
            this.xFrame++
    
            if (this.xFrame >= this.horizontalFrames) {
                this.xFrame = 0
            }
        }
    }

    checkOrientation() {
        if(this.vy > 0) {
            this.yFrame = 2;
        } 
        if(this.vy < 0) {
            this.yFrame = 0;
        }

        if(this.vx > 0) {
            this.yFrame = 1;
        }
        if(this.vx < 0) {
            this.yFrame = 3;
        }
    }

    collidesWith(bullet) {
        if (
            this.x < bullet.x  &&
            this.x + bullet.width  > bullet.x  &&
            this.y < bullet.y  &&
            this.y + bullet.height > bullet.y 
          ) {
            return true
          }
      
          return false
        }

       
}