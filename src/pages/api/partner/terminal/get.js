import { getTerminal } from "../../models/m_terminal";
import { verifyToken } from "../../middleware/auth";

export default async function handler(req, res) {
  if (req.method === "GET") {
    verifyToken(req, res, async () => {
      try {
        const { search = "" } = req.query;
        const data = await getTerminal(search);

        res.status(200).json({
          code: "00",
          message: "Get terminal success",
          data: data,
        });
      } catch (error) {
        console.error("Error in handler:", error);
        res.status(500).json({ error: "Error get terminal" });
      }
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
