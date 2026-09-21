import { useState } from "react";

import { Tabuleiro } from "./components/Tabuleiro";
import { Sudoku } from "./models/sudoku";
import { DFS } from "./algorithms/DFS";
import { BFS } from "./algorithms/BFS";
import { BestFirst } from "./algorithms/Best-First";
import { HillClimbing } from "./algorithms/Hill-Climbing";
import { BranchAndBound } from "./algorithms/BranchAndBound";
import { AEstrela } from "./algorithms/A-estrela";

import "./App.css";

const criarTabuleiroVazio = () =>
    Array.from({ length: 9 }, () => Array(9).fill(0));

function App() {

    const [tabuleiro, setTabuleiro] =
        useState<number[][]>(criarTabuleiroVazio());

    const [algoritmo, setAlgoritmo] =
        useState("dfs");

    const [passos, setPassos] =
        useState<number[][][]>([]);

    const [passoAtual, setPassoAtual] =
        useState(0);

    function limpar() {
        setTabuleiro(criarTabuleiroVazio());
        setPassos([]);
        setPassoAtual(0);
    }

    function executarAlgoritmo(
        tabuleiroInicial: number[][]
    ) {

        const copia =
            tabuleiroInicial.map(linha => [...linha]);

        const sudoku =
            new Sudoku(copia);

        let resultado: Sudoku | null = null;

        let novosPassos: number[][][] = [];

        switch (algoritmo) {

            case "dfs": {

                const dfs = new DFS();

                const encontrou =
                    dfs.solucaoDFS(sudoku);

                if (encontrou) {
                    resultado = sudoku;
                }

                novosPassos = dfs.passos;

                console.log(
                    "Estados analisados:",
                    dfs.quantAnalisados
                );

                break;
            }

            case "bfs": {

                const bfs = new BFS();

                resultado =
                    bfs.solucaoBFS(sudoku);

                novosPassos =
                    bfs.passos;

                console.log(
                    "Estados analisados:",
                    bfs.quantAnalisados
                );

                break;
            }

            case "best": {

                const best =
                    new BestFirst();

                resultado =
                    best.soluçãoBestFirst(sudoku);

                novosPassos =
                    best.passos;

                console.log(
                    "Estados analisados:",
                    best.quantAnalisados
                );

                break;
            }

            case "hill": {

                const hill =
                    new HillClimbing();

                resultado =
                    hill.solucaoHillClimbing(sudoku);

                novosPassos =
                    hill.passos;

                console.log(
                    "Estados analisados:",
                    hill.quantAnalisados
                );

                break;
            }

            case "branch": {

                const branch =
                    new BranchAndBound();

                resultado =
                    branch.solucaoBranchAndBound(sudoku);

                novosPassos =
                    branch.passos;

                console.log(
                    "Estados analisados:",
                    branch.quantAnalisados
                );

                break;
            }

            case "astar": {

                const astar =
                    new AEstrela();

                resultado =
                    astar.solucaoAEstrela(sudoku);

                novosPassos =
                    astar.passos;

                console.log(
                    "Estados analisados:",
                    astar.quantAnalisados
                );

                break;
            }
        }

        return {
            resultado,
            novosPassos
        };
    }

    function resolver() {

        const {
            resultado,
            novosPassos
        } = executarAlgoritmo(tabuleiro);

        if (resultado === null) {

            alert(
                "Não foi possível encontrar uma solução."
            );

            return;
        }

        setPassos(novosPassos);

        setPassoAtual(
            novosPassos.length
        );

        const solucionado =
            resultado
                .getTabuleiro()
                .map(linha => [...linha]);

        setTabuleiro(solucionado);
    }

    function passoAPasso() {

        if (passos.length === 0) {

            const {
                resultado,
                novosPassos
            } = executarAlgoritmo(tabuleiro);

            if (
                resultado === null ||
                novosPassos.length === 0
            ) {

                alert(
                    "Não foi possível encontrar uma solução."
                );

                return;
            }

            setPassos(novosPassos);

            const primeiroIndice =
                novosPassos.length > 1 ? 1 : 0;

            setTabuleiro(
                novosPassos[primeiroIndice]!
                    .map(linha => [...linha])
            );

            setPassoAtual(
                primeiroIndice + 1
            );

            return;
        }

        if (passoAtual >= passos.length) {

            alert("Fim da resolução.");

            return;
        }

        const proximo =
            passos[passoAtual]!;

        setTabuleiro(
            proximo.map(linha => [...linha])
        );

        setPassoAtual(
            passoAtual + 1
        );
    }

    function gerarAleatorio() {

        const completo = [

            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]

        ];

        const novoTabuleiro =
            completo.map(linha =>
                linha.map(valor =>
                    Math.random() < 0.55
                        ? 0
                        : valor
                )
            );

        setTabuleiro(novoTabuleiro);
        setPassos([]);
        setPassoAtual(0);
    }

    function trocarAlgoritmo(
        novoAlgoritmo: string
    ) {

        setAlgoritmo(novoAlgoritmo);

        setPassos([]);

        setPassoAtual(0);
    }

    return (

        <main className="container">

            <h1>
                Solucionador de Sudoku
            </h1>

            <Tabuleiro
                Tabuleiro={tabuleiro}
                setTabuleiro={setTabuleiro}
            />

            <div className="controles">

                <label>
                    Algoritmo:
                </label>

                <select
                    value={algoritmo}
                    onChange={(e) =>
                        trocarAlgoritmo(
                            e.target.value
                        )
                    }
                >

                    <option value="dfs">
                        DFS
                    </option>

                    <option value="bfs">
                        BFS
                    </option>

                    <option value="best">
                        Best-First
                    </option>

                    <option value="hill">
                        Hill Climbing
                    </option>

                    <option value="branch">
                        Branch and Bound
                    </option>

                    <option value="astar">
                        A*
                    </option>

                </select>

                <button onClick={resolver}>
                    Resolver
                </button>

                <button onClick={passoAPasso}>
                    Passo a passo
                </button>

                <button onClick={gerarAleatorio}>
                    Gerar Sudoku
                </button>

                <button onClick={limpar}>
                    Limpar
                </button>

            </div>

            <p>
                Passo: {passoAtual} / {passos.length}
            </p>

        </main>
    );
}

export default App;