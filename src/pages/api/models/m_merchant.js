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
