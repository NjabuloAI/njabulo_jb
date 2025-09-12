const crypto = require('crypto');
const JavaScriptObfuscator = require("javascript-obfuscator");
const { fana } = require("../njabulo/fana");

function twofishEncrypt(data, key) {
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('twofish', key, iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  } catch (error) {
    console.error("Error encrypting code:", error);
    return null;
  }
}

fana({
  nomCom: "obfuscat",
  categorie: 'General'
}, async (dest, zk, commandeOptions) => {
  try {
    const { repondre, arg } = commandeOptions;
    const code = arg.join(" ");
    const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
      // obfuscation options
    }).getObfuscatedCode();
    const key = "mysecretkey";
    const encryptedCode = twofishEncrypt(obfuscatedCode, key);
    if (encryptedCode) {
      repondre(encryptedCode);
    } else {
      repondre("Error obfuscating and encrypting code.");
    }
  } catch (error) {
    console.error("Error obfuscating and encrypting code:", error);
    repondre("Error obfuscating and encrypting code.");
  }
});
