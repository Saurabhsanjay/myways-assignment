import React, { useEffect, useState } from "react";
import styles from "../styles/products.module.css";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const Navigate = useNavigate();

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (response.ok) {
        const data = await response.json();
        console.log(data.products);
        setProducts(data.products);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className={styles.main}>
      {products?.map((product) => (
        <div
          onClick={() => Navigate(`/product/${product.id}`)}
          className={styles.productCard}
          key={product.id}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className={styles.image}
          />
          <h3 className={styles.name}>{product.title}</h3>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <button
            onClick={() => Navigate(`product/${product.id}`)}
            className={styles.button}
          >
            Show Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
