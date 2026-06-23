import pool from "../../../lib/db";

async function getMitra(search = "") {
  try {
    const query = `
      SELECT 
        id,
        nama_mitra,
        jenis_mitra,
        alamat,
        kontak_person,
        nomor_telepon,
        email,
        website,
        status,
        created,
        created_by
      FROM t_mitra
      WHERE 
        nama_mitra ILIKE $1 
        OR email ILIKE $1 
        OR kontak_person ILIKE $1
        OR jenis_mitra ILIKE $1
      ORDER BY id DESC
    `;

    const searchParam = `%${search}%`;
    const result = await pool.query(query, [searchParam]);

    return result.rows;
  } catch (error) {
    console.error("Error getting mitra:", error);
    throw new Error("Database error: unable to get mitra");
  }
}

async function createMitra({ nama_mitra, jenis_mitra, alamat, kontak_person, nomor_telepon, email, website, status, created_by }) {
  try {
    const query = `
      INSERT INTO t_mitra (nama_mitra, jenis_mitra, alamat, kontak_person, nomor_telepon, email, website, status, created, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), $9)
      RETURNING *
    `;
    const values = [nama_mitra, jenis_mitra, alamat, kontak_person, nomor_telepon, email, website, status, created_by];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating mitra:", error);
    throw new Error("Database error: " + error.message);
  }
}

async function updateMitra({ id, nama_mitra, jenis_mitra, alamat, kontak_person, nomor_telepon, email, website, status, updated_by }) {
  try {
    const query = `
      UPDATE t_mitra 
      SET nama_mitra = $1, jenis_mitra = $2, alamat = $3, kontak_person = $4, 
          nomor_telepon = $5, email = $6, website = $7, status = $8, 
          updated = NOW(), updated_by = $9
      WHERE id = $10
      RETURNING *
    `;
    const values = [nama_mitra, jenis_mitra, alamat, kontak_person, nomor_telepon, email, website, status, updated_by, id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      throw new Error("Mitra not found");
    }

    return result.rows[0];
  } catch (error) {
    if (error.message === "Mitra not found") {
      throw error;
    }
    console.error("Error updating mitra:", error);
    throw new Error("Database error: " + error.message);
  }
}

async function deleteMitra(id, status) {
  try {
    const query = `
      UPDATE t_mitra 
      SET status = $1, updated = NOW()
      WHERE id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [status, id]);

    if (result.rows.length === 0) {
      throw new Error("Mitra not found");
    }

    return result.rows[0];
  } catch (error) {
    if (error.message === "Mitra not found") {
      throw error;
    }
    console.error("Error deleting mitra:", error);
    throw new Error("Database error: " + error.message);
  }
}

module.exports = { getMitra, createMitra, updateMitra, deleteMitra };
