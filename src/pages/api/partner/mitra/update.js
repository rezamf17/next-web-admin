import { updateMitra } from "../../models/m_mitra";
import { verifyToken } from "../../middleware/auth";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const {
      id,
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
        const updated_by = req.user?.username || "admin";

        await updateMitra({
          id,
          nama_mitra,
          jenis_mitra,
          alamat,
          kontak_person,
          nomor_telepon,
          email,
          website,
          status,
          updated_by,
        });

        res.status(200).json({
          code: "00",
          message: "Success updated mitra",
        });
      } catch (error) {
        console.error("Error in handler:", error);
        if (error.message === "Mitra not found") {
          res.status(404).json({ error: "Mitra not found" });
        } else {
          res.status(500).json({ error: error.message });
        }
      }
    });
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
