const express = require('express');

const { register, login, uploadAvatar, getAllTrip } = require('../controllers/user.controllers');
const { authenticate } = require('../middlewares/auth/authenticate');
const { uploadImage } = require('../middlewares/upload/upload-image');

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);

// Ở đây upload.single('avatar') với key là avatar thì bên postman phải nhập đúng key là avatar chỗ form data
userRouter.post('/upload-avatar', authenticate, uploadImage('nhaxe'), uploadAvatar)

userRouter.get('/all-trips', getAllTrip)

module.exports = {
    userRouter
}