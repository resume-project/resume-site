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

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken } = await memberRepository.login(
      email,
      password
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });

    res.status(200).json({ token: accessToken, email });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res) {
  res.clearCookie('refreshToken');
  res.status(200).json({ message: 'Logged out successfully' });
}

export async function refreshAccessToken(req, res) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh Token not found' });
    }

    const newAccessToken = await memberRepository.refreshAccessToken(
      refreshToken
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired Refresh Token' });
    next(error);
  }
}
