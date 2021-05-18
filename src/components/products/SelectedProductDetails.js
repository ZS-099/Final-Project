import React, { useEffect, useState } from 'react';
import Carousel from "react-image-carousel";

const requireAll = r => {
  return r.keys().map(r);
};
let images = requireAll(
  require.context(`../../images/shop/`, false, /\.(PNG|jpe?g|svg)$/)
);

const SelectedProductDetails = ({
  setSelectedProduct,
  selectedProduct,
  setAdded,
  added,
  user,
  setBasketCount,
}) => {
 let defaults = [];
  images.filter(i => {  
    const img = i.default?i.default.split('/')[4]:false
    if (img && img.split('.')[0] && img.split('.')[0] === selectedProduct.img) {
      defaults.push(i.default);
      return i.default;
    }
  });
  console.log(images)
  const addProductToLocalStorage = (product, e) => {
    if (!user) {
      setMessage('you must be signed in to add an item to the basket');
      return;
    }
    e.stopPropagation();
    const itemsArray = JSON.parse(localStorage.getItem('products'));
    if (itemsArray) {
      itemsArray.push(product);
      setAdded([...added, product.id]);
      localStorage.setItem('products', JSON.stringify(itemsArray));
      // setBasketCount(JSON.parse(localStorage.getItem('products')));
      setBasketCount(itemsArray.length);
      return;
    }
    const items = [product];
    localStorage.setItem('products', JSON.stringify(items));
    setAdded([...added, product.id]);
    setBasketCount(1);
  };
  const [message, setMessage] = useState('');

  return (
    <>
      <div className="product-detail">
        <div className="product-detail_return">
          <button
            className="product-detail_return-btn"
            onClick={() => setSelectedProduct(null)}
          >
            Return to List
          </button>
        </div>
        <div className="product__content">
          <div className="product__content--head">
            <div className="product__content--head-img">
              <Carousel images={defaults} thumb={true} loop={true} />
            </div>
            <div className="product__content--head-description">
              <div className="product__content--head-description-values">
                <p style={{ color: 'red' }}>{message}</p>
                <div className="product-detail_return ">
                  <button
                    disabled={added.includes(selectedProduct.id)}
                    onClick={e => addProductToLocalStorage(selectedProduct, e)}
                    className="product-detail_return-btn product-detail_return-btn-list"
                  >
                    {added.includes(selectedProduct.id)
                      ? `ADDED TO BASKET`
                      : `ADD TO BASKET`}
                  </button>
                </div>
                <p className="units__name">{selectedProduct.name}</p>
                <p className="units">
                  <span className="units__key">Price:</span>
                  <span className="units__value">{` ${selectedProduct.price} £`}</span>
                </p>
                <p className="units">
                  <span className="units__key">Age:</span>
                  <span className="units__value">{` ${selectedProduct.age}`}</span>
                </p>
                <p className="units">
                  <span className="units__key">Sex:</span>
                  <span className="units__value">{` ${selectedProduct.sex}`}</span>
                </p>
                <p className="units">
                  <span className="units__key">Price:</span>
                  <span className="units__value">{` ${selectedProduct.sex}`}</span>
                </p>
                <p className="units">
                  <span className="units__key">Life expectancy:</span>
                  <span className="units__value">
                    {` ${selectedProduct.life_expectancy.from} - ${selectedProduct.life_expectancy.to} years`}
                  </span>
                </p>
                <p className="units">
                  <span className="units__key">Average max size:</span>
                  <span className="units__value">
                    {` ${selectedProduct.average_max_size.from} - ${selectedProduct.average_max_size.to} cm`}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="product__content--details">
            <div className="product__content--details-wrapper">
              <p className="units">
                <span className="units__key">Enclosure:</span>
                <span className="units__value">
                  {` ${selectedProduct.enclosure} `}
                </span>
              </p>
              <p className="units">
                <span className="units__key">Heating:</span>
                <span className="units__value">{selectedProduct.heating}</span>
              </p>
              <p className="units">
                <span className="units__key">Substrate:</span>
                <span className="units__value">
                  {` ${selectedProduct.substrate}`}
                </span>
              </p>
              {selectedProduct.humidity && (
                <p className="units">
                  <span className="units__key">Humidity:</span>
                  <span className="units__value">{` ${selectedProduct.humidity}`}</span>
                </p>
              )}
              <p className="units">
                <span className="units__key">Decoration:</span>
                <span className="units__value">
                  {` ${selectedProduct.decoration}`}
                </span>
              </p>
              <p className="units">
                <span className="units__key">Food:</span>
                <span className="units__value">{` ${selectedProduct.food}`}</span>
              </p>
              {selectedProduct.other && (
                <p className="units">
                  <span className="units__key">Other details:</span>
                  <span className="units__value">{` ${selectedProduct.other}`}</span>
                </p>
              )}
              {selectedProduct.filtration && (
                <p className="units">
                  <span className="units__key">Filtration:</span>
                  <span className="units__value">
                    {` ${selectedProduct.filtration}`}
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectedProductDetails;
