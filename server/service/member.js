import { executeQuery } from '../db/query.js';
import bcrypt from 'bcrypt';
import * as memberMapper from '../queries/memberQueries.js';
import { generateToken, verifyToken } from '../utils/jwtUtil.js';
import { config } from '../config/env.js';

export async function getAll() {
  return await executeQuery(memberMapper.joinQuery());
}

export async function findByEmail(email) {
  return executeQuery(memberMapper.getMemberByEmail(email));
}

export async function login(email, password) {
  const member = await findByEmail(email);

  if (!member) {
    throw new Error('Invalid member or password');
  }

  // 비밀번호 검증
  const isValidPassword = await bcrypt.compare(password, member.MEMBER_PW);
  if (!isValidPassword) {
    throw new Error('Invalid user or password');
  }

  const accessToken = createJwtToken(member.MEMBER_CD);
  const refreshToken = createRefreshToken(member.MEMBER_CD);

  return { accessToken, refreshToken, member };
}

export function createJwtToken(id) {
  return generateToken({ id }, config.jwt.secretKey, config.jwt.expiresInSec);
}

export function createRefreshToken(id) {
  return generateToken(
    { id },
    config.jwt.refreshSecretKey,
    config.jwt.refreshExpiresInSec
  );
}

export async function refreshAccessToken(refreshToken) {
  const decoded = verifyToken(refreshToken, config.jwt.refreshSecretKey);
  return createJwtToken(decoded.id);
}

export async function join(
  email,
  password,
  age,
  name,
  gender,
  tel,
  address,
  postCode
) {
  return await executeQuery(
    memberMapper.joinQuery(
      email,
      password,
      age,
      name,
      gender,
      tel,
      address,
      postCode
    )
  );
}

export async function findId() {}

export async function joinEmailAuthentication(key, cd) {
  try {
    const result = await executeQuery(memberMapper.findByCd(cd));

    const isMatch = await bcrypt.compare(
      result[0].MEMBER_EMAIL + result[0].MEMBER_NM + result[0].MEMBER_GENDER,
      key
    );

    if (isMatch) {
      let result = executeQuery(memberMapper.updateMemberStatus('Y'), cd);
      if (result) return 1;
      else return 0;
    } else {
      // 인증 실패
      return 0;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function findByCd(cd) {
  try {
    const member = await executeQuery(memberMapper.findByCd(cd));
    return member;
  } catch (error) {
    console.log(error);
  }
}

export async function createMailAuthInfo(data) {
  try {
    const result = await executeQuery(
      memberMapper.createMailAuthInfo(data.authCd, data.memberCd)
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
