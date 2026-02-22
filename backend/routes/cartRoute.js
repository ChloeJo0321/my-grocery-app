const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../config/db");

router.post("/", async (req, res) => {
  const { productId, quantity, productName, productPrice, productPic } =
    req.body;
  const username = "testUser"; // hardcode -> change it later
  //   const cartId = 100; // hardcode -> change it later
  // Find username in the cart
  // No
  const cartData = await db.query(
    "SELECT * FROM cart WHERE username = ? AND product_id = ?",
    [username, productId],
  );
  if (cartData.length === 0) {
    // Add a new row
    const query =
      "INSERT INTO cart (product_id, product_quantity, product_name, username, product_price, product_pic) VALUES (?,?,?,?,?, ?)";
    await db.query(
      query,
      [productId, quantity, productName, username, productPrice, productPic],
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "DB insert failed" });
        }
        res.json({ success: true });
      },
    );
  } else {
    // Yes
    // Update quantity
    const prevQuantity = cartData[0]["product_quantity"];
    const newQuantity = prevQuantity + Number(quantity);
    // Quantity = 0
    if (newQuantity === 0) {
      await db.query("DELETE FROM cart WHERE product_id=?", [productId]);
    } else {
      await db.query(
        "UPDATE cart  SET product_quantity= ? WHERE product_id = ? ",
        [newQuantity, productId],
      );
    }
  }
});

router.get("/", async (req, res) => {
  const username = "testUser"; // hardcode -> change it later
  try {
    // Get all products data
    const cart = await db.query("SELECT * from cart WHERE username=?", [
      username,
    ]);
    console.log(cart);
    return res.json(cart);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
