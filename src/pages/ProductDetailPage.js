
import { gql, useQuery, useMutation } from '@apollo/client';

import { useEffect, useState } from 'react';
import { GetProductDetailsQuery, CreateVariantMutation } from '../utils/querys';
import { useParams } from 'react-router-dom';
const ProductDetailPage = ( ) => {

  const { id } = useParams();
  const [newVariant, setNewVariant] = useState({
    variant_name: "",
    price: 0,
    inventory_count: 0,
  });

  const [showForm, setShowForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [addVariant, { data: variantData, error: variantError }] = useMutation(CreateVariantMutation);

  const { data, error, loading } = useQuery(GetProductDetailsQuery, {
    variables: {
      product_id: id,
    },
  });

  if (loading) return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-6">Product Detail</h1>
      <p>Loading...</p>
    </div>
  )
  if (error) return `Error! ${error.message}`;

  const product = data.Product_Table[0] || null;

  const handleVariantChange = (e) => {
    setNewVariant({
      ...newVariant,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeleteProduct = async () => {

  };

  const handleCreateVariant = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: responseData } = await addVariant({
        variables: {
          inventory_count: parseFloat(newVariant.inventory_count),
          price: parseFloat(newVariant.price),
          product_id: id,
          variant_name: newVariant.variant_name,
        },
      });
    
      console.log(responseData);
      setNewVariant({
        variant_name: "",
        price: 0,
        inventory_count: 0,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  

  return (
    <div className="container mx-auto mt-8">
    <h1 className="text-4xl font-bold mb-6">Product Detail</h1>
    {product ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Details */}
        <div className="border p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          <p>{product.description}</p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Variants</h3>
          <ul>
            {product.Variant_Tables.map((variant) => (
              <li key={variant.variant_name} className="mb-4">
                <h4 className="text-md font-semibold mb-2">{variant.variant_name}</h4>
                <p>Price: {variant.price}</p>
                <p>Inventory: {variant.inventory_count}</p>
                <div className="flex mt-2">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">
                    Update
                  </button>
                  <button className="bg-red-500 text-white py-2 px-4 rounded-md">Delete</button>
                </div>
              </li>
            ))}
          </ul>

          
        </div>

        {/* Variant Form */}
        {showForm && (
          <div className="border p-4 rounded-md">
            <form onSubmit={handleCreateVariant} className="flex flex-col">
            <label htmlFor="variant_name">Variant Name</label>
              <input
                type="text"
                id="variant_name"
                name="variant_name"
                value={newVariant.variant_name}
                onChange={handleVariantChange}
              />
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={newVariant.price}
                onChange={handleVariantChange}
              />
              <label htmlFor="inventory_count">Inventory Count</label>
              <input
                type="number"
                id="inventory_count"
                name="inventory_count"
                value={newVariant.inventory_count}
                onChange={handleVariantChange}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`bg-green-500 text-white py-2 px-4 rounded-md ${
                    isLoading && 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? 'Adding Variant...' : 'Add Variant'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    ) : (
      <p>No product found</p>
    )}
  </div>
);
};

export default ProductDetailPage;
