// pages/api/users.js

import { createRoleName } from "../models/m_role";
import { verifyToken } from '../middleware/auth';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { role_name, menus } = req.body;

    verifyToken(req, res, async () => {
      try {

        await createRoleName({ role_name });
          res.status(201).json({
            code : "00",
            message : "Success created role"
          });
      } catch (error) {
        console.error("Error in handler:", error)
        // if (error.message === "Email already exists") {
        //   res.status(409).json({ error: "Email already exists" });
        // }else if (error.message === "Username already exists") {
        //   res.status(409).json({ error: "Username already exists" });
        // } else {
        //   res.status(500).json({ error: "Error creating user" });
        // }
      }
    })
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
