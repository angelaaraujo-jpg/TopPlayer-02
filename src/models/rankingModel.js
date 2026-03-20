import { pool } from "../config/db.js";

export async function rankingPorJogo(jogo_id, limite = 10) {
    const [rows] = await pool.query(
        `SELECT jogo_id, jogo_nome, player_id, nickname, plataforma, total_pontos, total_partidas
        FROM vw_ranking_por_jogo
        WHERE jogo_id = ?
        ORDER BY toal_pontos DESC 
        LIMIT ?
        `,
        [jogo_id, Number(limite)]
    );
    return rows;
}

export async function rankingGeral(limite = 10) {
    const [rows] = await pool.query(
        `SELECT 
        pl.id AS player_id,
        pl.nickname,
        pl.plataforma,
        SUM(p.pontos) AS total_pontos,
        COUNT(*) AS total_partidas
        FROM partidas p
        JOIN players pl ON pl.id = p.player_id
        GROUP BY pl.id, pl.nickname, pl.plataforma
        ORDER BY total_pontos DESC 
        LIMIT ?`,
        [Number(limite)]    
    );
    return rows;
}
