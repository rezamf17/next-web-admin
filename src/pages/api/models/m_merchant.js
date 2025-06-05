import pool from "../../../lib/db";

export async function getMerchant(search = "") {
  try {
    const query = `
      SELECT 
        m.id AS merchant_id,
        m.address,
        m.merchant_name,
        m.phone,
        m.status,
        m.acc_number,
        m.bank_name,
        m.email,
        m.id_business_type,
        bt.business_name
      FROM t_merchant m
      LEFT JOIN m_business_type bt ON m.id_business_type = bt.id
      WHERE 
        m.address ILIKE $1 
        OR m.merchant_name ILIKE $1 
        OR m.email ILIKE $1
    `;

    const searchParam = `%${search}%`;
    const result = await pool.query(query, [searchParam]);

    return result.rows;
  } catch (error) {
    console.error("Error getting merchant:", error);
    throw new Error("Database error: unable to get merchant");
  }
}

export async function createMerchant({ merchant_name, address, phone, email, acc_number, bank_name, status, created, createdBy, id_business_type }) {
  try {

    // Query untuk menambahkan user baru
    const query = `
      INSERT INTO t_merchant (merchant_name, address, phone, email, acc_number, bank_name, status, created, createdBy, id_business_type)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;
    const values = [merchant_name, address, phone, email, acc_number, bank_name, status, created, createdBy, id_business_type];

    // Eksekusi query dan dapatkan hasilnya
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating merchant:", error);
    throw new Error("Database error: unable to create merchant");
  }
}
