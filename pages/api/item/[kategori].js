const pool = require("../../../src/db");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { kategori } = req.query;

    try {
      const allTodos = await pool.query(
        `SELECT item.*, kat_nama FROM item 
        JOIN KATEGORI ON item.kat_id = kategori.kat_id
        WHERE item.kat_id = '${kategori}'`
      );
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  } else {
    // Handle any other HTTP method
  }
}
