class KillScore {
    constructor(ctx) {
      this.ctx = ctx;
  
      this.img = new Image();
      this.img.src = './images/5Gt7jsy-dripping-blood-clipart.png';
  
      this.y = 0
      this.x = 0
  
  
      this.width = 215
      this.height = 160
      this.img.isReady = false
      
      this.img.onload = () => {
       
        this.img.isReady = true; 
      }
      
    }

    draw() {
        if (this.img.isReady) {
          this.ctx.drawImage(
            this.img,
            250,
            25,
            this.width,
            this.height,
          )
    
        }
    
      }
}