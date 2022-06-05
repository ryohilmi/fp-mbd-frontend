const pool = require('../../../src/db');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const allcustomer = await pool.query("SELECT * FROM customer");
            res.json(allcustomer.rows);
        }
        catch (err){
            console.error(err.message);
        }
    }

    else if (req.method === 'POST') {
        try {
            const {cust_id, cust_nama} = req.body;
            const newcustomer = await pool.query("INSERT INTO customer (cust_id, cust_nama) VALUES($1, $2) RETURNING *", [cust_id, cust_nama]);
            res.json(newcustomer);
        } catch (err) {
            console.error(err.message);
        }
    }

    else if (req.method === 'PUT') {
        try {
            const {cust_id, cust_nama} = req.body;
            const updatecustomer = await pool.query("UPDATE customer SET cust_nama = $2 WHERE cust_id = $1", [cust_id, cust_nama]);
            res.json("customer Updated");
        }
        catch (err){
            console.error(err.message);
        }
    }

    else     if (req.method === 'DELETE') {
        try {
            const {cust_id} = req.body;
            const deletecustomer = await pool.query("DELETE FROM customer WHERE cust_id = $1", [cust_id]);
            res.json("customer Deleted");
        }
        catch (err){
            console.error(err.message);
        }
    }

    else {
        // Handle any other HTTP method
    }
}
