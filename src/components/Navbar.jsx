import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const currentPage = useLocation().pathname;
    console.log(currentPage);
    const cartItems = useSelector(state => state.cart.myCart);
    let total = 0;
    if (cartItems.length > 0) {
        cartItems.map((item,index) => {
            total += item.price*item.quantity
        })
    }
    return (
        <div>
            <div className="navbar bg-base-100 dark:bg-gray-900 text-gray-100">
                <div className="flex-1">
                <Link to={'/'}>
                    <span className="btn btn-ghost text-xl">Redux Store</span>
                </Link>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="badge badge-sm indicator-item">{cartItems.length}</span>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card dark:bg-gray-900 text-gray-100 card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                            <div className="card-body">
                                <span className="text-lg font-bold">
                                    {cartItems.length === 1 ? `${cartItems.length} Item` : `${cartItems.length} Items`}
                                </span>
                                <span className="text-info">Subtotal: ${total.toFixed(2)}</span>
                                {currentPage === '/' ? <div className="card-actions">
                                    <Link to={'cart'}>
                                    <button className="btn btn-primary btn-block">View cart</button>
                                    </Link>
                                </div> : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar