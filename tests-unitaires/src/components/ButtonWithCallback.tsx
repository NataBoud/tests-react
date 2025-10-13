import React from 'react'

interface ButtonWithCallback {
    onClick: () => void;
}

export default function ButtonWithCallback({onClick}: ButtonWithCallback) {
  return <button onClick={onClick}>Clique-moi</button>
}
