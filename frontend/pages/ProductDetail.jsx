import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  // Receiving and storing data
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isProduct, setIsProduct] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isData, setIsData] = useState(null);
  let buttonText = "Add to Cart";
  // const [productData, setProductData] = useState([]);

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
    // Check if product already exists in user's cart?
    try {
      await fetch(`http://localhost:3000/api/cart/check?productId=${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            setIsData(true);
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
      }),
    });
  }

  console.log(isData);
  // Change "Add to Cart" button text
  if (isData === true) {
    buttonText = "Already in Cart";
  } else if (isData === false) {
    buttonText = "Added to Cart";
  }

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
