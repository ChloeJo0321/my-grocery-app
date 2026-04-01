const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", async (req, res) => {
  // Get added product info
  const { productId, quantity, productName, productPrice, productPic } =
    req.body;
  const username = "testUser";
  // Check if product in user's cart?
  // No
  const cartData = await db.query(
    "INSERT INTO cart (product_id, product_quantity, product_name, username, product_price, product_pic) VALUES (?,?,?,?,?,?) ",
    [productId, quantity, productName, username, productPrice, productPic],
  );
  // No: Insert info into cart

  // if (cartData.length === 0) {
  //   // Add a new row
  //   const query =
  //     "INSERT INTO cart (product_id, product_quantity, product_name, username, product_price, product_pic) VALUES (?,?,?,?,?,?)";
  //   await db.query(
  //     query,
  //     [productId, quantity, productName, username, productPrice, productPic],
  //     (err, result) => {
  //       if (err) {
  //         console.error(err);
  //         return res.status(500).json({ error: "DB insert failed" });
  //       }
  //       res.json({ success: true });
  //     },
  //   );
  // } else {
  //   // Yes
  //   // Update quantity
  //   console.log("Product already in cart");
  // }
});

// Get all items in user's cart
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

router.get("/check", async (req, res) => {
  const { productId } = req.query;
  const username = "testUser";
  const data = await db.query(
    "SELECT * FROM cart WHERE username=? AND product_id=?",
    [username, productId],
  );
  return res.json(data);
});

module.exports = router;
