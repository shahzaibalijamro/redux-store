import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { GrAdd } from 'react-icons/gr';
import { IoIosAdd } from 'react-icons/io';
import { RiSubtractFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem, increaseQuantity } from '../config/redux/reducers/cartSlice';

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
    }
  }
  return (
    <div>
      <div className='my-container-2'>
        <h1 className='font-semibold text-3xl mt-8 mb-12 text-black text-center'>My Cart</h1>
        <div className='flex justify-center w-[100%]'>
          <div className='flex flex-col justify-center w-[70%] mb-10 items-center gap-8 flex-wrap'>
            {cartItems.length > 0 ? cartItems.map((item) => {
              return <div key={item.id} className="card card-side bg-base-100 shadow-xl">
                <div style={{
                  borderBottomLeftRadius: '18px',
                  borderTopLeftRadius: '18px'
                }} className='flex justify-center bg-[#e9e9e9] items-center'>
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className="card-body">
                  <h2 className="card-title text-left text-ellipsis line-clamp-1">{item.title}</h2>
                  <p className="overflow-hidden text-ellipsis line-clamp-2">{item.description}</p>
                  <p>Price : <span className='font-semibold'> {item.price} $</span></p>
                  <div className='flex items-center'>Quantity :
                    <div className='flex items-center'>
                      <GrAdd onClick={() => addProductToCart(item)} style={{
                        marginLeft: '10px',
                        marginRight: '10px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        padding: '5px',
                        boxSizing: 'content-box'
                      }} />
                      {item.quantity}
                      <RiSubtractFill style={{
                        marginLeft: '10px',
                        marginRight: '10px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        padding: '5px',
                        boxSizing: 'content-box'
                      }} />
                    </div>
                    <div className='ms-1'>
                      <FaTrashAlt style={{
                        color: 'red',
                        cursor: 'pointer'
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            }) : <div className='h-[100px] flex justify-center items-center'>
              <h1 className='text-xl'>It looks like your cart is empty!</h1>
            </div>}
          </div>
          <div className='w-[2px] mx-[25px] bg-[#c8c8c8]'>

          </div>
          <div className='w-[30%]'>
            <h1 className='text-xl'>Delievery Details</h1>
            <div className='my-6'>
              <h1 className=' mb-2'>Name</h1>
              <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" />
              <h1 className='mt-5 mb-2'>Mobile No</h1>
              <input type="text" placeholder="Mobile no" className="input input-bordered w-full max-w-xs" />
              <h1 className='mt-5 mb-2'>Address</h1>
              <textarea className="textarea w-[100%] max-w-[320px] textarea-bordered" placeholder="Address"></textarea>
            </div>
            <h1 className='text-xl'>Total Items : {cartItems.length === 1 ? `${cartItems.length} Item` : `${cartItems.length} Items`}</h1>
            <h1 className='text-xl mt-5'>Total Price : {total} $</h1>
            <button className="Btn2 mt-5 text-white btn-primary p-0">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart