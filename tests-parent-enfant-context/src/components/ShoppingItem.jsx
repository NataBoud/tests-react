export function ShoppingItem({ item, onDelete, onToggle }) {
  const label = item.purchased ? `${item.text} [acheté]` : item.text

  return (
    <li>
      <span>{label}</span>
      <input
        type="checkbox"
        aria-label={`Marquer ${item.text} comme acheté`}
        checked={item.purchased}
        onChange={() => onToggle(item.id)}
      />
      <button onClick={() => onDelete(item.id)}>Supprimer</button>
    </li>
  )
}