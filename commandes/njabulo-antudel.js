const { fana } = require("../njabulo/fana");
const s = require("../set");
const fs = require('fs');
const Heroku = require('heroku-client');

function getDescriptionFromEnv(varName) {
  const filePath = "./app.json";
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const config = JSON.parse(fileContent);
  return config.env[varName]?.description || "The environment variable description was not found.";
}

fana({
  nomCom: 'antidelete',
  categorie: "HEROKU-CLIENT"
}, async (dest, zk, context) => {
  const { ms, superUser, auteurMessage, arg } = context;

  if (!superUser) {
     zk.sendMessage(dest, {
      text: "*This command is restricted to the bot owner or Dullah owner.* 💀,,idiot",
      contextInfo: {
        externalAdReply: {
          title: "Njabulo Jb",
          body: "WhatsApp status !",
          thumbnailUrl: s.URL,
          sourceUrl: s.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    });
    return;
const { fana } = require("../njabulo/fana");
const s = require("../set");
const fs = require('fs');
const Heroku = require('heroku-client');

function getDescriptionFromEnv(varName) {
  const filePath = "./app.json";
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const config = JSON.parse(fileContent);
  return config.env[varName]?.description || "The environment variable description was not found.";
}

fana({
  nomCom: 'antidelete',
  categorie: "HEROKU-CLIENT"
}, async (dest, zk, context) => {
  const { ms, superUser, auteurMessage, arg } = context;

  if (!superUser) {
     zk.sendMessage(dest, {
      text: "*This command is restricted to the bot owner or Dullah owner.* 💀,,idiot",
      contextInfo: {
        externalAdReply: {
          title: "Njabulo Jb",
          body: "WhatsApp status !",
          thumbnailUrl: s.URL,
          sourceUrl: s.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    });
    return;
  }

  if (!arg[0]) {
     zk.sendMessage(dest, {
      text: 'Instructions:\n\nType "antidelete yes" to enable or "antidelete no" to disable.',
      contextInfo: {
        externalAdReply: {
          title: "Njabulo Jb",
          body: "WhatsApp status !",
          thumbnailUrl: s.URL,
          sourceUrl: s.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    });
    return;
  }

  const option = arg.join(' ').toLowerCase();
  let responseMessage;

  switch (option) {
    case "yes":
      s.ADM = 'yes';
      responseMessage = ' has been enabled successfully.';
      break;
    case "no":
      s.ADM = 'no';
      responseMessage = ' has been disabled successfully.';
      break;
    default:
       zk.sendMessage(dest, {
        text: "Please don't invent an option. Type 'antidelete yes' or 'antidelete no'.",
        contextInfo: {
          externalAdReply: {
            title: "Njabulo Jb",
            body: "WhatsApp status !",
            thumbnailUrl: s.URL,
            sourceUrl: s.GURL,
            mediaType: 1,
            showAdAttribution: true
          }
        }
      });
      return;
  }

  try {
     zk.sendMessage(dest, {
      text: responseMessage,
      contextInfo: {
        externalAdReply: {
          title: "Njabulo Jb",
          body: "WhatsApp status !",
          thumbnailUrl: s.URL,
          sourceUrl: s.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    });
  } catch (error) {
    console.error("Error processing your request:", error);
     zk.sendMessage(dest, {
      text: 'Error processing your request.',
      contextInfo: {
        externalAdReply: {
          title: "Njabulo Jb",
          body: "WhatsApp status !",
          thumbnailUrl: s.URL,
          sourceUrl: s.GURL,
          mediaType: 1,
          showAdAttribution: true
        }
      }
    });
  }
});

  
