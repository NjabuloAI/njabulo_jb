const { fana } = require("../njabulo/fana");
const { generateWAMessageFromContent, proto } = require("@whiskeysockets/baileys");
const JavaScriptObfuscator = require("javascript-obfuscator");

const commandInfo = {
  nomCom: "f",
  categorie: "Coding"
};

fana(commandInfo, async (dest, zk, commandInfo) => {
  const { arg, repondre } = commandInfo;

  try {
    let jsCode = arg.join(" ");
    
    if (!jsCode) {
      await repondre("After the command, provide a js code to obfuscate");
      return;
    }

    const obfuscationOptions = {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1,
      numbersToExpressions: true,
      simplify: true,
      stringArrayShuffle: true,
      splitStrings: true,
      stringArrayThreshold: 1
    };

    const obfuscatedResult = JavaScriptObfuscator.obfuscate(jsCode, obfuscationOptions);
    const obfuscatedCode = obfuscatedResult.getObfuscatedCode();

    const buttons = [{
      'name': "cta_copy",
      'buttonParamsJson': JSON.stringify({
        'display_text': "COPY CODE",
        'id': "copy_code",
        'copy_code': obfuscatedCode
      })
    }];

    const messageContextInfo = {
      deviceListMetadata: {},
      deviceListMetadataVersion: 2
    };

    const bodyContent = {
      text: obfuscatedCode
    };

    const headerContent = {
      title: '',
      subtitle: '',
      hasMediaAttachment: false
    };

    const nativeFlowContent = {
      'buttons': buttons
    };

    const interactiveMessage = generateWAMessageFromContent(dest, {
      'viewOnceMessage': {
        'message': {
          'messageContextInfo': messageContextInfo,
          'interactiveMessage': proto.Message.InteractiveMessage.create({
            'body': proto.Message.InteractiveMessage.Body.create(bodyContent),
            'footer': proto.Message.InteractiveMessage.Footer.create({
              'text': "> ʟᴇᴏɴᴀʀᴅ_MD*"
            }),
            'header': proto.Message.InteractiveMessage.Header.create(headerContent),
            'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.create(nativeFlowContent)
          })
        }
      }
    }, {});

    await zk.relayMessage(dest, interactiveMessage.message, {
      'messageId': interactiveMessage.key.id
    });

    await repondre("Code Successfully Encrypted");

  } catch (error) {
    console.error('Error:', error);
    await repondre("Something is wrong, check if your code is logical and has the correct syntax");
  }
});
