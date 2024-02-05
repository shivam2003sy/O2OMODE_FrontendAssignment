import React, { createContext, useState, useEffect } from "react";
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  return (
    <ProductContext.Provider value={{ products , setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
