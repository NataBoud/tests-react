import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { ShoppingItem } from './ShoppingItem'

export function ShoppingList() {
  const { items, addItem, removeItem, toggleItem } = useCart()
  const [text, setText] = useState('')

  const isDisabled = text.trim().length === 0

  const handleAdd = () => {
    if (isDisabled) return
    addItem(text)
    setText('')
  }

  return (
    <div>
      <h2>ShoppingList</h2>
      <p>Total : {items.length}</p>

      <input
        type="text"
        placeholder="Nouvel article"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd} disabled={isDisabled}>Ajouter</button>

      <ul>
        {items.length === 0 && <li>Aucun article</li>}
        {items.map((it) => (
          <ShoppingItem
            key={it.id}
            item={it}
            onDelete={removeItem}
            onToggle={toggleItem}
          />
        ))}
      </ul>
    </div>
  )
}