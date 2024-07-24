import React from 'react'; // Import React library
import { FaMinus, FaPlus } from 'react-icons/fa6'; // Import specific icons from the react-icons library
import { DessertItem } from '../data'; // Import DessertItem type from data file
import addToCartIcon from '../assets/images/icon-add-to-cart.svg'; // Import add to cart icon image

// Define the Props interface for the component
interface Props {
  item: DessertItem; // Individual dessert item
  showIncrement: { [key: string]: boolean }; // Object to track which items have the increment/decrement buttons displayed
  cart: DessertItem[]; // Array of items in the cart
  addToCart: (item: DessertItem) => void; // Function to add item to the cart
  updateItemQuantity: (item: DessertItem) => void; // Function to increase the item quantity in the cart
  removeFromCart: (item: DessertItem) => void; // Function to decrease the item quantity in the cart
  className: string 
}

// Define the DessertItemComponent as a functional component
const DessertItemComponent: React.FC<Props> = ({
  item,
  showIncrement,
  cart,
  addToCart,
  updateItemQuantity,
  removeFromCart,
  className
}) => {
  return (
    <div>
      <div className="flex flex-col items-center ">
        {/* Dessert Image */}
        <div className={`border-[3px] lg:border-[2px] 
          ${showIncrement[item.id] ? 'border-Red ' : 'border-Rose100'} 
          ${className}
          rounded-[10px] w-full overflow-hidden transition-colors
           duration-400 sm:h-[220px]`}>
          {/* Image of the dessert with responsive sources */}
          <img
            src={item.image.mobile}
            srcSet={`${item.image.mobile} 480w, ${item.image.tablet} 768w, ${item.image.desktop} 1200w`}
            sizes="max-width: 480px) 100vw, (max-width: 769px) and (max-width: 1200px) 100vw, 1200px"
            alt={`${item.name}-image`}
            className="w-full h-full object-cover overflow-hidden hover:transform-cpu"
          />
        </div>

        {/* Increment/Decrement Buttons */}
        <div className="-mt-6 lg:-mt-[18px]">
          {showIncrement[item.id] ? (
            <div className={`${showIncrement[item.id] && 'animate-upAnim'} bg-Red flex items-center gap-[42px] w-full py-[10px] px-[12px] rounded-full 
            lg:gap-[28px] lg:px-[8px] lg:py-[8px]
            font-semibold overflow-hidden lg:cursor-pointer `}>
              {/* Decrement button */}
              <div
                onClick={() => removeFromCart(item)}
                className="group lg:hover:bg-Rose50 border-[1.5px] p-[2px] rounded-full">
                <FaMinus className="text-[14px] lg:text-[10px] text-Rose50 lg:group-hover:text-Red" />
              </div>
              {/* Display item quantity in the cart */}
              <span className="text-Rose50 text-base lg:text-[14px] size-4 leading-none text-center">
                {cart.find(cartItem => cartItem.id === item.id)?.quantity || 1}
              </span>
              {/* Increment button */}
              <div
                onClick={() => updateItemQuantity(item)}
                className="group lg:hover:bg-Rose50 border-[1.5px] p-[2px] rounded-full">
                <FaPlus className="text-[14px] lg:text-[10px] text-Rose50 lg:group-hover:text-Red" />
              </div>
            </div>
          ) : (
            // Add to Cart button
            <button
              onClick={() => addToCart(item)}
              type="button"
              className={`${className} text-base lg:text-[12px] font-semibold flex items-center bg-Rose50 
                rounded-full gap-2 border-2 lg:border-[1.5px] border-Rose300 py-[8px] px-6 
                lg:py-[3px] lg:px-4 lg:hover:text-Red lg:hover:border-Red
                ${!showIncrement[item.id] && 'animate-upAnim'}`}
            >
              <img className="size-5 lg:size-4" src={addToCartIcon} alt="add-to-cart" />
              Add to Cart
            </button>
          )}
        </div>
      </div>
      {/* Item details */}
      <div className="flex flex-col gap-1 pt-3 pb-10 text-base lg:text-[14px] lg:pb-2">
        <p className="text-Rose500">{item.category}</p> {/* Category of the dessert */}
        <p className="text-Rose900 font-semibold">{item.name}</p> {/* Name of the dessert */}
        <p className="text-Red font-bold">${item.price.toFixed(2)}</p> {/* Price of the dessert */}
      </div>
    </div>
  );
};

export default DessertItemComponent; // Export the component for use in other parts of the application
