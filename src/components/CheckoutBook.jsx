import React from 'react';

const CheckoutBook = ({ handleCheckoutClick }) => {

  return (
    <div>
      <button onClick={handleCheckoutClick}>Checkout</button>
    </div>
  )
}

export default CheckoutBook;