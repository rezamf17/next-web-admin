import { createTransaction } from "../models/m_transaction";
import { verifyToken } from "../middleware/auth";
import pool from "../../../lib/db";

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRefNumber() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 999999).toString().padStart(6, "0");
  return `TRX${date}${random}`;
}

function randomAmount() {
  const amounts = [10000, 15000, 20000, 25000, 50000, 75000, 100000, 150000, 200000, 500000];
  return randomItem(amounts);
}

function randomDate(daysBack = 30) {
  const now = new Date();
  const past = new Date(now.getTime() - Math.random() * daysBack * 24 * 60 * 60 * 1000);
  return past.toISOString();
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    verifyToken(req, res, async () => {
      try {
        const { count = 10 } = req.body;
        const total = Math.min(count, 100); // max 100 per request

        // Get valid FK IDs from DB
        const merchants = await pool.query("SELECT id FROM t_merchant WHERE status = true LIMIT 50");
        const mitras = await pool.query("SELECT id FROM t_mitra WHERE status != 'I' LIMIT 50");
        const terminals = await pool.query("SELECT id FROM t_terminal WHERE status != 'inactive' LIMIT 50");

        if (merchants.rows.length === 0 || mitras.rows.length === 0 || terminals.rows.length === 0) {
          return res.status(400).json({
            code: "01",
            message: "Need at least 1 merchant, 1 mitra, and 1 terminal in DB",
          });
        }

        const merchantIds = merchants.rows.map((r) => r.id);
        const mitraIds = mitras.rows.map((r) => r.id);
        const terminalIds = terminals.rows.map((r) => r.id);

        const trxTypes = ["payment", "refund", "void", "settlement"];
        const paymentMethods = ["qris", "debit", "credit", "ewallet", "transfer"];
        const responseCodes = ["00", "00", "00", "00", "51", "14", "05"]; // mostly success
        const responseMessages = {
          "00": "Success",
          "51": "Insufficient funds",
          "14": "Invalid card number",
          "05": "Do not honor",
        };

        const created_by = req.user?.username || "system";
        const inserted = [];

        for (let i = 0; i < total; i++) {
          const amount = randomAmount();
          const fee = Math.round(amount * 0.01);
          const responseCode = randomItem(responseCodes);
          const trxDate = randomDate(30);
          const status = responseCode === "00" ? "A" : "I";

          const data = {
            merchant_id: randomItem(merchantIds),
            mitra_id: randomItem(mitraIds),
            terminal_id: randomItem(terminalIds),
            trx_ref_number: generateRefNumber(),
            trx_type: randomItem(trxTypes),
            amount: amount,
            fee: fee,
            total_amount: amount + fee,
            payment_method: randomItem(paymentMethods),
            card_number: Math.random() > 0.5 ? `****${Math.floor(1000 + Math.random() * 9000)}` : null,
            response_code: responseCode,
            response_message: responseMessages[responseCode],
            trx_date: trxDate,
            settlement_date: responseCode === "00" ? trxDate : null,
            status: status,
            created_by: created_by,
          };

          const result = await createTransaction(data);
          inserted.push(result);
        }

        res.status(201).json({
          code: "00",
          message: `Success generated ${inserted.length} transactions`,
          count: inserted.length,
        });
      } catch (error) {
        console.error("Error in handler:", error);
        res.status(500).json({ error: error.message });
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
