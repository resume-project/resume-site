export const joinQuery = () => {
  return "INSERT INTO member VALUES (DEFAULT, 'testMail@test.com', '1234', '풍돌이', 26, 'MALE', '대전광역시 도안동','12345', '010-4144-2554', '안녕하세요 풍 돌멩이라고 합니다.',DEFAULT, DEFAULT);"; // 테스트
};

export const getMemberByEmail = (email) => `
  SELECT * FROM member WHERE MEMBER_EMAIL = '${email}'
`;
