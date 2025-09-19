const { fana } = require("../njabulo/fana");
const axios = require('axios');
const ytSearch = require('yt-search');
const conf = require(__dirname + '/../set');
const moment = require("moment-timezone");

fana({
  nomCom: "play",
  aliases: ["song", "playdoc", "audio", "mp3"],
  categorie: "download",
  reaction: "🎸"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;

  try {
    await zk.sendMessage(dest, {
      text: '*vιᥱᥕ ᥴhᥲnnᥱᥣ ᥲnd Sᥱᥲrᥴhιng for ყoᥙr song♫...*',
    contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
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
    console.log('Searching for song...');

    if (!arg) {
      console.log('No argument provided');
      return zk.sendMessage(dest, {
        text: 'Please provide a song name or keyword.',
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
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

    console.log('Argument provided:', arg);
    const query = arg.join(' ');
    console.log('Query:', query);

    console.log('[PLAY] Searching YT for:', query);
    const search = await ytSearch(query);
    console.log('Search result:', search);

    if (!search || !search.videos || !search.videos[0]) {
      console.log('No video found');
      return zk.sendMessage(dest, { 
        text: 'No results found for your query.',
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
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

    const video = search.videos[0];
    console.log('Video found:', video);

    const safeTitle = video.title.replace(/[\\/:*?"<>|]/g, '');
    const fileName = `${safeTitle}.mp3`;
    const apiURL = `https://noobs-api.top/dipto/ytDl3?link=${encodeURIComponent(video.videoId)}&format=mp3`;

    console.log('API URL:', apiURL);
    try {
      const response = await axios.get(apiURL);
      if (response.status !== 200) {
        console.log('API request failed with status code:', response.status);
        await zk.sendMessage(dest, { 
          text: 'Failed to retrieve the MP3 download link. Please try again later.',
          contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
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
        return;
      }
      const data = response.data;
      if (!data.downloadLink) {
        console.log('No download link found');
        return zk.sendMessage(dest, { 
          text: 'Failed to retrieve the MP3 download link.',
          contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
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
     
      moment.tz.setDefault("Africa/Botswana");
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // Generate greeting based on time of day
    const hour = moment().hour();
    let greeting = "Good Mornιng";
    if (hour >= 12 && hour < 18) {
        greeting = "Good ᥲftᥱrnnon!";
    } else if (hour >= 18) {
        greeting = "Good Evᥱrnιng!";
    } else if (hour >= 22 || hour < 5) {
        greeting = "Good Nιght";
    }
      
      await zk.sendMessage(dest,{ 
        image: { url: video.thumbnail },
        caption: `╭───────────⊷
┊▢tιtᥣᥱ: ${video.title}
┊▢dᥙrᥲtιon: ${video.timestamp}
┊▢vιᥱᥕs: ${video.views.toLocaleString()}
┊▢ᥙρᥣoᥲdᥱd: ${video.ago}
┊▢ᥴhᥲnnᥱᥣ: ${video.author.name}
┊___________________________
┊ ①◦➛ρᥣᥲყ doᥕnᥣoᥲd
┊ ②◦➛song doᥕnᥣoᥲd
┊ ③◦➛vιdᥱo doᥕnᥣoᥲd 
┊ ④◦➛ *doᥕnᥣoᥲd-mᥱnᥙ*
┊___________________________
┊ *ɴᴊᴀʙᴜʟᴏᴊʙ* ᴀᴜᴛᴏᴍᴀᴛɪᴄ sᴇɴᴅ *ᴀᴜᴅɪᴏ*
╰┬──────────⊷⳹
┌┤🌇 *hᥲᥣᥣo fᥲmιᥣყ  ${greeting}*
┊╰──────────────⊷𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭𑲭
╰───────────────⊷`,
        contextInfo: {
         externalAdReply: {
         title: video.title,
         mediaType: 1,
          previewType: 0,
         thumbnailUrl: video.thumbnail,
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
      console.log('Message sent with image and caption');

      await zk.sendMessage(dest, {
        audio: { url: data.downloadLink },
        mimetype: 'audio/mpeg',
        fileName,
       contextInfo: {
         externalAdReply: {
         title: video.title,
         mediaType: 1,
          previewType: 0,
         thumbnailUrl: video.thumbnail,
         renderLargerThumbnail: true,
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
      console.log('Audio file sent');
    } catch (err) {
      console.error('[PLAY] API Error:', err);
      if (err.response && err.response.status === 500) {
        await zk.sendMessage(dest, { 
          text: 'The API is currently experiencing issues. Please try again later.',
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363399999197102@newsletter',
         newsletterName: "╭••➤®Njabulo Jb",
         serverMessageId: 143,
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
      } else {
        await zk.sendMessage(dest, { text: 'An error occurred: ' + err.message });
      }
    }
  } catch (err) {
    console.error('[PLAY] Error:', err);
    await zk.sendMessage(dest, { text: 'An error occurred: ' + err.message });
  }
});
