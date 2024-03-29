const express = require('express');
const auth = require('../../middlewares/auth');
const { validate } = require('../../middlewares/validate');
const postValidation = require('../../validations/post.validation');
const postController = require('../../controllers/post.controller');

const router = express.Router();

const validateBool = false;

router
  .route('/')
  .post(validate(postValidation.createPost, validateBool), postController.createPost) //+
  .get(postController.helloWorld);

//Many on clientside isnt good
router
  //id=1|id=1&id=2...
  .route('/getMany')
  // .route('/getMany')
  .post(validate(postValidation.getManyPosts, validateBool), postController.getManyPosts);

router.route('/getList').post(validate(postValidation.getList, validateBool), postController.getList);

router
  .route('/:postId')
  .get(validate(postValidation.getPost, validateBool), postController.getPost)
  .delete(validate(postValidation.deletePost, validateBool), postController.deletePost)
  .patch(validate(postValidation.updatePost, validateBool), postController.updatePost);

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
