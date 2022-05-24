const Joi = require('joi');
// const { password, objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    type: Joi.string().required(),
    source: Joi.string().required(),
    data: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
    approved: Joi.boolean(),
    posted: Joi.bool(),
  }),
};

module.exports = {
  createPost,
};
// 'post',
// {
//   title: { type: String, required: true, trim: true },
//   type: { type: String, required: true },
//   source: { type: String, required: true, trim: true },
//   data: { type: String, required: true, trim: true },
//   information: {
//     rating: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     dateHint: {
//       type: Date,
//     },
//     tags: [{ type: String }],
//   },
//   approved: { type: Boolean, default: false },
//   posted: { type: Boolean, default: false },
// },
// {
//   timestamps: true,
// }
// );
