import { getMitra } from "../../models/m_mitra";
import { verifyToken } from "../../middleware/auth";

export default async function handler(req, res) {
  if (req.method === "GET") {
    verifyToken(req, res, async () => {
      try {
        const { search = "" } = req.query;
        const data = await getMitra(search);

        res.status(200).json({
          code: "00",
          message: "Get mitra success",
          data: data,
        });
      } catch (error) {
        console.error("Error in handler:", error);
        res.status(500).json({ error: "Error get mitra" });
      }
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
