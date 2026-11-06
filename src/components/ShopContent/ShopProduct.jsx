import React, { useContext } from "react";
import { CartContext } from "../ShopContext/ShopContext";

const ShopProduct = (props) => {
	const { id, img, name, price, isNew } = props;
	const { items, addToCart } = useContext(CartContext);
	const itemsInfo = items[id];

	return (
		<div className="shop__product" key={id}>
			{isNew && <span className="shop__label">NEW</span>}
			<div className="shop__image">
				<img className="shop__img" src={img} alt={name} width="400" height="400" loading="lazy" />
			</div>
			<div className="shop__content">
				<p className="shop__name">{name}</p>
				<p className="shop__price">${price}</p>
				<button className="shop__btn" onClick={() => addToCart(id)}>
					Add To Cart {itemsInfo > 0 && <span> ( {itemsInfo} ) </span>}
				</button>
			</div>
		</div>
	);
};

export default ShopProduct;
