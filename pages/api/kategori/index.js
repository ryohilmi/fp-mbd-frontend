const pool = require('../../../src/db');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const categories = await pool.query(`SELECT * FROM kategori`);
      res.json(categories.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    // Handle any other HTTP method
  }
}
