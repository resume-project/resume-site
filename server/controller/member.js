import * as memberRepository from '../service/member.js';
import { config } from '../config/env.js';
import { strEncoding } from '../utils/bcryptUtil.js';
import { sendResponse } from '../utils/response.js';

export async function join(req, res, next) {
  try {
    const { email, password, age, name, gender, tel, address, postCode } =
      req.body;

    const roundSalt = config.bcrypt.saltRounds;
    const hashPassword = await strEncoding(roundSalt, password);
    let data = await memberRepository.join(
      email,
      hashPassword,
      age,
      name,
      gender,
      tel,
      address,
      postCode
    );
    console.log(data);
    if (data) sendResponse(res, 201, null, { code: 1 });
    else sendResponse(res, 400, null, { code: 0 });
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
    sendResponse(res, 200, 'Login successful', { accessToken, email });
  } catch (error) {
    next(error);
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie('refreshToken');
    sendResponse(res, 200, 'Logged out successfully');
  } catch (error) {
    sendResponse(res, 500, 'Logout failed');
  }
}

export async function me(req, res, next) {
  try {
    const member = await memberRepository.me(req.memberId);
    if (!member) {
      sendResponse(res, 404, 'User not found');
    }
    sendResponse(res, 200, 'Auth successfully', {
      accessToken: req.accessToken,
      memberId: req.memberId,
      email: member.MEMBER_EMAIL,
    });
  } catch (error) {
    sendResponse(res, 500, 'Auth failed');
  }
}

export async function refreshAccessToken(req, res) {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return sendResponse(res, 401, 'Refresh Token not found');
    }
    const newAccessToken = await memberRepository.refreshAccessToken(
      refreshToken
    );
    sendResponse(res, 200, 'Access Token refreshed', {
      accessToken: newAccessToken,
    });
  } catch (error) {
    sendResponse(res, 403, 'Invalid or expired Refresh Token');
    next(error);
  }
}
