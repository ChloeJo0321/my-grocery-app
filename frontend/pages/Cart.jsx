import { useEffect, useState } from "react";

function Cart() {
  // Fetch info from DB
  const [cart, setCart] = useState(null);

  // Fetch user's cart data
  useEffect(() => {
    fetch("http://localhost:3000/api/cart")
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
      });
  }, []);

  if (cart === null) {
    return <p>Your cart is empty...</p>;
  }

  // Update product quantity in frontend and backend
  const changeQuantity = async (id, qty) => {
    // Store previous cart in case there's discrepancy between frontend and backend
    const prevCart = cart;
    try {
      // Update product quanty using setCart
      setCart((prev) =>
        prev.map((item) => {
          return item.product_id === id
            ? { ...item, product_quantity: qty }
            : item;
        }),
      );

      // Update new quantity info in DB
      await fetch("http://localhost:3000/api/cart", {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          product_id: id,
          product_quantity: qty,
          username: "testUser",
        }),
      });
    } catch (error) {
      setCart(prevCart);
      console.log(error);
    }
  };

  // Calculate the subtotal of items in cart
  const total = cart
    ? cart.reduce(
        (sum, item) => sum + item.product_price * item.product_quantity,
        0,
      )
    : 0;

  // Rendering
  return (
    <>
      <div className='cart-header'>
        <h1>Cart</h1>
      </div>
      <div className='cart-outer-container '>
        <div className='cart-container'>
          {cart.map((item) => (
            <div key={item.cart_id} className='cart-product-container'>
              <div className='image-container'>
                <img
                  className='product-image'
                  src={`${item.product_pic}`}
                  alt={`${item.product_name}`}
                />
              </div>
              <div>
                <p className='product-name'>{item.product_name}</p>
                <div>
                  <span>
                    Quantity:
                    <button
                      onClick={() =>
                        changeQuantity(
                          item.product_id,
                          item.product_quantity - 1,
                        )
                      }
                    >
                      -
                    </button>
                    {item.product_quantity}
                    <button
                      onClick={() =>
                        changeQuantity(
                          item.product_id,
                          item.product_quantity + 1,
                        )
                      }
                    >
                      +
                    </button>
                  </span>
                </div>
                <p>${item.product_price}</p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p>Subtotal: ${total.toFixed(2)}</p>
          <button>Proceed to Checkout</button>
        </div>
      </div>
    </>
  );
}

export default Cart;
