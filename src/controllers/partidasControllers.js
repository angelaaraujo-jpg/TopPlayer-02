import { pool } from "../config/db.js";

export async function criarPartida (req, res) {
  try {
    const {jogo_id, player_id, pontos} = req.body;

    if (!jogo_id || !player_id || pontos == null) {
      return res.status(400).json({ erro: "Dados incompletos" });
    }

    const [result] = await pool.query(
      `INSERT INTO partidas (jogo_id, player_id, pontos, data_partida)
       VALUES (?, ?, ?, NOW())`,
      [jogo_id, player_id, pontos]
    );

    res.status(201).json({
      mensagem: "Pontuação adicionada!",
      id: result.insertId
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao registrar partida" });
  }
};