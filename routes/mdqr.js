const { default: AlexaConnect, useSingleFileAuthState, fetchLatestBaileysVersion, delay } = require("@adiwajshing/baileys");
const { exec, spawn, execSync } = require("child_process");
const express = require('express');
const pino = require('pino');
exec('rm -rf session.json');
const fs = require('fs');
const path = require('path');
const qrcode = require("qr-image");
const __path = path.join(__dirname, '.');
const { state, saveState } = useSingleFileAuthState(`./session.json`);
var router = express.Router()

router.get('/', async (req, res, next) => {

function startAlexa() {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    const alexa = AlexaConnect({
        printQRInTerminal: false,
        auth: state,
        logger: pino({ level: "silent" }),
        version: version,
        browser: ["Alexa MD", "Safari", "3.0"]
    });

    alexa.ev.on("connection.update", async (s) => {
    if (s.qr) {qrcode.image(qr, { type: 'png', size: 20 }).pipe(fs.createWriteStream(__path+'/img.png'));}
    const { connection, lastDisconnect } = s
    if (connection == "open") {
      await delay(1000 * 10)
      const session = fs.readFileSync('./session.json')
      await alexa.sendMessage(alexa.user.id, { document: session, mimetype: 'application/json', fileName: `session.json`})
      process.exit(0)
     }
     if (
      connection === "close" &&
      lastDisconnect &&
      lastDisconnect.error &&
      lastDisconnect.error.output.statusCode != 401
     ) {
      startAlexa()
     }
  })
    alexa.ev.on('creds.update', saveState)
    alexa.ev.on('messages.upsert', () => { })
}
startAlexa()
res.sendFile(__path+'/img.png')
});

module.exports = router;
