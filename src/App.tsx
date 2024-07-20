import React, { useState } from 'react';
import { dessertData, DessertItem } from './data'; // Importing dessert data and the DessertItem type
import emptyCart from './assets/images/illustration-empty-cart.svg'; // Importing an image for an empty cart
import carbonIcon from './assets/images/icon-carbon-neutral.svg'; // Importing an image for carbon neutral icon
import confirmIcon from './assets/images/icon-order-confirmed.svg'
import DessertItemComponent from './components/DessertItem'; // Importing the DessertItemComponent
import CartItemComponent from './components/CartItem'; // Importing the CartItemComponent
import OrderConfirmed from './components/OrderConfirmed';
import LoadingComponent from './components/Loading';

// Define the main App component
const App: React.FC = () => {
  // State to manage the items in the cart
  const [cart, setCart] = useState<DessertItem[]>([]);
  // State to manage which items should show the increment buttons
  const [showIncrement, setShowIncrement] = useState<{ [key: string]: boolean }>({});
  const [toggleConfirmOrder, setToggleConfirmOrder] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const totalPrice = cart.reduce((acc, item) => acc + (item.quantity || 1) * item.price, 0).toFixed(2)

  //confirm order function
  function  confirmOrder() {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    setToggleConfirmOrder(true)
  }

  //start new order function
  function startNewOrder() {
    setCart([])
    setShowIncrement({})
    setToggleConfirmOrder(false)
  }
  
  // Function to add an item to the cart
  function addToCart(item: DessertItem) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      updateItemQuantity(item); // If item already exists, update its quantity
    } else {
      setCart([{...item, quantity: 1 }, ...cart ]); // Otherwise, add a new item with quantity 1
      setShowIncrement({ ...showIncrement, [item.id]: true }); // Show the increment button for this item
    }
  }

  // Function to update the quantity of an item in the cart
  function updateItemQuantity(item: DessertItem) {
    setCart(
      cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 } // Increment the quantity
          : cartItem
      )
    );
  }

  // Function to remove or decrement the quantity of an item in the cart
  function removeItemFromUpdateCart(item: DessertItem) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      const newQuantity = (existingItem.quantity || 1) - 1;
      if (newQuantity > 0) {
        setCart(
          cart.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: newQuantity } // Decrement the quantity
              : cartItem
          )
        );
      } else {
        setCart(cart.filter(cartItem => cartItem.id !== item.id)); // Remove item if quantity is zero
        setShowIncrement({ ...showIncrement, [item.id]: false }); // Hide the increment button
      }
    }
  }

  // Function to remove an item from the cart
  function removeItemFromCart(item: DessertItem) {
    setCart(cart.filter(cartItem => cartItem.id !== item.id)); // Remove the item from the cart
    setShowIncrement({ ...showIncrement, [item.id]: false }); // Hide the increment button
  }

  return (
    <div className="px-4 bg-Rose100 w-full h-screen font-RedHat 
      pb-[100px] overflow-x-hidden select-none">
      
      {/* Header for the desserts section */}
      <header>
        <h1 className="font-bold text-5xl py-8 text-Rose900">Desserts</h1>
      </header>
      {toggleConfirmOrder ? (
        <div className='absolute inset-0 h-screen overflow-hidden bg-Rose900/40'>
          {/* order confirm component */}
          <div className=''>
            {isLoading ? (
              <div className='flex items-center justify-center h-screen'>
                <LoadingComponent/>
              </div>
              ) : (
              <div className={`${toggleConfirmOrder && 'animate-slideUp'}
                bg-Rose50 rounded-t-xl absolute 
                bottom-0 right-0 left-0 top-[100px] h-screen px-5 pb-16`}>
                <div>
                  <img 
                    src={confirmIcon} 
                    alt="order-complete-icon"
                    className='pt-7 pb-3'
                  />
                  <h2 className='ssm:text-3xl sm:text-4xl w-[200px] leading-tight font-bold'>Order Confirmed</h2>
                  <p className='text-base ssm:pt-3 ssm:pb-2 pt-3 pb-0 text-Rose500'>We hope you enjoy your food!</p>
                </div>
                <div className='pb-10 pt-4'>
                  <div className='flex flex-col ssm:h-[298px] sm:h-[322px]'>
                    <div className='bg-Rose100 ssm:px-4 ssm:pt-1 sm:pt-0
                      ssm:pb-4 sm:px-4
                      pt-2 pb-4 px-5 rounded-lg overflow-x-hidden 
                      sm:h-[calc-size(auto)] ssm:h-[calc-size(auto)] mt-auto'>
                      {cart.map(item => (
                        <OrderConfirmed 
                          key={item.id}
                          item={item}
                          cart={cart}
                        />
                      ))}
                      <p className='flex items-center font-semibold pt-5 text-Rose900'>Order Total 
                        <span className='ml-auto text-2xl font-bold'>
                          ${totalPrice}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className='pt-6'>
                    <button 
                      onClick={startNewOrder}
                      type='button'
                      className='bg-Red w-full text-lg font-semibold text-Rose100 py-3 
                      rounded-full'
                    >
                      Start New Order
                    </button>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>    
      ):(
      <>
        <div>
          {/* Map through the dessert data and render each item using the DessertItemComponent */}
          {dessertData.map(item => (
            <DessertItemComponent
              key={item.id}
              item={item}
              showIncrement={showIncrement}
              cart={cart}
              addToCart={addToCart}
              updateItemQuantity={updateItemQuantity}
              removeFromCart={removeItemFromUpdateCart}
            />
          ))}
        </div>
        <div className="bg-Rose50 p-6 rounded-lg ">
          <div className="flex flex-col">
            {/* Header for the cart section */}
            <h2 className="text-3xl font-bold text-Red">
              Your Cart <span>({cart.reduce((acc, item) => acc + (item.quantity || 1), 0)})</span>
            </h2>
            {cart.length === 0 ? (
              <div className="py-8">
                {/* Display an empty cart illustration if cart is empty */}
                <img src={emptyCart} alt="empty-cart-illustration" className="size-40 m-auto" />
                <p className="text-center font-medium text-Rose500">Your added items will appear here</p>
              </div>
            ) : (
              <div className="pt-3">
                {/* Map through the cart items and render each item using the CartItemComponent */}
                {cart.map((item, index) => (
                  <CartItemComponent
                    key={index}
                    item={item}
                    removeItemFromCart={removeItemFromCart}
                  />
                ))}
                <p className='flex items-center pt-5 tex-base text-Rose900'>Order Total 
                  {/* Calculate and display the total order amount */}
                  <span className='ml-auto text-2xl font-bold'>${totalPrice}</span>
                </p>
                <div className='flex items-center gap-2 w-full px-4 mt-6 bg-Rose100 py-3 rounded-md'>
                  {/* Display carbon-neutral delivery information */}
                  <img src={carbonIcon} alt="carbon-icon" className='size-6' />
                  <p>This is <span className='font-bold'>carbon-neutral</span> delivery</p>
                </div>
                <button 
                  onClick={confirmOrder}
                  type='submit'
                  className='w-full bg-Red mt-6 py-3 rounded-full font-semibold text-Rose100'
                >Confirm Order</button>
              </div>
            )}
          </div>
        </div>
      </>)}
    </div>
  );
};

export default App;
