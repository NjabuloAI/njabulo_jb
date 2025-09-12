const JavaScriptObfuscator = require("javascript-obfuscator");
const { fana } = require("../njabulo/fana");
const conf = require("../set");

fana({
  nomCom: "obfuscate",
  categorie: 'General'
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;
  const code = arg.join(" ");
  const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    deadCodeInjection: true,
    debugProtection: true,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'mangled',
    log: false,
    numbersToExpressions: true,
    renameGlobals: true,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    stringArray: true,
    stringArrayEncoding: 'rc4',
    stringArrayThreshold: 1,
    unicodeEscapeSequence: true,
    transformObjectKeys: true,
  }).getObfuscatedCode();
  repondre(obfuscatedCode);
});
