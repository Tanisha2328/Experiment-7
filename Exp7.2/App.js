import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQty } from "./redux/cartSlice";

function App() {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  return (
    <div className="container mt-5 text-center">

      <h2 className="mb-4">Cart</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {cart.length === 0 ? (
            <tr>
              <td colSpan="4">No items in cart</td>
            </tr>
          ) : (
            cart.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>

                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={item.qty}
                    min="1"
                    onChange={(e) =>
                      dispatch(updateQty({
                        id: item.id,
                        qty: Number(e.target.value)
                      }))
                    }
                  />
                </td>

                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h4 className="mt-3">
        Total: $
        {cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}
      </h4>

      <button
        className="btn btn-dark mt-3"
        onClick={() => window.location.href = "../../index.html"}
      >
        Back
      </button>

    </div>
  );
}

export default App;