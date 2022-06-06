const pool = require("../../../src/db");

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { supplier } = req.query;

    try {
      const catalog = await pool.query(
        `SELECT item.it_id, item.it_nama, harga_beli FROM catalog 
        JOIN item ON item.it_id = catalog.it_id
        WHERE sup_id = $1`,
        [supplier]
      );
      res.json(catalog.rows);
    } catch (err) {
      console.error(err.message);
    }
  } else {
    // Handle any other HTTP method
  }
}
