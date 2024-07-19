// import { WebSocketServer } from "ws";

// const wss = new WebSocketServer({port: 8080});
import readline from 'readline';
import { Game } from './Game';
import { Player } from './Player';


const game = new Game();
const player1 = new Player('1','X');
const player2 = new Player('2', 'O');

game.addPlayer(player1);
game.addPlayer(player2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const GamePlay = () => {
  rl.question(`Player ${game.currentPlayer?.symbol} select number from 0-8: `, (response) => {
    const position = parseInt(response, 10);

    if (position < 0 || position > 8 || isNaN(position) || game.board.cells[position] !== null) {
      console.log('Invalid move entered. Try again... !');
      GamePlay();
      return; 
    }
    const moved = game.makeMove(position);
    if (moved) {
      game.board.display();
      const isWinner = game.checkWinner();
      if (isWinner !== null) {
        console.log(`Player ${isWinner.symbol} won the game`);
        rl.close();
        return; 
      }      
      game.switchPlayer();
    } else {
      console.log('Move could not be made. Try again...');
    }
    
    game.board.display();
    GamePlay();
  });
};

game.board.display();
GamePlay();
