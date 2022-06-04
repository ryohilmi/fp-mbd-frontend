const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log("Server has started on port 3000");
});

// Routes
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const {username} = req.body;
            const newTodo = await pool.query("INSERT INTO todo (username) VALUES($1) RETURNING *", [username]);
            res.json(newTodo);
        } catch (err) {
            console.error(err.message);
        }
    }
    else if(req.method === "GET"){
        try {
            const allTodos = await pool.query("SELECT * FROM todo");
            res.json(allTodos.rows);
        }
        catch (err){
            console.error(err.message);
        }
    }

    else if(req.method === "PUT"){
        try {
            const { id } = req.params;
            const { username } = req.body;
            const updateTodo = await pool.query("UPDATE todo SET username = $1 WHERE todo_id = $2", [username, id]);
            res.json("Todo Updated");
        }
        catch (err){
            console.error(err.message);
        }
    }

    else if (req.method === "DELETE"){
        try {
            const { id } = req.params;
            const updateTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
            res.json("Todo Deleted");
        }
        catch (err){
            console.error(err.message);
        }
    }

    else {
        // Handle any other HTTP method
    }
}

// // Get ID
// app.get("/test/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const todos = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
//         res.json(todos.rows[0]);
//     }
//     catch (err){
//         console.error(err.message);
//     }
// });