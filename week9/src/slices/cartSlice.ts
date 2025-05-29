import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import cartItems from '../constants/cartItems';
import type { CartItems } from '../types/cart';

export interface CartState{
  cartItems: CartItems
  amount: number
  total: number
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
}



//cartSlice 생성
// createSlice -> reduxToolkit에서 제공하는 함수로, 액션과 리듀서를 함께 정의할 수 있게 해줌
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 증가
    increase: (state, action: PayloadAction<{id: string}>) => {
      const itemId = action.payload.id
      // 이 아이디를 통해, 전체 음반 중에 클릭한 음반을 찾음
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId)
      if (item) {
        // 아이템이 존재하면, amount를 증가시킴
        item.amount += 1;
      }
    },
    // 감소
    decrease: (state, action: PayloadAction<{id: string}>) => {
      const itemId = action.payload.id
      // 이 아이디를 통해, 전체 음반 중에 클릭한 음반을 찾음
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId)
      if (item && item.amount > 0) {
        // 아이템이 존재하고, amount가 0보다 크면 감소시킴
        item.amount -= 1;
      }
    },

    // removeItem 아이템 제거
    removeItem: (state, action: PayloadAction<{id: string}>) => {
      const itemId = action.payload.id
      // 아이템을 찾아서 제거
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId)
    },
    // clearCart 장바구니 비우기
    clearCart: (state) => {
      state.cartItems = [] // 장바구니를 비움
      state.amount = 0 // 아이템 수량 초기화
      state.total = 0 // 총액 초기화
    },
    // calculateTotal 총액 계산
    calculateTotal: (state) => {
      state.amount = state.cartItems.reduce((total, item) => total + item.amount, 0) // 아이템 수량 합계
      state.total = state.cartItems.reduce((total, item) => {
        return total + Number(item.price) * item.amount;
      }, 0) // 아이템 가격 * 수량의 합계
    },
  }
})

// 액션 생성자들을 export
export const { increase, decrease, removeItem, clearCart, calculateTotal } = cartSlice.actions;

//duck pattern reducer는 export default로 내보내야함.
const cartReducer = cartSlice.reducer

export default cartReducer;