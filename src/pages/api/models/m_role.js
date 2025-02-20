import pool from "../../../lib/db";

export async function getRole() {
    try {
      const query = `
        SELECT * 
        FROM m_role
      `;
      const result = await pool.query(query);
      return result.rows
    } catch (error) {
      console.error("Error getting user:", error);
      throw new Error("Database error: unable to get user");
    }
  }