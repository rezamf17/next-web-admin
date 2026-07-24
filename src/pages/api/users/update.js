import { updateUser } from "../models/m_user";
import { verifyToken } from '../middleware/auth';

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { id, name, username, email, password, id_role, status, updatedBy } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    verifyToken(req, res, async () => {
      try {
        await updateUser({ id, name, username, email, password, id_role, status, updatedBy });
        res.status(200).json({
          code: "00",
          message: "Success updated user"
        });
      } catch (error) {
        console.error("Error in handler:", error);
        if (error.message === "User not found") {
          res.status(404).json({ error: "User not found" });
        } else {
          res.status(500).json({ error: "Error updating user" });
        }
      }
    });
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
