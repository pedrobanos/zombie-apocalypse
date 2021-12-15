const OBSTACLE_FRAMES = 120
const ZOMBIE_FRAMES = 200

class Game {
    constructor(ctx) {

        this.ctx = ctx;
        this.arena = new Arena(ctx)
        this.player = new Player(ctx, 400, 350)
        this.zombies = []

        this.intervalId = undefined
        this.fps = 1000 / 60

        this.obstaclesFramesCount = 0;
        this.tick = 0;

    }

    startGame() {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                if (this.obstaclesFramesCount % OBSTACLE_FRAMES === 0) {
                    
                    this.obstaclesFramesCount = 0;
                }


                this.clear()

                this.draw()

                this.addZombies()

                this.move()

                this.checkCollission()
                
    

            }, this.fps)
        }

    }



    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        //const previousObstaclesLenght = this.obstacles.length
        //this.obstacles = this.obstacles.filter(obstacle => obstacle.x + obstacle.height > this.ctx.canvas.height)
    }

    draw() {
        this.arena.draw()
        this.player.draw()
        
        this.zombies.forEach(zombie => zombie.draw())
        
    }


    move(){
        this.zombies.forEach(zombie => zombie.move())
        this.player.move()

    }
    onKeyUp(keyCode) {
        this.player.onKeyUp(keyCode)

    }
    onKeyDown(keyCode) {
        this.player.onKeyDown(keyCode)
    
    }

    addZombies(){
        const x = this.ctx.canvas.width;
        const maxHeight = this.ctx.canvas.height;
        const y = Math.floor(Math.random()* maxHeight)

        if (this.tick%ZOMBIE_FRAMES === 0){
            this.zombies.push(new Zombie(this.ctx, x, y))
        }
        this.tick++
    }

    checkCollission() {
        
        const condition = this.zombies.some(zombie => this.player.collidesWith(zombie))

        if (condition) {
            this.gameOver()
          }
        }

      
    gameOver() {
          clearInterval(this.intervalId)
      
          this.ctx.save()
          
          this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
          this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
      
          this.ctx.fillStyle = 'white'
          this.ctx.textAlign = 'center'
          this.ctx.font = 'bold 32px sans-serif'
          this.ctx.fillText('Game Over', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2)
      
          this.ctx.restore()
    }
    
}


    

