import { useDispatch } from 'react-redux'
import type { Lp } from '../types/cart'
import { decrease, increase, removeItem } from '../slices/cartSlice'

interface CartItemProps {
  lp: Lp
}

export const CartItem = ({lp}:CartItemProps) => {

  const dispatch = useDispatch()
  const handleIncreaseCount = () => {
    dispatch(increase({id: lp.id}))
  }
  const handleDecreaseCount = () => {
    dispatch(decrease({id: lp.id}))
    if(lp.amount <= 1) {
      // 만약 수량이 1 이하로 내려가면, 아이템을 제거
      dispatch(removeItem({id: lp.id}))
      return
    }
  }

  return (
    <div className='flex items-center p-4 border-b border-gray-200'>
      <img src={lp.img} alt={lp.title} className='w-24 h-24 object-cover rounded mr-4' 
      />
      <div className='flex-1'>
        <h3 className='text-xl font-semibold'>{lp.title}</h3>
        <p className='text-sm text-gray-600'>{lp.singer}</p>
        <p className='text-sm font-bold text-gray-600'>₩{lp.price.toLocaleString()}</p>
      </div>
      <div className='flex items-center'>
        <button onClick={handleDecreaseCount} className='px-3 py-1 bg-gray-300 text-gray-800 rounded-l hover:bg-gray-400 cursor-pointer'>
          -
        </button>
        <span className='px-4 py-[3px] border-y border-gray-300 text-gray-800'>
          {lp.amount}
        </span>
        <button onClick={handleIncreaseCount} className='px-3 py-1 bg-gray-300 text-gray-800 rounded-r hover:bg-gray-400 cursor-pointer'>
          +
        </button>
      </div>
    </div>
  )
}
function increaseCount(arg0: { id: string }): any {
  throw new Error('Function not implemented.')
}

