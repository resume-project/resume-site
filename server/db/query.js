import pool from '../config/db.js';

// 쿼리 실행 함수
export async function executeQuery(sql, params = []) {
  let connection;
  try {
    connection = await pool.getConnection();
    const [results] = await connection.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query failed:', error.message);
    throw new Error('Database query failed');
  } finally {
    if (connection) connection.release();
  }
}

// 트랜잭션 실행 함수
export async function runTransaction(queries) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    for (const query of queries) {
      await connection.execute(query.sql, query.params);
    }

    await connection.commit();
  } catch (error) {
    if (connection) await connection.rollback();
    console.error('Transaction failed:', error.message);
    throw new Error('Transaction failed');
  } finally {
    if (connection) connection.release();
  }
}
