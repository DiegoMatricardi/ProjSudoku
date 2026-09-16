import { useState } from "react";
import { Tabuleiro } from "./components/Tabuleiro";
import "./App.css";

const criarBoardVazio = () =>
    Array.from({ length: 9 }, () => Array(9).fill(0));

function App() {

    const [board, setBoard] =
      useState<number[][]>(criarBoardVazio());

    const [algoritmo, setAlgoritmo] =
      useState("dfs");

    function limpar() {
      setBoard(criarBoardVazio());
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

      const novoBoard = completo.map(linha =>
          linha.map(valor => {
          if (Math.random() < 0.55) {
              return 0;
          }

          return valor;
          })
      );

      setBoard(novoBoard);
    }

    return (
        <main className="container">

            <h1>Solucionador de Sudoku</h1>

            <Tabuleiro
                board={board}
                setBoard={setBoard}
            />

            <div className="controles">

                <label>
                    Algoritmo:
                </label>

                <select
                    value={algoritmo}
                    onChange={(e) =>
                        setAlgoritmo(e.target.value)
                    }
                >
                    <option value="dfs">DFS</option>
                    <option value="bfs">BFS</option>
                    <option value="best">Best-First</option>
                    <option value="hill">Hill Climbing</option>
                    <option value="branch">
                        Branch and Bound
                    </option>
                    <option value="astar">A*</option>
                </select>

                <button>
                    Resolver
                </button>

                <button>
                    Passo a passo
                </button>

                <button onClick={gerarAleatorio}>
                    Gerar Sudoku
                </button>

                <button onClick={limpar}>
                    Limpar
                </button>

            </div>

        </main>
    );
}

export default App;