import WebSocket from "ws";
import ProdutoRepository from "../repository/ProdutoRepository";
import ProdutoSend from "./ProdutoSendWs";

const PORT : number = Number(process.env.PORT_WS) || 3333;


export const getDataToSend = async () => {
    const data = await ProdutoRepository.getAllProdutos();
    const sendData: ProdutoSend[] = data.map(p => ({
        codigo : p.codigo,
        nome : p.nome,
        estoque : p.estoque,
        horarioAlteracao : new Date()
    }));

    return sendData
}

const wss = new WebSocket.Server({
    port : PORT
});

wss.on("connection", async (ws) => {
    console.log("Cliente conectado");
    const sendData = await getDataToSend();
    ws.send(JSON.stringify(sendData));
})

export default wss;