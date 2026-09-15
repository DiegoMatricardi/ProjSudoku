import { Sudoku } from "../models/sudoku.js";
import { SudokuUtils } from "../utils/SudokuUtils.js";

//Função de avaliação baseada no grau de restrição
export class Heuristica {
    // Conta quantos números podem ser colocados em uma célula
    static quantidadePossiveis(sudoku: Sudoku, linha: number, coluna: number): number {
        let quant = 0;
        for(let num = 1; num <= 9; num++){
            if(SudokuUtils.movValido(sudoku, linha, coluna, num)){
                quant++;
            }
        }
        return quant;
    }

    // Calcula a heurística do estado
    static calcular(sudoku: Sudoku): number {

        const tabuleiro = sudoku.getTabuleiro();

        let menorQuantidade = 10;

        for (let linha = 0; linha < 9; linha++) {

            for (let coluna = 0; coluna < 9; coluna++) {

                if (tabuleiro[linha]![coluna] === 0) {

                    const quantidade = this.quantidadePossiveis(sudoku, linha, coluna);

                    if (quantidade < menorQuantidade) {
                        menorQuantidade = quantidade;
                    }
                }
            }
        }

        return menorQuantidade;
    }

    // Encontra a célula vazia com menor quantidade de possibilidades
    static encontrarMRV(sudoku: Sudoku) {
        const tabuleiro = sudoku.getTabuleiro();

        let menorQuant = 10;
        let melhorLinha = -1;
        let melhorColuna = -1;

        for(let linha = 0; linha < 9; linha++) {
            for(let coluna = 0; coluna < 9; coluna++) {
                if(tabuleiro[linha]![coluna] === 0) {
                    const quantidade = this.quantidadePossiveis(sudoku, linha, coluna);
                    //Encontrou uma celula mais restringida
                    if(quantidade < menorQuant) {
                        menorQuant = quantidade;
                        melhorLinha = linha;
                        melhorColuna = coluna;
                    }
                }
            }
        }
        return { linha: melhorLinha, coluna: melhorColuna, quantidade: menorQuant};
    }
}