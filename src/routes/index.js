import { Router } from "express";

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

export default router;
