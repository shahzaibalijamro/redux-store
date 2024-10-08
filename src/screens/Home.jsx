import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCartItem } from '../config/redux/reducers/cartSlice';
import { addProducts } from '../config/redux/reducers/productSlice';

const Home = () => {
  const cartItems = useSelector(state => state.cart.myCart);
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
  const addProductToCart = (item) => {
    console.log(item);
    dispatch(addCartItem(
      {
        item,
      }
    ))
  }
  return (
    <>
      <div className='my-container'>
        <h1 className='font-semibold text-3xl mt-8 mb-12 text-black text-center'>All Products</h1>
        <div className='flex justify-center items-center gap-8 flex-wrap'>
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