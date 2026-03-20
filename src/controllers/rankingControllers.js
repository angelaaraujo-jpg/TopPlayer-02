import { rankingGeral, rankingPorJogo } from '../models/rankingModel.js';

export async function RankingGeral (req, res) {
  try {
    const { limite } = req.query;

    const dados = await RankingGeral(limite);

    res.json(dados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro no ranking geral' });
  }
};

export async function RankingPorJogo (req, res) {
  try {
    const { jogo_id } = req.params;
    const { limite } = req.query;

    const dados = await RankingPorJogo(jogo_id, limite);

    res.json(dados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro no ranking por jogo' });
  }
};