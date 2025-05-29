
import {CartItem} from './CartItem'
import { useSelector } from '../hooks/useCustomRedux'

export const CartList = () => {
  
  // useSelector를 사용하여 Redux store에서 cartItems를 가져옴
  const {cartItems, amount, total} = useSelector((state) => state.cart)
  
  return (
    <div className='flex flex-col items-center justify-center'>
      <ul>
        {cartItems.map((item)=>(
          <CartItem key={item.id} lp={item}/>
        ))}
      </ul>
    </div>
  )
}
