const {zokou} = require('../framework/zokou');

zokou({
  nomCom: 'image',
  aliases: ['image2', 'img'],
  reaction: '💱',
  categorie: 'Image'
}, async (dest, zk, context) => {
  try {
    const { repondre, ms, arg } = context;
    const text = arg.join(' ');     
    
    if (!text) return repondre('Please provide a search term (e.g., .image4 dog)');

    // Fetch images from API using axios
    const apiUrl = `https://apis-keith.vercel.app/search/images?query=${encodeURIComponent(text)}`;
    const response = await axios.get(apiUrl);
    
    if (response.status !== 200 || !response.data.status) {
      return repondre(response.data.message || 'API request failed');
    }

    const data = response.data;
    
    if (!data.result || data.result.length === 0) {
      return repondre('No images found for your search term');
    }

    // Limit to 8 images
    const images = data.result.slice(0, 8);
    const picked = [];

    // Download each image using axios
    for (const image of images) {
      try {
        const imageResponse = await axios.get(image.url, { responseType: 'arraybuffer' });
        if (imageResponse.status === 200) {
          picked.push({ 
            buffer: Buffer.from(imageResponse.data), 
            directLink: image.url 
          });
        }
      } catch (e) {
        console.error(`Failed to download image: ${image.url}`, e);
      }
    }

    if (picked.length === 0) {
      return repondre('Failed to download any images. Please try again.');
    }

    // Generate carousel cards
    const carouselCards = await Promise.all(picked.map(async (item, index) => ({
      header: {
        title: `📸 Image ${index + 1}`,
        hasMediaAttachment: true,
        imageMessage: (await generateWAMessageContent({
          image: item.buffer
        }, {
          upload: zk.waUploadToServer
        })).imageMessage
      },
      body: {
        text: `🔍 Search: ${text}`
      },
      footer: {
        text: '🔹 Scroll to see more images'
      },
      nativeFlowMessage: {
        buttons: [
          {
            name: 'cta_url',
            buttonParamsJson: JSON.stringify({
              display_text: '🌐 View Original',
              url: item.directLink
            })
          }
        ]
      }
    })));

    // Generate the carousel message
    const carouselMessage = generateWAMessageFromContent(dest, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: {
            body: {
              text: `🔍 Search Results for: ${text}`
            },
            footer: {
              text: `📂 Found ${picked.length} images`
            },
            carouselMessage: {
              cards: carouselCards
            }
          }
        }
      }
    }, {
      quoted: ms
    });

    // Send the message
    await zk.relayMessage(dest, carouselMessage.message, {
      messageId: carouselMessage.key.id
    });

  } catch (error) {
    console.error('Command error:', error);
    await context.repondre('❌ An error occurred while processing your request!');
  }
});
