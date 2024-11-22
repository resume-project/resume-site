import express from 'express';
import * as memberController from '../controller/member.js';

const router = express.Router();

router.post('/join', memberController.join);

router.post('/login', memberController.login);

router.get('/logout', memberController.logout);

router.get('/token/refresh', memberController.refreshAccessToken);

export default router;
