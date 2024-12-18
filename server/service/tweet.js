import { executeQuery } from '../db/query.js';
import { getAllTweets } from '../queries/tweetQueries.js';

export async function getAll() {
  return await executeQuery(getAllTweets);
}

// let tweets = [
//   {
//     id: '1',
//     text: '화이팅!',
//     createdAt: Date.now().toString(),
//     name: 'Bob',
//     username: 'bob',
//     url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
//   },
//   {
//     id: '2',
//     text: '안녕!',
//     createdAt: Date.now().toString(),
//     name: 'Ellie',
//     username: 'ellie',
//   },
// ];

// export async function getAllByUsername(username) {
//   return tweets.filter((tweet) => tweet.username === username);
// }

// export async function getById(id) {
//   return tweets.find((tweet) => tweet.id === id);
// }

// export async function create(text, name, username) {
//   const tweet = {
//     id: Date.now().toString(),
//     text,
//     createdAt: new Date(),
//     name,
//     username,
//   };
//   tweets = [tweet, ...tweets];
//   return tweet;
// }

// export async function update(id, text) {
//   const tweet = tweets.find((tweet) => tweet.id === id);
//   if (tweet) {
//     tweet.text = text;
//   }
//   return tweet;
// }

// export async function remove(id) {
//   tweets = tweets.filter((tweet) => tweet.id !== id);
// }
