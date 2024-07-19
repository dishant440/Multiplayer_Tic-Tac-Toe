"use strict";
// import { WebSocketServer } from "ws";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const wss = new WebSocketServer({port: 8080});
const readline_1 = __importDefault(require("readline"));
const Game_1 = require("./Game");
const Player_1 = require("./Player");
const game = new Game_1.Game();
const player1 = new Player_1.Player('1', 'X');
const player2 = new Player_1.Player('2', 'O');
game.addPlayer(player1);
game.addPlayer(player2);
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const promptMove = () => {
};
const GamePlay = () => {
    var _a;
    rl.question(`Player ${(_a = game.currentPlayer) === null || _a === void 0 ? void 0 : _a.symbol} select number from 0-8: `, (response) => {
        var _a;
        const position = parseInt(response, 10);
        if (position < 0 || position > 8 || isNaN(position) || game.board.cells[position] !== null) {
            console.log('Invalid move entered. Try again... !');
            GamePlay();
            return; // Early return to avoid further execution
        }
        const moved = game.makeMove(position);
        if (moved) {
            game.board.display();
            const isWinner = game.checkWinner();
            if (isWinner !== null) {
                console.log(`Player ${isWinner.symbol} won the game`);
                rl.close();
                return; // Early return to avoid further execution
            }
            console.log((_a = game.currentPlayer) === null || _a === void 0 ? void 0 : _a.symbol);
            game.switchPlayer();
        }
        else {
            console.log('Move could not be made. Try again...');
        }
        game.board.display();
        GamePlay();
    });
};
game.board.display();
GamePlay();
// const askMove = () => {
//   game.board.display();
//   rl.question(`Player ${game.currentPlayer?.symbol}, enter your move (0-8): `, (answer) => {
//     const move = parseInt(answer, 10);
//     if (isNaN(move) || move < 0 || move > 8 || !game.makeMove(move)) {
//       console.log('Invalid move, try again.');
//       askMove();
//     }
//     else {
//       const winner = game.checkWinner();
//       if (winner) {
//         game.board.display();
//         console.log(`Player ${winner.symbol} wins!`);
//         rl.close();
//       } else if (game.board.isFull()) {
//         game.board.display();
//         console.log('It\'s a draw!');
//         rl.close();
//       } else {
//         askMove();
//       }
//     }
//   });
// };
// askMove();
