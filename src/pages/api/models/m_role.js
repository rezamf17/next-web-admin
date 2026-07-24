import pool from "../../../lib/db";

export async function getRoles() {
  try {
    const query = `SELECT * FROM m_role ORDER BY id ASC`;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error getting roles:", error);
    throw new Error("Database error: unable to get roles");
  }
}
