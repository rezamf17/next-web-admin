// models/User.js

import pool from "../../../lib/db";
import bcrypt from "bcryptjs";

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

export async function getUser(search) {
  try {
    const query = `
      SELECT u.*, r.role_name 
      FROM t_users u
      LEFT JOIN m_role r ON u.id_role = r.id
      WHERE 
        (u.name ILIKE $1 OR u.username ILIKE $1 OR u.email ILIKE $1)
    `;
    
    const searchParam = `%${search || ''}%`; // Tambahkan wildcard untuk pencarian parsial
    
    const result = await pool.query(query, [searchParam]);
    return result.rows
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error("Database error: unable to get user");
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

export async function isExistUsername(username) {
  try {
    const query = `
    SELECT * FROM t_users WHERE username = $1
  `;
  const result = await pool.query(query, [username]);
  
  if (result.rows.length > 0) {
    throw new Error("Username already exists");
  }
  return false;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function updateUser({ id, name, username, email, password, id_role, status, updatedBy }) {
  try {
    const updated = new Date().toISOString();

    // If password is provided, hash it and include in update
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const query = `
        UPDATE t_users 
        SET name = $1, username = $2, email = $3, password = $4, id_role = $5, status = $6, updatedby = $7, updated = $8
        WHERE id = $9
        RETURNING *
      `;
      const values = [name, username, email, hashedPassword, id_role, status, updatedBy, updated, id];

      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        throw new Error("User not found");
      }
      return result.rows[0];
    }

    // No password change — update other fields only
    const query = `
      UPDATE t_users 
      SET name = $1, username = $2, email = $3, id_role = $4, status = $5, updatedby = $6, updated = $7
      WHERE id = $8
      RETURNING *
    `;
    const values = [name, username, email, id_role, status, updatedBy, updated, id];

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      throw new Error("User not found");
    }
    return result.rows[0];
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const query = `
      DELETE FROM t_users WHERE id = $1 RETURNING *
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      throw new Error("User not found");
    }
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
