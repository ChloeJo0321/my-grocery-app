import { Link } from "react-router-dom";
import logo from "../src/assets/logo-removebg-preview.png";

function Footer() {
  return (
    <>
      <footer>
        <div className='footer-category-strip'>
          <img
            src={logo}
            alt='grocery logo image'
            width='30px'
            className='logo-image'
          />
          <Link to='/' className='footer-link'>
            Fresh Cart
          </Link>
        </div>
      </footer>
    </>
  );
}

export default Footer;
