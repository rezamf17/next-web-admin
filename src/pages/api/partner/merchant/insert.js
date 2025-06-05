// pages/api/users.js

import { createMerchant } from "../../models/m_merchant";
import { verifyToken } from '../../middleware/auth';
import moment from 'moment'

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { merchant_name, address, phone, email, acc_number, bank_name, status, created, createdBy, id_business_type } = req.body;

    verifyToken(req, res, async () => {
      try {
        const created = moment().format('YYYY-MM-DD HH:mm:ss')
        await createMerchant({ merchant_name, address, phone, email, acc_number, bank_name, status, created, createdBy, id_business_type });
          res.status(201).json({
            code : "00",
            message : "Success created merchant"
          });
      } catch (error) {
        console.error("Error in handler:", error)
        res.status(500).json({ error: "Error creating merchant" });
      }
    })
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
