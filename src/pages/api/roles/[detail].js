// pages/api/users.js

import { getRoleById } from "../models/m_role";
import { getMenu } from "../models/m_menu";
import { verifyToken } from '../middleware/auth';

export default async function handler(req, res) {
  if (req.method === "GET") {
    console.log('request', req.query.detail);
    
    verifyToken(req, res, async () => {
      try {
        let data = await getRoleById(req.query.detail);
        const menu = await getMenu(req.query.detail);
        let responseMenu = []
        menu.forEach(item => {
          const { id_menu, menu_name, icon, id_submenu, submenu_name, menu_link } = item;
      
          // If the menu doesn't exist, create it
          if (!responseMenu[id_menu]) {
            responseMenu[id_menu] = {
                  id_menu: id_menu,
                  menu_name: menu_name,
                  icon: icon,
                  sub_menu: []
              };
          }
      
          // Add the submenu to the corresponding menu
          responseMenu[id_menu].sub_menu.push({
              id_submenu: id_submenu,
              submenu_name: submenu_name,
              menu_link: menu_link
          });
      });
          const filteredMenus = responseMenu.filter(item => item !== null);
          data["menus"] = filteredMenus
          res.status(200).json({
            code : "00",
            message : "Get detail role success",
            data : filteredMenus
          });
      } catch (error) {
        console.error("Error in handler:", error)
          res.status(500).json({ error: "Error get role" });
      }
    })
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
