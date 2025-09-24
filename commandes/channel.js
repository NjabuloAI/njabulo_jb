const { fana } = require("../njabulo/fana");

fana(
  {
    pattern: "all",
    on: "all",
  },
  async (context) => {
    const { zk, m } = context;

    try {
      console.log("Received message:", m);

      // Define the emojis you want to react with
      const reactions = ['👍', '❤️', '😮', '🤩', '🚀', '👽', '💻', '🎉', '😍', '🤣', '😘', '👫', '🤝', '🌟', '🌠', '🏆', '🎊', '👏', '💥', '🔥', '🌈', '🏖️', '🌴', '🏝️', '🐠', '🐳', '🐋', '🌻', '🌺', '💐', '🌼', '🐰', '🐶', '🐱', '🐔', '🐷', '🐴', '🌾', '🌿', '🍃', '🌸', '🍄', '🎈', '🎁', '🏀', '🏈', '⚽️', '🏊‍♀️', '🏋️‍♀️', '🚴‍♀️', '🛹', '🧘‍♀️', '💆‍♀️', '🚣‍♀️', '🏄‍♀️', '🤹‍♀️', '🎤', '🎸', '🎻', '🥁', '🎹', '🎺', '🎻'];

      // Check if the message is from the specific channel
      if (m.chat.id === "12029VbAckOZ7tkj92um4KN3u@g.us") {
        console.log("Message is from the correct channel");

        // React with 70 random emojis
        for (let i = 0; i < 70; i++) {
          const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
          console.log("Sending reaction:", randomReaction);
          await zk.sendMessage(m.chat.id, {
            react: {
              text: randomReaction,
              key: m.key,
            },
          });
        }
      } else {
        console.log("Message is not from the correct channel");
      }
    } catch (error) {
      console.error('Error in autoreact:', error);
    }
  }
);
