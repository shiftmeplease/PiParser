const axios = require("axios");
const { Iconv } = require("iconv");
const fs = require("fs");

const AxiosTransformer = (data, headers) => {
  const iconv = new Iconv("windows-1251", "utf-8");
  data = iconv.convert(data).toString();
  return data;
};

const filterSponsor = "story__sponsor";
const filterimage = "data-large-image";

//TODO video

const id = 4;
axios
  .get(`https://pikabu.ru/?page=${id}`, {
    responseType: "arraybuffer",
    transformResponse: AxiosTransformer,
  })
  .then(async function (response) {
    const storyTest = RegExp(/<!--story_(\d+)_start-->/gm);
    const storiesTest = iterate(storyTest, response.data, 1);
    const stories = cutStories(storiesTest, response.data);
    // console.log(stories);
    // console.log(storiesTest);
    storiesFiltered = stories.filter((v) => {
      return !v.includes(filterSponsor) && v.includes(filterimage);
    });

    const storyData = storiesFiltered.map((v) => {
      return extractData(v);
    });

    for (story of storyData) {
      await sendToMongo(story);
    }
    // postPage(storyData);
    // fs.writeFileSync("./stories.html", storiesFiltered.join("\r\n\r\n\r\n"));
    // fs.writeFileSync("./stories.json", JSON.stringify(storyData, null, "\t"));
    // console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

function iterate(re, data, index) {
  const results = [];
  let match;
  do {
    match = re.exec(data);
    if (match) {
      results.push(match[index]);
    }
  } while (match);
  return results;
}

function cutStories(ids, data) {
  const results = ids.map((id) => {
    const start = `<!--story_${id}_start-->`;
    const end = `<!--story_${id}_end-->`;

    return data.substring(data.indexOf(start), data.lastIndexOf(end) + end.length);
  });
  return results;
}

function extractData(story) {
  const ratingRe = /data-rating="(.*?)"/;
  const dateRe = /data-timestamp="(.*?)"/;
  const dateHintRe = /datetime="(.*?)"/;
  const communityRe = /<span class="story__community-name">(.*?)<\/span>/;
  const titleRe = /<a href="(.*?)" target="_blank"  class="story__title-link">(.*?)<\/a>/;
  const imageLinkRe = /data-large-image="(.*?)"/;
  const dataTag = /data-tag="(.*?)"/g;

  const rating = story.match(ratingRe)[1];
  // const date = new Date(+(story.match(dateRe)[1] + "000")); ??
  const dateHint = story.match(dateHintRe)[1];
  let community;
  if (communityRe.test(story)) {
    community = story.match(communityRe)[1];
  }

  const tags = iterate(dataTag, story, 1);

  const [_, postURL, title] = story.match(titleRe);
  const imageURL = story.match(imageLinkRe)[1];

  return {
    title,
    type: "image",
    source: postURL,
    data: imageURL,
    information: {
      community,
      rating,
      dateHint,
      tags,
    },
  };
}

function postPage(storyData) {
  const { Telegraf } = require("telegraf");

  const bot = new Telegraf("5197931593:AAFgxgA75zjGbB_7BntrO3HoCjAJGR2M6EE");
  bot.start((ctx) => ctx.reply("Welcome"));
  bot.help((ctx) => ctx.reply("Send me a sticker"));
  // bot.on("channel_post", (ctx) => console.log(ctx.update.channel_post));
  bot.hears("hi", (ctx) =>
    ctx.replyWithPhoto(
      {
        url: "https://cs14.pikabu.ru/post_img/big/2022/04/19/9/1650378635174492040.jpg",
      },
      { caption: "Your caption" },
    ),
  );
  bot.launch();
  storyData.map((v) => {
    bot.telegram.sendPhoto(-1001629818261, {
      url: v.imageURL,
      caption: v.title,
    });
  });

  // Enable graceful stop
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

async function sendToMongo(story) {
  try {
    const resp = await axios.post("http://localhost:3000/v1/posts", story);

    console.log(resp.status);
  } catch (e) {
    console.log(e, story);
  }
}
// const postSchema = mongoose.Schema(
//   {
//     title: { type: String, required: true, trim: true },
//     type: { type: String, required: true },
//     source: { type: String, required: true, trim: true },
//     data: { type: String, required: true, trim: true },
//     information: {
//       rating: {
//         type: Number,
//         required: true,
//         default: 0,
//       },
//       dateHint: {
//         type: Date,
//       },
//       tags: [{ type: String }],
//     },
//     approved: { type: Boolean, default: false },
//     posted: { type: Boolean, default: false },
//   },
//   {
//     timestamps: true,
//   },
// );
