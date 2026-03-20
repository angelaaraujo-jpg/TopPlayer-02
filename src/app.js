import express from "express";
import usuarioRouter from "./routes/usuarioRoutes.js";
import jogosRouter from "./routes/jogosRoutes.js";
import playersRoutes from "./routes/playersRoutes.js";
import rankingRoutes from './routes/rankingRoutes.js';
import partidaRoutes from "./routes/partidaRoutes.js";
import cors from "cors";


const app = express();
app.use(cors());


app.use(express.json());
app.use("/usuarios", usuarioRouter);
app.use("/jogos", jogosRouter);
app.use("/players", playersRoutes);
app.use('/rankings', rankingRoutes);
app.use("/partidas", partidaRoutes);

// app.use("/partidas", partidasRouter);



export default app;