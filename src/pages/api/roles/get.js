import { getRoles } from "../models/m_role";
import { verifyToken } from "../middleware/auth";

export default async function handler(req, res) {
  if (req.method === "GET") {
    verifyToken(req, res, async () => {
      try {
        const data = await getRoles();
        res.status(200).json({
          code: "00",
          message: "Get roles success",
          data: data,
        });
      } catch (error) {
        console.error("Error in handler:", error);
        res.status(500).json({ error: "Error get roles" });
      }
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
