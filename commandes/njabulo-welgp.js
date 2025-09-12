const { fana } = require('../njabulo/fana');
const { attribuerUnevaleur } = require('../bdd/welcome');

async function sendFormattedMessage(zk, chatId, text, ms) {
   zk.sendMessage(chatId, {
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

async function events(nomCom) {
  fana({
    nomCom: nomCom,
    categorie: 'Group'
  }, async (dest, zk, commandeOptions) => {
    const { ms, arg, superUser, verifAdmin } = commandeOptions;

    if (verifAdmin || superUser) {
      if (!arg[0] || arg.join(' ') === ' ') {
        await sendFormattedMessage(zk, dest, nomCom + ' ' + 'on to active and ' + ' ' + nomCom + ' ' + 'off to put off', ms);
      } else {
        if (arg[0] === 'on' || arg[0] === 'off') {
          await attribuerUnevaleur(dest, nomCom, arg[0]);
          await sendFormattedMessage(zk, dest, nomCom + " is actualised on " + arg[0], ms);
        } else {
          await sendFormattedMessage(zk, dest, 'on for active and off for desactive', ms);
        }
      }
    } else {
      await sendFormattedMessage(zk, dest, 'You can\'t use this commands', ms);
    }
  });
}

// Appel de la fonction events pour les valeurs 'welcome' et 'goodbye'
events('welcome');
events('goodbye');
events('antipromote');
events('antidemote');
