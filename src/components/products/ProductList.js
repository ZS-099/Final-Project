import React, { useState, useEffect } from "react";
import Product from "./product";
import NoProduct from "./NoProducts";
import SelectedProductDetails from "./SelectedProductDetails";
import SNAKE from "../../images/shop/snake.PNG";
import DRAGON from "../../images/shop/dragon.PNG";
import GECKO from "../../images/shop/gecko.PNG";
import SNAKE2 from "../../images/shop/snake2.PNG";
import TURTLE from "../../images/shop/turtle.1.PNG";
import TURTLE2 from "../../images/shop/turtle2.PNG";
const ProductList = ({
  products,
  setSelectedProduct,
  selectedProduct,
  user,
  setBasketCount
}) => {
  const [added, setAdded] = useState([]);
  const renderImg = {
    snake: SNAKE,
    dragon: DRAGON,
    snake2: SNAKE2,
    gecko: GECKO,
    turtle: TURTLE,
    turtle2: TURTLE2,
  };

  useEffect(() => {
    const getProductsFromLocalStorage = () => {
      if(!user){
        let ids = [];
        const items = JSON.parse(localStorage.getItem("products"));
        if (items) {
          ids = items.map((i) => i.id);
        }
        setAdded([...ids]);
      }else{
        setAdded([])
      }
    };
    getProductsFromLocalStorage();
  }, [user]);
  const renderProducts = () => {
    if (!products.length) {
      return <NoProduct />;
    }
    if (selectedProduct) {
      return (
        <SelectedProductDetails
          setBasketCount={setBasketCount}
          user={user}
          setSelectedProduct={setSelectedProduct}
          selectedProduct={selectedProduct}
          added={added}
          setAdded={setAdded}
        />
      );
    }
    return products.map((product, i) => {
      return (
        <Product
          product={product}
          setSelectedProduct={setSelectedProduct}
          key={i}
          name={product.name}
          price={product.price}
          id={product.product_id}
          img={renderImg[product.img]}
        />
      );
    });
  };

  return (
    <section className="products">
      <div className="products__container">{renderProducts()}</div>
    </section>
  );
};

export default ProductList;
