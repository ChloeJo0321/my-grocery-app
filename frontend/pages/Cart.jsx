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
        console.log(data);
      });
  }, []);

  if (cart === null) {
    return <p>Cart is empty...</p>;
  }

  // Let user change the product quantity
  const changeQuantity = async (id, qty) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        return item.product_id === id
          ? { ...item, product_quantity: qty }
          : item;
      }),
    );

    try {
      await fetch("http://localhost:3000/api/cart", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          product_id: id,
          product_quantity: qty,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Rendering
  return (
    <>
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
          <p>Subtotal: $ </p>
          <button>Proceed to Checkout</button>
        </div>
      </div>
    </>
  );
}

export default Cart;
