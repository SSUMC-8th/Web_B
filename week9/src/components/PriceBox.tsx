import type { RootState } from '../store/store'
import { useSelector } from 'react-redux'
import { useDispatch } from '../hooks/useCustomRedux'
import { openModal } from '../slices/modalSlice'


export const PriceBox = () => {

  const {total} = useSelector((state:RootState) => state.cart)
  const dispatch = useDispatch()
  const handleInitializeCart = () => {
    dispatch(openModal())
  }

  return (
    <div className='p-12 flex justify-between items-center bg-gray-100'>
      <button onClick={handleInitializeCart} className='border p-4 rounded-md cursor-pointer'>장바구니 비우기</button>
      <div>total : {total} won</div>
    </div>
  )
}
