class Bullet{
    constructor(ctx,x,y,vx,vy,yFrame){
        this.ctx = ctx
        this.y = y
        this.x = x

        this.height = 60
        this.width = 70

        this.vy = vy
        this.vx = vx

        this.horizontalFrames = 5
        this.verticalFrames = 3

        this.xFrame = 0
        this.yFrame = yFrame

        this.tick = 0

        

        this.img = new Image()
        this.img.src = './images/sprites/sprite.png'
        this.img.isReady = false
        this.img.onload = () => {
            this.img.isReady = true
        }

    
    }

    draw() {
        if (this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                (this.img.width * this.xFrame) / this.horizontalFrames,
                (this.img.height * this.yFrame) / this.verticalFrames,
                this.img.width / this.horizontalFrames,
                this.img.height / this.verticalFrames,
                (this.x  - this.height/3 - this.width/2),
                (this.y - this.height/3),
                this.width,
                this.height
            )

            this.tick++
        }
    
      }

    move(){
        
       
        this.x+= this.vx
        this.y+= this.vy

        if(this.yFrame === 2){
            
            if (this.tick % 5 === 0) {
                this.xFrame++
          
                if (this.xFrame >= this.horizontalFrames) {
                  this.xFrame = 0
                }
      
            }
       
        
    }

    }
    
}