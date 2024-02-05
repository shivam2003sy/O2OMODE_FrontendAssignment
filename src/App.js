import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import AdminHomePage from "./pages/AdminHomePage";
import AddProductPage from "./pages/AddProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";



// uri: 'https://generous-adder-19.hasura.app/v1/graphql', 
// headers: {
//   'content-type': 'application/json',
//   'x-hasura-admin-secret': 'IxUkj3Jm4R0vQjzCpmtLT41Bzy6IA3Wue0EUgkaroaEmAg4nwXmgNnSpFPnuOttL',
// },



const AdminLayout = () => {
  return (
    <>
      <Routes>
       
        
        
      </Routes>
    </>
  );
};


const App = () => {
  const client = new ApolloClient({
    uri: 'https://generous-adder-19.hasura.app/v1/graphql', 
headers: {
  'content-type': 'application/json',
  'x-hasura-admin-secret': 'IxUkj3Jm4R0vQjzCpmtLT41Bzy6IA3Wue0EUgkaroaEmAg4nwXmgNnSpFPnuOttL',
},
    cache: new InMemoryCache()
  });

  
  return (
    <div className="overflow-hidden">
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <Routes>
          
  <Route path="/" element={<Home />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/admin" element={<AdminHomePage />} />
  <Route path="/admin/addproduct" element={<AddProductPage />} />
  <Route path="admin/products/:id" element={<ProductDetailPage />} />
          </Routes>
          <Footer />
        </Router>
      </ApolloProvider>
    </div>
  );
};


export default App;