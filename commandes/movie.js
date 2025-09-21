const { fana } = require("../njabulo/fana");
const axios = require('axios');
const ytSearch = require('yt-search');
const conf = require(__dirname + '/../set');
const moment = require("moment-timezone");


fana({
  nomCom: "kdrama",
  aliases: ["vid", "mp4", "movie"],
  categorie: "download",
  reaction: "🎥"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, userJid } = commandOptions;

    if (!superUser) {
    return repondre("This command is for the owner or Njabulo Jb use");
    }

  try {
    await zk.sendMessage(dest, { 
      text: 'searching for you episode movie',
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
    console.log('Searching for video...');

    if (!arg) {
      console.log('No argument provided');
      return zk.sendMessage(dest, { 
        text: 'Please provide a video name or keyword.',
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

    if (!arg.join(' ').toLowerCase().includes('episode')) {
      return repondre("Only kdrama episode work");
    }
    

    console.log('Argument provided:', arg);
    const query = arg.join(' ');
    console.log('Query:', query);

    console.log('[VIDEO] Searching YT for:', query);
    const search = await ytSearch(query);
    console.log('Search result:', search);

    if (!search || !search.videos || !search.videos[0]) {
      console.log('No video found');
      return zk.sendMessage(dest, { 
        text: 'No results found for your query.',
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
    const fileName = `${safeTitle}.mp4`;
    const apiURL = `https://noobs-api.top/dipto/ytDl3?link=${encodeURIComponent(video.videoId)}&format=mp4`;

    console.log('API URL:', apiURL);
    try {
      const response = await axios.get(apiURL);
      if (response.status !== 200) {
        console.log('API request failed with status code:', response.status);
        await zk.sendMessage(dest, { 
          text: 'Failed to retrieve the MP4 download link. Please try again later.',
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
          text: 'Failed to retrieve the MP4 download link.',
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
        caption: `🎥 tιtᥣᥱ: *${video.title}*
🎞️ dᥙrᥲtιon: *${video.timestamp}*
📽️ vιᥱᥕs: *${video.views.toLocaleString()}*
📹 ᥙρᥣoᥲdᥱd: *${video.ago}*
📺 ᥴhᥲnnᥱᥣ: *${video.author.name}*

🔗 url ${video.url}
🌇 *hᥲᥣᥣo fᥲmιᥣყ  ${greeting}*`,
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
        document: { url: data.downloadLink },
        mimetype: 'video/x-msvideo',
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
                    displayName: "NנɐႦυℓσ נႦ✆︎",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Njabulo-Jb;BOT;;;\nFN:Njabulo-Jb\nitem1.TEL;waid=26777821911:+26777821911\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });
      console.log('Video file sent');
    } catch (err) {
      console.error('[VIDEO] API Error:', err);
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
    console.error('[VIDEO] Error:', err);
    await zk.sendMessage(dest, { text: 'An error occurred: ' + err.message });
  }
});
