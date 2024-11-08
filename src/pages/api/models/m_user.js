// models/User.js

import pool from "../../../lib/db";
import bcrypt from "bcrypt";

export async function createUser({ name, username, email, password, status, created, createdBy }) {
  try {
    // Hash password sebelum menyimpan ke database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Query untuk menambahkan user baru
    const query = `
      INSERT INTO t_users (name, username, email, password, status, created, createdBy)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [name, username, email, hashedPassword, status, created, createdBy];

    // Eksekusi query dan dapatkan hasilnya
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Database error: unable to create user");
  }
}

export async function isExistEmail(email) {
  try {
    const query = `
    SELECT * FROM t_users WHERE email = $1
  `;
  const result = await pool.query(query, [email]);
  // console.log('result email', result);
  
  if (result.rows.length > 0) {
    throw new Error("Email already exists");
  }
  return false;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export function isExistUsername(username) {
  try {
    const query = `
    SELECT * FROM t_users WHERE username = ${username}
  `;
  return query;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Database error: unable to username user");
  }
}
