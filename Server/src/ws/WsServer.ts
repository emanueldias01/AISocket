import { WebSocketServer } from 'ws';
import ProdutoRepository from "../repository/ProdutoRepository";

const PORT : number = Number(process.env.PORT_WS) || 3333;



const wss = new WebSocketServer({
    port : PORT
});

export const intiWebSocketServer = async () => {
        wss.on("connection", async (ws) => {
        console.log("Cliente conectado");
    })
}


export default wss;