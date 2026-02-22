const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../config/db");

// API Routing to process query and send data as JSON
// Get all products and send res object to client
router.get("/", async (req, res) => {
  try {
    // Get all products data
    const products = await db.query("Select * from groceries");
    return res.json(products);
  } catch (err) {
    console.log(err);
  }
});

// Data route for produceList/:id
router.get("/:id", async (req, res) => {
  // Get product id
  const id = req.params.id;

  try {
    // Get one product data
    const product = await db.query(
      "Select * from groceries where product_id=?", // ?: parameterized query
      [id],
    );
    return res.json(product);
    // console.log(product[0]["product_name"]);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
