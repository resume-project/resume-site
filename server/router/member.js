import express from 'express';
import * as memberController from '../controller/member.js';

const router = express.Router();

router.post('/join', memberController.join);

router.post('/login', memberController.login);

router.get('/refreshAccessToken', memberController.refreshAccessToken);

export default router;
