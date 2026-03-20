import { Router } from "express";
import * as usuarioController from "../controllers/usuarioController.js";

const router = Router();

router.get("/", usuarioController.listar);
router.get("/:id", usuarioController.buscarPorId);
router.post("/login", usuarioController.login); //add
router.post("/", usuarioController.criar); //add
router.put("/:id", usuarioController.atualizarusuarios);
router.delete("/:id", usuarioController.deletarusuarios);

export default router;


