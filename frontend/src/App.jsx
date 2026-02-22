import { Routes, Route } from "react-router-dom";
import "./App.css";
import FreshProduce from "/pages/FreshProduce";
import Header from "/components/Header";
import Footer from "/components/Footer";
import Home from "/pages/Home";
import ProductDetail from "../pages/productDetail";
import Cart from "../pages/Cart";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/freshProduce' element={<FreshProduce />} />
        <Route path='/freshProduce/:id' element={<ProductDetail />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
