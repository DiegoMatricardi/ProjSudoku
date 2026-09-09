import { Sudoku } from "../models/sudoku.js";

export class SudokuUtils {
    static movValido(sudoku: Sudoku, linha: number, col: number, num: number):boolean {
        const tabuleiro = sudoku.getTabuleiro();
        //Verifica linha do tabuleiro
        for (let i = 0; i < 9; i++) {
            if (tabuleiro[linha]![i] === num) {
                return false;
            }
        }

        //Verifica coluna do tabuleiro
        for (let i = 0; i < 9; i++) {
            if(tabuleiro[i]![col] === num) {
                return false;
            }
        }

        //Verificar o bloco 3x3 
        const linhaInicio = Math.floor(linha/3) * 3;
        const colInicio = Math.floor(col/3) * 3;

        for(let i = linhaInicio; i < linhaInicio + 3; i++) {
            for(let j = colInicio; j < colInicio + 3; j++) {
                if(tabuleiro[i]![j] === num){
                    return false;
                }
            }
        }
        return true;
    }
}