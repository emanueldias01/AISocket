import { Router } from "express"
import ProdutoController from "../controllers/ProdutoController";

export const router = Router();
router.get("/produtos", ProdutoController.getAllProdutos);
router.post("/produtos", ProdutoController.createProduto);
router.put("/produtos", ProdutoController.updateProduto);
router.delete("/produtos/:nome", ProdutoController.deleteProduto);
