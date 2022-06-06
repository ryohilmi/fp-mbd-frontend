const pool = require("../../../src/db");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const categories = await pool.query(`SELECT * FROM karyawan`);
      res.json(categories.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === "POST") {
    const { nama } = req.body;

    try {
      const status = await pool.query(
        `INSERT INTO karyawan VALUES (NEXTVAL('ID_KATEGORI_SEQ'), $1)`,
        [nama]
      );
      console.log(status);
      res.json(req.body);
    } catch (err) {}
  } else {
    // Handle any other HTTP method
  }
}
