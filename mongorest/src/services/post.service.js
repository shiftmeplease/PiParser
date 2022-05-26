const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

const createPost = async (postBody) => {
  if (await Post.isPostParsed(postBody.source)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Post already parsed');
  }
  return Post.create(postBody);
};

const findIds = async (ids) => {
  ids = [1];
  const cursor = await Post.find({}).sort({ createdAt: 'desc' }).cursor();
  // const { cursor } = query;
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    console.log(doc);
  }
  return {};
};

module.exports = {
  createPost,
  findIds,
};
