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


var countdown = 300;
var initialCountdown = countdown;
var processMessages = true;

function getChatLogFileName() {
    return `chat-log-${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1}-${new Date().getUTCDate()}.json`;
}
process.on('SIGINT', () => {
    console.log(`[tbArchiver3]: For data integrity, CTRL+C is disabled. Please go to Trollbox and run the "scheduleshutdown" command to stop gracefully.`)
})
async function writeToDisk(event) {
    const data = event.export();
    const fileName = getChatLogFileName();
    const filePath = path.join(__dirname, 'output', fileName);
    await fs.mkdir("output", { recursive: true });
    await fs.appendFile(filePath, data);
    switch (event.constructor.name) {
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
    if(processMessages == false) return;
    const event = new MessageEvent(data);

    switch (data.msg) {
        case "i!help":
            socket.send(`THIS THING ARCHIVES MESSAGES\n
                \ntbArchiver is back with a vengeance :)\nI will never die, you sons of bitches!\nCreated by MaidJaxFan on June 17th, 2026 at around 21:00 to 22:00.\nJoin the server! https://dsc.gg/chatarchive2\n More shitty (or silly) projects at https://github.com/MaidJaxFan`)
            break;
    }
    if (data.msg.includes("i!scheduleshutdown")) {
        if (data.home == config.home) {
            var shutdownTime = data.msg.split(" ")[1]
            socket.send(`tbArchiver will shut down in ${shutdownTime} seconds`)
            processMessages = false;
            setTimeout(() => {
                process.exit(10);
            }, 1000 * shutdownTime);
        }
    }
    await writeToDisk(event);

    await sendToDiscord(event, config.webhook);
});
socket.on('user joined', async (data) => {
    if(processMessages == false) return;
    const event = new JoinEvent(data);

    await writeToDisk(event);

    await sendToDiscord(event, config.webhook);
});
socket.on('user left', async (data) => {
    if(processMessages == false) return;
    const event = new LeaveEvent(data);

    await writeToDisk(event);

    await sendToDiscord(event, config.webhook);
})
socket.on('user change nick', async (data) => {
    if(processMessages == false) return;
    const event = new NickChangeEvent(data);

    await writeToDisk(event);

    await sendToDiscord(event, config.webhook);
});

/*setInterval(() => {
    console.log(`[tbArchiver3]: ${countdown} seconds until the next anti-kick event happens`)
    if (countdown <= 0) {
        var arrayOfColors = ["#a700ff", "green", "blue"]
        var randomPicking = Math.floor(Math.random() * arrayOfColors.length) + 1;
        socket.send(`Anti-kick ${Math.random()}`)
        countdown = initialCountdown;
    }
    countdown -= 1;
}, 1000)*/