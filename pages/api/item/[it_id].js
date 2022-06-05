const pool = require('../../../src/db');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { it_id } = req.query;

        try {
            const allTodos = await pool.query(
                "SELECT * FROM item WHERE it_id = $1", [it_id]
            );
            res.json(allTodos.rows);
        } catch (err) {
            console.error(err.message);
        }
    } else {
        // Handle any other HTTP method
    }
}
