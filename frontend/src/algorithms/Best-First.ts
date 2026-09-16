import { Sudoku } from "../models/sudoku.js";
import { SudokuUtils } from "../utils/SudokuUtils.js";
import { Heuristica } from "../heuristica/heuristica.js";

export class BestFirst {
    quantAnalisados = 0;
    soluçãoBestFirst(sudoku: Sudoku): Sudoku | null {

        const abertos: Sudoku[] = [];

        abertos.push(sudoku);

        while (abertos.length > 0) {

            // Identificar a menor heurística
            let menorIndice = 0;

            for (let i = 1; i < abertos.length; i++) {

                if (
                    Heuristica.calcular(abertos[i]!) <
                    Heuristica.calcular(abertos[menorIndice]!)
                ) {
                    menorIndice = i;
                }
            }

            // Retira o estado com a menor heurística
            const atual = abertos.splice(menorIndice, 1)[0]!;

            this.quantAnalisados++;

            // Encontra a célula mais restrita
            const mrv = Heuristica.encontrarMRV(atual);

            // Não existem células vazias = encontrou solução
            if (mrv.linha === -1) {
                return atual;
            }

            // Se a célula não possui nenhum valor possível,
            // esse estado não pode levar a uma solução
            if (mrv.quantidade === 0) {
                continue;
            }

            for(let num = 1; num <= 9; num++) {
                if(SudokuUtils.movValido(atual, mrv.linha, mrv.coluna, num)) {
                    // Copia o tabuleiro atual
                    const tabuleiro = atual.getTabuleiro();
                    const auxTabuleiro = tabuleiro.map(linha => [...linha]);

                    //Realiza uma jogada na copia
                    auxTabuleiro[mrv.linha]![mrv.coluna] = num;

                    // Cria um novo estado
                    const novoSudoku = new Sudoku(auxTabuleiro);

                    // Adiciona aos estados abertos
                    abertos.push(novoSudoku);
                }
            }
        }

        // Lista de abertos acabou e não encontrou solução
        return null;
    }
}