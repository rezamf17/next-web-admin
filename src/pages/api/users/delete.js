import { deleteUser } from "../models/m_user";
import { verifyToken } from '../middleware/auth';

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    verifyToken(req, res, async () => {
      try {
        await deleteUser(id);
        res.status(200).json({
          code: "00",
          message: "Success deleted user"
        });
      } catch (error) {
        console.error("Error in handler:", error);
        if (error.message === "User not found") {
          res.status(404).json({ error: "User not found" });
        } else {
          res.status(500).json({ error: "Error deleting user" });
        }
      }
    });
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
