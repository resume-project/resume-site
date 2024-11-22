import * as memberRepository from '../service/member.js';
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export async function join(req, res, next) {
  try {
    const [email, password, age, name, gender, tel] = req.body;

    console.log('들어왔어');
    let data = 'ddd';
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  const member = await memberRepository.findByEmail(email);
  if (!member) {
    return res.status(401).json({ message: 'Invalid user or password' });
  }
  // const isValidPassword = await bcrypt.compare(password, member.MEMBER_PW);
  // if (!isValidPassword) {
  //   return res.status(401).json({ message: 'Invalid user or password' });
  // }
  const token = createJwtToken(member.MEMBER_CD);
  const refreshToken = createRefreshToken(member.MEMBER_CD);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
  });

  res.status(200).json({ token, email });
}

export async function logout(req, res) {
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logged out successfully' });
}

export async function refreshAccessToken(req, res) {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh Token not found' });
  }

  try {
    const decoded = jwt.verify(refreshToken, config.jwt.refreshSecretKey);
    const newAccessToken = createJwtToken(decoded.id);

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired Refresh Token' });
  }
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

function createRefreshToken(id) {
  return jwt.sign({ id }, config.jwt.refreshSecretKey, {
    expiresIn: config.jwt.refreshExpiresInSec,
  });
}
