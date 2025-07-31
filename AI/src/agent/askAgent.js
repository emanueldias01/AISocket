import { run } from '@openai/agents';

export const askAgent = async (agent, prompt) => {
    const response = await run(agent, prompt);
    return response.finalOutput;
}