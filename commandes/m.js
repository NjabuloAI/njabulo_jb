const {zokou} = require('../framework/zokou');
var gis = require('g-i-s');

zokou({
    pattern: "image",
    alias: ["image2", "image3"],
    desc: "Search and download images",
    category: "Download",
    react: "🐦",
    filename: __filename
}, async (context) => {
    try {
        const { client, m, text, reply } = context;
        
        if (!text) return reply("Please provide a search term (e.g., .image4 dog)");

        // Fetch images from API
        const apiUrl = `https://apis-keith.vercel.app/search/images?query=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            return await reply(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.status || !data.result || data.result.length === 0) {
            return await reply("No images found for your search term");
        }

        // Limit to 8 images
        const images = data.result.slice(0, 8);
        let picked = [];

        // Download each image
        for (const image of images) {
            try {
                const res = await fetch(image.url);
                if (!res.ok) continue;
                const buffer = await res.buffer();
                picked.push({ buffer, directLink: image.url });
            } catch (e) {
                console.error(`Failed to download image: ${image.url}`, e);
            }
        }

        if (picked.length === 0) {
            return await reply("Failed to download any images. Please try again.");
        }

        // Generate carousel cards
        const carouselCards = await Promise.all(picked.map(async (item, index) => ({
            header: {
                title: `📸 Image ${index + 1}`,
                hasMediaAttachment: true,
                imageMessage: (await generateWAMessageContent({
                    image: item.buffer
                }, {
                    upload: client.waUploadToServer
                })).imageMessage
            },
            body: {
                text: `🔍 Search: ${text}`
            },
            footer: {
                text: "🔹 Scroll to see more images"
            },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "🌐 View Original",
                            url: item.directLink
                        })
                    }
                ]
            }
        })));

        // Generate the carousel message
        const carouselMessage = generateWAMessageFromContent(m.chat, {
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
            quoted: m
        });

        // Send the message
        await client.relayMessage(m.chat, carouselMessage.message, {
            messageId: carouselMessage.key.id
        });

    } catch (error) {
        console.error('Command error:', error);
        await context.reply('❌ An error occurred while processing your request!');
    }
});
