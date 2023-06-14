import { useState, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import styles from "../styles/SingleProduct.module.css";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  thumbnail:string;
}

const SingleProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

const Navigate=useNavigate();

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  useEffect(() => {
  

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src={product.thumbnail}
          alt={product.name}
          className={styles.image}
        />
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{product.name}</h2>
        <p className={styles.price}>Price: ${product.price}</p>
        <p className={styles.description}>{product.description}</p>
      </div>
      <button onClick={()=>Navigate('/products')} className={styles.goBackButton}>
        Go Back
      </button>
    </div>
  );
};

export default SingleProduct;
