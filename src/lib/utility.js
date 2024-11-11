import moment from 'moment';
import 'moment/locale/id'; // Import locale bahasa Indonesia
import bcrypt from "bcryptjs"; // Pastikan bcryptjs sudah diinstall dengan `npm install bcryptjs`
import db from "./db"; // Contoh koneksi database (disesuaikan dengan sistem database)

moment.locale('id'); // Set locale ke bahasa Indonesia

export const dashboardToday = (date) => {
    const formattedDate = moment(date).format('dddd, DD MMM YYYY');
    return formattedDate;
}

export async function verifyUser(username, password) {
  // Contoh query database untuk mendapatkan user berdasarkan username
  const user = await db.query("SELECT * FROM t_users WHERE username = ?", [username]);

  if (user && bcrypt.compareSync(password, user.password)) {
    // Kembalikan objek user jika password cocok
    return {
      id: user.id,
      name: user.username,
      email: user.email,
    };
  }

  // Kembalikan null jika user tidak ditemukan atau password salah
  return null;
}
