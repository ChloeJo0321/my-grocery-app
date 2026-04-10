import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  // Receiving and storing data
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isProduct, setIsProduct] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isData, setIsData] = useState(null);
  const [isUser, setIsUser] = useState(null);
  const [justAdded, setJustAdded] = useState(null);
  let buttonText = "Add to Cart";
  const username = "testUser";

  // To fetch and display single product data
  useEffect(() => {
    fetch(`http://localhost:3000/api/freshProduce/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setIsProduct(true);
      });
  }, [id]);

  if (!isProduct) {
    return <p>Loading...</p>;
  }

  // Add product to cart db
  const addToCart = async () => {
    try {
      // Check if user already has data in DB
      await fetch(`http://localhost:3000/api/cart/user?username=${username}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0) {
            setIsUser(false);
          } else {
            setIsUser(true);
          }
        });

      // Check if product already in DB
      await fetch(`http://localhost:3000/api/cart/product?productId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setIsData(true);
            setJustAdded(false);
          } else {
            setIsData(false);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  if (isData === false) {
    fetch("http://localhost:3000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: id,
        quantity: quantity,
        productName: product[0]["product_name"],
        productPrice: product[0]["product_price"],
        productPic: product[0]["product_pic"],
        username: username,
      }),
    });
    setIsData(true);
    setJustAdded(true);
  }

  if (justAdded === true) {
    buttonText = "Added to Cart!";
  } else if (justAdded === false) {
    buttonText = "Already in Cart";
  }

  // Function to change product quantity
  function ChangeQuantity() {
    const handleChange = (event) => {
      setQuantity(event.target.value);
    };
    return (
      <>
        <div className='quantity-container'>
          <span>Quantity: </span>
          <select value={quantity} onChange={handleChange}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </>
    );
  }
  // Rendering data
  return (
    <>
      <div className='product-container'>
        <div className='image-container'>
          <img
            className='product-image'
            src={`${product[0]["product_pic"]}`}
            alt={`${product[0]["product_name"]}`}
          />
        </div>
        <div className='product-info-container'>
          <p className='product-name'>{product[0]["product_name"]}</p>
          <p>{product[0]["product_details"]}</p>
          <p>${product[0]["product_price"]}</p>

          <ChangeQuantity />
          <div className='btn-container'>
            <button className='cart-btn' onClick={addToCart}>
              {buttonText}
            </button>
            <button className='buy-btn'>Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductDetail;
