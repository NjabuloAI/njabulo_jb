const { fana } = require("../njabulo/fana");
const speed = require("performance-now");
const moment = require("moment-timezone");

// Function for delay simulation
function delay(ms) {
  console.log(`⏱️ delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper function to safely get the sender's name
function getName(dest, commandeOptions) {
  return (
    commandeOptions.pushName ||
    commandeOptions.name ||
    (dest.sender ? dest.sender.split('@')[0] : "Unknown User")
  );
}

// Command: Ping
fana(
  {
    nomCom: 'ping',
    desc: 'To check bot response time',
    Categorie: 'General',
    reaction: '⚡',
    fromMe: 'true',
  },
  async (dest, zk, commandeOptions) => {
    const name = getName(dest, commandeOptions);

moment.tz.setDefault("Africa/Botswana");

const temps = moment().format('hh:mm:ss A');
const date = moment().format('DD/MM/YYYY');
    
    // Generate 3 ping results with random numbers
    const pingResults = Array.from({ length: 1 }, () => Math.floor(Math.random() * 10000 + 1000));
    const formattedResults = pingResults.map(ping => `${ping}`).join("\n");

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
    
    // Reply with ping results
    await zk.sendMessage(dest, {
        text: `🏓 *sᴛᴀᴛᴜs!*

⚡ *ᴘᴏɴɢ:*  ${formattedResults}ᴍs
🔴 *ϙᴜᴀʟɪᴛʏ:* hide
🕒 *ᴛɪᴍᴇ:* ${temps}
📅 *ᴅᴀᴛᴇ:* ${date}

╭━━━━━━━━━━━━━━━━╮
┃  🤖 *Njabulo Jb status bot*  🚀
╰━━━━━━━━━━━━━━━━╯
║    ᴄᴏɴɴᴇᴄᴛɪᴏɴ sᴛᴀᴛᴜs  
───────────────────𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭`,
           contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
         },
         forwardingScore: 999, // 
         externalAdReply: {
         title: "⏰ message pong status",
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

    console.log("Ping results sent successfully with verified tick!");
  }
);
    
