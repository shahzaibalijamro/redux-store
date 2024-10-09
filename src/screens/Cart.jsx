import React from 'react'
import { useSelector } from 'react-redux';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.myCart);
  return (
    <>
      <div className='my-container'>
        <h1 className='font-semibold text-3xl mt-8 mb-12 text-black text-center'>My Cart</h1>
        <div className='flex flex-col justify-center items-center gap-8 flex-wrap'>
          {cartItems.map((item, index) => {
            return <div key={item.id} className="card card-side bg-base-100 shadow-xl">
              <div style={{
                borderBottomLeftRadius: '18px',
              }} className='flex justify-center bg-[#e9e9e9] items-center'>
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className="card-body">
                <h2 className="card-title text-left text-ellipsis line-clamp-1">{item.title}</h2>
                <p className="overflow-hidden text-ellipsis line-clamp-2">{item.description}</p>
                <div className="card-actions mt-3 flex justify-left">
                  <button className="Btn text-white btn-primary p-0">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default Cart