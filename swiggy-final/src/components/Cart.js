import {useSelector} from 'react-redux';
import ItemList from './ItemList';
import {clearCart} from '../utils/cartSlice';
import { useDispatch } from 'react-redux';

const Cart = () => {
   const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearCart());
  }

  return (
    <div className="text-center p-4 m-4">
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="w-6/12 m-auto p-4 bg-gray-50 shadow-lg">
            <button className="p-2 m-2 bg-black text-white rounded-lg"
            onClick={handleClear}>Clear cart</button>
            {cartItems.length===0 && <h2 className="text-xl font-bold">Cart is empty</h2>}
            <ItemList items={cartItems} />
        </div>
    </div>


  );
}
export default Cart;