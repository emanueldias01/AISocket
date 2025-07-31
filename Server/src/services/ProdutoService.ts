import Produto from "../model/Produto";
import ProdutoRepository from "../repository/ProdutoRepository";
import { badRequest, created, HttpResponse, notContent, ok } from "../utils/HttpResponses";
import wss, { getDataToSend } from "../ws/WsServer";


class ProdutoService{

    static async getAllProdutos() : Promise<HttpResponse> {
        const data = await ProdutoRepository.getAllProdutos();
        if(!data) return notContent();

        return ok(data);
    }

    static async createProduto(produto : Produto) : Promise<HttpResponse> {
        const data = await ProdutoRepository.saveProduto(produto);
        if(!data) return badRequest({ message : "não foi possível cadastrar o produto" });

        //send message to websocket update list in package AI
        const dataSend = await getDataToSend();
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(dataSend));
            }
        });

        return created(data);
    }

    static async updateProduto(produto : Produto) : Promise<HttpResponse> {
        const data = await ProdutoRepository.updateProduto(produto);
        if(!data) return badRequest({ message : "não foi possível atualizar o produto" });

        //send message to websocket update list in package AI
        const dataSend = await getDataToSend();
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                if (data.estoque.quantidade === 0) {
                    client.send(`PRODUTO FORA DE ESTOQUE: ${data.nome} | HORÁRIO EM QUE ACABOU: ${data.horarioAlteracao}`);
                }
                client.send(JSON.stringify(dataSend));
            }
        });
        wss.on("open", (ws) => {
            console.log("opaaaaa");
            ws.send(JSON.stringify(dataSend));
        });

        return ok(data);
    }

    static async deleteProduto(codigo : string) : Promise<HttpResponse> {
        const data = await ProdutoRepository.deleteProduto(codigo);
        if(!data) return badRequest({ message : "não foi possível deletar o produto" });

        //send message to websocket update list in package AI
        const dataSend = await getDataToSend();
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(dataSend));
            }
        });

        return notContent();
    }

}

export default ProdutoService;