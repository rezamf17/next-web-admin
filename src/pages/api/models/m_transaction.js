import pool from "../../../lib/db";

async function getTransaction(search = "") {
  try {
    const query = `
      SELECT 
        t.id,
        t.merchant_id,
        t.mitra_id,
        t.terminal_id,
        t.trx_ref_number,
        t.trx_type,
        t.amount,
        t.fee,
        t.total_amount,
        t.payment_method,
        t.card_number,
        t.response_code,
        t.response_message,
        t.trx_date,
        t.settlement_date,
        t.status,
        t.created,
        t.created_by,
        m.merchant_name,
        mi.nama_mitra,
        te.terminal_name
      FROM t_transaction t
      LEFT JOIN t_merchant m ON t.merchant_id = m.id
      LEFT JOIN t_mitra mi ON t.mitra_id = mi.id
      LEFT JOIN t_terminal te ON t.terminal_id = te.id
      WHERE 
        t.trx_ref_number ILIKE $1 
        OR t.trx_type ILIKE $1
        OR t.payment_method ILIKE $1
        OR m.merchant_name ILIKE $1
        OR mi.nama_mitra ILIKE $1
      ORDER BY t.id DESC
    `;

    const searchParam = `%${search}%`;
    const result = await pool.query(query, [searchParam]);

    return result.rows;
  } catch (error) {
    console.error("Error getting transaction:", error);
    throw new Error("Database error: unable to get transaction");
  }
}

async function createTransaction({ merchant_id, mitra_id, terminal_id, trx_ref_number, trx_type, amount, fee, total_amount, payment_method, card_number, response_code, response_message, trx_date, settlement_date, status, created_by }) {
  try {
    const query = `
      INSERT INTO t_transaction (merchant_id, mitra_id, terminal_id, trx_ref_number, trx_type, amount, fee, total_amount, payment_method, card_number, response_code, response_message, trx_date, settlement_date, status, created, created_by)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW(), $16)
      RETURNING *
    `;
    const values = [merchant_id, mitra_id, terminal_id, trx_ref_number, trx_type, amount, fee, total_amount, payment_method, card_number, response_code, response_message, trx_date, settlement_date, status, created_by];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw new Error("Database error: " + error.message);
  }
}

export { getTransaction, createTransaction };
