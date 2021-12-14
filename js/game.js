const OBSTACLE_FRAMES = 120

class Game {
    constructor(ctx) {

        this.ctx = ctx;
        this.arena = new Arena(ctx)
        this.player = new Player(ctx, 400, 350)
        this.zombies = [
            new Zombie(ctx, 200, 200),
            new Zombie(ctx, 200, 200),
            new Zombie(ctx, 200, 200),
            new Zombie(ctx, 200, 200),
            new Zombie(ctx, 200, 200)
        ]


        this.intervalId = undefined
        this.fps = 1000 / 60

        this.obstaclesFramesCount = 0;


    }

    startGame() {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                if (this.obstaclesFramesCount % OBSTACLE_FRAMES === 0) {
                 
                    this.obstaclesFramesCount = 0;
                }


                this.clear()

                this.draw()

                this.move()
                
    

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
    }


    move(){
        // this.zombies.forEach(zombie => {
            
        // });
        this.player.move();
    }
    onKeyUp(keyCode) {
        this.player.onKeyUp(keyCode)

    }
    onKeyDown(keyCode) {
        this.player.onKeyDown(keyCode)
    
    }

    

}