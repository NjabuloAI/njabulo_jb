const { fana } = require("../njabulo/fana");
const axios = require('axios');
const crypto = require('crypto');
const conf = require(__dirname + "/../set");

const MIN_SECONDARY_PAGE_ID = 1700;
const MAX_SECONDARY_PAGE_ID_RANGE = 100;

async function generateCfToken() {
    const { data } = await axios.post('https://cf.nekolabs.my.id/action', {
        mode: 'turnstile-min',
        siteKey: '0x4AAAAAAANuFg_hYO9YJZqo',
        url: 'https://aivideogenerator.me/features/g-ai-video-generator'
    });
    return data.token;
}

async function createTask(prompt, image, uid, cfToken) {
    const num = Math.floor(Math.random() * MAX_SECONDARY_PAGE_ID_RANGE) + MIN_SECONDARY_PAGE_ID;
    const { data } = await axios.post('https://aiarticle.erweima.ai/api/v1/secondary-page/api/create', {
        prompt,
        imgUrls: image ? [image] : [],
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
}

async function getTaskStatus(recordId, uid, cfToken) {
    const { data } = await axios.get(`https://aiarticle.erweima.ai/api/v1/secondary-page/api/${recordId}`, {
        headers: {
            uniqueid: uid,
            verify: cfToken
        }
    });
    return data.data;
}

fana({
    nomCom: "veo3",
    aliases: ["veo", "video"],
    reaction: '📜',
    categorie: "AI"
}, async (dest, zk, params) => {
    try {
        const prompt = params.join(' ');
        if (!prompt) return zk.sendMessage(dest, 'Please provide a prompt');

        const cfToken = await generateCfToken();
        const uid = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
        const recordId = await createTask(prompt, null, uid, cfToken);

        zk.sendMessage(dest, 'Generating video, please wait...');

        while (true) {
            const taskStatus = await getTaskStatus(recordId, uid, cfToken);
            if (taskStatus.state === 'fail') {
                return zk.sendMessage(dest, 'Failed to generate video');
            } else if (taskStatus.state === 'success') {
                const result = JSON.parse(taskStatus.completeData);
                zk.sendMessage(dest, result);
                return;
            }
            await new Promise(res => setTimeout(res, 1000));
        }
    } catch (error) {
        console.error(error);
        zk.sendMessage(dest, 'An error occurred');
    }
});
