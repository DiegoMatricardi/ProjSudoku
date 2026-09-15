import { Sudoku } from "../models/sudoku.js";
import { SudokuUtils } from "../utils/SudokuUtils.js";

export class DFS {
    //Contador de quantos estados foram analisados
    quantAnalisados = 0;
    solucaoDFS(sudoku: Sudoku):boolean {
        this.quantAnalisados++;

        const tabuleiro = sudoku.getTabuleiro();
        //Realizar a busca por celula vazia
        let linhaVazia = -1;
        let colVazia = -1;
        
        for(let linha = 0; linha < 9; linha++) {
            for(let coluna = 0; coluna < 9; coluna++) {
                if(tabuleiro[linha]![coluna] === 0){
                    linhaVazia = linha;
                    colVazia = coluna;
                    break;
                }
            }
            if(linhaVazia !== -1){
                break;
            }
        }

        //Caso nao encontre celula vazia, encerra
        if(linhaVazia === -1) {
            return true;
        }

        //Testar a combinação de números de 1 ate 9
        for(let num = 1; num <= 9; num++) {
            if(SudokuUtils.movValido(sudoku, linhaVazia, colVazia, num)){//Se a jogada for valida, adiciona
                tabuleiro[linhaVazia]![colVazia] = num;
                //Continua procurando a solução recursivamente
                if(this.solucaoDFS(sudoku)) {
                    return true;
                }

                //Deu errado, desfaz a jogada
                tabuleiro[linhaVazia]![colVazia] = 0;
            }
        }
        return false;
    }
}