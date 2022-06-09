const pool = require("../../src/db");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await pool.query(`SELECT * FROM total_untung`);
      res.json(data.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
