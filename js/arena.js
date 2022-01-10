class Arena {
  constructor(ctx) {
    this.ctx = ctx;

    this.img = new Image();
    this.img.src = './images/possible background.png';

    this.y = 0
    this.x = 0


    this.width = this.ctx.canvas.width
    this.height = this.ctx.canvas.height
    this.img.isReady = false
    
    this.img.onload = () => {
     
      this.img.isReady = true; 
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


}