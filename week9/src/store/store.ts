import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';
import modalReducer from '../slices/modalSlice';

// 저장소 생성
function createStore() {
  const store = configureStore({
    // 리듀서 설정
    reducer: {
      cart: cartReducer, // cartSlice에서 만든 리듀서를 등록
      modal: modalReducer,
    },
  })
  return store;
}

// store를 활용할 수 있도록 내보내야 함.
// 여기서 실행해서 스토어를 빼줌
// 싱글톤 패턴으로 스토어를 생성
const store = createStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;