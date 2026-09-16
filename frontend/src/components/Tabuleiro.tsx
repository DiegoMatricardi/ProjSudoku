type Props = {
    board: number[][];
    setBoard: React.Dispatch<React.SetStateAction<number[][]>>;
};

export function Tabuleiro({ board, setBoard }: Props) {

    function alterarCelula(
        linha: number,
        coluna: number,
        valor: string
    ) {
        const novoBoard = board.map(linha => [...linha]);

        if (valor === "") {
            novoBoard[linha]![coluna] = 0;
        } else {
            const numero = Number(valor);

            if (numero >= 1 && numero <= 9) {
                novoBoard[linha]![coluna] = numero;
            }
        }

        setBoard(novoBoard);
    }

    return (
        <div className="tabuleiro">
            {board.map((linha, i) =>
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
    );
}