const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

const createPost = async (postBody) => {
  if (await Post.isPostParsed(postBody.source)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Post already parsed');
  }
  return Post.create(postBody);
};

const findIds = async (postBody) => {
  const { ids } = postBody;
  const cursor = await Post.find({}).sort({ createdAt: 'desc' }).cursor();
  // const { cursor } = query;
  const result = [];
  let currentId = 0;
  //TODO revert if ids in reverse order
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    if (ids.includes(currentId++)) {
      result.push({ sortId: currentId, ...doc.toObject() });
    }
  }
  return result;
};

const getList = async (postBody) => {
  const { query, queryFilters } = postBody;

  //TODO implement filters

  const cursor = await Post.find({})
    .sort({ [query._sort]: query._order })
    .cursor();
  // const { cursor } = query;
  const result = [];
  let currentId = 0;
  //TODO revert if ids in reverse order
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    currentId++;
    if (query._start <= currentId && query._end >= currentId) {
      result.push({ sortId: currentId, ...doc.toObject() });
    }
  }
  return result;
};

// _start: number;
//       _end: number;
//       _sort?: string;
//       _order?: string;

module.exports = {
  createPost,
  findIds,
  getList,
};
