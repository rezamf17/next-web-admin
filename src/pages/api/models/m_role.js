import pool from "../../../lib/db";

export async function getRole() {
  try {
    const query = `
        SELECT * 
        FROM m_role
      `;
    const result = await pool.query(query);
    return result.rows
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error("Database error: unable to get user");
  }
}

export async function createRoleName({ role_name }) {
  try {
    const query = `
        INSERT INTO m_role (role_name)
        VALUES ($1)
        RETURNING *
      `;
    const values = [role_name];
    const result = await pool.query(query, values);
    return result.rows[0]
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error("Database error: unable to create role name");
  }
}

export async function createRoleMenu(roleMenus) {
  if (roleMenus.length === 0) {
    throw new Error("No data to insert");
  }

  // Buat array values dengan cara yang benar
  const values = roleMenus.flatMap(({ id_role, id_menu, id_submenu }) => [id_role, id_menu, id_submenu]);
  console.log("roleMenus:", roleMenus);

  // Buat placeholders yang sesuai dengan jumlah values
  const placeholders = roleMenus.map((_, index) => {
    const baseIndex = index * 3 + 1;
    return `($${baseIndex}, $${baseIndex + 1}, $${baseIndex + 2})`;
  }).join(", ");

  const query = `
    INSERT INTO role_menu (id_role, id_menu, id_submenu)
    VALUES ${placeholders}
    RETURNING *;
`;

  try {
    console.log("Executing query:", query);
    console.log("With values:", values);

    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Database error: unable to create role menu");
  }
}

export async function updateRoleName({ role_id, role_name }) {
  try {
    const query = `
        UPDATE m_role 
        SET role_name = $1
        WHERE id = $2
        RETURNING *;
      `;
    const values = [role_name, role_id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      throw new Error(`Role with id ${role_id} not found`);
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error updating role:", error);
    throw new Error("Database error: unable to update role name");
  }
}

export async function getExistingRoleMenus(role_id) {
  const query = `
      SELECT id_menu, id_submenu 
      FROM role_menu 
      WHERE id_role = $1
  `;
  const result = await pool.query(query, [role_id]);
  return result.rows;
}

export async function deleteRoleMenus(role_id, deleteList) {
  if (deleteList.length === 0) return;

  const conditions = deleteList.map((_, index) => `(id_menu = $${index * 2 + 2} AND id_submenu = $${index * 2 + 3})`).join(" OR ");
  const values = [role_id, ...deleteList.flatMap(item => item.split("-"))];

  const query = `
      DELETE FROM role_menu 
      WHERE id_role = $1 AND (${conditions})
  `;

  await pool.query(query, values);
}

export async function insertRoleMenuBatch(roleMenus) {
  if (roleMenus.length === 0) {
      throw new Error("No data to insert");
  }

  const values = roleMenus.flatMap(({ id_role, id_menu, id_submenu }) => [id_role, id_menu, id_submenu]);

  const placeholders = roleMenus.map((_, index) => {
      const baseIndex = index * 3 + 1;
      return `($${baseIndex}, $${baseIndex + 1}, $${baseIndex + 2})`;
  }).join(", ");

  const query = `
      INSERT INTO role_menu (id_role, id_menu, id_submenu)
      VALUES ${placeholders}
      RETURNING *;
  `;

  await pool.query(query, values);
}