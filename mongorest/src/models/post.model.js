const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true },
    source: { type: String, required: true, trim: true },
    data: { type: String, required: true, trim: true },
    information: {
      rating: {
        type: Number,
        required: true,
        default: 0,
      },
      dateHint: {
        type: Date,
      },
      tags: [{ type: String }],
    },
    approved: { type: Boolean, default: false },
    posted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// {
//     "rating": "3910",
//     "date": "1650574626",
//     "dateHint": "2022-04-20T19:39:23+03:00",
//     "postURL": "https://pikabu.ru/story/da_chto_tyi_ponimaesh_v_istinnom_kayfe_shchenok_9041780",
//     "title": "Да что ты понимаешь в истинном кайфе щенок",
//     "imageURL": "https://cs12.pikabu.ru/post_img/2022/04/20/10/1650472733145368161.jpg",
//     "tags": ["Утро", "Трусы", "Кайф", "Переписка", "Скриншот", "Повтор"]
//   },

// add plugin that converts mongoose to json
postSchema.plugin(toJSON);
postSchema.plugin(paginate);

postSchema.statics.isPostParsed = async function (source, excludePostId) {
  const post = await this.findOne({ source, _id: { $ne: excludePostId } });
  return !!post;
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
