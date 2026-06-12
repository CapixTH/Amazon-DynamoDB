import { Router } from "express";
import alunoRoutes from "./alunoRoutes.js";
import cursoRoutes from "./cursoRoutes.js";

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna mensagem inicial da API
 *     responses:
 *       200:
 *         description: Resposta com sucesso
 */
router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/api", alunoRoutes);
router.use("/api", cursoRoutes);

export default router;
