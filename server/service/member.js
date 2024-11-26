import { executeQuery } from '../db/query.js';
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
  // const isValidPassword = await bcrypt.compare(password, member.MEMBER_PW);
  // if (!isValidPassword) {
  //   throw new Error('Invalid user or password');
  // }

  const accessToken = createJwtToken(member.MEMBER_CD);
  const refreshToken = createRefreshToken(member.MEMBER_CD);

  return { accessToken, refreshToken };
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
  console.log(
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

  await executeQuery(
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
