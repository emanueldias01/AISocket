import WebSocket from "ws";

export const initWsServer = async () => {
    const wss = new WebSocket.Server({
        port : process.env.PORT_WS
    });

    wss.on("connection", (ws, req) => {
        console.log("conectou");
        ws.on("message", (m) => {
            console.log(m);
            ws.send("recebido");
        });
    })
} 