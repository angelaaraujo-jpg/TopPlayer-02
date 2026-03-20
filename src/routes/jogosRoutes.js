import { Router } from "express";
import * as jogosController from "../controllers/jogosControllers.js";

const router = Router();

router.get("/", jogosController.listarJogos);
router.get("/:id", jogosController.BuscarJogosPorId);
router.post("/", jogosController.criarJogos);
router.put("/:id", jogosController.atualizarJogos);
router.delete("/:id", jogosController.deletarJogos);



export default router;