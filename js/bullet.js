class Bullet{
    constructor(ctx,x,y){
        this.ctx = ctx
        this.y = y
        this.x = x

        this.height = 100
        this.width = 10

        this.vy = 0
        this.vx = 0

        this.movements = {
            shoot: false
        }

        this.isShooting = false

        this.img = new Image()
        this.img.src = 'images/bullet.png'
        this.img.isReady = false
        this.img.onload = () => {
            this.img.isReady = true
        }
    }

    draw() {
        if (this.img.isReady) {
          this.ctx.drawImage(
            this.img,
            0,
            0,
            this.width,
            this.height,
          )
    
        }
    
      }

    move(){
        
        this.x += this.vx
        this.y += this.vy

        
    }

    onKeyDown(keyCode) {
        
        if ([SPACE_BAR].includes(keyCode)) {
            this.isShooting = true;
        }

        if (keyCode === SPACE_BAR) {
          if(this.x == this.player.x){
              this.vx = 10
          } 
          if(this.y == this.player.y){
              this.vy = 10
          }
          this.movements.shoot = true
          
        }
    
      }
      
      onKeyUp(keyCode) {
        this.isShooting = false;

        if (keyCode === SPACE_BAR) {
          this.vx = 0
          this.vy = 0
          this.movements.shoot = false
          
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