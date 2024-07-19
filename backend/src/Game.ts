import { Board } from "./Board";
import { Player } from "./Player";

export class Game {
    players: Player[];
    board: Board;
    currentPlayer: Player | null;

    constructor() {
        this.players = [];
        this.board = new Board();
        this.currentPlayer = null;
    }

    addPlayer(player:Player) {
        if (this.players.length < 2) {
            this.players.push(player);
        }
        if (this.players.length == 1) {
            this.currentPlayer = player;
        } else {
            console.log("cannot add more than two players");
        }
    }

    switchPlayer() {
        if (this.players.length === 2) {
            if (this.currentPlayer === this.players[0]) {
                this.currentPlayer = this.players[1]
            }
            else {
                this.currentPlayer = this.players[0]
            }
        }

    }

    makeMove(index: number): boolean {
        if (this.currentPlayer) {
            this.board.updateCell(index, this.currentPlayer.symbol);
            return true;
        }
        return false;
    }

    checkWinner():Player | null {
        const Winningpattern: number[][] = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
          ];
          
          for (const pattern of Winningpattern) {
            const [a, b, c] = pattern;
            if (this.board.cells[a] && this.board.cells[a] === this.board.cells[b] && this.board.cells[a] === this.board.cells[c]) {
              return this.players.find(p => p.symbol === this.board.cells[a]) || null;
            }
          }
          
          return null;
    }
      
}