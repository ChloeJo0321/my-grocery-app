import { useEffect, useState } from "react";
import ProductDetail from "./ProductDetail";
import { Link } from "react-router-dom";

function sliceArray(arr, size) {
  let chunkedArr = [];
  for (let index = 0; index < arr.length; index += size) {
    chunkedArr.push(arr.slice(index, index + size));
  }
  return chunkedArr;
}
function FreshProduce() {
  /* Get product information from DB
  useEffect(<function>, <dependency>)
  freshProduce: client page
  /api/freshProduce: server API endpoint */
  // 상태 변수 선언
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // 데이터 가져오기
  useEffect(() => {
    fetch("http://localhost:3000/api/freshProduce")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        console.log("Data received");
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const chuckedArr = sliceArray(products, 3);

  // 빈 배열 [] → 의존성이 아무것도 없다는 뜻
  // 컴포넌트가 처음 화면에 나타날 때 한 번만 실행
  // 이후 상태가 바뀌거나 리렌더링되어도 다시 실행되지 않음
  if (isLoading) {
    return <p>Loading...</p>;
  }
  // React에서는 for loop 대신 map을 사용함
  return (
    <>
      <div className='products-container'>
        {chuckedArr.map((chunk, index) => (
          <div key={index} className='product-row'>
            {chunk.map((product) => (
              <div
                key={product.product_id}
                className='single-product-container'
              >
                <img src={`${product.product_pic}`} className='product-image' />
                <Link to={`/freshProduce/${product.product_id}`}>
                  {product.product_name}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default FreshProduce;
