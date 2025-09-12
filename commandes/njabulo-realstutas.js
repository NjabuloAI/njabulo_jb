const { fana } = require("../njabulo/fana");
const s = require("../set");
const fs = require('fs');
const Heroku = require('heroku-client');

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
}

// Function to get a description of an environment variable
function getDescriptionFromEnv(varName) {
  try {
    const filePath = "./app.json";
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const config = JSON.parse(fileContent);
    return config.env[varName]?.description || "The environment variable description was not found.";
  } catch (error) {
    console.error("Error reading app.json:", error);
    return "Error reading app.json";
  }
}

//message readstatus
fana({
  nomCom: 'readstatus',
  categorie: "Control"
}, async (chatId, zk, context) => {
  const { ms, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return sendFormattedMessage(zk, chatId, "*onᥣყ oᥕnᥱr ᥴommᥲnd*", ms);
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return sendFormattedMessage(zk, chatId, 'Instructions:\n\nType "readstatus yes" to enable or "readstatus no" to disable.', ms);
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.AUTO_READ_STATUS = 'yes';  // Enable autoread status
      responseMessage = '*Aᥙto rᥱᥲd stᥲtᥙs hᥲs bᥱᥱn ᥱnᥲbᥣᥱd sᥙᥴᥴᥱssfᥙᥣᥣყ*';
      break;

    case "no":
      s.AUTO_READ_STATUS = 'no';  // Disable autoread status
      responseMessage = '*Aᥙto rᥱᥲd stᥲtᥙs hᥲs bᥱᥱn dιsᥲbᥣᥱd sᥙᥴᥴᥱssfᥙᥣᥣყ*';
      break;

    default:
      return sendFormattedMessage(zk, chatId, "Please don't invent an option. Type 'readstatus yes' or 'readstatus no'.", ms);
  }

  // Send the response message to the user
  try {
    await sendFormattedMessage(zk, chatId, responseMessage, ms);
  } catch (error) {
    console.error("Error processing your request:", error);
    await sendFormattedMessage(zk, chatId, 'Error processing your request.', ms);
  }
});
