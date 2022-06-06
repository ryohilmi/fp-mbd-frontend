const pool = require("../../../src/db");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    try {
      const data = await pool.query(
        `
        SELECT kwitansi_pembeli.*, item.it_nama, kb_harga_beli / kb_kuantitas AS kb_harga_satuan FROM kwitansi_pembeli
        JOIN item ON kwitansi_pembeli.it_id = item.it_id
        WHERE tp_id = $1
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
