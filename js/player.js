class Player{
    constructor(ctx, x, y){
        this.ctx = ctx
        this.x = x
        this.y = y
        this.maxY = 610

        this.vx = 0
        this.vy = 0
        this.width = 58
        this.height = 75

        this.movements = {
            up: false,
            down: false,
            left: false,
            right: false

        }
        this.isRunning = false;


        
        this.img = new Image()
        this.img.src = 'images/sprites/player_sprite.png'

        this.img.isReady = false

        this.img.onload = () => {
            this.img.isReady = true
        }
    
        this.horizontalFrames = 4
        this.verticalFrames = 4

        this.xFrame = 0
        this.yFrame = 2

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
        this.x += this.vx
        this.y += this.vy
        
        if (this.x <= 0) {
            this.x = 0
          }
          if (this.x + this.width >= this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.width
          }
          if (this.y <= 180) {
            this.y = 180
          }

          if (this.y >= this.maxY) {
            this.y = this.maxY
            
          }

          if (this.movements.up) {
            this.yFrame = 3
          }
      
          if (this.movements.down) {
            this.yFrame = 0
          }

          if (this.movements.left) {
            this.yFrame = 1
          }

          if (this.movements.right) {
            this.yFrame = 2
          }

          if (this.isRunning && this.tick % 10 === 0) {
            if (this.xFrame >= (this.horizontalFrames - 1)) {
                this.xFrame = 0
              } else {
                this.xFrame++
              }
          }
    }

    onKeyDown(keyCode) {
        
        if ([KEY_UP, KEY_DOWN, KEY_LEFT, KEY_RIGHT].includes(keyCode)) {
            this.isRunning = true;
        }

        if (keyCode === KEY_UP) {
          this.vy = -2
          this.movements.up = true
        }
    
        if (keyCode === KEY_LEFT) {
          this.vx = -2
          this.movements.left = true
        }
        if (keyCode === KEY_RIGHT) {
            this.vx = 2
            this.movements.right = true
          }

        if (keyCode === KEY_DOWN) {
          this.vy = 2
          this.movements.down = true
        }
      }
      
      onKeyUp(keyCode) {
        this.isRunning = false;

        if (keyCode === KEY_LEFT || keyCode === KEY_RIGHT || keyCode === KEY_DOWN || keyCode === KEY_UP ) {
          this.vx = 0
          this.vy = 0
          this.movements.up = false
          this.movements.down = false
          this.movements.right = false
          this.movements.left = false
        }
    }

    collidesWith(zombie) {
        if (
            this.x < zombie.x + zombie.width/2 &&
            this.x + this.width/2> zombie.x &&
            this.y < zombie.y + zombie.height/2 &&
            this.y + this.height/2 > zombie.y 
          ) {
            return true
          }
      
          return false
        }
}