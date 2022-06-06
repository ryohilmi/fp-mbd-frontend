const pool = require("../../../src/db");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const allTodos = await pool.query(
        "SELECT item.*, kat_nama FROM item JOIN KATEGORI ON item.kat_id = kategori.kat_id"
      );
      res.json(allTodos.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === "POST") {
    console.log(req.body);
    const { nama, harga, category, deskripsi } = req.body;

    try {
      const status = await pool.query(
        `INSERT INTO item VALUES (NEXTVAL('ID_ITEM_SEQ'), $1, $2, $3, $4, $5);`,
        [category, nama, 0, deskripsi, harga]
      );
      console.log(status);
      res.json(req.body);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    // Handle any other HTTP method
  }
}
