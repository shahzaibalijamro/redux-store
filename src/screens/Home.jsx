import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem, increaseQuantity } from '../config/redux/reducers/cartSlice';
import { addProducts } from '../config/redux/reducers/productSlice';

const Home = () => {
  const cartItems = useSelector(state => state.cart.myCart);
  console.log(cartItems);
  const allProducts = useSelector(state => state.products.products);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getProducts() {
      const requestedProducts = await axios('https://dummyjson.com/products')
      const returnedProducts = await requestedProducts.data.products
      dispatch(addProducts({
        returnedProducts,
      }))
    }
    if (allProducts.length === 0) {
      getProducts()
    }
  }, [])
  const showSnackbar = () => {
    var snackbar = document.getElementById("snackbar");
    snackbar.className = "show";
    setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 2000);
  }
  const hideSnackbar = () => {
    var snackbar = document.getElementById("snackbar");
    snackbar.className = "";
  }
  const addProductToCart = (item) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.title === item.title);
    if (existingCartItem) {
      dispatch(increaseQuantity({
        id: existingCartItem.id,
      }));
    } else {
      dispatch(addCartItem({
        item: {
          ...item,
          quantity: 1
        }
      }));
      showSnackbar()
    }
  }
  return (
    <>
      <div className='my-container'>
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
                  <span className="snackCard-title">Added to cart!</span>
                  <span onClick={hideSnackbar} className="snackCard-action">
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
              </div>
            </div>
          </div>
        </div>
        <h1 className='font-semibold text-3xl mt-8 mb-12 text-black text-center'>All Products</h1>
        <div className='flex justify-center mb-10 items-center gap-8 flex-wrap'>
          {allProducts.length > 0 ? allProducts.map((item, index) => {
            return <div key={item.id} className="card card-compact bg-base-100 w-72 shadow-xl">
              <div style={{
                borderTopLeftRadius: '18px',
                borderTopRightRadius: '18px'
              }} className='flex justify-center bg-[#e9e9e9] items-center'>
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className="card-body">
                <h2 className="card-title text-center text-ellipsis line-clamp-1">{item.title}</h2>
                <p className="overflow-hidden text-ellipsis line-clamp-2">{item.description}</p>
                <div className="card-actions mt-3 flex justify-center">
                  <button onClick={() => addProductToCart(item)} className="Btn text-white btn-primary p-0">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          }) : <div className='flex justify-center h-[50vh] items-center'>
            <span className="loading loading-spinner loading-lg"></span>
          </div>}
        </div>
      </div>
    </>
  )
}

export default Home