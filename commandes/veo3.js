const { fana } = require("../njabulo/fana");
const axios = require('axios');
const crypto = require('crypto');

const MIN_SECONDARY_PAGE_ID = 1700;
const MAX_SECONDARY_PAGE_ID_RANGE = 100;

async function generateCfToken() {
    try {
        const { data } = await axios.post('https://cf.nekolabs.my.id/action', {
            mode: 'turnstile-min',
            siteKey: '0x4AAAAAAANuFg_hYO9YJZqo',
            url: 'https://aivideogenerator.me/features/g-ai-video-generator'
        });
        return data.token;
    } catch (error) {
        console.error('Error generating CF token:', error);
        throw error;
    }
}

async function createTask(prompt, uid, cfToken) {
    try {
        const num = Math.floor(Math.random() * MAX_SECONDARY_PAGE_ID_RANGE) + MIN_SECONDARY_PAGE_ID;
        const { data } = await axios.post('https://aiarticle.erweima.ai/api/v1/secondary-page/api/create', {
            prompt: prompt,
            imgUrls: [],
            quality: '720p',
            duration: 8,
            autoSoundFlag: false,
            soundPrompt: '',
            autoSpeechFlag: false,
            speechPrompt: '',
            speakerId: 'Auto',
            aspectRatio: '16:9',
            secondaryPageId: num,
            channel: 'VEO3',
            source: 'aivideogenerator.me',
            type: 'features',
            watermarkFlag: true,
            privateFlag: true,
            isTemp: true,
            vipFlag: true,
            model: 'veo-3-fast'
        }, {
            headers: {
                uniqueid: uid,
                verify: cfToken
            }
        });
        return data.data.recordId;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
}

async function getTaskStatus(recordId, uid, cfToken) {
    try {
        const { data } = await axios.get(`https://aiarticle.erweima.ai/api/v1/secondary-page/api/${recordId}`, {
            headers: {
                uniqueid: uid,
                verify: cfToken
            }
        });
        return data.data;
    } catch (error) {
        console.error('Error getting task status:', error);
        throw error;
    }
}

fana({
    nomCom: "veo3",
    aliases: ["veo", "video"],
    reaction: '📜',
    categorie: "AI"
}, async (dest, zk, params) => {
    try {
        const prompt = params.join(' ');
        if (!prompt) {
            zk.sendMessage(dest, 'Please provide a prompt');
            return;
        }

        zk.sendMessage(dest, 'Generating video, please wait...');

        const cfToken = await generateCfToken();
        const uid = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
        const recordId = await createTask(prompt, uid, cfToken);

        while (true) {
            const taskStatus = await getTaskStatus(recordId, uid, cfToken);
            if (taskStatus.state === 'success') {
                const result = JSON.parse(taskStatus.completeData);
                if (result.video_url) {
                    zk.sendMessage(dest, `Video generated: ${result.video_url}`);
                } else {
                    zk.sendMessage(dest, `Video generated: ${JSON.stringify(result)}`);
                }
                return;
            } else if (taskStatus.state === 'fail') {
                zk.sendMessage(dest, 'Failed to generate video');
                return;
            }
            await new Promise(res => setTimeout(res, 1000));
        }
    } catch (error) {
        console.error('Error occurred:', error);
        zk.sendMessage(dest, 'An error occurred');
    }
});
