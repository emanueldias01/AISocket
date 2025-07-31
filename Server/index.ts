import express, { json } from 'express';
import { router } from './src/routes/routes';
import { intiWebSocketServer } from './src/ws/WsServer';

const app = express();
app.use(json());
app.use("/api/v1", router);

intiWebSocketServer();
app.listen(process.env.PORT_HTTP);