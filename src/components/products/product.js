import React from "react";

const Product = (props) => {
  return (
    <div className="product">
      <div
        className="product__image"
        style={{ backgroundImage: `url(${props.img})` }}
      ></div>
      <div className="product__description">
        <p className="product__description-name">{props.name}</p>
        <p className="product__description-desc">{props.price} £</p>
        <p className="product__description-desc">{props.id} </p>
      </div>
      <div className="product__cta">
        <button
          onClick={() => props.setSelectedProduct(props.product)}
          className="product__cta-btn"
        >
          More Info!
        </button>
        {/* <button
          disabled={props.added.includes(props.product.id)}
          onClick={() => addProductToLocalStorage(props.product)}
          className="product__cta-btn"
        >
          {props.added.includes(props.product.id)
            ? `Added to Basket`
            : `Add To Basket`}
        </button> */}
      </div>
    </div>
  );
};

export default Product;
