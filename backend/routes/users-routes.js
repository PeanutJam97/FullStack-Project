const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controllers');

const router = express.Router();

router.get('/', usersController.getUsers);


router.post(
    '/signup',
    [
      check('username')
        .not()
        .isEmpty(),
      check('email')
        .normalizeEmail() // Test@test.com => test@test.com
        .isEmail(),
      check('password').isLength({ min: 6 })
    ],
    usersController.signup
  );
  
router.post('/login', usersController.login);

router.post('/changepassword', usersController.changepassword);

router.post('/changeemail', usersController.changeemail);
  
module.exports = router;
  