import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "../components/CartItem";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { ORDER_MUTATION } from "../utils/querys";
import { useMutation } from "@apollo/client";

const Sidebar = () => {
  const { isOpen, handleClose } = useContext(SidebarContext);
  const { cart, clearCart, itemAmount, total } = useContext(CartContext);
  const [user, setUser] = useState("");
  const [checkout, { loading, error, data }] = useMutation(ORDER_MUTATION);


  const handleCheckout = async () => {
    try {
      if (!user) {
        console.log("Please enter a User ID");
        return;
      }
      const orderDetails = cart.map((item) => ({
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: item.amount,
        total_price: item.price,
        buyer_id: user,
        updated_inventory : item.inventory_count - item.amount
      }));
      function orderProcessing (orderDetails) {
        orderDetails.forEach(async (order) => {
          console.log( 'order is there ',order)
          
          await checkout(
            {variables: {
            product_id :  order.product_id,
            variant_id : order.variant_id,
            quantity : order.quantity,
            total_price : order.total_price,
            buyer_id : order.buyer_id,
            updated_inventory : order.updated_inventory
            }}
          );
        });
      }
      orderProcessing(orderDetails);
    } catch (err) {
      console.log("Error during checkout:", err);
    }
  };

  useEffect(() => {
    if (data) {
      // Order successful, clear the cart and show confirmation message
      clearCart();
      console.log("Order confirmed:", data);
      // You can set some state to display a confirmation message or tick icon
    }
  }, [data]);

  


  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } "w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]"`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">Shopping Cart ({itemAmount})</div>
        <div
          onClick={handleClose}
          className="cursor-poniter w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
        <div className="flex justify-between items-center py-4">
          <div className="font-semibold">User Id</div>
          {/* input for userID */}
          <input
            type="text"
            className="border border-gray-300 px-2 py-1"
            placeholder="Enter User ID"
            value={user}
            onChange={(e) => {setUser(e.target.value)}
            }

          />

        </div>
        <div className="flex flex-col gap-y-3  mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="font-semibold">
            <span className="mr-2">Subtotal:</span> ${" "}
            {parseFloat(total).toFixed(2)}
          </div>
          <div
            onClick={clearCart}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
        </div>
      </div>
        <button
        onClick={handleCheckout}
        disabled={!user || loading}
        className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium"
      >
        {loading ? "Processing..." : "Checkout"}
      </button>

        {cart.map((item) => {
          return <CartItem item={item} key={item.variant_id} />;
        })}
      </div>
      
    </div>
  );
};

export default Sidebar;
