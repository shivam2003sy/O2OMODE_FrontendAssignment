"use client"
import React from 'react';
import { useMutation  , gql} from '@apollo/client';
import {ADD_PRODUCT} from "../utils/querys"
const AddProductPage = () => {
    

const [addProduct, { data, error }] = useMutation(ADD_PRODUCT);
  const handleSubmit = async(e) => {
    e.preventDefault();
    const productName = e.target.productName.value;
    const productDescription = e.target.productDescription.value;

    console.log({ productName, productDescription });

    try {

        const { data: responseData } = await addProduct({
          variables: {
            name: productName,
            description: productDescription
          }
        });
  
        console.log(responseData);

    console.log(data);
    e.target.reset();
  }
    catch (error) {
        console.error(error);
    }
    }
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold mb-6">Add New Product</h1>

      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="productName" className="block text-gray-600 text-sm font-semibold mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            className="w-full p-2 border rounded-md"
            placeholder="Enter product name"
          />
        </div>

        {/* Description Textarea */}
        <div className="mb-4">
          <label htmlFor="productDescription" className="block text-gray-600 text-sm font-semibold mb-2">
            Product Description
          </label>
          <textarea
            id="productDescription"
            name="productDescription"
            rows="4"
            className="w-full p-2 border rounded-md"
            placeholder="Enter product description"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
