import { Link } from "react-router-dom";
import logo from "../src/assets/logo.png";

function Footer() {
  return (
    <>
      <footer>
        <div className='footer-category-strip'>
          <Link to='/' className='footer-link'>
            Fresh Cart
          </Link>
        </div>
      </footer>
    </>
  );
}

export default Footer;
