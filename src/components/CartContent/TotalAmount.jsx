import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../ShopContext/ShopContext";
import CartModal from "./CartModal";
import { useState } from "react";

const TotalAmount = () => {
  const { totalAmount, totalCartItems, resetCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetCart();
    navigate("/");
  };

  return (
    <div className="cart__info">
      <h3 className="cart__info-title">Cart Total</h3>
      <p className="cart__total-amount">
        Total Price: ${totalAmount().toFixed(2)}
      </p>
      <p className="cart__total-amount">Total Items: {totalCartItems()}</p>
      <div className="cart__buttons">
        <button className="cart__btn" onClick={() => navigate("/shop/")}>
          Continue Shopping
        </button>
        <button className="cart__btn" onClick={openModal}>
          Checkout
        </button>
      </div>
      <CartModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
};

export default TotalAmount;
