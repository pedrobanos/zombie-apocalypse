window.onload = function() {
  const canvas =  document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const game =  new Game (ctx);
 
  const gameBoard = document.getElementById('game-board')
  const gameOver = document.getElementById('game-over') 
  const restart = document.getElementsByClassName('restart')
  const button = document.getElementById("start-button")

  const startGame = function() {
  const game =  new Game (ctx);
  const home = document.getElementById('home');
  gameBoard.removeAttribute('style');
  home.style.display = 'none';
  gameOver.style.display = 'none'; 
  game.startGame();

  document.addEventListener('keydown', (event) => {
    game.onKeyDown(event.keyCode)
  })
  
  document.addEventListener('keyup', (event) => {
    game.onKeyUp(event.keyCode)
  })
  
  }


  button.onclick = startGame;
  restart[0].onclick = startGame;

 
  
};





  