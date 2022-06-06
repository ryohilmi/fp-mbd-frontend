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
      const { karyawan_id, customer_id, detail } = req.body;
      const status = await pool.query(
        `INSERT INTO transaksi_pembeli VALUES (NEXTVAL('ID_TRANSAKSI_PEMBELI_SEQ'), $1, $2, NOW(), NULL)`,
        [karyawan_id, customer_id]
      );

      detail.forEach(async (item) => {
        try {
          const resolt = await pool.query(
            `INSERT INTO kwitansi_pembeli VALUES ($1, (SELECT last_value FROM ID_TRANSAKSI_PEMBELI_SEQ), $2)`,
            [item.id, item.total]
          );

          res.status(201).json(resolt);
        } catch (err) {
          res.status(569).json(err);
        }

        console.log(res);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
}
