window.onload = function() {
  const canvas =  document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const game =  new Game (ctx);

  const gameBoard = document.getElementById('game-board')
 


  document.getElementById("start-button").onclick = function() {
  const home = document.getElementById('home');
  gameBoard.removeAttribute('style');
  home.style.display = 'none';
  game.startGame();

  }
  document.addEventListener('keydown', (event) => {
    game.onKeyDown(event.keyCode)
  })
  
  document.addEventListener('keyup', (event) => {
    game.onKeyUp(event.keyCode)
  })
  
};




  