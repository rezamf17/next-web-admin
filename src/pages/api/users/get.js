// pages/api/users.js

import { createUser, getUser, isExistEmail, isExistUsername } from "../models/m_user";
import { verifyToken } from '../middleware/auth';

export default async function handler(req, res) {
  if (req.method === "GET") {

    verifyToken(req, res, async () => {
      try {
        const { search } = req.query
        
        let response = []
        const data = await getUser(search);
        data.forEach((result) => {
            response.push({
                id: result.id,
                name: result.name,
                username: result.username,
                email: result.email,
                role: result.role_name || null,
                id_role: result.id_role,
                status: result.status,
                createdby: result.createdby
            })
        })
          res.status(200).json({
            code : "00",
            message : "Get user success",
            data : response
          });
      } catch (error) {
        console.error("Error in handler:", error)
          res.status(500).json({ error: "Error get user" });
      }
    })
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
