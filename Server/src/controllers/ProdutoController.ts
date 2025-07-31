import { Request, Response } from "express";
import ProdutoService from "../services/ProdutoService";
import Produto from "../model/Produto";


class ProdutoController {
    static async getAllProdutos(req : Request, res : Response) {
        const response = await ProdutoService.getAllProdutos();

        return res.status(response.status).json(response.body);
    }

    static async createProduto(req : Request, res : Response) {
        const produto : Produto = req.body;
        const response = await ProdutoService.createProduto(produto);
        
        return res.status(response.status).json(response.body);
    }

    static async updateProduto(req : Request, res : Response) {
        const produto : Produto = req.body;
        const response = await ProdutoService.updateProduto(produto);
        
        return res.status(response.status).json(response.body);
    }

    static async deleteProduto(req : Request, res : Response) {
        const nome = req.params.codigo;
        const response = await ProdutoService.deleteProduto(nome);
        
        return res.status(response.status).json(response.body);
    }
}

export default ProdutoController