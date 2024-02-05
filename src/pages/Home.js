import React, { useContext, useEffect } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from '../components/Product'
import Hero from '../components/Hero'
import { useQuery } from '@apollo/client'
import { GET_FEATURED_PRODUCTS } from '../utils/querys'

const Home = () => {
  const { products, setProducts } = useContext(ProductContext);
  const { loading, error, data } = useQuery(GET_FEATURED_PRODUCTS);
  useEffect(() => {
    if (data) {
      console.log(data);
      setProducts(data.Variant_Table);
    }
  }, [data, setProducts]);
  if (loading) return (
    <>
     <Hero/>
     <div className="loader   ">
      loading ...
      </div> 
    </>
   
  );
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      <Hero />
      <section className="py-20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-semibold mb-10 text-center">Explore Our Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {products.map((product) => {
              return (
                <Product product={product} key={product.variant_id} />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
