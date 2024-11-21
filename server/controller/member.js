import e from 'express';
import * as memberQueries from '../service/member.js';

export async function join(req, res) {
  try {
    const [email, password, age, name, gender, tel] = req.body;

    console.log('들어왔어');
    let data = 'ddd';
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}
