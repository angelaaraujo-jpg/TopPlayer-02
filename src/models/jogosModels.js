import { conexao } from "../config/db.js";

export async function listarJogos() {
    const [resultado] = await conexao.query(
        "SELECT id, nome, genero FROM jogos"
    );
    return resultado;

}
export async function BuscarJogosPorId(id) {
    const[resultado] = await conexao.query(
        "SELECT id, nome, genero FROM jogos WHERE id = ?", [id]
    );
    return resultado[0];
}

export async function criarJogos({nome, genero}) {
    const [resultado] = await conexao.query(
        "INSERT INTO jogos (nome, genero) VALUES (?, ?)", [nome, genero]
    );
    return resultado.insertId;
    
}

export async function atualizarJogos(id, {nome, genero}) {
    const [resultado] = await conexao.query(
        "UPDATE jogos SET nome = ?, genero = ? WHERE id = ?", [nome, genero, id]
    );

    return resultado.affectedRows > 0;
    
}

export async function deletarJogos(id) {
    const [resultado] = await conexao.query(
        "DELETE FROM jogos WHERE id = ?", [id]
    );
    return resultado.affectedRows > 0;
    
}