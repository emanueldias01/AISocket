
import { Agent } from '@openai/agents';
import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, DisconnectReason } from '@whiskeysockets/baileys';
import Pino from 'pino';
import qrcode from 'qrcode';
import { createToolGetInfo } from './src/utils/createTool.js';
import { askAgent } from './src/agent/askAgent.js';
import { initWsClient } from './src/ws/wsClient.js';

async function main() {

    await initWsClient();

    const toolGetInfo = await createToolGetInfo();

    const agent = new Agent({
        name : "Alex",
        model : "gpt-4o-mini",
        instructions: `
            Você é um agente de Inteligência Artificial da empresa OrbiSeg, especializado em monitorar e responder sobre o estoque da loja.
            Sempre que for perguntado sobre um produto específico, disponibilidade, quantidade ou categoria no estoque, utilize a ferramenta 'busca_estoque' para obter os dados reais antes de responder. Nunca assuma ou invente dados de estoque.
            `,
        tools : [toolGetInfo]
    });

    await connectToWhatsApp(agent);
}

async function connectToWhatsApp(agent) {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info')
    const { version } = await fetchLatestBaileysVersion()
    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false,
        logger: Pino({ level: 'silent' }),
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update

        if (qr) {
            const qrImage = await qrcode.toString(qr, { type: 'small' })
            console.log(qrImage)
        }

        if (connection === 'open') {
            console.log('✅ Conectado ao WhatsApp!')
        } else if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('🔌 Conexão encerrada. Reconectar?', shouldReconnect)
            if (shouldReconnect) connectToWhatsApp()
        }
    })

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type === 'notify') {
            const msg = messages[0]
            if (msg.key.fromMe) {
                 if(msg.message?.conversation || msg.message?.extendedTextMessage?.text){
                    const sender = msg.pushName || msg.key.remoteJid
                    const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text
                    const senderId = msg.key.remoteJid
                    console.log(`📩 ${sender}: ${text}`)

                    const responseAI = await askAgent(agent, text);
                    await sock.sendMessage(senderId, { text : responseAI });
                 }
               
            }
        }
    })
}

main();