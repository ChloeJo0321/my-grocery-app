const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  const searchWord = req.query.searchWord;

  const query = await db.query("SELECT * FROM cart WHERE product_name LIKE ?", [
    `${searchWord}%`,
  ]);

  return res.json(query);
});

module.exports = router;
