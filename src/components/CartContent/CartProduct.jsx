import React, { useContext } from "react";
import { CartContext } from "../ShopContext/ShopContext";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const CartProduct = (props) => {
  const { id, img, name, price } = props;
  const { items, addToCart, removeFromCart, singleProductAmount } =
    useContext(CartContext);
  const quantity = items[id];

  return (
    <tr className="cart__tr" key={id}>
      <td>
        <img className="cart__img" src={img} alt={name} width="400" height="400" loading="lazy" />
      </td>
      <td className="cart__name">{name}</td>
      <td className="cart__price">${parseFloat(price).toFixed(2)}</td>
      <td className="cart__action">
        <button className="cart__action-btn" onClick={() => removeFromCart(id)}>
          <AiOutlineMinus className="cart__action-icon" />
        </button>
        <span className="cart__action-quantity">{quantity}</span>
        <button className="cart__action-btn" onClick={() => addToCart(id)}>
          <AiOutlinePlus className="cart__action-icon" />
        </button>
      </td>
      <td className="cart__total">
        ${(singleProductAmount(id) || 0).toFixed(2)}
      </td>
    </tr>
  );
};

export default CartProduct;
