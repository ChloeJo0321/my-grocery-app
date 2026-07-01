import { Routes, Route } from "react-router-dom";
import "./App.css";
import FreshProduce from "/pages/FreshProduce";
import Header from "/components/Header";
import Footer from "/components/Footer";
import Home from "/pages/Home";
import ProductDetail from "../pages/productDetail";
import Cart from "../pages/Cart";
import SearchResults from "../pages/SearchResults";
import Account from "../pages/Account";
import SignIn from "../pages/SignIn";
import Reorder from "../pages/Reorder";
import Meat from "../pages/Meat";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/freshProduce' element={<FreshProduce />} />
        <Route path='/freshProduce/:id' element={<ProductDetail />}></Route>
        <Route path='/meat' element={<Meat />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/search/' element={<SearchResults />}></Route>
        <Route path='/account' element={<Account />}></Route>
        <Route path='/signIn' element={<SignIn />}></Route>
        <Route path='/reorder' element={<Reorder />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
