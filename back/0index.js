const { Telegraf } = require("telegraf");

const bot = new Telegraf("5197931593:AAFgxgA75zjGbB_7BntrO3HoCjAJGR2M6EE");
bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("channel_post", (ctx) => console.log(ctx.update.channel_post));
bot.hears("hi", (ctx) =>
  ctx.replyWithPhoto(
    {
      url: "https://cs14.pikabu.ru/post_img/big/2022/04/19/9/1650378635174492040.jpg",
    },
    { caption: "Your caption" }
  )
);
bot.launch();
bot.telegram.sendVideo(-1001629818261, {
  url: "https://cs14.pikabu.ru/video/2022/04/21/1650508667240756149_406x720.webm",
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
  