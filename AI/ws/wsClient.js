import WebSocket from "ws";


export const initWsClient = async () => {
    const socket = new WebSocket(process.env.URL_WS);

    socket.on("open", () => {
        console.log("conectou")

        socket.send("recebido");
    });

    socket.on("message", (data) => {
        console.log(data.toString());
    });

    socket.on("close", () => {
        console.log("Conexão com o servidor encerrada");
    });

    socket.on("error", (err) => {
        console.error("Erro na conexão WebSocket:", err);
    });
}
