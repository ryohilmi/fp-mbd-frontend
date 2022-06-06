const pool = require("../../../src/db");

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log(req.body);
      res.status(201).json({
        data: req.body,
        success: true,
      });
    } catch (err) {}
  } else {
    // Handle any other HTTP method
  }
}
