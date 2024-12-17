import express from 'express';
import * as memberController from '../controller/member.js';

const router = express.Router();

router.post('/join', memberController.join);

router.post('/login', memberController.login);

router.get('/logout', memberController.logout);

router.get('/token/refresh', memberController.refreshAccessToken);

router.get(
  '/joinEmailAuthentication',
  memberController.joinEmailAuthentication
);

export default router;
