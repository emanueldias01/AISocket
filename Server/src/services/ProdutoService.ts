import Produto from "../model/Produto";
import ProdutoRepository from "../repository/ProdutoRepository";
import { badRequest, created, HttpResponse, notContent, ok } from "../utils/HttpResponses";
import wss from "../ws/WsServer";


class ProdutoService{

    static async getAllProdutos() : Promise<HttpResponse> {
        const data = await ProdutoRepository.getAllProdutos();
        if(!data) return notContent();

        return ok(data);
    }

    static async createProduto(produto : Produto) : Promise<HttpResponse> {
        const data = await ProdutoRepository.saveProduto(produto);
        if(!data) return badRequest({ message : "não foi possível cadastrar o produto" });
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                    client.send(`PRODUTO CRIADO: ${data.nome} | HORÁRIO EM QUE FOI CRIADO: ${data.horarioAlteracao}`);
            }
        });

        return created(data);
    }

    static async updateProduto(produto : Produto) : Promise<HttpResponse> {
        const dataSearch = await ProdutoRepository.getProductByCode(produto.codigo);
        const data = await ProdutoRepository.updateProduto(produto);
        if(!data) return badRequest({ message : "não foi possível atualizar o produto" });

        //send message to websocket update list in package AI
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                if (data.estoque.quantidade === 0 && dataSearch?.estoque.quantidade != 0) {
                    client.send(`PRODUTO FORA DE ESTOQUE: ${data.nome} | HORÁRIO EM QUE ACABOU: ${data.horarioAlteracao}`);
                }
                if(!data.estoque.ativo && dataSearch?.estoque.ativo){
                    client.send(`PRODUTO FICOU INATIVO: ${data.nome} | HORÁRIO DE ALTERAÇÃO: ${data.horarioAlteracao}`);
                }
            }
        });

        return ok(data);
    }

    static async deleteProduto(codigo : string) : Promise<HttpResponse> {
        const data = await ProdutoRepository.deleteProduto(codigo);
        if(!data) return badRequest({ message : "não foi possível deletar o produto" });

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                    client.send(`PRODUTO DELETADO: ${data.nome} | HORÁRIO EM QUE FOI DELETADO: ${data.horarioAlteracao}`);
            }
        });

        return notContent();
    }

}

export default ProdutoService;