import { Link } from "react-router-dom";
import logo from "../src/assets/logo.png";

function Header() {
  return (
    <>
      <header className='navbar'>
        <div className='logo'>
          <img
            src={logo}
            alt='grocery logo image'
            width='50px'
            className='logo-image'
          />
          <a href='/'>Fresh Cart</a>
        </div>
        <div className='search-container'>
          <input
            type='text'
            placeholder='Search fresh produce, dairy...'
            className='search-bar'
          />
          <button className='search-btn'>🔍</button>
        </div>
        <nav className='user-menu'>
          <Link to='/reorder'>Reorder</Link>
          <Link to='/account'>Account</Link>
          <Link to='/signIn' className='auth-btn'>
            Sign In
          </Link>

          <div className='cart-icon'>
            <Link to='/cart'>
              🛒 <span id='cart-total'></span>
            </Link>
          </div>
        </nav>
      </header>
      <div className='category-strip'>
        <Link to='/freshProduce' className='cat-item'>
          Fresh Produce
        </Link>
        <Link to='/meat' className='cat-item'>
          Meat
        </Link>
        <Link to='/seafood' className='cat-item'>
          Seafood
        </Link>
        <Link to='/dairy' className='cat-item'>
          Dairy
        </Link>
      </div>
    </>
  );
}

export default Header;
