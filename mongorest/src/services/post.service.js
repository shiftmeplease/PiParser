const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

const createPost = async (postBody) => {
  if (await Post.isPostParsed(postBody.source)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Post already parsed');
  }
  return Post.create(postBody);
};

module.exports = {
  createPost,
};
