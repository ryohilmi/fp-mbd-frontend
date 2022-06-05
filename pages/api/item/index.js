const pool = require('../../../src/db');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const allTodos = await pool.query(
        'SELECT item.*, kat_nama FROM item JOIN KATEGORI ON item.kat_id = kategori.kat_id'
      );
      res.json(allTodos.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    // Handle any other HTTP method
  }
}
