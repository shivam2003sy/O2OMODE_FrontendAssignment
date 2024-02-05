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



// uri: 'https://generous-adder-19.hasura.app/v1/graphql', 
// headers: {
//   'content-type': 'application/json',
//   'x-hasura-admin-secret': 'IxUkj3Jm4R0vQjzCpmtLT41Bzy6IA3Wue0EUgkaroaEmAg4nwXmgNnSpFPnuOttL',
// },



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
          <Route path="/" element={<Home />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
        </Routes>
        <Sidebar />
        <Footer />
      </Router>
      </ApolloProvider>
     
    </div>
  );
};

export default App;
