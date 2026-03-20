import * as jogosModel from "../models/jogosModels.js";


export async function listarJogos(req, res) {
    const jogos = await jogosModel.listarJogos();
    res.status(200).json(jogos);
    
}

export async function BuscarJogosPorId(req, res) {
    const { id } = req.params;
    const jogos = await jogosModel.BuscarJogosPorId(id);

    if (!jogos) {
        res.status(404).json({ msg: "Jogo não encontrado" });
    }
    res.status(200).json(jogos);
    
}

export async function criarJogos(req, res) {
    const { nome, genero } = req.body;

    if (!nome || !genero) {
        return res.status(400).json({ msg: "Nome e Gênero são obrigatórios" });
    }

    try {
        const novoId = await jogosModel.criarJogos({ nome, genero });
        return res.status(201).json({
            msg: "Jogo cadastrado com sucesso",
            id: novoId
        });
    } catch (erro) {
        console.error("Erro ao cadastrar jogo:", erro);
        return res.status(500).json({ msg: "Erro interno ao cadastrar o jogo" });
    }
}


export async function atualizarJogos(req, res) {
    const { id } = req.params;
    const {nome, genero } = req.body;

    if (!nome || !genero) {
        return res.status(400).json({ msg: "Nome e gênero são obrigatórios" });
    }

    const jogos = await jogosModel.BuscarJogosPorId(id);

    if (!jogos) {
        return res.status(404).json({ msg: "Jogo não encontrado" });
    }

    await jogosModel.atualizarJogos(id, { nome, genero });

    return res.status(200).json({ msg: "Jogo atualizado com sucesso" });
    
}

export async function deletarJogos(req, res) {

    const { id } = req.params;

    const jogos = await jogosModel.BuscarJogosPorId(id);

    if (!jogos) {
        return res.status(404).json({ msg: "Jogo não encontrado" });
    }

    await jogosModel.deletarJogos(id);

    return res.status(200).json({ msg: "Jogo deletado com sucesso" });

}