import express from 'express';
import * as memberController from '../controller/member.js';
const router = express.Router();

router.post('/join', memberController.join);
