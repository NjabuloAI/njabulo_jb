const { fana } = require(__dirname + "/../njabulo/fana");
const nlp = require('compromise');

fana({
  nomCom: "home",
  categorie: "English Homework",
  reaction: "🏓"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;
  const userMessage = arg.join(" ");

  const doc = nlp(userMessage);
  const topics = doc.topics().out('array');
  const intent = doc.intent().out('array');

  if (topics.includes('grammar')) {
    repondre("I'd be happy to help with grammar! What specific topic do you need help with?");
  } else if (topics.includes('vocabulary')) {
    repondre("I'd be happy to help with vocabulary! What's the context?");
  } else if (topics.includes('essay') || topics.includes('writing')) {
    repondre("I'd be happy to help with essay writing! What's the topic?");
  } else if (intent.includes('question')) {
    repondre("That's a great question! Can you provide more context?");
  } else {
    repondre("I didn't understand that. Can you please rephrase?");
  }
});
