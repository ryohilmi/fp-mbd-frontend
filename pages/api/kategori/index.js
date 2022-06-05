const pool = require('../../../src/db');

export default async function handler(req, res) {

  if (req.method === 'GET') {
    try {
      const allkategori = await pool.query("SELECT * FROM kategori");
      res.json(allkategori.rows);
    }
    catch (err){
      console.error(err.message);
    }
  }

  else if (req.method === 'POST') {
    try {
      const {kat_id, kat_nama} = req.body;
      const newkategori = await pool.query("INSERT INTO kategori (kat_id, kat_nama) VALUES($1, $2) RETURNING *", [kat_id, kat_nama]);
      res.json(newkategori);
    } catch (err) {
      console.error(err.message);
    }
  }

  else if (req.method === 'PUT') {
    try {
      const {kat_id, kat_nama} = req.body;
      const updatekategori = await pool.query("UPDATE kategori SET kat_nama = $2 WHERE kat_id = $1", [kat_id, kat_nama]);
      res.json("item Updated");
    }
    catch (err){
      console.error(err.message);
    }
  }

  else     if (req.method === 'DELETE') {
    try {
      const {kat_id} = req.body;
      const deletekategori = await pool.query("DELETE FROM kategori WHERE kat_id = $1", [kat_id]);
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
