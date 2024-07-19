export class Board {

    cells: (string | null)[];
    constructor() {
        this.cells = Array(9).fill(null);
    }

    updateCell(index: number, symbol: string): boolean {
        if (this.cells[index] === null) {
            this.cells[index] = symbol;
            return true;
        }
        return false;
    }

    resetCell() {
        this.cells = Array(9).fill(null)
    }

    isFull(): boolean {
        return this.cells.every(cell => cell!==null)
    }

    display() {
        console.clear();
        const displayValue = (value: string | null) => value || ' ';
        console.log(`
         ${displayValue(this.cells[0])} | ${displayValue(this.cells[1])} | ${displayValue(this.cells[2])}
        ---+---+---
         ${displayValue(this.cells[3])} | ${displayValue(this.cells[4])} | ${displayValue(this.cells[5])}
        ---+---+---
         ${displayValue(this.cells[6])} | ${displayValue(this.cells[7])} | ${displayValue(this.cells[8])}
        `);
    }
}