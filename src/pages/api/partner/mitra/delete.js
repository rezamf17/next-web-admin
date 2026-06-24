import { deleteMitra } from "../../models/m_mitra";
import { verifyToken } from "../../middleware/auth";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id, status } = req.body;

    verifyToken(req, res, async () => {
      try {
        await deleteMitra(id, status);

        res.status(200).json({
          code: "00",
          message: "Success updated mitra status",
        });
      } catch (error) {
        console.error("Error in handler:", error);
        if (error.message === "Mitra not found") {
          res.status(404).json({ error: "Mitra not found" });
        } else {
          res.status(500).json({ error: error.message });
        }
      }
    });
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
