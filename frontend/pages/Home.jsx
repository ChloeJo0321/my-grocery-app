import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <main className='hero'>
        <div className='hero-content'>
          <h1>Freshness Delivered to Your Door.</h1>
          <p>Support local farmers and get 20% off your first reorder.</p>
          <br />
          <Link to='/freshProduce' className='cta-main'>
            Shop Now
          </Link>
        </div>
      </main>
    </>
  );
}

export default Home;
