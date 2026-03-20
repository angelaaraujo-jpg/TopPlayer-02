import express from 'express';
import { getRankingGeral, getRankingPorJogo } from '../controllers/rankingControllers.js';

const router = express.Router();


router.get('/geral', getRankingGeral);
router.get('/jogo/:jogo_id', getRankingPorJogo);

export default router;