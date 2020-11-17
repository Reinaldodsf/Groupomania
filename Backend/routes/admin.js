const express = require('express');
const router = express.Router();

//Link to Middleware js files
const auth = require('../middleware/auth');
//Link Controllers
const adminCtrl = require('../controllers/admin');

//Routes available and the endpoints
router.get('/comments', auth, adminCtrl.getAllComments);
router.get('/posts', auth, adminCtrl.getAllPosts);
router.delete('/comment/:id', auth, adminCtrl.deleteComment);
router.delete('/post/:id', auth, adminCtrl.deletePost);

module.exports = router;