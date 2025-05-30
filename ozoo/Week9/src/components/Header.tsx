import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Link } from "react-router-dom";

const Header = () => {
  const totalCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.amount, 0)
  );

  return (
    <header className="bg-blue-900 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">YoungJu 장바구니</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-white hover:underline">
            홈
          </Link>
          <Link to="/cart" className="text-white hover:underline">
            🛒 장바구니 ({totalCount})
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
