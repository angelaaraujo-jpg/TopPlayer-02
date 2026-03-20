import express from "express";
import { criarPartida } from "../controllers/partidasControllers.js";

const router = express.Router();

router.post("/", criarPartida);

export default router;