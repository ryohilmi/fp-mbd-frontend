const pool = require("../../../src/db");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const catalog = await pool.query("SELECT * FROM catalog");
      res.json(catalog.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    // Handle any other HTTP method
  }
}
