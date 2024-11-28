export const joinQuery = (
  email,
  password,
  age,
  name,
  gender,
  tel,
  address,
  postCode
) => {
  return `
    INSERT INTO member VALUES (
      DEFAULT,
      '${email}',    -- 문자열: 작은따옴표로 감싸줌
      '${password}', -- 문자열: 비밀번호도 문자열로 처리
      '${name}',     -- 문자열: 사용자 이름
      ${age},        -- 숫자: 따옴표 없이 그대로
      '${gender}',   -- 문자열: 성별
      '${address}',  -- 문자열: 주소
      '${postCode}', -- 문자열: 우편번호
      '${tel}',      -- 문자열: 전화번호
      '',            -- bio: 빈 문자열
      DEFAULT,       -- 생성일 (자동 생성)
      DEFAULT        -- 수정일 (자동 업데이트)
    )
  `;
};

export const getMemberByEmail = (email) => `
  SELECT * FROM member WHERE MEMBER_EMAIL = '${email}'
`;

export const getMemberById = (id) => `
  SELECT * FROM member WHERE MEMBER_CD = '${id}'
`;
