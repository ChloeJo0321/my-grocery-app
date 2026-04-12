const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", async (req, res) => {
  const { searchWord } = req.body;
  console.log(searchWord);
});

module.exports = router;
