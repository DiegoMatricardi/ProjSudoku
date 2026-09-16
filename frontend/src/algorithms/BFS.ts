import { Sudoku } from "../models/sudoku.js";
import { SudokuUtils } from "../utils/SudokuUtils.js";

export class BFS {
    quantAnalisados = 0;
    solucaoBFS(sudoku: Sudoku): Sudoku | null {
        const fila: Sudoku[] = [];
        fila.push(sudoku);

        while (fila.length > 0) {

            const atual = fila.shift()!;
            this.quantAnalisados++;

            const tabuleiro = atual.getTabuleiro();

            let linhaVazia = -1;
            let colVazia = -1;

            for (let linha = 0; linha < 9; linha++) {
                for (let coluna = 0; coluna < 9; coluna++) {

                    if (tabuleiro[linha]![coluna] === 0) {
                        linhaVazia = linha;
                        colVazia = coluna;
                        break;
                    }
                }

                if (linhaVazia !== -1) {
                    break;
                }
            }

            // Se não existe posição vazia, encontramos
            if (linhaVazia === -1) {
                return atual;
            }

            // Gera os filhos
            for (let num = 1; num <= 9; num++) {

                if (SudokuUtils.movValido(
                    atual,
                    linhaVazia,
                    colVazia,
                    num
                )) {

                    // Copia
                    const auxTabuleiro =
                        tabuleiro.map(linha => [...linha]);

                    // Faz a jogada
                    auxTabuleiro[linhaVazia]![colVazia] = num;

                    // Cria novo estado
                    const novoSudoku = new Sudoku(auxTabuleiro);

                    // Adiciona no final da fila
                    fila.push(novoSudoku);
                }
            }
        }

        // Explorou tudo e não encontrou solução
        return null;
    }
}