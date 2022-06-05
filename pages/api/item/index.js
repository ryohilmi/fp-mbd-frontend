const pool = require('../../../src/db');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const allitems = await pool.query("SELECT * FROM item");
      res.json(allitems.rows);
    }
    catch (err){
      console.error(err.message);
    }
  }

  else if (req.method === 'POST') {
    try {
      const {it_id, kat_id, it_nama, it_jumlah, it_deskripsi, it_harga_jual} = req.body;
      const newitem = await pool.query("INSERT INTO item (it_id, kat_id, it_nama, it_jumlah, it_deskripsi, it_harga_jual) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [it_id, kat_id, it_nama, it_jumlah, it_deskripsi, it_harga_jual]);
      res.json(newitem);
    } catch (err) {
      console.error(err.message);
    }
  }

  else if (req.method === 'PUT') {
    try {
      const {it_id, kat_id, it_nama, it_jumlah, it_deskripsi, it_harga_jual} = req.body;
      const updateitem = await pool.query("UPDATE item SET kat_id = $2, it_nama = $3, it_jumlah = $4, it_deskripsi = $5, it_harga_jual = $6 WHERE it_id = $1", [it_id, kat_id, it_nama, it_jumlah, it_deskripsi, it_harga_jual]);
      res.json("item Updated");
    }
    catch (err){
      console.error(err.message);
    }
  }

  else     if (req.method === 'DELETE') {
    try {
      const {it_id} = req.body;
      const deleteitem = await pool.query("DELETE FROM item WHERE it_id = $1", [it_id]);
      res.json("item Deleted");
    }
    catch (err){
      console.error(err.message);
    }
  }

  else {
    // Handle any other HTTP method
  }
}
