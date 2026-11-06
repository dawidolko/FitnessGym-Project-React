import "./CartContent.scss";
import shopData from "../ShopContent/ShopData";
import { useContext } from "react";
import { CartContext } from "../ShopContext/ShopContext";
import CartProduct from "./CartProduct";
import TotalAmount from "./TotalAmount";
import { useNavigate } from "react-router-dom";

const CartContent = () => {
  const { items, totalAmount } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="cart container">
      {totalAmount() > 0 ? (
        <div className="cart__container">
          <table className="cart__table">
            <thead className="cart__thead">
              <tr className="cart__row">
                <th>Product</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {shopData.map((product) => {
                if (items[product.id] && items[product.id] > 0) {
                  return <CartProduct key={product.id} {...product} />;
                }
                return null;
              })}
            </tbody>
          </table>
          <TotalAmount />
        </div>
      ) : (
        <div className="cart__empty">
          <h2 className="cart__empty-title">Your cart is empty</h2>
          <button className="cart__empty-btn" onClick={() => navigate("/shop/")}>
            Go To Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default CartContent;
