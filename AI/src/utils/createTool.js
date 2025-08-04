import { tool } from '@openai/agents-core';
import { z } from 'zod';
import axios from 'axios';


export const getInfo = async () => {
    try{
        const host = process.env.HOST;
        const request = await axios.get(`${host}/api/v1/produtos`);
        return request.data;
    }catch(erro){
        return "Erro ao buscar informação de produtos";
    }
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