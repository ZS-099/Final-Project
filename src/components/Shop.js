import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import Paypal from './Paypal';

const Shop = ({
  name,
  setName,
  street,
  setStreet,
  streetNumber,
  setStreetNumber,
  city,
  setPostalCode,
  postalCode,
  setCity,
  country,
  setCountry,
  phone,
  setPhone,
  file,
  handleFileChange,
  handleApprovalSubmit,
  hasShippingDetails,
  checkout,
  setCheckout,
  added,
  setAdded,
  userDetails,
  user,
  setBasketCount,
}) => {
  const [approval, setApproval] = useState(false);
  const [paid, setPaid] = useState(false);

  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('products')) || []
  );
  const [totalPrice, setTotalPrice] = useState(0);

  const handleRemoveItem = toRemoveItem => {
    const filteredItems = items.filter(item => item.id !== toRemoveItem.id);
    setItems([...filteredItems]);
    localStorage.setItem('products', JSON.stringify(filteredItems));
    setBasketCount(filteredItems.length);
  };

  const calcPrice = arrItems => {
    const price = arrItems.reduce((acc, curr) => acc + Number(curr.price), 0);
    setTotalPrice(price);
  };

  const renderEmptyBasket = () => (
    <div className="products__container-empty">
      <h1 className="products__container--empty__header">{`Basket Empty`}</h1>
    </div>
  );

  const renderItems = ShopItems => {
    return ShopItems.map((item, index) => {
      return (
        <div key={index} className="shop__body-items--item">
          <div className="shop__body-items--item-name">
            <FontAwesomeIcon
              onClick={() => handleRemoveItem(item)}
              className="shop__body-items-icon"
              icon={faMinusCircle}
              size="1x"
            />
            <p>{item.name}</p>
          </div>
          <div className="shop__body-items--item-price">
            <p>{item.price} £ </p>
          </div>
        </div>
      );
    });
  };
  const setApprovale = React.useCallback(() => {
    if (!hasShippingDetails) {
      setApproval(false);
    }
  }, [hasShippingDetails, setApproval]);

  useEffect(() => {
    if (items) calcPrice(items);
    setApprovale();
  }, [items, hasShippingDetails, setApprovale]);

  const renderApprovalFile = () => {
    return (
      <div className="approval">
        <>
          <div className="approval__text">
            <p>
              Below you will need to provide at least 1 document proving you
              have the necessary equipment/ set up/ food for the reptile you are
              purchasing. This document will be checked by someone to ensure you
              are well prepared for the arrival of your new reptile.
            </p>
            <p>
              You will receive an email in 24 hours letting you know if your
              order has been approved.
            </p>
          </div>
          <p> You currently uploaded {localStorage.getItem('files')} files </p>
          <div className="approval__upload">
            <input
              required
              value={file}
              onChange={handleFileChange}
              type="file"
            />
          </div>
        </>
      </div>
    );
  };

  const renderApprovalContainer = () =>
    !hasShippingDetails && (
      <div className="approval">
        <div className="approval__form">
          <form
            onSubmit={handleApprovalSubmit}
            id="shipping-form"
            className="shipping"
          >
            <div className="shipping__header">
              <h4>Shipping details</h4>
            </div>
            <div className="shipping__body">
              <div className="shipping__formgroup">
                <label className="shipping__label">Name</label>
                <div>
                  <input
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="shipping__input"
                    placeholder="name"
                  />
                </div>
              </div>
              <div className="shipping__formgroup">
                <label className="shipping__label">Address</label>
                <div>
                  <input
                    required
                    value={street}
                    onChange={e => setStreet(e.target.value)}
                    className="shipping__input"
                    placeholder="street"
                  />
                  <input
                    required
                    value={streetNumber}
                    onChange={e => setStreetNumber(e.target.value)}
                    className="shipping__input shipping__input-secondary "
                    placeholder="house Nom"
                  />
                </div>
              </div>
              <div className="shipping__formgroup">
                <div>
                  <input
                    required
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="shipping__input"
                    placeholder="city"
                  />
                  <input
                    required
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    className="shipping__input shipping__input-secondary "
                    placeholder="country"
                  />
                </div>
              </div>
              <div className="shipping__formgroup">
                <div>
                  <input
                    required
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                    className="shipping__input shipping__input"
                    placeholder="postal code"
                  />
                </div>
              </div>
              <div className="shipping__formgroup">
                <label className="shipping__label">Phone number</label>
                <div>
                  <input
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="shipping__input"
                    placeholder="phone"
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="approval__submit">
            <button
              type="submit"
              form="shipping-form"
              className="product-detail_return-btn"
            >
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <section className="products">
      <div className="shop">
        <div className="shop__container">
          {!checkout && (
            <div className="shop__body">
              <div className="shop__body-header">
                <h4>Checkout</h4>
              </div>
              <div className="shop__body-items">
                {items && items.length ? renderItems(items) : null}
                {!items && !items.length ? renderEmptyBasket() : null}
              </div>
              <div className="shop__body-total">
                <button
                  disabled={!items.length}
                  onClick={() => setApproval(true)}
                  className="product-detail_return-btn"
                >
                  {items.length ? `Checkout ${totalPrice} £` : `Basket empty`}
                </button>
              </div>
            </div>
          )}
          {approval && renderApprovalContainer()}
          {hasShippingDetails && renderApprovalFile()}
          {checkout && (
            <>
              <div className="shop__body">
                <div className="shop__body-header">
                  <h4>{paid ? `Congratulations` : `Payment`}</h4>
                </div>
                <div className="shop__body-items">{renderItems(items)}</div>
                <div className="shop__body-total">
                  <p>
                    {paid ? `Total paid ` : `Total To pay`}
                    {totalPrice} £
                  </p>
                </div>
              </div>
              {checkout && renderApprovalFile()}

              <div className="shop__body--paypal">
                <Paypal
                  userDetails={userDetails}
                  setPaid={setPaid}
                  user = {user}
                  amount={totalPrice}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
export default Shop;
