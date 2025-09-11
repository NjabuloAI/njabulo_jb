const { zokou } = require('../framework/zokou');
var gis = require('g-i-s');

zokou({
  nomCom: "imgi",
  categorie: "Search",
  reaction: "📷"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Which image? !');
    return;
  }

  const searchTerm = arg.join(" ");
  gis(searchTerm, async (error, results) => {
    if (error) {
      repondre("Oops, an error occurred!");
    } else {
      const carouselCards = await Promise.all(results.slice(0, 5).map(async (item, index) => ({
        header: {
          title: `📸 Image ${index + 1}`,
          hasMediaAttachment: true,
          imageMessage: (await generateWAMessageContent({ image: { url: item.url } }, { upload: zk.waUploadToServer })).imageMessage
        },
        body: {
          text: `🔍 Search: ${searchTerm}`
        },
        footer: {
          text: '🔹 Scroll to see more images'
        }
      })));

      const carouselMessage = generateWAMessageFromContent(dest, {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadata: {},
              deviceListMetadataVersion: 2
            },
            interactiveMessage: {
              body: {
                text: `🔍 Search Results for: ${searchTerm}`
              },
              footer: {
                text: `📂 Found ${results.length} images`
              },
              carouselMessage: {
                cards: carouselCards
              }
            }
          }
        }
      }, { quoted: ms });

      await zk.relayMessage(dest, carouselMessage.message, { messageId: carouselMessage.key.id });
    }
  });
});
