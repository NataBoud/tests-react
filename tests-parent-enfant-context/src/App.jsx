import { CartProvider } from './context/CartContext'
import { ShoppingList } from './components/ShoppingList'

export default function App() {
  return (
    <CartProvider>
      <ShoppingList />
    </CartProvider>
  )
}