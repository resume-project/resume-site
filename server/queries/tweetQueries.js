export const getAllTweets = 'SELECT * FROM tweets';

export const getTweetById = (id) => `
  SELECT * FROM tweets WHERE id = ${id}
`;

export const createTweet = (text, username) => `
  INSERT INTO tweets (text, username) VALUES ('${text}', '${username}')
`;

export const updateTweet = (id, text) => `
  UPDATE tweets SET text = '${text}' WHERE id = ${id}
`;

export const deleteTweet = (id) => `
  DELETE FROM tweets WHERE id = ${id}
`;
