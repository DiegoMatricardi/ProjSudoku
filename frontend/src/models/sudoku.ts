export class Sudoku {
    tabuleiro: number[][];

    constructor(tabuleiro: number[][]) {
        this.tabuleiro = tabuleiro;
    }

    getTabuleiro(): number[][] {
        return this.tabuleiro;
    }
}