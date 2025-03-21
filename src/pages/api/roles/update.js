// pages/api/users.js

import { updateRoleName } from "../models/m_role";
import { verifyToken } from '../middleware/auth';

export default async function handler(req, res) {
	if (req.method === "PUT") {

		verifyToken(req, res, async () => {
			try {
				const { role_id, role_name, menus } = req.body;
				console.log('request', req.body);


				const newRole = await updateRoleName({ role_id, role_name });
				return res.status(201).json({ success: "updated role success", data: newRole });
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
