const pool = require("../../../src/db");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const categories = await pool.query(`
        SELECT * FROM transaksi_pembeli
        JOIN customer ON transaksi_pembeli.cust_id = customer.cust_id
      `);
      res.json(categories.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === "POST") {
    try {
      console.log(req.body);
      res.json(req.body);
    } catch (err) {}
  } else {
    // Handle any other HTTP method
  }
}
