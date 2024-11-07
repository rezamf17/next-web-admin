// pages/api/users.js

import { createUser } from "./models/m_user";
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
      const created = moment().format('YYYY-MM-DD HH:mm:ss')
     await createUser({ name, username, email, password, status, created, createdBy });
      res.status(201).json({
        code : "00",
        message : "Success created user"
      });
    } catch (error) {
      res.status(500).json({ error: "Error creating user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
