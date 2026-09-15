import { DFS } from "./algorithms/DFS.js";
import { BFS } from "./algorithms/BFS.js";
import { Sudoku } from "./models/sudoku.js";

const board = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const sudokuDFS = new Sudoku(board.map(linha => [...linha]));
const dfs = new DFS();
const solucaoDFS = dfs.solucaoDFS(sudokuDFS);
console.log("----- DFS -----");
console.log("Encontrou solução:", solucaoDFS);
console.log("Estados analisados:", dfs.quantAnalisados);
console.table(sudokuDFS.getTabuleiro());



const sudokuBFS = new Sudoku(board.map(linha => [...linha]));
const bfs = new BFS();
const solucaoBFS = bfs.solucaoBFS(sudokuBFS);
console.log("----- BFS -----");
if (solucaoBFS !== null) {

    console.log("Encontrou solução: true");
    console.log("Estados analisados:", bfs.quantAnalisados);
    console.table(solucaoBFS.getTabuleiro());

} else {
    console.log("Encontrou solução: false");
}