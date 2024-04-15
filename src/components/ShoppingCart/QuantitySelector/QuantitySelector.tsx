import React, { useState } from 'react';

function QuantitySelector({ initialValue = 1, min = 1, max = undefined, onQuantiyChange }) {
  const [quantity, setQuantity] = useState(initialValue);

  const handleDecrement = () => {
    setQuantity((prevQuantity) => Math.max(min, prevQuantity - 1));
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) =>
      max !== undefined ? Math.min(max, prevQuantity + 1) : prevQuantity + 1
    );
  };

  return (
    <div className="flex items-center border border-gray-300 rounded-md">
      <button
        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none"
        onClick={handleDecrement}
      >
        -
      </button>
      <input
        type="number"
        className="w-12 text-center focus:outline-none"
        value={quantity}
        onChange={() => {}} 
        min={min}
        max={max}
      />
      <button
        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;