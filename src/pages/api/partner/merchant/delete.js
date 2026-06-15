import { softDeleteMerchant } from "../../models/m_merchant";
import { verifyToken } from '../../middleware/auth';

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.body;

    verifyToken(req, res, async () => {
      try {
        if (!id) {
          return res.status(400).json({ error: "Merchant id is required" });
        }

        await softDeleteMerchant(id);
        res.status(200).json({
          code: "00",
          message: "Merchant has been deactivated"
        });
      } catch (error) {
        console.error("Error in handler:", error);
        res.status(500).json({ error: error.message });
      }
    });
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
