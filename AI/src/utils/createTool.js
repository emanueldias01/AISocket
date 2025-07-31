import { tool } from '@openai/agents-core';
import fs from 'fs';
import { z } from 'zod';


export const getInfo = async () => {
    const data = fs.readFileSync("./AI/src/db/estoque.json", "utf-8");
    const realData = JSON.parse(data);

    return realData;
}

export const createToolGetInfo = async () => {
    return tool({
        name: 'busca_estoque',
        description: 'Busca informações sobre produtos específicos no estoque, como quantidade, nome e categoria. Use esta ferramenta para responder perguntas relacionadas a produtos disponíveis.',
        parameters: z.object({}),
        execute: async () => {
            return await getInfo();
        },
 });
}