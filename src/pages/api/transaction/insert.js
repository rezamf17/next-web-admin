import { createTransaction } from "../models/m_transaction";
import { verifyToken } from "../middleware/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      merchant_id,
      mitra_id,
      terminal_id,
      trx_ref_number,
      trx_type,
      amount,
      fee,
      total_amount,
      payment_method,
      card_number,
      response_code,
      response_message,
      trx_date,
      settlement_date,
      status,
    } = req.body;

    verifyToken(req, res, async () => {
      try {
        const created_by = req.user?.username || "system";

        await createTransaction({
          merchant_id,
          mitra_id,
          terminal_id,
          trx_ref_number,
          trx_type,
          amount,
          fee,
          total_amount,
          payment_method,
          card_number,
          response_code,
          response_message,
          trx_date,
          settlement_date,
          status,
          created_by,
        });

        res.status(201).json({
          code: "00",
          message: "Success created transaction",
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
