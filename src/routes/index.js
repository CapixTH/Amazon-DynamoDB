import { Router } from "express";
import alunoRoutes from "./alunoRoutes.js";
import cursoRoutes from "./cursoRoutes.js";
import matriculaRoutes from "./matriculaRoutes.js";
import consultaRoutes from "./consultaRoutes.js";

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check da API
 *     tags: [Health Check]
 *     responses:
 *       200:
 *         description: Resposta com sucesso
 */
router.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "Amazon-DynamoDB API",
    timestamp: new Date().toISOString(),
  });
});

router.use("/api", alunoRoutes);
router.use("/api", cursoRoutes);
router.use("/api", matriculaRoutes);
router.use("/api", consultaRoutes);

export default router;
