const OBSTACLE_FRAMES = 120
const ZOMBIE_FRAMES = 60

class Game {
    constructor(ctx) {

        this.ctx = ctx;
        this.arena = new Arena(ctx)
        this.player = new Player(ctx, 400, 350)
        this.zombies = []
        this.killScore = new KillScore(ctx)
        this.survivalTimeScore = new SurvivalTimeScore(ctx)


        this.intervalId = undefined
        this.fps = 1000 / 60

        this.obstaclesFramesCount = 0;
        this.tick = 0;
        this.gameAudio = new Audio('./music/game audio.mp3')
        this.gameAudio.volume = 0.9
        this.zombieSound = new Audio('./music/zombie sound efect.mp3')
        this.zombieSound.volume = 0.1
        this.soundGameOver = new Audio('./music/risa-de-samantha.mp3')
        this.soundGameOver.volume = 0.5
        this.score = 0
        this.timeSurvival = 0

        this.isGameOver = false //he tocado aqui

    }

    startGame() {
        if (!this.intervalId) {

            this.gameAudio.play()
            this.gameAudio.currentTime = 0

            this.intervalId = setInterval(() => {
                if (this.obstaclesFramesCount % OBSTACLE_FRAMES === 0) {

                    this.obstaclesFramesCount = 0;
                }
                this.timeSurvival++

                this.clear()

                this.draw()

                this.addZombies()

                this.move()

                this.checkCollission()

                this.clearBullets()



            }, this.fps)
        }

    }



    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    }

    draw() {
        this.arena.draw()
        this.player.draw()


        this.zombies.forEach(zombie => zombie.draw())


        this.drawScore()
        this.drawScore2()


    }

    drawScore() {
        this.ctx.save()

        this.killScore.draw()
        this.ctx.fillStyle = 'black'
        this.ctx.font = ' bold 20px fantasy'

        this.ctx.fillText(`${this.score} dead zombies`, 290, 77)

        this.ctx.restore()
    }

    drawScore2() {
        this.ctx.save()

        this.survivalTimeScore.draw()
        this.ctx.fillStyle = 'black'
        this.ctx.font = ' bold 20px fantasy'


        this.ctx.fillText(`Survival Time: ${Math.floor(this.timeSurvival / 10)} seconds`, 685, 77)

        this.ctx.restore()
    }

    move() {
        this.zombies.forEach(zombie => zombie.move())

        this.player.move()

    }
    onKeyUp(keyCode) {
        this.player.onKeyUp(keyCode)


    }
    onKeyDown(keyCode) {
        this.player.onKeyDown(keyCode)

    }

    addZombies() {
        const x = this.ctx.canvas.width;
        const maxHeight = this.ctx.canvas.height;
        const y = Math.floor(Math.random() * maxHeight)

        if (this.tick % ZOMBIE_FRAMES === 0) {


            this.zombieSound.play()
            this.zombies.push(new Zombie(this.ctx, x, y))
        }
        this.tick++
    }



    checkCollission() {

        const condition = this.zombies.some(zombie => this.player.collidesWith(zombie))

        this.player.bullets.forEach((bullet, bulletIndex) => {
            this.zombies.forEach((zombie, zombieIndex) => {
                if (zombie.collidesWith(bullet)) {
                    bullet.yFrame = 2
                    bullet.vx = 0
                    bullet.vy = 0
                    setTimeout(() => {
                        this.player.bullets.splice(bulletIndex, 1)
                    }, 300);

                    this.zombies.splice(zombieIndex, 1)
                    this.score++
                }
            })
        })
        if (condition) {

            this.gameOver()
        }


    }

    clearBullets() {

        const canvasWidth = this.ctx.canvas.width
        const canvasHeight = this.ctx.canvas.height

        if (this.player.bullets.x > canvasWidth) {
            this.player.bullets = this.player.bullets.filter(bullet => this.player.bullets.x > canvasWidth)
        }
        if (this.player.bullets.x < 0) {
            this.player.bullets = this.player.bullets.filter(bullet => this.player.bullets.x < 0)
        }
        if (this.player.bullets.y > canvasHeight) {
            this.player.bullets = this.player.bullets.filter(bullet => this.player.bullets.y > canvasHeight)
        }
        if (this.player.bullets.y < 0) {
            this.player.bullets = this.player.bullets.filter(bullet => this.player.bullets.y < 0)
        }


    }


    gameOver() {
        clearInterval(this.intervalId)

        this.ctx.save()

        document.getElementById('game-over').style.display = 'flex';
        
        this.isGameOver = true;

        const score = document.getElementById('score')
        score.innerHTML = `You've survived ${Math.floor(this.timeSurvival / 10)} seconds and killed ${this.score} zombies`

        this.soundGameOver.play()
        this.zombieSound.pause()
        this.gameAudio.pause()

        this.ctx.restore()
    }
}

