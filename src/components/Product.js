import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { BsPlus, BsEyeFill } from "react-icons/bs";

import { CartContext } from "../contexts/CartContext";

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
 
  const { Product_Table  , 
    price,
    variant_name,
    inventory_count,
    variant_id
  } = product;
  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          {/* image */}
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300"
              src={`https://source.unsplash.com/400x400/?${variant_name}`}
              alt=""
            />
          </div>
        </div>
        {/* buttons */}
        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={() => addToCart(product,variant_id)}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            to={`/product/${variant_id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      {/* category, title & price */}
      <div>
        <div className="tex-sm capitalize text-gray-500 mb-1">{Product_Table.name}</div>
        <Link to={`/product/${variant_id}`}>
          <h2 className="font-semibold mb-1">{variant_name}</h2>
        </Link>

        <h2 className="font-semibbold">$ {price}</h2>
        {/* stock  */}
        <div className="text-sm text-gray-500">Stock: {inventory_count}</div>
      </div>
    </div>
  );
};

export default Product;
