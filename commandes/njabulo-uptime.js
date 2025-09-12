const { fana } = require("../njabulo/fana");
const moment = require("moment-timezone");
const { getBuffer } = require("../njabulo/dl/Function");
const { default: axios } = require('axios');

//uptime hh mm ss
    moment.tz.setDefault("Africa/Dar_es_Salaam");
    const hour = moment().hour();
    let greeting = "Good morning";
    if (hour >= 12 && hour < 18) greeting = "Good afternoon!";
    else if (hour >= 18) greeting = "Good evening!";
    else if (hour >= 22 || hour < 5) greeting = "Good night";

    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

//uptime seconds
const runtime = function (seconds) { 
 seconds = Number(seconds); 
 var d = Math.floor(seconds / (3600 * 24)); 
 var h = Math.floor((seconds % (3600 * 24)) / 3600); 
 var m = Math.floor((seconds % 3600) / 60); 
 var s = Math.floor(seconds % 60); 
 var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " d, ") : ""; 
 var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " h, ") : ""; 
 var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " m, ") : ""; 
 var sDisplay = s > 0 ? s + (s == 1 ? " second" : " s") : ""; 
 return dDisplay + hDisplay + mDisplay + sDisplay; 
 } 


fana({ nomCom: 'uptime',
    desc: 'To check runtime',
    Categorie: 'General',
    reaction: '📃', 
    fromMe: 'true', 


  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;
      
    try {
        await zk.sendMessage(dest, { 
        text:  `*🚀 SYSTEM UPTIME* 🔋\n\n🕒 System Time: ${temps}\n*□□□□□□□□□□□□□□□□□□□□□□□□□□*\nDuration: ${runtime(process.uptime())}\n📅 Activated: ${date}\n\n⚡ Performance:\nReliability: 99.98%\n Stability: 96%\n Nodes:\nGlobal Distribution\n\n🔋 Maintenance:\nAuto-Scheduled\n*□□□□□□□□□□□□□□□□□□□□□□□□□□*\n*🌐 Njabulo JB online date* \n Uptime days: ${greeting}\n`,
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

    } catch (e) {
        console.log("❌ uptime Command Error: " + e);
        repondre("❌ Error: " + e);
    }
});

