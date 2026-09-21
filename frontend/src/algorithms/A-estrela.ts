import { Sudoku } from "../models/sudoku.js"
import { SudokuUtils } from "../utils/SudokuUtils.js"
import { Heuristica } from "../heuristica/heuristica.js"

type Estado = {
    sudoku: Sudoku;
    custo: number;
}

export class AEstrela {
    quantAnalisados = 0;
    passos: number[][][] = [];
    solucaoAEstrela(sudoku: Sudoku): Sudoku | null {
        const abertos: Estado[] = [];

        abertos.push({
            sudoku: sudoku,
            custo: 0,
        });

        while (abertos.length > 0) {
            let menorIndice = 0;
            for(let i = 1; i < abertos.length; i++){
                const fAtual = abertos[i]!.custo + Heuristica.calcular(abertos[i]!.sudoku);
                const fMelhor = abertos[menorIndice]!.custo + Heuristica.calcular(abertos[menorIndice]!.sudoku);
                if(fAtual < fMelhor) {
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
            // Se não existem células vazias, encontrou a solução
            if (mrv.linha === -1) {
                return atual;
            }

            //Se não existe possibilidades, PODA
            if(mrv.quantidade === 0){
                continue;
            }

            for(let num = 1; num <= 9; num++){
                if(SudokuUtils.movValido(atual,mrv.linha, mrv.coluna, num)){
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