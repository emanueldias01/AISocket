import WebSocket, { WebSocketServer } from 'ws';
import ProdutoRepository from "../repository/ProdutoRepository";
import Produto from '../model/Produto';

const PORT : number = Number(process.env.PORT_WS) || 3333;


export const getDataToSend = async () => {

    const data = await ProdutoRepository.getAllProdutos();
    return data
}

const wss = new WebSocketServer({
    port : PORT
});

export const intiWebSocketServer = async () => {
        wss.on("connection", async (ws) => {
        console.log("Cliente conectado");
        const sendData = await getDataToSend();
        ws.send(JSON.stringify(sendData));
    })
}


export default wss;