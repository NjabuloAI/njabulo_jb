const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { fana } = require("../njabulo/fana");
const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const fs = require("fs-extra");
const ffmpeg = require("fluent-ffmpeg");
const { Catbox } = require('node-catbox');

const catbox = new Catbox();

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

async function uploadToCatbox(Path) {
  if (!fs.existsSync(Path)) {
    throw new Error("File does not exist");
  }

  try {
    const response = await catbox.uploadFile({
      path: Path 
    });

    if (response) {
      return response; 
    } else {
      throw new Error("Error retrieving the file link");
    }
  } catch (err) {
    throw new Error(String(err));
  }
}

async function convertToMp3(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .toFormat("mp3")
      .on("error", (err) => reject(err))
      .on("end", () => resolve(outputPath))
      .save(outputPath);
  });
}

fana({ nomCom: "url", categorie: "General", reaction: "👨🏿‍💻" }, async (chatId, zk, commandeOptions) => {
  const { msgRepondu, repondre, ms } = commandeOptions;

  if (!msgRepondu) {
    sendFormattedMessage(zk, chatId, 'Please reply to an image, video, or audio file.', ms);
    return;
  }

  let mediaPath, mediaType;

  if (msgRepondu.videoMessage) {
    const videoSize = msgRepondu.videoMessage.fileLength;

    if (videoSize > 50 * 1024 * 1024) {
      sendFormattedMessage(zk, chatId, 'The video is too long. Please send a smaller video.', ms);
      return;
    }

    mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
    mediaType = 'video';
  } else if (msgRepondu.imageMessage) {
    mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
    mediaType = 'image';
  } else if (msgRepondu.audioMessage) {
    mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
    mediaType = 'audio';

    const outputPath = `${mediaPath}.mp3`;

    try {
      await convertToMp3(mediaPath, outputPath);
      fs.unlinkSync(mediaPath); 
      mediaPath = outputPath; 
    } catch (error) {
      console.error("Error converting audio to MP3:", error);
      sendFormattedMessage(zk, chatId, 'Failed to process the audio file.', ms);
      return;
    }
  } else {
    sendFormattedMessage(zk, chatId, 'Unsupported media type. Reply with an image, video, or audio file.', ms);
    return;
  }

  try {
    const catboxUrl = await uploadToCatbox(mediaPath);
    fs.unlinkSync(mediaPath); 

    switch (mediaType) {
      case 'image':
        sendFormattedMessage(zk, chatId, `Here is your URL: ${catboxUrl}`, ms);
        break;
      case 'video':
        sendFormattedMessage(zk, chatId, `Here is your URL: ${catboxUrl}`, ms);
        break;
      case 'audio':
        sendFormattedMessage(zk, chatId, `Here is your URL: ${catboxUrl}`, ms);
        break;
      default:
        sendFormattedMessage(zk, chatId, 'An unknown error occurred.', ms);
        break;
    }
  } catch (error) {
    console.error('Error while creating your URL:', error);
    sendFormattedMessage(zk, chatId, 'Oops, an error occurred.', ms);
  }
});