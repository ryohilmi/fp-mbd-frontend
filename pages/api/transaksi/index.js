const pool = require("../../../src/db");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      res.json(req.body);
    } catch (err) {}
  } else {
    // Handle any other HTTP method
  }
}
