const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");

router.get('/posts', postsController.index);
router.get('/create', postsController.create);
router.get('/:slug/download', postsController.downloadImage);


module.exports = router;