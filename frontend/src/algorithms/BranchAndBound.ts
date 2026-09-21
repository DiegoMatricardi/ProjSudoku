import { Sudoku } from "../models/sudoku.js";
import { SudokuUtils } from "../utils/SudokuUtils.js";
import { Heuristica } from "../heuristica/heuristica.js";

type Estado = {
    sudoku: Sudoku;
    custo: number;
}

export class BranchAndBound {
    quantAnalisados = 0;
    passos: number[][][] = [];

    solucaoBranchAndBound(sudoku: Sudoku): Sudoku | null {
        const abertos: Estado[] = [];

        abertos.push({
            sudoku: sudoku,
            custo: 0
        });

        while(abertos.length > 0) {
            //Descobrir o menor custo acumulado g(n)
            let menorIndice = 0;
            for(let i = 1; i < abertos.length; i++) {
                if(abertos[i]!.custo < abertos[menorIndice]!.custo){
                    menorIndice = i;
                }
            }

            const estadoAtual = abertos.splice(menorIndice, 1)[0]!;
            const atual = estadoAtual.sudoku;

            this.quantAnalisados++;

            const tabuleiroAtual = atual.getTabuleiro();
            this.passos.push(
                tabuleiroAtual.map(linha => [...linha])
            );
            
            const mrv = Heuristica.encontrarMRV(atual);
            if(mrv.linha === -1) {
                return atual;
            }

            //Se a heuristica fo 0, PODA!
            if (mrv.quantidade === 0) {
                continue;
            }


            for(let num = 1; num <= 9; num++) {
                if(SudokuUtils.movValido(atual, mrv.linha, mrv.coluna, num)){
                    const tabuleiro = atual.getTabuleiro();
                    const auxTabuleiro = tabuleiro.map(linha => [...linha]);
                    auxTabuleiro[mrv.linha]![mrv.coluna] = num;

                    const novoSudoku = new Sudoku(auxTabuleiro);
                    abertos.push({
                        sudoku: novoSudoku,
                        custo: estadoAtual.custo + 1
                    });
                }
            }
        }

        return null;
    }
}