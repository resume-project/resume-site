import bcrypt from 'bcrypt';

export async function strEncoding(saltRounds, password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds); // Waiting for salt generation
    const hash = await bcrypt.hash(password, salt); // Waiting for hash generation
    return hash; // Return the generated hash
  } catch (err) {
    console.error(err);
    return ''; // Return an empty string if there's an error
  }
}
