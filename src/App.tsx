import React, { useState, useEffect, useRef } from 'react';
import { dessertData, DessertItem } from './data';
import emptyCart from './assets/images/illustration-empty-cart.svg';
import carbonIcon from './assets/images/icon-carbon-neutral.svg';
import confirmIcon from './assets/images/icon-order-confirmed.svg';
import DessertItemComponent from './components/DessertItem';
import CartItemComponent from './components/CartItem';
import OrderConfirmed from './components/OrderConfirmed';
import LoadingComponent from './components/Loading';

// Main component of the application
const App: React.FC = () => {
  // State to store items in the cart
  const [cart, setCart] = useState<DessertItem[]>([]);
  // State to show increment button for each item
  const [showIncrement, setShowIncrement] = useState<{ [key: string]: boolean }>({});
  // State to toggle order confirmation screen
  const [toggleConfirmOrder, setToggleConfirmOrder] = useState<boolean>(false);
  // State to show loading spinner
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // State to handle the close loading screen
  const [closeLoading, setCloseLoading] = useState<boolean>(false);
  // State to track focused item index for keyboard navigation
  const [focusedItemIndex, setFocusedItemIndex] = useState<number | null>(null);
  // State to set the number of items per row
  const [itemsPerRow, setItemsPerRow] = useState<number>(3); // Default to 3 items per row
  // Ref to store timeout for resetting focus
  const focusTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  //state to add animation to remove item from cart
  const [isRemoving, setIsRemoving] = useState<{[key: string]: boolean}>({});
  //state to add animation to adding item to cart
  const [isAdding, setIsAdding] = useState<{[key: string]: boolean }>({});

  // Calculate total price of items in the cart
  const totalPrice = cart.reduce((acc, item) => acc + (item.quantity || 1) * item.price, 0).toFixed(2);
  // Calculate total quantity of items in the cart
  const totalCartItem = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Effect to handle resize event to adjust items per row
  useEffect(() => {
    const handleResize = () => {
      const itemWidth = 100; // Assume each item is 100px wide
      const containerWidth = document.querySelector('.dessert-container')?.clientWidth || window.innerWidth;
      setItemsPerRow(Math.floor(containerWidth / itemWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Effect to handle key down events for navigation and actions
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Clear previous timeout on new key press
      clearTimeout(focusTimeoutRef.current as NodeJS.Timeout);

      let newIndex = focusedItemIndex;
      switch (event.key) {
        case 'ArrowDown':
          newIndex = (focusedItemIndex === null ? 0 : (focusedItemIndex + itemsPerRow) % dessertData.length);
          break;
        case 'ArrowUp':
          newIndex = (focusedItemIndex === null ? 0 : (focusedItemIndex - itemsPerRow + dessertData.length) % dessertData.length);
          break;
        case 'ArrowRight':
          newIndex = (focusedItemIndex === null ? 0 : (focusedItemIndex + 1) % dessertData.length);
          break;
        case 'ArrowLeft':
          newIndex = (focusedItemIndex === null ? 0 : (focusedItemIndex - 1 + dessertData.length) % dessertData.length);
          break;
        case 'Enter':
          if (focusedItemIndex !== null) {
            addToCart(dessertData[focusedItemIndex]);
          }
          break;
      }

      setFocusedItemIndex(newIndex === null ? 0 : newIndex);

      // Set timeout to reset focus after 500ms of inactivity
      focusTimeoutRef.current = setTimeout(() => {
        setFocusedItemIndex(null);
      }, 500);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimeoutRef.current as NodeJS.Timeout); // Clear timeout on component unmount
    };
  }, [focusedItemIndex, itemsPerRow]);

  // Function to confirm the order
  function confirmOrder() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setToggleConfirmOrder(true);
  }

  // Function to start a new order
  function startNewOrder() {
    setCloseLoading(true);
    setTimeout(() => {
      setCloseLoading(false);
      setShowIncrement({});
      setCart([]);
      setToggleConfirmOrder(false);
    }, 2000);
  }

  // Function to add item to the cart
  function addToCart(item: DessertItem) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      updateItemQuantity(item);
    } else {
      setIsAdding(prev => ({ ...prev, [item.id]: true }));
      setCart([{ ...item, quantity: 1 }, ...cart]);
      setShowIncrement({ ...showIncrement, [item.id]: true });
      setTimeout(() => {
        setIsAdding(prev => ({ ...prev, [item.id]: false}));
        
      }, 300);
    }
  }

  // Function to update item quantity in the cart
  function updateItemQuantity(item: DessertItem) {
    setCart(
      cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
          : cartItem
      )
    );
  }

  // Function to remove or decrement item quantity in the cart
  function removeItemQuantity(item: DessertItem) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      const newQuantity = (existingItem.quantity || 1) - 1;
      if (newQuantity > 0) {
        setCart(
          cart.map(cartItem =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: newQuantity }
              : cartItem
          )
        );
      } else {
        setIsRemoving((prev) => ({ ...prev, [item.id]: true }));
        setShowIncrement({ ...showIncrement, [item.id]: false });
        setTimeout(() => {
          setCart(cart.filter(cartItem => cartItem.id !== item.id));
          setIsRemoving((prev) => ({ ...prev, [item.id]: false }));
        }, 300);
      }
    }
  }

  // Function to remove item from the cart
  function removeItemFromCart(item: DessertItem) {
    setIsRemoving((prev) => ({ ...prev, [item.id]: true }));
    setShowIncrement({ ...showIncrement, [item.id]: false });
    setTimeout(() => {
      setCart(cart.filter(cartItem => cartItem.id !== item.id));
      setIsRemoving((prev) => ({ ...prev, [item.id]: false }));
    }, 300);
  }

  return (
    // Main container with padding and background color
    <main className={`py-16 px-4 md:px-7 lg:p-20 bg-Rose100 w-full h-screen font-RedHat
      overflow-x-hidden select-none xl:p-[80px]`}
    >
      <>
        {/* Title of the application */}
        <h1 className="font-bold text-4xl text-Rose900 fixed bg-inherit inset-x-0 z-50 top-0 p-4 
          py-7 md:top-[unset] md:left-[unset] md:right-[unset] md:p-0 md:relative md:w-max">
          Desserts
        </h1>
        
        {/* Container for the dessert items and the cart */}
        <div className='lg:flex lg:gap-6'>
          {/* Grid container for dessert items */}
          <div className='pt-[70px] md:pt-[40px] md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:pt-[30px]'>
            {dessertData.map((item, index) => (
              <div key={item.id}>
                {/* Dessert item component */}
                <DessertItemComponent
                  item={item}
                  showIncrement={showIncrement}
                  cart={cart}
                  addToCart={addToCart}
                  updateItemQuantity={updateItemQuantity}
                  removeFromCart={removeItemQuantity}
                  className={index === focusedItemIndex ? 'border-red-700 text-Red' : ''}
                />
              </div>
            ))}
          </div>

          {/*  Cart container */}
          <div className="bg-Rose50 overflow-hidden p-6 md:p-8 rounded-lg md:mt-10 
            md:mx-20 lg:m-0 lg:-mt-10 lg:h-max lg:p-4 lg:w-[650px]">
            <div className="flex flex-col">
              {/* Cart header with item count */}
              <h2 className="text-3xl lg:text-xl font-bold text-Red">
                Your Cart
                <span>({cart.length === 0 ? 0 : totalCartItem})</span>
              </h2>
              {cart.length === 0 ? (
                <div className={`py-8 lg:py-5 `}>
                  <img src={emptyCart} alt="empty-cart-illustration" className="size-40 lg:size-32 m-auto" />
                  <p className="text-center font-medium text-Rose500 text-base lg:text-[12px] lg:pt-2">
                    Your added items will appear here
                  </p>
                </div>
              ) : (
                <div className="pt-3 lg:pt-2">
                  {/*Cart item component and order details*/}
                  {cart.map((item, index) => (
                    <CartItemComponent
                      key={index}
                      item={item}
                      removeItemFromCart={removeItemFromCart}
                      isRemoving={isRemoving[item.id] || false}
                      isAdding={isAdding[item.id] || false}
                      
                    />
                  ))}
                  <p className='flex items-center pt-4 lg:pt-3 text-base md:text-lg text-Rose900 lg:text-[14px]'>
                    Order Total
                    <span className='ml-auto text-2xl lg:text-xl font-bold'>${totalPrice}</span>
                  </p>
                  <div className='text-base flex items-center gap-2 w-full px-4 mt-5 bg-Rose100 
                    py-3 rounded-md md:justify-center lg:mt-4 lg:p-2 lg:text-[12px]'>
                    <img src={carbonIcon} alt="carbon-icon" className='size-6 lg:size-5' />
                    <p>This is <span className='font-bold'>carbon-neutral</span> delivery</p>
                  </div>
                  <button
                    onClick={confirmOrder}
                    type='submit'
                    className='w-full bg-Red mt-6 py-3 rounded-full font-semibold text-Rose100 
                    text-base md:text-lg lg:text-base lg:py-2 z-auto'
                  >
                    Confirm Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order confirmation overlay*/}
        <div className={`${toggleConfirmOrder ? 'block' : 'hidden'} 
          absolute inset-0 h-screen overflow-hidden bg-Rose900/50 z-50`}>
          <div className=''>
            {/* Loading spinner  */}
            {isLoading || closeLoading ? (
              <div className='flex items-center justify-center h-screen'>
                <LoadingComponent />
              </div>
            ) : (
               
              <div className={`${toggleConfirmOrder && 'animate-slideUp'} bg-Rose50 rounded-t-xl 
                absolute bottom-28 right-0 left-0 top-[100px] h-full px-5  lg:p-[20px] 
                  md:h-max md:inset-x-20 md:inset-y-[150px]
                 md:rounded-xl md:p-8 lg:h-[444px] lg:w-[400px] lg:inset-[0] lg:m-auto`}
              >
                <div className=''>
                  <div className='pt-6 pb-4 lg:p-0'>
                    <img src={confirmIcon} alt="order-complete-icon" className='size-auto lg:size-8' />
                  </div>
                  <h2 className='text-3xl w-[200px] md:w-full leading-tight font-bold lg:text-[24px] lg:pt-4'>
                    Order Confirmed
                  </h2>
                  <p className='text-base ssm:pt-3 ssm:pb-2 pt-2 pb-0 text-Rose500 lg:text-[12px] lg:leading-none'>
                    We hope you enjoy your food!
                  </p>
                </div>
                <div className='pb-10 pt-4'>
                  <div className='flex flex-col ssm:h-[298px] sm:h-[292px] md:h-[300px] lg:h-[237px] overflow-x-hidden'>
                    <div className='bg-Rose100 ssm:px-4 ssm:pt-1 sm:pt-0 ssm:pb-4 sm:px-4 
                      lg:px-[15px] pt-2 pb-4 px-5 rounded-lg sm:h-[calc-size(auto)] ssm:h-[calc-size(auto)] mt-auto'>
                      {/* Order confirmation item component */}
                      {cart.map(item => (
                        <OrderConfirmed key={item.id} item={item} />
                      ))}
                      <p className='flex text-base lg:text-[14px] items-center font-semibold text-Rose900 pt-5 lg:pt-3'>
                        Order Total
                        <span className='ml-auto text-2xl lg:text-lg font-bold'>${totalPrice}</span>
                      </p>
                    </div>
                  </div>
                  <div className='pt-5 lg:pt-4'>
                    <button
                      onClick={startNewOrder}
                      type='button'
                      className='bg-Red w-full text-lg font-semibold text-Rose100 py-2 rounded-full lg:text-[13px] lg:py-1'
                    >
                      Start New Order
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    </main>
  );
};

export default App;
