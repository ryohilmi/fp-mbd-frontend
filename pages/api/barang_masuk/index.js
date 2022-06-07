const pool = require("../../../src/db");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const categories = await pool.query(`
        SELECT * FROM transaksi_supplier
        JOIN karyawan ON transaksi_supplier.kar_id = karyawan.kar_id
      `);
      res.json(categories.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === "POST") {
    try {
      const { karyawan_id, supplier_id, detail } = req.body;
      const status = await pool.query(
        `INSERT INTO transaksi_supplier VALUES (NEXTVAL('ID_transaksi_supplier_SEQ'), $1, $2, NOW(), NULL)`,
        [karyawan_id, supplier_id]
      );

      detail.forEach(async (item) => {
        try {
          const resolt = await pool.query(
            `INSERT INTO kwitansi_supplier VALUES ($1, (SELECT last_value FROM ID_transaksi_supplier_SEQ), $2)`,
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
