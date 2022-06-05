const pool = require('../../../src/db');

export default async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            const allsupplier = await pool.query("SELECT * FROM supplier");
            res.json(allsupplier.rows);
        }
        catch (err){
            console.error(err.message);
        }
    }

    else if (req.method === 'POST') {
        try {
            const {sup_id, sup_nama} = req.body;
            const newsupplier = await pool.query("INSERT INTO supplier (sup_id, sup_nama) VALUES($1, $2) RETURNING *", [sup_id, sup_nama]);
            res.json(newsupplier);
        } catch (err) {
            console.error(err.message);
        }
    }

    else if (req.method === 'PUT') {
        try {
            const {sup_id, sup_nama} = req.body;
            const updatesupplier = await pool.query("UPDATE supplier SET sup_nama = $2 WHERE sup_id = $1", [sup_id, sup_nama]);
            res.json("item Updated");
        }
        catch (err){
            console.error(err.message);
        }
    }

    else     if (req.method === 'DELETE') {
        try {
            const {sup_id} = req.body;
            const deletesupplier = await pool.query("DELETE FROM supplier WHERE sup_id = $1", [sup_id]);
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
