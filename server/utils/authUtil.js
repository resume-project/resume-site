import { config } from '../config/env.js';
import * as memberRepository from '../service/member.js';
import { verifyToken } from './jwtUtil.js';

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth = async (req, res, next) => {
  // 토큰 검사
  let accessToken;
  const authHeader = req.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    accessToken = authHeader.split(' ')[1];
  }
  if (!accessToken) {
    return res.status(401).json(AUTH_ERROR);
  }
  const decoded = verifyToken(accessToken, config.jwt.secretKey);

  // 회원 검사
  const members = await memberRepository.findById(decoded.id);
  const member =
    Array.isArray(members) && members.length > 0 ? members[0] : null;
  if (!member) {
    return res.status(401).json(AUTH_ERROR);
  }
  req.userId = member.MEMBER_CD;
  req.accessToken = accessToken;
  next();
};
