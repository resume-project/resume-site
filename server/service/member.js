import { executeQuery } from '../db/query.js';
import { joinQuery } from '../queries/memberQueries.js';

export async function getAll() {
  return await executeQuery(joinQuery);
}
