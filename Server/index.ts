import express, { json } from 'express';
import { router } from './src/routes/routes';

const app = express();
app.use(json());
app.use("/api/v1", router);

app.listen(process.env.PORT_HTTP);