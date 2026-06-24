import { createTerminal } from "../../models/m_terminal";
import { verifyToken } from "../../middleware/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      merchant_id,
      mitra_id,
      terminal_name,
      tid,
      nomor_seri,
      jenis_terminal,
      lokasi,
      status,
    } = req.body;

    verifyToken(req, res, async () => {
      try {
        const created_by = req.user?.username || "admin";

        await createTerminal({
          merchant_id,
          mitra_id,
          terminal_name,
          tid,
          nomor_seri,
          jenis_terminal,
          lokasi,
          status,
          created_by,
        });

        res.status(201).json({
          code: "00",
          message: "Success created terminal",
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
