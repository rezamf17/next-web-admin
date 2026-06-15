import { updateMerchant } from "../../models/m_merchant";
import { verifyToken } from '../../middleware/auth';

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, merchant_name, address, phone, email, acc_number, bank_name, status, id_business_type } = req.body;

    verifyToken(req, res, async () => {
      try {
        if (!id) {
          return res.status(400).json({ error: "Merchant id is required" });
        }

        const data = await updateMerchant({ id, merchant_name, address, phone, email, acc_number, bank_name, status, id_business_type });
        res.status(200).json({
          code: "00",
          message: "Success updated merchant",
          data: data
        });
      } catch (error) {
        console.error("Error in handler:", error);
        res.status(500).json({ error: error.message });
      }
    });
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
