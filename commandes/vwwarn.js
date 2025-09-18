const { fana } = require('../njabulo/fana');
const {ajouterUtilisateurAvecWarnCount , getWarnCountByJID , resetWarnCountByJID} = require('../bdd/warn')
const s = require("../set")

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
         title: "njᥲbᥙᥣo jb",
         mediaType: 1,
          previewType: 0,
         thumbnailUrl: randomNjabulourl,
         renderLargerThumbnail: false,
        },
        },
          }, { quoted: ms });
}

fana(
    {
        nomCom : 'warn',
        categorie : 'Group'
        
    },async (dest,zk,commandeOptions) => {

 const {ms , arg, repondre,superUser,verifGroupe,verifAdmin , msgRepondu , auteurMsgRepondu} = commandeOptions;
if(!verifGroupe ) return await sendFormattedMessage(zk, dest, 'this is a group commands', ms);

if(verifAdmin || superUser) {
   if(!msgRepondu) return await sendFormattedMessage(zk, dest, 'reply a message of user to warn', ms);
   
   if (!arg || !arg[0] || arg.join('') === '') {
    await ajouterUtilisateurAvecWarnCount(auteurMsgRepondu)
   let warn = await getWarnCountByJID(auteurMsgRepondu)
   let warnlimit = s.WARN_COUNT
   
   if( warn >= warnlimit ) { 
    await sendFormattedMessage(zk, dest, 'this user reach limit of warning , so i kick him/her', ms);
                zk.groupParticipantsUpdate(dest, [auteurMsgRepondu], "remove")
 } else { 

    var rest = warnlimit - warn ;
     await sendFormattedMessage(zk, dest, `this user is warn , rest before kick : ${rest} `, ms)
   }
} else if ( arg[0] === 'reset') { 
  await resetWarnCountByJID(auteurMsgRepondu) 
  await sendFormattedMessage(zk, dest, "Warn count is reset for this user", ms)
} else { 
  await sendFormattedMessage(zk, dest, 'reply to a user by typing  .warn ou .warn reset', ms)
}
   
}  else {
    await sendFormattedMessage(zk, dest, 'you are not admin', ms)
}
 
   });
