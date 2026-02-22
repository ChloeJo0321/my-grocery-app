const express = require("express"); //require("express") = Node.js module
const app = express();
const port = 3000;
const produceRouter = require("./routes/produceRoute");
const cartRouter = require("./routes/cartRoute");
const cors = require("cors");
// const { router: userRouter } = require("./routes/userRoute");
// const cartRouter = require("./routes/cartRoute");
// const cookieParser = require("cookie-parser");
// const { authenticateUser } = require("./middleware/authMiddleware");

app.use(express.urlencoded({ extended: true })); //Middleware call for form
app.use(express.json()); //Middleware call for form
app.use(cors());
// API routes
app.use("/api/freshProduce", produceRouter);
app.use("/api/cart", cartRouter);

//Start the server
app.listen(port, () => {
  console.log("Server is running");
});
