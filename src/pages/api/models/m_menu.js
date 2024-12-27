// models/User.js

import pool from "../../../lib/db";


export async function getMenu(id_role) {
	try {
		const query = `
            SELECT 
                rm.id,
                r.role_name,            
                m.menu_name,
                s.id_menu,
                rm.id_submenu,
                m.icon,
                s.submenu_name,         
                s.menu_link              
            FROM role_menu AS rm        
            JOIN m_submenu AS s ON rm.id_submenu = s.id
            JOIN m_menu AS m ON s.id_menu = m.id
            JOIN m_role AS r ON rm.id_role = r.id 
            WHERE rm.id_role = $1;  
    `;

		const result = await pool.query(query, [id_role]);
		return result.rows
	} catch (error) {
		console.error("Error getting user:", error);
		throw new Error("Database error: unable to get user");
	}
}