import { DFS } from "./algorithms/DFS.js";
import { BFS } from "./algorithms/BFS.js";
import { Sudoku } from "./models/sudoku.js";
import { BestFirst } from "./algorithms/Best-First.js";
import { HillClimbing } from "./algorithms/Hill-Climbing.js";
import { BranchAndBound } from "./algorithms/BranchAndBound.js";
import { AEstrela } from "./algorithms/A-estrela.js";

const board = [
    [1, 0, 0, 0, 3, 4, 0, 0, 8],
    [0, 7, 0, 6, 8, 0, 0, 3, 0],
    [0, 0, 8, 2, 1, 0, 7, 0, 4],

    [0, 5, 4, 0, 9, 0, 6, 8, 0],
    [9, 1, 0, 5, 0, 8, 0, 2, 0],
    [0, 8, 0, 3, 0, 0, 0, 0, 5],

    [3, 0, 5, 9, 0, 6, 8, 7, 1],
    [0, 0, 6, 0, 0, 0, 0, 4, 0],
    [0, 0, 1, 0, 7, 0, 2, 0, 0]
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

const sudokuBestFirst = new Sudoku(board.map(linha => [...linha]));
const bestFirst = new BestFirst();
const solucaoBestFirst = bestFirst.soluçãoBestFirst(sudokuBestFirst);
console.log("----- Best-First -----");
if (solucaoBestFirst !== null) {

    console.log("Encontrou solução: true");
    console.log("Estados analisados:", bestFirst.quantAnalisados);
    console.table(solucaoBestFirst.getTabuleiro());

} else {
    console.log("Encontrou solução: false");
}

const sudokuHillClimbing = new Sudoku(board.map(linha => [...linha]));
const hillClimbing = new HillClimbing();
const solucaoHillClimbing = hillClimbing.solucaoHillClimbing(sudokuHillClimbing);
console.log("----- Hill-Climbing -----");
if (solucaoHillClimbing !== null) {

    console.log("Encontrou solução: true");
    console.log("Estados analisados:", hillClimbing.quantAnalisados);
    console.table(solucaoHillClimbing.getTabuleiro());

} else {
    console.log("Encontrou solução: false");
}

const sudokuAEstrela = new Sudoku(board.map(linha => [...linha]));
const aEstrela = new AEstrela();
const solucaoAEstrela = aEstrela.solucaoAEstrela(sudokuAEstrela);

console.log("----- A* -----");
if (solucaoAEstrela !== null) {

    console.log("Encontrou solução: true");
    console.log("Estados analisados:", aEstrela.quantAnalisados);
    console.table(solucaoAEstrela.getTabuleiro());

} else {
    console.log("Encontrou solução: false");
}

const sudokuBranchBound = new Sudoku(board.map(linha => [...linha]));
const branchBound = new BranchAndBound();
const solucaoBranchBound = branchBound.solucaoBranchAndBound(sudokuBranchBound);

console.log("----- Branch-and-Bound -----");
if (solucaoBranchBound !== null) {

    console.log("Encontrou solução: true");
    console.log("Estados analisados:", branchBound.quantAnalisados);
    console.table(solucaoBranchBound.getTabuleiro());

} else {
    console.log("Encontrou solução: false");
}