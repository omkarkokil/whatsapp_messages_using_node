const express = require("express")
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const app = express()
// Sourabh Paul Sir 

app.post("/sendWhatsAppMessage", sendWhatsappMessage)

app.listen(5000, () => {
    console.log("server running");
})
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "Your_client_id"
    })
});


function sendWhatsappMessage(req, res) {
    client.on('qr', qr => {
        const qrGenrate = qrcode.generate(qr, { small: true });
        res.send(qrGenrate)
    });

    client.on('ready', () => {
        console.log('Client is ready!');
        client.getChats().then((chats) => {
            const user = chats.find((chat) => chat.name === "Aai")
            user.sendMessage(`
📌*New Tour Booked By xyz user*
🔹 <h1><b>Day 1<b></h1>
    - place: andamane
    - Date : radom data
    - Time : 10:00pm
🔹*More Credentails*
         - More Information
        - Even More Information
🔗 https://unicorniz.com/
`)
            // console.log(user);
            // console.log(chats[0]);
            res.json("data sended succssfully")
        })
    });
    client.initialize();
}
