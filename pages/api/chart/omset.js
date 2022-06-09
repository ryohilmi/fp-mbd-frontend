const pool = require("../../../src/db");

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await pool.query(`
                    select EXTRACT(MONTH FROM (x.tp_tanggal)) as Bulan, SUM(x.tp_total) as Omset  
                    from transaksi_pembeli x 
                    GROUP BY EXTRACT(MONTH FROM (x.tp_tanggal))`);
      res.json(data.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
