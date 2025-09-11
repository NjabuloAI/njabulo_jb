const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

fana({ nomCom: "menu-control", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../njabulo//fana");
    var coms = {};
    var mode = s.MODE.toLowerCase() !== "yes" ? "private" : "public";

    cm.map(async (com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault("Africa/Nairobi");
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // Generate greeting based on time of day
    const hour = moment().hour();
    let greeting = "Good Morning";
    if (hour >= 12 && hour < 18) {
        greeting = "Good afternnon!";
    } else if (hour >= 18) {
        greeting = "Good Everning!";
    } else if (hour >= 22 || hour < 5) {
        greeting = "Good Night 🌌";
    }

    let infoMsg = `
┏──────────────⊷
┊☹ʙᴏᴛ ɴᴀᴍᴇ :  *ɴᴊᴀʙᴜʟᴏ ᴊʙ*
┗──────────────⊷
┏ 
*【Control】*
- .①call                    ⬄︎ _del! yes/no_
- .②areact               ⬄︎ _yes/no_
- .③statuopen        ⬄︎ _see! yes/no_
- .④antidelete        ⬄︎ _del! yes/no_
- .⑤statussave      ⬄︎ _dow! yes/no_
- .⑥messageopen ⬄︎ _see! yes/no_
- .⑦public              ⬄︎ _mode! yes/no_
- .⑧record              ⬄︎ _online! yes/no_
- .⑨typing              ⬄︎ _online! yes/no_
- .⑩online               ⬄︎ _online! yes/no_
- .⑪private             ⬄︎ _mode! yes/no_
- .⑫likestatus        ⬄︎ _emoji! yes/no_
- .⑬settings           ⬄︎ _@use_
- .⑭prefix               ⬄︎ _<.,?!*@#$+/¶•n>_
  ┗
> ✆︎Pσɯҽɾҽԃ Ⴆყ NנɐႦυℓσ נႦ
┏──────────────⊷
┊⌛︎ ᴀᴠᴀɪʟᴀʙʟᴇ ᴄᴏᴍᴍᴀɴᴅᴇs control
┊☪︎ : ${greeting}
┗──────────────⊷ `;

    // Two sets of images to display randomly
    const extraImages1 = [
        "https://files.catbox.moe/nj1w1s.jpg",
        "https://files.catbox.moe/znvqsv.jpg",
        "https://files.catbox.moe/nj1w1s.jpg"
    ];

    const extraImages2 = [
        "https://files.catbox.moe/znvqsv.jpg",
        "https://files.catbox.moe/nj1w1s.jpg",
        "https://files.catbox.moe/znvqsv.jpg"
    ];

    // Randomly select which menu to show
    const isOriginalMenu = Math.random() > 0.5; // 50% chance for either menu

    let mediaUrl, thumbnail, renderType;
    if (isOriginalMenu) {
        mediaUrl = mybotpic(); // Use bot’s original picture
        thumbnail = extraImages1[Math.floor(Math.random() * extraImages1.length)];
        renderType = "renderLargerThumbnail";
    } else {
        mediaUrl = extraImages2[Math.floor(Math.random() * extraImages2.length)];
        thumbnail = mediaUrl; // Use the same image as media
        renderType = "renderSmallThumbnail";
    }

    try {
        if (mediaUrl.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(dest, {
                video: { url: mediaUrl },
                caption: infoMsg,
                footer: "*Njabulo Jb*, developed by Njabulo",
                gifPlayback: true,
                contextInfo: {
                    externalAdReply: {
                        title: "✆︎Pσɯҽɾҽԃ Ⴆყ NנɐႦυℓσ נႦ",
                        body: "⌛︎menu status control",
                        mediaType: 1,
                        thumbnailUrl: thumbnail,
                        sourceUrl: "https://github.com/NjabuloJ/Njabulo-Jb",
                        showAdAttribution: true,
                        [renderType]: true, // Apply correct thumbnail size
                    },
                },
            }, { quoted: ms });
        } else {
            await zk.sendMessage(dest, {
                image: { url: mediaUrl },
                caption: infoMsg,
                footer: "*Njabulo_Jb*, developed by Njabulo",
                contextInfo: {
                    externalAdReply: {
                        title: "✆︎Pσɯҽɾҽԃ Ⴆყ NנɐႦυℓσ נႦ",
                        body: "⌛︎menu status control ",
                        mediaType: 1,
                        thumbnailUrl: thumbnail,
                        sourceUrl: "https://github.com/NjabuloJ/Njabulo-Jb",
                        showAdAttribution: true,
                        [renderType]: true, // Apply correct thumbnail size
                    },
                },
            }, { quoted: ms });
        }
    } catch (e) {
        console.log("🥵🥵 Error sending menu: " + e);
        repondre("🥵🥵 Error sending menu: " + e);
    }

    // List of audio URLs
    const audioUrls = [
        "https://files.catbox.moe/6x0rb7.mp3" // New song added
    ];

    // Select a random audio file
    const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];

    try {
        await zk.sendMessage(dest, {
            audio: { url: randomAudioUrl },
            mimetype: 'audio/mpeg',
            ptt: true, // Send as a voice note
             contextInfo: {
               externalAdReply: {
               title: "song menu",
               body: "ɴᴊᴀʙᴜʟᴏ ᴊʙ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ",
               mediaType: 1,
               thumbnailUrl: thumbnail,
               sourceUrl: "https://github.com/NjabuloJ/Njabulo-Jb",
               showAdAttribution: true,
              [renderType]: true, // Apply correct thumbnail size
              },
            },
        }, { quoted: ms });
    } catch (e) {
        console.log("🥵🥵 Error sending audio: " + e);
        repondre("🥵🥵 Error sending audio: " + e);
    }
});