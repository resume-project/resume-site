import { executeQuery } from '../db/query.js';
import * as memberMapper from '../queries/memberQueries.js';

export async function getAll() {
  return await executeQuery(memberMapper.joinQuery());
}

export async function findByEmail(email) {
  return await executeQuery(memberMapper.getMemberByEmail(email));
}
