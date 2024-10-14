import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';
import { IoIosAdd } from 'react-icons/io';
import { RiSubtractFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, decreaseQuantity, increaseQuantity, removeCartItem } from '../config/redux/reducers/cartSlice';
import { useEffect } from 'react';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.myCart);
  console.log(cartItems);
  let total = 0;
  if (cartItems.length > 0) {
    cartItems.map((item, index) => {
      total += item.price * item.quantity
    })
  }
  const increaseQuantityOfItem = (item) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.title === item.title);
    if (existingCartItem) {
      dispatch(increaseQuantity({
        id: existingCartItem.id,
      }));
    }
  }
  const decreaseQuantityOfItem = (item) => {
    if (item.quantity > 0) {
      const existingCartItem = cartItems.find(cartItem => cartItem.title === item.title);
      if (existingCartItem) {
        dispatch(decreaseQuantity({
          id: existingCartItem.id,
        }));
      }
    }
  }
  const deleteItem = (item) => {
    // const existingCartItem = cartItems.find(cartItem => cartItem.title === item.title);
    // console.log(existingCartItem);
    dispatch(removeCartItem({
      id: item.id
    }))
  }
  const showSnackbar = () => {
    if (cartItems.length > 0) {
      var snackbar = document.getElementById("snackbar");
      snackbar.className = "show";
      setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 4000);
    } else {
      alert('You have an empty cart!')
    }
  }
  const hideSnackbar = () => {
    var snackbar = document.getElementById("snackbar");
    snackbar.className = "";
  }
  let totalProducts = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  console.log(totalProducts);
  return (
    <div>
      <div className='my-container-2'>
        <div id="snackbar">
          <div className="snackCard">
            <div className="snackCard-wrapper">
              <div className="snackCard-icon">
                <div className="icon-cart-box">
                  <svg
                    viewBox="0 0 576 512"
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                      fill="#009688"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="snackCard-content">
                <div className="snackCard-title-wrapper">
                  <span className="snackCard-title ms-2">Your Order Has Been Placed!</span>
                  <span onClick={hideSnackbar} className="snackCard-action cursor-pointer">
                    <svg
                      viewBox="0 0 384 512"
                      width="15"
                      height="15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                      ></path>
                    </svg>
                  </span>
                </div>
                <h1 className='mt-1 ms-2'>Thanks For Shopping!</h1>
              </div>
            </div>
          </div>
        </div>
        <h1 className='font-semibold text-3xl mt-8 mb-12 text-black text-center'>My Cart</h1>
        <div id='flexColAt' className='flex justify-center w-[100%]'>
          <div id='leftSide' className='flex flex-col justify-center w-[70%] mb-10 items-center gap-8 flex-wrap'>
            {cartItems.length > 0 ? cartItems.map((item) => {
              return <div key={item.id} className="card lg:card-side bg-base-100 shadow-xl">
                <div id='imageBox' style={{
                  borderBottomLeftRadius: '18px',
                  borderTopLeftRadius: '18px'
                }} className='flex justify-center bg-[#e9e9e9] items-center'>
                  <img style={{
                    width: '150px',
                    maxWidth: '150px'
                  }} src={item.thumbnail} alt={item.title} />
                </div>
                <div className="card-body">
                  <h2 className="card-title text-left text-ellipsis line-clamp-1">{item.title}</h2>
                  <p className="overflow-hidden text-ellipsis line-clamp-2">{item.description}</p>
                  <p>Price : <span className='font-semibold'> {item.price} $</span></p>
                  <div className='flex items-center'>Quantity :
                    <div className='flex items-center'>
                      <GrAdd onClick={() => increaseQuantityOfItem(item)} style={{
                        marginLeft: '10px',
                        marginRight: '10px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        padding: '5px',
                        boxSizing: 'content-box'
                      }} />
                      {item.quantity}
                      <RiSubtractFill onClick={() => decreaseQuantityOfItem(item)} style={{
                        marginLeft: '10px',
                        marginRight: '10px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        padding: '5px',
                        boxSizing: 'content-box'
                      }} />
                    </div>
                    <div className='ms-1'>
                      <FaTrashAlt onClick={() => deleteItem(item)} style={{
                        color: 'red',
                        cursor: 'pointer'
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            }) : <div className='h-[100px] flex justify-center items-center'>
              <h1 className='text-xl text-center'>It looks like your cart is empty!</h1>
            </div>}
          </div>
          <div className='w-[2px] mx-[25px] bg-[#c8c8c8]'>

          </div>
          <div id='rightSide' className='w-[30%]'>
            <h1 className='text-xl'>Delievery Details</h1>
            <div className='my-6'>
              <div>
                <h1 className=' mb-2'>Name</h1>
                <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" />
              </div>
              <div>
                <h1 className='mt-5 mb-2'>Mobile No</h1>
                <input type="text" placeholder="Mobile no" className="input input-bordered w-full max-w-xs" />
              </div>
              <div>
                <h1 className='mt-5 mb-2'>Address</h1>
                <textarea className="textarea w-[100%] max-w-[320px] textarea-bordered" placeholder="Address"></textarea>
              </div>
            </div>
            <h1 className='text-xl'>Total Items : {totalProducts}</h1>
            <h1 className='text-xl'>Unique Products : {cartItems.length === 1 ? `${cartItems.length}` : `${cartItems.length} Items`}</h1>
            <h1 className='text-xl mt-5'>Total Price : {total.toFixed(2)} $</h1>
            <button onClick={showSnackbar} className="Btn2 mt-5 text-white btn-primary p-0">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart