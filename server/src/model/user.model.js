const pool = require("../config/dbConfig");

const registerNewUser = async ({ fullname, company, email, password }) => {
  const { rows } = await pool.query(
    `INSERT INTO users (fullname, company_name, email, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, fullname, company_name, email, is_active, created_at`,
    [fullname, company, email, password],
  );
  return rows[0];
};

const getUserByEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

const updateLastLogin = async (id) => {
  await pool.query("UPDATE users SET last_login_at = now() WHERE id = $1", [
    id,
  ]);
};

module.exports = { registerNewUser, getUserByEmail, updateLastLogin };
