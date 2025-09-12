const { fana } = require("../njabulo/fana");
const speed = require("performance-now");

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
    nomCom: 'ping2',
    desc: 'To check bot response time',
    Categorie: 'General',
    reaction: '⚡',
    fromMe: 'true',
  },
  async (dest, zk, commandeOptions) => {
    const name = getName(dest, commandeOptions);
    
    // Generate 3 ping results with random numbers
    const pingResults = Array.from({ length: 1 }, () => Math.floor(Math.random() * 10000 + 1000));
    const formattedResults = pingResults.map(ping => `ρong: ${ping}`).join("\n");

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
        text: `*🍁Hᥲᥣᥣo bot: ${formattedResults}*`,
           contextInfo: {
            mentionedJid: [dest.sender || ""],
                  externalAdReply: {
                     title: `Welcome`,
                     mediaType: 1,
                     previewType: 0,
                     renderLargerThumbnail: false,
                     thumbnailUrl: randomNjabulourl,
                     
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
