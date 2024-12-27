// pages/api/users.js

import { getMenu } from "../models/m_menu";
import { verifyToken } from '../middleware/auth';

const transformData = (data) => {
    const result = { role_name: "Operator", menus: [] };
    
    const menuMap = new Map();
  
    data.forEach((row) => {
      const { id_menu, menu_name, id_submenu, submenu_name, menu_link } = row;
  
      if (!menuMap.has(id_menu)) {
        menuMap.set(id_menu, { id_menu, menu_name, sub_menu: [] });
      }
  
      menuMap.get(id_menu).sub_menu.push({ id_submenu, submenu_name, menu_link });
    });
  
    result.menus = Array.from(menuMap.values());
    return result;
  };

export default async function handler(req, res) {
  if (req.method === "GET") {
    // const data = await getMenu(2);
    
    verifyToken(req, res, async () => {
      try {
        const { id_role } = req.query
        
        let response = []
        const data = await getMenu(id_role);
          res.status(200).json({
            code : "00",
            message : "Get menu success",
            data : transformData(data)
          });
      } catch (error) {
        console.error("Error in handler:", error)
          res.status(500).json({ error: "Error get menu" });
      }
    })
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
