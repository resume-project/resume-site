import e from 'express';
import * as tweetRepository from '../service/tweet.js';

export async function getTweets(req, res, next) {
  try {
    const username = req.query.username;
    const data = await (username
      ? tweetRepository.getAllByUsername(username)
      : tweetRepository.getAll());
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

export async function getTweet(req, res, next) {
  try {
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id);
    if (tweet) {
      res.status(200).json(tweet);
    } else {
      res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
  } catch (error) {
    next(error);
  }
}

export async function createTweet(req, res, next) {
  try {
    const { text, name, username } = req.body;
    const tweet = await tweetRepository.create(text, name, username);
    res.status(201).json(tweet);
  } catch (error) {
    next(error);
  }
}

export async function updateTweet(req, res, next) {
  try {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.update(id, text);
    if (tweet) {
      res.status(200).json(tweet);
    } else {
      res.status(404).json({ message: `Tweet id(${id}) not found` });
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteTweet(req, res, next) {
  try {
    const id = req.params.id;
    await tweetRepository.remove(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
