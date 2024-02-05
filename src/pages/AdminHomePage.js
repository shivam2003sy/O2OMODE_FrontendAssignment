import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {GetProductsQuery} from '../utils/querys';

const AdminHomePage = () => {
  const [products, setProducts] = useState([]);
  const { data, error, loading } = useQuery(GetProductsQuery);
  const navigate = useNavigate();

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const productList = data.Product_Table || [];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>
      {productList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productList.map((product) => (
            <Link
              to={`/admin/products/${product.product_id}`} // Replace href with to
              key={product.product_id}
              className="border p-4 rounded-md"
            >
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p>{product.description}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p>No products found</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <p
          className="border p-4 rounded-md text-center hover:bg-gray-100 cursor-pointer"
          onClick={() => navigate('/admin/addProduct')} // Use navigate for programmatic navigation
        >
          <span className="text-lg font-semibold mb-2">Add New Product</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 mx-auto text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </p>
      </div>
    </div>
  );
};

export default AdminHomePage;
