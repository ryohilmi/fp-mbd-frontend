const pool = require('../../../src/db');

export default async function handler(req, res) {

    if (req.method === 'GET') {
        try {
            const allcatalog = await pool.query("SELECT * FROM catalog");
            res.json(allcatalog.rows);
        }
        catch (err){
            console.error(err.message);
        }
    }

    else if (req.method === 'POST') {
        try {
            const {it_id, sup_id, harga_beli} = req.body;
            const newcatalog = await pool.query("INSERT INTO catalog (it_id, sup_id, harga_beli) VALUES($1, $2, $3) RETURNING *", [it_id, sup_id, harga_beli]);
            res.json(newcatalog);
        } catch (err) {
            console.error(err.message);
        }
    }

    else if (req.method === 'PUT') {
        try {
            const {it_id, sup_id, harga_beli} = req.body;
            const updatecatalog = await pool.query("UPDATE item SET it_id = $1, sup_id = $2, harga_beli =$3 WHERE kat_id = $1 AND sup_id = $2", [it_id, sup_id, harga_beli]);
            res.json("item Updated");
        }
        catch (err){
            console.error(err.message);
        }
    }

    else     if (req.method === 'DELETE') {
        try {
            const {it_id, sup_id} = req.body;
            const deletecatalog = await pool.query("DELETE FROM item WHERE kat_id = $1 and it_id = $2", [it_id, sup_id]);
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
