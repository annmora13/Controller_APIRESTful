const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware");
const userController = require('../controllers/user.controller');
const { verifySignUp } = require('../middleware/verifySignUp');


router.post('/signup', [verifySignUp.checkDuplicateEmail], userController.createUser);
router.get("/:id", [authJwt.verifyToken], userController.getUserById);

module.exports = router;
