import { Sudoku } from "../models/sudoku.js";
import { SudokuUtils } from "../utils/SudokuUtils.js";
import { Heuristica } from "../heuristica/heuristica.js";

export class HillClimbing {
    quantAnalisados = 0;
    passos: number[][][] = [];
    solucaoHillClimbing(sudoku: Sudoku): Sudoku | null {
        let atual = sudoku;

        while(true) {
            this.quantAnalisados++;
            
            const tabuleiroAtual = atual.getTabuleiro();

            this.passos.push(
                tabuleiroAtual.map(linha => [...linha])
            );
            //Encontra a celula MRV
            const mrv = Heuristica.encontrarMRV(atual);

            //Caso o sudoku completo
            if(mrv.linha === -1) {
                return atual;
            }

            //Estado impossivel
            if(mrv.quantidade === 0){
                return null;
            }

            const vizinhos: Sudoku[] = [];
            for(let num= 1; num <= 9; num++){
                if(SudokuUtils.movValido(atual, mrv.linha, mrv.coluna, num)){
                    const tabuleiro = atual.getTabuleiro();
                    const auxTabuleiro = tabuleiro.map(linha => [...linha]);
                    auxTabuleiro[mrv.linha]![mrv.coluna] = num;
                    const novoSudoku = new Sudoku(auxTabuleiro);
                    vizinhos.push(novoSudoku);
                }
            }

            let melhorIndice = 0;

            for (let i = 1; i < vizinhos.length; i++) {

                if (
                    Heuristica.calcular(vizinhos[i]!) <
                    Heuristica.calcular(vizinhos[melhorIndice]!)
                ) {
                    melhorIndice = i;
                }
            }

            atual = vizinhos[melhorIndice]!;
        }
    }
}