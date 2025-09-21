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
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
         },
         forwardingScore: 999, // 
         externalAdReply: {
         title: "👥message settings owner control",
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

//message modeprivate
fana({ nomCom: 'privatemode', categorie: "Control" }, async (chatId, zk, context) => {
  const { ms, superUser, auteurMessage, arg } = context;
  // Check if the command is issued by the owner
  if (!superUser) {
    return sendFormattedMessage(zk, chatId, "```you error 🚫 only owner```", ms);
  }
  // Validate user input and respond accordingly
  if (!arg[0]) {
    return sendFormattedMessage(zk, chatId, 'Instructions:\n\nType "privatemode yes" to enable or "privatemode no" to disable.', ms);
  }
  const option = arg.join(' ').toLowerCase();
  let responseMessage;
  switch (option) {
    case "yes":
      s.MODE = 'yes';
      // Enable private mode
      responseMessage = 'Private mode has been enabled successfully.';
      break;
    case "no":
      s.MODE = 'no';
      // Disable private mode
      responseMessage = 'Private mode has been disabled successfully.';
      break;
    default:
      return sendFormattedMessage(zk, chatId, "Please don't invent an option. Type 'privatemode yes' or 'privatemode no'.", ms);
  }
  // Send the response message to the user
  try {
    await sendFormattedMessage(zk, chatId, responseMessage, ms);
  } catch (error) {
    console.error("Error processing your request:", error);
    await sendFormattedMessage(zk, chatId, 'Error processing your request.', ms);
  }
});

// public mode
fana({ nomCom: 'publicmode', categorie: "Control" }, async (chatId, zk, context) => {
  const { ms, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await sendFormattedMessage(zk, chatId, "*This command is restricted to the bot owner or Queen-M owner.* ", ms);
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await sendFormattedMessage(zk, chatId, 'Instructions:\n\nType "publicmode yes" to enable or "publicmode no" to disable.', ms);
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.MODE = 'yes';
      responseMessage = '*Public mode has been enabled successfully.*';
      break;
    case "no":
      s.MODE = 'no';
      responseMessage = '*Public mode has been disabled successfully.*';
      break;
    default:
      return await sendFormattedMessage(zk, chatId, "Please don't invent an option. Type 'publicmode yes' or 'publicmode no'.", ms);
  }

  // Send the response message to the user
  try {
    await sendFormattedMessage(zk, chatId, responseMessage, ms);
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

fana({ nomCom: 'pm-permit', categorie: "HEROKU-CLIENT" }, async (chatId, zk, context) => {
  const { ms, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await sendFormattedMessage(zk, chatId, "*This command is restricted to the bot owner or Queen-M owner.* ", ms);
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await sendFormattedMessage(zk, chatId, 'Instructions:\n\nType "pm-permit yes" to enable or "pm-permit no" to disable.', ms);
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.PM_PERMIT = 'yes';
      responseMessage = '*PM-PERMIT has been enabled successfully.*';
      break;
    case "no":
      s.PM_PERMIT = 'no';
      responseMessage = '*PM-PERMIT has been disabled successfully.*';
      break;
    default:
      return await sendFormattedMessage(zk, chatId, "Please don't invent an option. Type 'pm-permit yes' or 'pm-permit no'.", ms);
  }

  // Send the response message to the user
  try {
    await sendFormattedMessage(zk, chatId, responseMessage, ms);
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

zokou({ nomCom: 'autolikestatus', categorie: "HEROKU-CLIENT" }, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await sendFormattedMessage(zk, chatId, "*This command is restricted to the bot owner or Queen-M owner.* ", ms);
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await sendFormattedMessage(zk, chatId, 'Instructions:\n\nType "autolikestatus yes" to enable or "autolikestatus no" to disable.', ms);
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.AUTO_LIKE_STATUS = 'yes';
      responseMessage = '*Auto like status has been enabled successfully.*';
      break;
    case "no":
      s.AUTO_LIKE_STATUS = 'no';
      responseMessage = '*Auto like status has been disabled successfully.*';
      break;
    default:
      return await sendFormattedMessage(zk, chatId, "Please don't invent an option. Type 'autolikestatus yes' or 'autolikestatus no'.", ms);
  }

  // Send the response message to the user
  try {
    await sendFormattedMessage(zk, chatId, responseMessage, ms);
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

zokou({ nomCom: 'alwaysonline', categorie: "HEROKU-CLIENT" }, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await sendFormattedMessage(zk, chatId, "*This command is restricted to the bot owner or Queen-M owner.* ", ms);
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await sendFormattedMessage(zk, chatId, 'Instructions:\n\nType "alwaysonline yes" to enable or "alwaysonline no" to disable.', ms);
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.ETAT = 'online';
      responseMessage = '*Always online has been enabled successfully.*';
      break;
    case "no":
      s.ETAT = 'offline';
      responseMessage = '*Always online has been disabled successfully.*';
      break;
    default:
      return await sendFormattedMessage(zk, chatId, "Please don't invent an option. Type 'alwaysonline yes' or 'alwaysonline no'.", ms);
  }

  // Send the response message to the user
  try {
    await sendFormattedMessage(zk, chatId, responseMessage, ms);
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

zokou({ nomCom: 'autorecord', categorie: "HEROKU-CLIENT" }, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await sendFormattedMessage(zk, chatId, "*This command is restricted to the bot owner or Queen-M owner.* ", ms);
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await sendFormattedMessage(zk, chatId, 'Instructions:\n\nType "autorecord yes" to enable or "autorecord no" to disable.', ms);
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.AUTORECORD = 'yes';
      responseMessage = '*Auto record has been enabled successfully.*';
      break;
    case "no":
      s.AUTORECORD = 'no';
      responseMessage = '*Auto record has been disabled successfully.*';
      break;
    default:
      return await sendFormattedMessage(zk, chatId, "Please don't invent an option. Type 'autorecord yes' or 'autorecord no'.", ms);
  }

  // Send the response message to the user
  try {
    await sendFormattedMessage(zk, chatId, responseMessage, ms);
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

zokou({ nomCom: 'autotyping', categorie: "HEROKU-CLIENT" }, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return await sendFormattedMessage(zk, chatId, "*This command is restricted to the bot owner or Queen-M owner.* ", ms);
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return await sendFormattedMessage(zk, chatId, 'Instructions:\n\nType "autotyping yes" to enable or "autotyping no" to disable.', ms);
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.AUTOTYPING = 'yes';
      responseMessage = '*Auto typing has been enabled successfully.*';
      break;
    case "no":
      s.AUTOTYPING = 'no';
      responseMessage = '*Auto typing has been disabled successfully.*';
      break;
    default:
      return await sendFormattedMessage(zk, chatId, "Please don't invent an option. Type 'autotyping yes' or 'autotyping no'.", ms);
  }

  // Send the response message to the user
  try {
    await sendFormattedMessage(zk, chatId, responseMessage, ms);
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});