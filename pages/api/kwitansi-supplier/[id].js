const pool = require("../../../src/db");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      const data = await pool.query(
        `
        SELECT kwitansi_supplier.*, item.it_nama, kj_harga_beli / kj_kuantitas AS kj_harga_satuan FROM kwitansi_supplier
        JOIN item ON kwitansi_supplier.it_id = item.it_id
        WHERE ts_id = $1
      `,
        [id]
      );
      res.json(data.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    // Handle any other HTTP method
  }
}
