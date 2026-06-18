import io from 'socket.io-client';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { MessageEvent, JoinEvent, LeaveEvent, NickChangeEvent } from './src/events.js'
import { sendToDiscord } from './src/sendtodiscord.js';

const socket = io("https://v2.windows93.net:8088");

const configData = await fs.readFile("config.json", "utf8"),
    config = JSON.parse(configData);

socket.on('_connected', (data) => {
    socket.emit('user joined', 'tbArchiver3 (i!)', "#00ff00", "", "", "")
})



function getChatLogFileName() {
    return `chat-log-${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1}-${new Date().getUTCDate()}.json`;
}
async function writeToDisk(event) {
    const data = event.export();
    const fileName = getChatLogFileName();
    const filePath = path.join(__dirname, 'output', fileName);
    await fs.mkdir("output", {recursive: true});
    await fs.writeFile(filePath, data);
    switch(event.constructor.name) {
        case "MessageEvent":
            console.log(`[tbArchiver3]: Wrote message event to disk as ${fileName}`)
        break;
        case "JoinEvent":
            console.log(`[tbArchiver3]: Wrote join event to disk as ${fileName}`)
        break;
        case "LeaveEvent":
            console.log(`[tbArchiver3]: Wrote leave event to disk as ${fileName}`)
        break;
        case "NickChangeEvent":
            console.log(`[tbArchiver3]: Wrote nick change event to disk as ${fileName}`);
        break;
        default:
            console.log(`[tbArchiver3]: Wrote unknown event (likely broken!) to disk as ${fileName}`)
        break;
    }

}
socket.on('message', async (data) => {
    const event = new MessageEvent(data);

    switch (data.msg) {
        case "i!help":
            socket.send(`tbArchiver is back with a vengeance :)\nI will never die, you sons of bitches!\nCreated by MaidJaxFan on June 17th, 2026 at around 21:00 to 22:00.\nJoin the server! https://dsc.gg/chatarchive2\n More shitty (or silly) projects at https://github.com/MaidJaxFan`)
        break;
    }
    await writeToDisk(event);

    await sendToDiscord(event, config.webhook);
});
socket.on('user joined', async (data) => {
    const event = new JoinEvent(data);
    
    await writeToDisk(event);

    await sendToDiscord(event, config.webhook);
});
socket.on('user left', async (data) => {
    const event = new LeaveEvent(data);

    await writeToDisk(event);

    await sendToDiscord(event, config.webhook);
})
socket.on('user change nick', async (data) => {
    const event = new NickChangeEvent(data);

    await writeToDisk(event);
    
    await sendToDiscord(event, config.webhook);
})