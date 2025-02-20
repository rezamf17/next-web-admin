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

export async function createRoleName({role_name}) {
    try {
      const query = `
        INSERT INTO m_role (role_name)
        VALUES ($1)
        RETURNING *
      `;
      const values = [role_name];
      const result = await pool.query(query, values);
      return result.rows
    } catch (error) {
      console.error("Error getting user:", error);
      throw new Error("Database error: unable to create role name");
    }
}

export async function createRoleMenu(params) {
    try {
        const query = `
          INSERT INTO m_role (role_name)
          VALUES ($1)
          RETURNING *
        `;
        const result = await pool.query(query);
        return result.rows
      } catch (error) {
        console.error("Error getting user:", error);
        throw new Error("Database error: unable to create role menu");
      }
}