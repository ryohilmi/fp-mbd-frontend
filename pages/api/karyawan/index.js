const pool = require('../../../src/db');

export default async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            const allkaryawan = await pool.query("SELECT * FROM karyawan");
            res.json(allkaryawan.rows);
        }
        catch (err){
            console.error(err.message);
        }
    }

    else if (req.method === 'POST') {
        try {
            const {kar_id, kar_nama} = req.body;
            const newkaryawan = await pool.query("INSERT INTO karyawan (kar_id, kar_nama) VALUES($1, $2) RETURNING *", [kar_id, kar_nama]);
            res.json(newkaryawan);
        } catch (err) {
            console.error(err.message);
        }
    }

    else if (req.method === 'PUT') {
        try {
            const {kar_id, kar_nama} = req.body;
            const updatekaryawan = await pool.query("UPDATE karyawan SET kar_nama = $2 WHERE kar_id = $1", [kar_id, kar_nama]);
            res.json("item Updated");
        }
        catch (err){
            console.error(err.message);
        }
    }

    else     if (req.method === 'DELETE') {
        try {
            const {kar_id} = req.body;
            const deletekaryawan = await pool.query("DELETE FROM karyawan WHERE kar_id = $1", [kar_id]);
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
