// pages/api/users.js

import { updateRoleName, getExistingRoleMenus, deleteRoleMenus, insertRoleMenuBatch } from "../models/m_role";
import { verifyToken } from '../middleware/auth';

export default async function handler(req, res) {
	if (req.method === "PUT") {

		verifyToken(req, res, async () => {
			try {
				const { role_id, role_name, menus } = req.body;
				// console.log('request', req.body);


				const newRole = await updateRoleName({ role_id, role_name });

				// Ambil data role_menu yang sudah ada
				const existingData = await getExistingRoleMenus(role_id);

				// Buat set untuk data yang sudah ada
				const existingSet = new Set(existingData.map(row => `${row.id_menu}-${row.id_submenu}`));

				let roleMenusToInsert = [];
				let roleMenusToDelete = new Set(existingSet);

				// Loop untuk membentuk array data yang akan di-insert
				menus.forEach(menu => {
					menu.sub_menu.forEach(submenu => {
						const key = `${menu.id_menu}-${submenu.id_submenu}`;
						if (!existingSet.has(key)) {
							// Jika belum ada di database, masukkan ke dalam array untuk di-insert
							roleMenusToInsert.push({
								id_role: role_id,
								id_menu: menu.id_menu,
								id_submenu: submenu.id_submenu
							});
						}
						// Hapus dari daftar delete karena masih ada di request baru
						roleMenusToDelete.delete(key);
					});
				});
				
        		// Hapus data yang tidak ada di request baru
				if (roleMenusToDelete.size > 0) {
					await deleteRoleMenus(role_id, [...roleMenusToDelete]);
				}

				// // Insert data baru jika ada
				// if (roleMenusToInsert.length > 0) {
				// 	await insertRoleMenuBatch(roleMenusToInsert);
				// }

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
