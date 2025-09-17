const { fana } = require("../njabulo/fana");
const conf = require(__dirname + "/../set");
const axios = require('axios');

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
    

async function sendFormattedMessage(zk, chatId, text, ms) {
  await zk.sendMessage(chatId, {
    text,
    contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363345407274799@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
         },
         forwardingScore: 999, // 
         externalAdReply: {
         title: "⏰ message timezones",
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
}

fana({
  nomCom: "timezone",
  aliases: ["timee", "datee"],
  desc: "Check the current local time and date for a specified timezone.",
  categorie: "Mods",
  reaction: '🕰️',
}, async (dest, zk, context) => {
  const { repondre, arg, ms } = context;
  const timezone = arg[0];

  if (!timezone) return await sendFormattedMessage(zk, dest, "❌ Please provide a timezone code. Example: .timezone TZ", ms);

  try {
    const now = new Date();
    const options = { 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit", 
      hour12: true, 
      timeZone: timezone 
    };

    const timeOptions = { 
      ...options, 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    };

    const localTime = now.toLocaleTimeString("en-US", options);
    const localDate = now.toLocaleDateString("en-US", timeOptions);

    await sendFormattedMessage(zk, dest, `🕰️ *Current Local Time:* ${localTime}\n📅 *Current Date:* ${localDate}`, ms);
  } catch (e) {
    console.error("Error in .timezone command:", e);
    await sendFormattedMessage(zk, dest, "❌ An error occurred. Please try again later.", ms);
  }
});

fana({
  nomCom: "color",
  aliases: ["rcolor", "colorcode"],
  desc: "Generate a random color with name and code.",
  categorie: "Mods",
  reaction: '🤦',
}, async (dest, zk, context) => {
  const { repondre, ms } = context;
  
  try {
    const colorNames = [
      "Red", "Green", "Blue", "Yellow", "Orange", "Purple", "Pink", "Brown", "Black", "White", 
      "Gray", "Cyan", "Magenta", "Violet", "Indigo", "Teal", "Lavender", "Turquoise"
    ];
    
    const randomColorHex = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const randomColorName = colorNames[Math.floor(Math.random() * colorNames.length)];

    await sendFormattedMessage(zk, dest, `🎨 *Random Color:* \nName: ${randomColorName}\nCode: ${randomColorHex}`, ms);
  } catch (e) {
    console.error("Error in .color command:", e);
    await sendFormattedMessage(zk, dest, "❌ An error occurred while generating the random color.", ms);
  }
});

fana({
  nomCom: "timenow",
  aliases: ["currenttime", "time"],
  desc: "Check the current local time.",
  categorie: "Mods",
  reaction: '🕰️',
}, async (dest, zk, context) => {
  const { repondre, ms } = context;
  
  try {
    const now = new Date();
    const localTime = now.toLocaleTimeString("en-US", { 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit", 
      hour12: true,
      timeZone: conf.TIMEZONE,
    });
    
    await sendFormattedMessage(zk, dest, `🕒 Current Local Time: ${localTime}`, ms);
  } catch (e) {
    console.error("Error in .timenow command:", e);
    await sendFormattedMessage(zk, dest, "❌ An error occurred. Please try again later.", ms);
  }
});

fana({
  nomCom: "date",
  aliases: ["currentdate", "todaydate"],
  desc: "Check the current date.",
  categorie: "Mods",
  reaction: '📆',
}, async (dest, zk, context) => {
  const { repondre, ms } = context;

  try {
    const now = new Date();
    const currentDate = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    
    await sendFormattedMessage(zk, dest, `📅 Current Date: ${currentDate}`, ms);
  } catch (e) {
    console.error("Error in .date command:", e);
    await sendFormattedMessage(zk, dest, "❌ An error occurred. Please try again later.", ms);
  }
});

fana({
  nomCom: "calculate",
  aliases: ["calcu", "maths", "mathema"],
  desc: "Evaluate a mathematical expression.",
  categorie: "Mods",
  reaction: '🧮',
}, async (dest, zk, context) => {
  const { repondre, arg, ms } = context;
  const text = arg.join(" ");

  if (!text) return await sendFormattedMessage(zk, dest, "🧮 Use this command like:\n *Example:* .calculate 5+3*2", ms);

  if (!/^[0-9+\-*/().\s]+$/.test(text)) return await sendFormattedMessage(zk, dest, "❎ Invalid expression. Only numbers and +, -, *, /, ( ) are allowed.", ms);

  try {
    let result = eval(text);
    await sendFormattedMessage(zk, dest, `✅ Result of "${text}" is: ${result}`, ms);
  } catch (e) {
    console.error("Error in .calculate command:", e);
    await sendFormattedMessage(zk, dest, "❎ Error in calculation. Please check your expression.", ms);
  }
});
