import pool from "../../../lib/db";

async function getTerminal(search = "") {
  try {
    const query = `
      SELECT 
        id,
        merchant_id,
        mitra_id,
        terminal_name,
        tid,
        nomor_seri,
        jenis_terminal,
        lokasi,
        status,
        created,
        created_by
      FROM t_terminal
      WHERE 
        terminal_name ILIKE $1 
        OR tid ILIKE $1
        OR nomor_seri ILIKE $1 
        OR jenis_terminal ILIKE $1
        OR lokasi ILIKE $1
      ORDER BY id DESC
    `;

    const searchParam = `%${search}%`;
    const result = await pool.query(query, [searchParam]);

    return result.rows;
  } catch (error) {
    console.error("Error getting terminal:", error);
    throw new Error("Database error: unable to get terminal");
  }
}

async function createTerminal({ merchant_id, mitra_id, terminal_name, tid, nomor_seri, jenis_terminal, lokasi, status, created_by }) {
  try {
    const query = `
      INSERT INTO t_terminal (merchant_id, mitra_id, terminal_name, tid, nomor_seri, jenis_terminal, lokasi, status, created, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), $9)
      RETURNING *
    `;
    const values = [merchant_id, mitra_id, terminal_name, tid, nomor_seri, jenis_terminal, lokasi, status, created_by];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating terminal:", error);
    throw new Error("Database error: " + error.message);
  }
}

async function updateTerminal({ id, merchant_id, mitra_id, terminal_name, tid, nomor_seri, jenis_terminal, lokasi, status, updated_by }) {
  try {
    const query = `
      UPDATE t_terminal 
      SET merchant_id = $1, mitra_id = $2, terminal_name = $3, tid = $4, 
          nomor_seri = $5, jenis_terminal = $6, lokasi = $7, status = $8, 
          updated = NOW(), updated_by = $9
      WHERE id = $10
      RETURNING *
    `;
    const values = [merchant_id, mitra_id, terminal_name, tid, nomor_seri, jenis_terminal, lokasi, status, updated_by, id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      throw new Error("Terminal not found");
    }

    return result.rows[0];
  } catch (error) {
    if (error.message === "Terminal not found") {
      throw error;
    }
    console.error("Error updating terminal:", error);
    throw new Error("Database error: " + error.message);
  }
}

async function deleteTerminal(id, status) {
  try {
    const query = `
      UPDATE t_terminal 
      SET status = $1, updated = NOW()
      WHERE id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [status, id]);

    if (result.rows.length === 0) {
      throw new Error("Terminal not found");
    }

    return result.rows[0];
  } catch (error) {
    if (error.message === "Terminal not found") {
      throw error;
    }
    console.error("Error deleting terminal:", error);
    throw new Error("Database error: " + error.message);
  }
}

export { getTerminal, createTerminal, updateTerminal, deleteTerminal };
