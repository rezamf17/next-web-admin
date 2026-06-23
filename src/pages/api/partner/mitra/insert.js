import { createMitra } from "../../models/m_mitra";
import { verifyToken } from "../../middleware/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      nama_mitra,
      jenis_mitra,
      alamat,
      kontak_person,
      nomor_telepon,
      email,
      website,
      status,
    } = req.body;

    verifyToken(req, res, async () => {
      try {
        const created_by = req.user?.username || "admin";

        await createMitra({
          nama_mitra,
          jenis_mitra,
          alamat,
          kontak_person,
          nomor_telepon,
          email,
          website,
          status,
          created_by,
        });

        res.status(201).json({
          code: "00",
          message: "Success created mitra",
        });
      } catch (error) {
        console.error("Error in handler:", error);
        res.status(500).json({ error: error.message });
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
