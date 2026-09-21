import { useState } from "react";
import { Sudoku } from "../models/sudoku";
import { SudokuUtils } from "../utils/SudokuUtils";

type Props = {
    Tabuleiro: number[][];
    setTabuleiro: React.Dispatch<React.SetStateAction<number[][]>>;
};

export function Tabuleiro({ Tabuleiro, setTabuleiro }: Props) {

    const [erro, setErro] = useState("");

    function alterarCelula(
        linha: number,
        coluna: number,
        valor: string
    ) {
        const novoTabuleiro = Tabuleiro.map(l => [...l]);

        // Se apagar o numero, insere o 0 novamente
        if (valor === "") {
            novoTabuleiro[linha]![coluna] = 0;
            setTabuleiro(novoTabuleiro);
            setErro("");
            return;
        }

        const numero = Number(valor);

        // Aceita somente números de 1 a 9
        if (numero < 1 || numero > 9) {
            setErro("Digite apenas números de 1 a 9.");
            return;
        }

        // Deixa a própria célula vazia antes de verificar
        novoTabuleiro[linha]![coluna] = 0;

        const sudoku = new Sudoku(novoTabuleiro);

        // Verifica linha, coluna e bloco
        if (!SudokuUtils.movValido(
            sudoku,
            linha,
            coluna,
            numero
        )) {
            setErro(
                `O número ${numero} não pode ser inserido nessa posição.`
            );
            return;
        }

        // Se for válido, coloca o número
        novoTabuleiro[linha]![coluna] = numero;

        setTabuleiro(novoTabuleiro);
        setErro("");
    }

    return (
        <>
            <div className="tabuleiro">
                {Tabuleiro.map((linha, i) =>
                    linha.map((valor, j) => (
                        <input
                            key={`${i}-${j}`}
                            type="number"
                            min="1"
                            max="9"
                            value={valor === 0 ? "" : valor}
                            onChange={(e) =>
                                alterarCelula(i, j, e.target.value)
                            }
                        />
                    ))
                )}
            </div>

            {erro && (
                <p className="mensagem-erro">
                    {erro}
                </p>
            )}
        </>
    );
}