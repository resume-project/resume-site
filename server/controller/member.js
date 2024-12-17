import * as memberRepository from '../service/member.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { strEncoding } from '../utils/bcryptUtil.js';
import { mailSend } from '../utils/mailSend.js';

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

    const member = await memberRepository.findByCd(data.insertId);

    const emailAuthenticationCode = await strEncoding(
      roundSalt,
      email + name + gender
    );

    if (data) {
      const resetLink =
        'http://localhost:3000/member/joinEmailAuthentication?key=' +
        emailAuthenticationCode +
        '&MemberCd=' +
        member[0].MEMBER_CD;

      // HTML 이메일 내용
      const emailHtml = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>비밀번호 인증 메일</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f7fc;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 50px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            }
            .email-header {
                text-align: center;
                margin-bottom: 30px;
            }
            .email-header h1 {
                color: #4CAF50;
                font-size: 36px;
                margin: 0;
            }
            .email-header p {
                font-size: 18px;
                color: #666;
            }
            .email-body {
                font-size: 16px;
                line-height: 1.6;
                color: #333;
            }
            .btn {
                display: inline-block;
                padding: 15px 30px;
                font-size: 18px;
                font-weight: bold;
                color: #fff;
                background-color: #4CAF50;
                border-radius: 5px;
                text-decoration: none;
                text-align: center;
                margin-top: 20px;
            }
            .btn:hover {
                background-color: #45a049;
            }
            .footer {
                margin-top: 30px;
                font-size: 14px;
                color: #aaa;
                text-align: center;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>회원가입 이메일 인증</h1>
                <p>회원가입을 완료하시려면 아래 버튼을 클릭하세요.</p>
            </div>
            <div class="email-body">
                <p>안녕하세요,</p>
                <p>귀하의 이메일에 대해 이력서 사이트 회원가입 요청이 있었습니다. 만약 이 요청을 하신 기억이 없다면, 이 이메일을 무시하셔도 됩니다.</p>
                <p>회원가입을 마무리 하시려면 아래의 버튼을 클릭하여 인증을 완료해주세요.</p>
                <a href="${resetLink}" class="btn">회원가입 완료</a>
            </div>
            <div class="footer">
                <p>본 메일은 자동으로 발송된 메일입니다. 회신하지 마세요.</p>
                <p>만약 이메일이 잘못 전달되었거나 문제 발생 시 고객센터에 문의해 주세요.</p>
            </div>
        </div>
    </body>
    </html>
  `;
      let result = mailSend({
        sender: '',
        receiver: email,
        subject: '이력서 사이트 회원가입 이메일 인증',
        text: emailHtml,
      });

      result = memberRepository.createMailAuthInfo({
        authCd: emailAuthenticationCode,
        memberCd: member[0].MEMBER_CD,
      });

      if (result) res.status(200).json({ code: 1 });
    } else res.status(200).json({ code: 0 });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { accessToken, refreshToken, member } = await memberRepository.login(
      email,
      password
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });

    res.status(200).json({ token: accessToken, member: member });
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

export async function findId(req, res, next) {
  try {
    const { name, tel } = req.body;

    memberRepository.findId({ name, tel });
  } catch (error) {
    res.status(403).json({ message: error });
    next(error);
  }
}

export async function joinEmailAuthentication(req, res, next) {
  try {
    const key = req.query.key;
    const MemberCd = req.query.MemberCd;
    const data = await memberRepository.joinEmailAuthentication(key, MemberCd);

    if (data === 1)
      // 회원가입 완료 후 리다이렉트
      res.redirect('http://localhost:8080?join=joinSuccess');
    else res.status(500).json({ code: 500, msg: '회원가입 실패' });
  } catch (error) {
    res.status(500).json({ message: error });
    next(error);
  }
}
