const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const postValidation = require('../../validations/post.validation');
const postController = require('../../controllers/post.controller');

const router = express.Router();

const enableValidation = false;

router
  .route('/')
  .post(enableValidation ? validate(postValidation.createPost) : null, postController.createPost) //+
  .get(postController.helloWorld);

//Many on clientside isnt good
router
  //id=1|id=1&id=2...
  .route('/?\\?((id=\\d+)|&)+')
  .post(enableValidation ? validate(postValidation.getManyPosts) : null, postController.getManyPosts);

router.route('/?\\?_end=\\d+(.?*)').get(enableValidation ? validate(postValidation.getList) : null, postController.getList);

router
  .route('/:postId')
  .get(enableValidation ? validate(postValidation.getPost) : null, postController.getPost)
  .delete(enableValidation ? validate(postValidation.deletePost) : null, postController.deletePost)
  .patch(enableValidation ? validate(postValidation.updatePost) : null, postController.updatePost);

//TODO custom request handler

//   .get(validate(postValidation.getPosts), postController.getPosts);

// router
//   .route('/:userId')
//   .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
//   .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
//   .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;

// create: ({ resource, variables, metaData }) => Promise,
// createMany: ({ resource, variables, metaData }) => Promise,
// deleteOne: ({ resource, id, variables, metaData }) => Promise,
// deleteMany: ({ resource, ids, variables, metaData }) => Promise,
// getList: ({ resource, pagination, sort, filters, metaData }) => Promise,
// getMany: ({ resource, ids, metaData }) => Promise,
// getOne: ({ resource, id, metaData }) => Promise,
// update: ({ resource, id, variables, metaData }) => Promise,
// updateMany: ({ resource, ids, variables, metaData }) => Promise,
// custom: ({
//     url,
//     method,
//     sort,
//     filters,
//     payload,
//     query,
//     headers,
//     metaData,
// }) => Promise,
// getApiUrl: () => "",
