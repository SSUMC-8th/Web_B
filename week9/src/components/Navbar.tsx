import { useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotal } from '../slices/cartSlice';
import type { RootState } from '../store/store';


export const Navbar = () => {
  const {amount,cartItems} = useSelector((state:RootState) => state.cart); 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal());
  },[dispatch,cartItems]);


  return (
    <div className='flex justify-between items-center p-4 bg-gray-800 text-white'>
      <h1 onClick={() => {
        window.location.href = '/';
      }} className='text-2xl font-semibold cursor-pointer'>Lp Store</h1>
      <div className='flex items-center space-x-2'>
        <FaShoppingCart className='text-2xl cursor-pointer' />
        <span className='text-xl font-medium'>{amount}</span>
      </div>
      
    </div>
  )
}
