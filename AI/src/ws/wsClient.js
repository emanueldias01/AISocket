import WebSocket from "ws";
import fs from 'fs';
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { sock } from "../../index.js";

export const initWsClient = async () => {

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const socket = new WebSocket(process.env.URL_WS);

    socket.on("open", () => {
        console.log("conectou")
    });

    socket.on("message", async (data) => {
        console.log("recebi mensagem");
        try{
            const dataReceived = JSON.parse(data);
            const filePath = path.join(__dirname, "..", "db", "estoque.json");
            fs.mkdirSync(path.dirname(filePath), { recursive: true });
            fs.writeFileSync(filePath, JSON.stringify(dataReceived, null, 2), "utf8");
        }catch(erro){
            await sock.sendMessage(process.env.NUMBER_ID, { text : data.toString() });
        }
        
        
    });

    socket.on("close", () => {
        console.log("Conexão com o servidor encerrada");
    });

    socket.on("error", (err) => {
        console.error("Erro na conexão WebSocket:", err);
    });
}
