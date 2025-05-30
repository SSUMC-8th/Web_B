import { Provider } from "react-redux";
import "./App.css";
import { Header } from "./components/Header";
import { CartPage } from "./page/CartPage";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col w-screen h-screen">
        <Header />
        <CartPage />
      </div>
    </Provider>
  );
}

export default App;
