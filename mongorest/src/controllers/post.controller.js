const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { postService } = require('../services');

const createPost = catchAsync(async (req, res) => {
  const post = await postService.createPost(req.body);
  res.status(httpStatus.CREATED).send(post);
});

const helloWorld = async (req, res) => {
  res.status(200).send({ hello: 'world' });
};

const getManyPosts = catchAsync(async (req, res) => {
  const posts = await postService.findIds(req.body);

  //no content if not found
  res.status(200).send(posts);
});

const getList = async (req, res) => {
  const posts = await postService.getList(req.body);

  //no content if not found
  //TODO HEADER x-total-count
  res.status(200).send(posts);
};
const getPost = async (req, res) => {
  res.status(200).send({ hello: 'world' });
};
const deletePost = async (req, res) => {
  res.status(200).send({ hello: 'world' });
};
const updatePost = async (req, res) => {
  res.status(200).send({ hello: 'world' });
};

// const getUsers = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['name', 'role']);
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   const result = await userService.queryUsers(filter, options);
//   res.send(result);
// });

// const getUser = catchAsync(async (req, res) => {
//   const user = await userService.getUserById(req.params.userId);
//   if (!user) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
//   }
//   res.send(user);
// });

// const updateUser = catchAsync(async (req, res) => {
//   const user = await userService.updateUserById(req.params.userId, req.body);
//   res.send(user);
// });

// const deleteUser = catchAsync(async (req, res) => {
//   await userService.deleteUserById(req.params.userId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

module.exports = {
  createPost,
  helloWorld,
  getManyPosts,
  getList,
  getPost,
  deletePost,
  updatePost,
  //   getUsers,
  //   getUser,
  //   updateUser,
  //   deleteUser,
};
