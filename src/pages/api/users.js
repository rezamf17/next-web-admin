// pages/api/users.js

import { createUser, isExistEmail, isExistUsername } from "./models/m_user";
import moment from 'moment'

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, username, email, password, status, createdBy } = req.body;

    // Validasi data sederhana
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    try {
      // Panggil fungsi createUser dari model User
      await isExistEmail(email);
      await isExistUsername(username);
      const created = moment().format('YYYY-MM-DD HH:mm:ss')
      await createUser({ name, username, email, password, status, created, createdBy });
        res.status(201).json({
          code : "00",
          message : "Success created user"
        });
    } catch (error) {
      console.error("Error in handler:", error)
      if (error.message === "Email already exists") {
        res.status(409).json({ error: "Email already exists" });
      }else if (error.message === "Username already exists") {
        res.status(409).json({ error: "Username already exists" });
      } else {
        res.status(500).json({ error: "Error creating user" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
