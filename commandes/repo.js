"use strict";
const { fana } = require("../njabulo/fana");
const axios = require("axios");
const moment = require("moment");

fana({ 
    nomCom: "repo", 
    categorie: "General", 
    reaction: "🧃", 
    nomFichier: __filename 
}, async (dest, zk, commandeOptions) => {
    const { pushname, repondre } = commandeOptions;
    const githubRepo = 'https://api.github.com/repos/NjabuloJ/Njabulo-Jb';
    const contactName = commandeOptions?.ms?.pushName || "Unknown Contact"; // Sender's name or "Unknown Contact"
        
    try {
        const response = await axios.get(githubRepo);
        const data = response.data;

        const created = moment(data.created_at).format("DD/MM/YYYY");
        const updated = moment(data.updated_at).format("DD/MM/YYYY");

            // List of image URLs
    const njabulox = [
        "https://files.catbox.moe/iii5jv.jpg",
        "https://files.catbox.moe/xjeyjh.jpg",
        "https://files.catbox.moe/mh36c7.jpg",
        "https://files.catbox.moe/u6v5ir.jpg",
        "https://files.catbox.moe/bnb3vx.jpg" // New image added
    ];

    // Select a random image file
    const randomNjabulourl = njabulox[Math.floor(Math.random() * njabulox.length)];
    
        const gitdata = `
*🌐 BOT REPOSITORY 🌐*
        
👤 *Name:* Njabulo Jb 
⭐ *Stars:* ${data.stargazers_count}
🍴 *Forks:* ${data.forks_count}
🖇️ *GitHub Link:* ${data.html_url}

@⁨ ${contactName}⁩👋, Don't forget to star and fork my repository!

`;


await zk.sendMessage(dest, { 
    image: { url: randomNjabulourl },
     caption: gitdata,
      contextInfo: {
        externalAdReply: {
         title: "💓ᥕᥱᥣᥴomᥱ fᥲmιᥣყ ",
         mediaType: 1,
          previewType: 0,
         thumbnailUrl: randomNjabulourl,
         renderLargerThumbnail: false,
        },
        },
          }, { quoted: {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "njᥲbᥙᥣo",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });

    } catch (e) {
        console.log("Error fetching data:", error);
        repondre("❌ Error fetching repository data. Please try again later.");
    }
});

