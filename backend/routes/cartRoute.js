const express = require("express");
const router = express.Router();
const db = require("../config/db");

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

router.patch("/", async (req, res) => {
  // Get added product info
  const { product_id, product_quantity, username } = req.body;

  const query = await db.query(
    "UPDATE cart SET product_quantity= ? WHERE username = ? AND product_id = ?",
    [product_quantity, username, product_id],
  );

  // Test for update query
  // console.log(query);
});

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

router.get("/product", async (req, res) => {
  const { productId } = req.query;
  const username = "testUser";
  const data = await db.query(
    "SELECT * FROM cart WHERE username=? AND product_id=?",
    [username, productId],
  );
  return res.json(data);
});

router.get("/user", async (req, res) => {
  const { username } = req.query;
  const userData = await db.query("SELECT * FROM cart WHERE username = ?", [
    username,
  ]);
  return res.json(userData);
});

module.exports = router;
