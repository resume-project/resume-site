import express from 'express';
import * as memberController from '../controller/member.js';
import { isAuth } from '../utils/authUtil.js';

const router = express.Router();

router.post('/join', memberController.join);

router.post('/login', memberController.login);

router.get('/logout', isAuth, memberController.logout);

router.get('/me', isAuth, memberController.me);

router.get('/token/refresh', memberController.refreshAccessToken);

export default router;
