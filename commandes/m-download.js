const util = require('util');
const fs = require('fs-extra');
const { fana } = require(__dirname + "/../njabulo/fana");
const { format } = require(__dirname + "/../njabulo/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

fana({ nomCom: "menu-download", categorie: "General" }, async (dest, zk, commandeOptions) => {
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
*【Download】*
- .①apk                         ⬄︎ _<text links>_
- .②playstore                ⬄︎ _<text links>_
- .③mediafire               ⬄︎ _<url links>_
- .④gitclone                  ⬄︎ _<url links>_
- .⑤fb                            ⬄︎ _<url Links>_
- .⑥instagram              ⬄︎ _<url links>_
- .⑦facebook                ⬄︎ _<url links>_
- .⑧tiktok                      ⬄︎ _<url links>_
- .⑨lite                          ⬄︎ _<url links>_
- .⑩play                        ⬄︎ _<text>_
- .⑪video                      ⬄︎ _<text>_
- .⑫videodoc                ⬄︎ _<text>_
- .⑬audio-voice            ⬄︎ _<text>_
- .⑭playdoc                  ⬄︎ _<text>_
- .⑮yts                           ⬄︎ _<text>_
- .⑯ytmp3                     ⬄︎ _<text>_
- .⑰ytmp4                     ⬄︎ _<text>_
- .⑱audio                      ⬄︎ _<text>_
- .⑲img                         ⬄︎ _<text>_
- .⑳image                     ⬄︎ _<text>_
- .①phote                      ⬄︎ _<text>_
- .②galaxy                     ⬄︎ _<text>_
- .③lyrics                       ⬄︎ _<text>_
- .④lyrics-voice             ⬄︎ _<text>_
- .⑤videofb                    ⬄︎ _<links>_
- .①videoTikTok            ⬄︎ _<links>_
- .②videoYouTube         ⬄︎ _<links>_
- .③videoxxx                  ⬄︎ _<text>_
- .④vidporn                    ⬄︎ _<text>_ 
- .⑤videosex                  ⬄︎ _<text>_  
┗
> ✆︎Pσɯҽɾҽԃ Ⴆყ NנɐႦυℓσ נႦ
┏──────────────⊷
┊⌛︎ ᴀᴠᴀɪʟᴀʙʟᴇ ᴄᴏᴍᴍᴀɴᴅᴇs download
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
                        title: " ✆︎Pσɯҽɾҽԃ Ⴆყ NנɐႦυℓσ נႦ",
                        body: "⌛︎menu status download ",
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
                        body: "⌛︎menu status download ",
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