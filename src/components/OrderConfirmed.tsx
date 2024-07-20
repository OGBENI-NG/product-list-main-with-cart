import React from 'react'
import { DessertItem  } from '../data'


interface props {
  item: DessertItem
  cart: DessertItem[]
  // handleToggle: () => void
}

const OrderConfirmed: React.FC<props> = ({item, cart}) => {

  const flexDiv: string = 'flex'
  
  return (
    <div className='border-b-[1.5px] border-Rose300/50 py-4 ssm:py-3'>
      <div className={`${flexDiv} items-center`}>
        <img 
          src={item.image.thumbnail} 
          alt={`${item.name}-thumbnail`}
          className='size-12 object-cover object-center rounded-md mr-4'
        />
        <div className={`${flexDiv} flex-col items-start`}>
          <p className="font-semibold block w-[150px] whitespace-nowrap
          overflow-hidden text-ellipsis text-[15px] pb-[3px]"
          >
            {item.name}</p>
            <span className={`${flexDiv} gap-4 font-bold text-Red`}>x{item.quantity || 1} 
              <span className='text-Rose500 font-normal'>@{item.price.toFixed(2)}</span>
            </span>
          </div>
          <p className='ml-auto text-lg font-semibold text-Rose900'>
            ${((item.quantity || 0) * item.price).toFixed(2)}</p>
      </div>
    </div>
  )
}

export default OrderConfirmed