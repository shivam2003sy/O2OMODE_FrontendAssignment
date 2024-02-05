import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { ProductContext } from "../contexts/ProductContext";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { addToCart } = useContext(CartContext);
  const { products, setProducts } = useContext(ProductContext);


  console.log(products);
  // find the product
  const product = products.find((item) => {
    return item.variant_id === id;
  });
  console.log(product);

  // if product is not found
  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }
  // if product is found
  const { Product_Table  , 
    price,
    variant_name,
    inventory_count,
    variant_id
  } = product;
  return (
    <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        {/* image and text wrapper */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* image */}
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img className="max-w-[200px] lg:max-w-xs" src=
            {`https://source.unsplash.com/400x400/?${variant_name}`} alt="varient" />
          </div>
          {/* text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">{variant_name}</h1>
            <h2 className="text-[18px] text-gray-500 mb-4">{Product_Table.name}</h2>
        
            <div className="text-sm text-gray-500 mb-4">Stock: {inventory_count}</div>
            <div className="text-2xl text-red-500 font-medium mb-6">$ {price}</div>
            <p className="mb-8">{Product_Table.description}</p>
            <button onClick={()=>addToCart(product, variant_id)} className='bg-primary py-4 px-8 text-white'>Add to cart</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
