const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get and display all items in user's cart
router.get("/", async (req, res) => {
  const username = "testUser"; // hardcode -> change it later
  try {
    // Get all products data
    const cart = await db.query("SELECT * FROM cart WHERE username=?", [
      username,
    ]);
    return res.json(cart);
  } catch (err) {
    console.log(err);
  }
});

// Get product id and check if this is in DB
router.get("/product", async (req, res) => {
  const { productId } = req.query;
  const username = "testUser";
  const data = await db.query(
    "SELECT * FROM cart WHERE username=? AND product_id=?",
    [username, productId],
  );
  return res.json(data);
});

// Get all product records from DB matching the username
router.get("/user", async (req, res) => {
  const { username } = req.query;
  const userData = await db.query("SELECT * FROM cart WHERE username = ?", [
    username,
  ]);
  return res.json(userData);
});

// Add a new product record to cart DB
router.post("/", async (req, res) => {
  const {
    productId,
    quantity,
    productName,
    productPrice,
    productPic,
    username,
  } = req.body;

  await db.query(
    "INSERT INTO cart (product_id, product_quantity, product_name, product_price, product_pic, username) VALUES (?,?,?,?,?,?)",
    [productId, quantity, productName, productPrice, productPic, username],
  );
});

// Access and update an existing product record
router.patch("/", async (req, res) => {
  // Get added product info
  const { productId, productQuantity, username } = req.body;
  console.log(req.body);
  const query = await db.query(
    "UPDATE cart SET product_quantity= ? WHERE username = ? AND product_id = ?",
    [productQuantity, username, productId],
  );
});

// Access and delete a product record from cart DB
router.delete("/", async (req, res) => {
  const { productId, username } = req.body;
  const query = await db.query(
    "DELETE from cart WHERE product_id = ? and username = ?",
    [productId, username],
  );
});

module.exports = router;
