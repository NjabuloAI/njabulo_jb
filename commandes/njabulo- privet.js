const { fana } = require("../njabulo/fana");
const s = require("../set");
const fs = require('fs');
const Heroku = require('heroku-client');

async function sendFormattedMessage(zk, chatId, text, ms) {
  await zk.sendMessage(chatId, {
    text,
    contextInfo: {
      externalAdReply: {
        title: "Njabulo Jb",
        body: "Message via ad !",
        thumbnailUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
        sourceUrl: "https://whatsapp.com/channel/0029VbAckOZ7tkj92um4KN3u",
        mediaType: 1,
        showAdAttribution: true
      }
    }
  }, { quoted: ms });
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
fana({
  nomCom: 'privatemode',
  categorie: "Control"
}, async (chatId, zk, context) => {
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
      s.MODE = 'yes';  // Enable private mode
      responseMessage = 'Private mode has been enabled successfully.';
      break;

    case "no":
      s.MODE = 'no';  // Disable private mode
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
