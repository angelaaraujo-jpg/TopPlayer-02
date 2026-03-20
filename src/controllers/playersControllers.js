import * as playersModel from "../models/playersModels.js";
export const listarPlayers = async (req, res) => {
    try {
        const players = await playersModel.listarPlayers();
        return res.status(200).json(players);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar a lista de jogadores." });
    }
};


export const BuscarPlayerPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const player = await playersModel.BuscarPlayerPorId(id);

        if (!player) {
            return res.status(404).json({ message: `Jogador com ID ${id} não encontrado.` });
        }

        return res.status(200).json(player);
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar o jogador." });
    }
};


export const criarPlayer = async (req, res) => {
    const { nickname, plataforma } = req.body;

    if (!nickname || !plataforma) {
        return res.status(400).json({ message: "Dados incompletos: nickname e plataforma são campos obrigatórios." });
    }

    try {
        const resultado = await playersModel.criarPlayer({ nickname, plataforma });
        return res.status(201).json({
            message: "Novo jogador registrado com sucesso!",
            data: { id: resultado, nickname, plataforma }
        });
    } catch (error) {
        console.error("Erro interno:", error);
        return res.status(500).json({ error: "Falha ao registrar jogador no banco de dados." });
    }
};

export const atualizarPlayer = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosNovos = req.body;

        const playerExistente = await playersModel.BuscarPlayerPorId(id);
        if (!playerExistente) {
            return res.status(404).json({ message: "Impossível atualizar: Jogador não encontrado." });
        }

        const sucesso = await playersModel.atualizarPlayer(id, dadosNovos);
        
        if (!sucesso) {
            throw new Error("Falha na execução da atualização.");
        }

        return res.status(200).json({ message: "Dados do jogador atualizados com sucesso." });
    } catch (error) {
        return res.status(500).json({ error: "Erro ao processar atualização." });
    }
};

export const deletarPlayer = async (req, res) => {
    try {
        const { id } = req.params;

        const playerExistente = await playersModel.BuscarPlayerPorId(id);
        if (!playerExistente) {
            return res.status(404).json({ message: "Erro: Jogador não localizado para exclusão." });
        }

        await playersModel.deletarPlayer(id);
        return res.status(200).json({ message: `Jogador ${id} removido do sistema.` });
    } catch (error) {
        return res.status(500).json({ error: "Não foi possível deletar o jogador." });
    }
};