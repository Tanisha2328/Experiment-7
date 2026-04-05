import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: "Laptop",
        price: 50000,
        image: "https://via.placeholder.com/150"
      },
      {
        id: 2,
        name: "Phone",
        price: 20000,
        image: "https://via.placeholder.com/150"
      },
      {
        id: 3,
        name: "Headphones",
        price: 3000,
        image: "https://via.placeholder.com/150"
      }
    ]);
  }, []);

  return (
    <div className="container mt-5 text-center">

      <h2 className="mb-4">Exp 7.1 - Products</h2>

      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card p-3">

              <img
                src={product.image}
                alt={product.name}
                className="img-fluid"
              />

              <h5 className="mt-2">{product.name}</h5>
              <p>₹{product.price}</p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;