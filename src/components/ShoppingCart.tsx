import React from 'react';

export default function ShoppingCart({ items, onDrop }) {
    
  const handleDrop = (e) => {
    e.preventDefault();
    const product = e.dataTransfer.getData('text/plain');
    onDrop(product);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  console.log(items)
  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        padding: '2rem',
        border: '2px dashed #666',
        borderRadius: '8px',
        minHeight: '200px',
        maxWidth:'500px',
        backgroundColor: '#f1f1f1',
        marginTop: '2rem',
      }}
    >
      <h3>🛒 Carrito</h3>
      <ul>
        {items.map((item, idx) => (
          <li key={idx}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}