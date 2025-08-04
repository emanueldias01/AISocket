import WebSocket from "ws";
import { fileURLToPath } from "url";
import { sock } from "../../index.js";

export const initWsClient = async () => {

    const __filename = fileURLToPath(import.meta.url);

    const socket = new WebSocket(process.env.URL_WS);

    socket.on("open", () => {
        console.log("conectou")
    });

    socket.on("message", async (data) => {
        await sock.sendMessage(process.env.NUMBER_ID, { text : data.toString() });
    });

    socket.on("close", () => {
        console.log("Conexão com o servidor encerrada");
    });

    socket.on("error", (err) => {
        console.error("Erro na conexão WebSocket:", err);
    });
}
