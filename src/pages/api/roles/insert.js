// pages/api/users.js

import { createRoleName, createRoleMenu } from "../models/m_role";
import { verifyToken } from '../middleware/auth';

export default async function handler(req, res) {
  if (req.method === "POST") {

    verifyToken(req, res, async () => {
      try {
        const { role_name, menus } = req.body;
        console.log('request', req.body);
        

        const newRole = await createRoleName({ role_name });
        
          if (!newRole || !newRole.id) {
            return res.status(500).json({ message: "Failed to create role" });
          }

          const role_id = newRole.id; // Get the newly inserted id_rol
          console.log("✅ Newly inserted id_role:", role_id)
          if (!menus || menus.length === 0) {
              return res.status(400).json({ message: "Invalid input data" });
          }
  
          let roleMenus = [];
  
          // Loop through menus and submenus
          menus.forEach(menu => {
              menu.sub_menu.forEach(submenu => {
                  roleMenus.push({
                    id_role: role_id, // Gunakan id_role sesuai database
                    id_menu: menu.id_menu,
                    id_submenu: submenu.id_submenu
                  });
              });
          });
          // Call model function to insert data
          const insertedData = await createRoleMenu(roleMenus);
          return res.status(201).json({ success: true, data: insertedData });
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
