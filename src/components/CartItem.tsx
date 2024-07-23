import React from 'react';
import { DessertItem } from '../data';
import { FaPlus } from 'react-icons/fa6';

// Define the Props interface which includes the item and removeItemFromCart function
interface Props {
  item: DessertItem;
  removeItemFromCart: (item: DessertItem) => void;
}

// Define the functional component CartItemComponent which takes Props as an argument
const CartItemComponent: React.FC<Props> = ({ item, removeItemFromCart }) => {
  return (
    // Main container for the cart item with border and padding
    <div className="border-b-2 border-Rose100 py-[10px] flex items-center">
      <div className='text-base md:text-lg lg:text-[13px] flex flex-col gap-y-2 
        lg:gap-y-[5px]'>
        {/* Display the dessert name in bold */}
        <p className="text-Rose900 font-semibold w-[150px] overflow-hidden 
          text-ellipsis whitespace-nowrap leading-none">{item.name}</p>
        {/* Container for item quantity, individual price, and total price */}
        <div className="flex items-center gap-[14px] lg:leading-snug">
          {/* Display the quantity of the item */}
          <p className="text-Red font-bold">x{item.quantity || 1}</p>
          {/* Display the price per unit of the item */}
          <p className="pl-1 text-Rose400">@ {item.price.toFixed(2)}</p>
          {/* Display the total price for this item (quantity * price per unit) */}
          <p className="text-Rose500 font-semibold">
            ${((item.quantity || 1) * item.price).toFixed(2)}
          </p>
        </div>
      </div>
      {/* Button to remove the item from the cart */}
      <div className='group border-[2px] lg:hover:border-Rose900 border-Rose300 
        size- flex rounded-full ml-auto'>
        <button
          aria-label='close'
          onClick={() => removeItemFromCart(item)} // Call removeItemFromCart function with the item as argument
          type='button'
          className='text-lg lg:text-[14px] lg:group-hover:text-Rose900 text-Rose300 
          leading-none font-bold m-auto'>
          <FaPlus className='rotate-45'/>
        </button>
      </div>
    </div>
  );
};

export default CartItemComponent;
