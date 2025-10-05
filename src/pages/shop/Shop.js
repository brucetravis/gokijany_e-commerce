import React from 'react'
import './Shop.css'
import { useShop } from '../../contexts/ShopContext'

export default function Shop() {

  // Access the products from the context
  const { products } = useShop() // access products from the context

  // character limit
  const maxLength = 50

  return (
    <section className='shop-page'>
      {/* <h1>SHOP PAGE</h1> */}
      {products.length === 0 ? (
          <p className='text-center'>Loading Products....</p>
        ) : (
          products.map((category) => (
            Object.values((category.items)).map((item) => (
              <div
                key={item.id}
                className='product-card'
              >
                <img 
                  src={item.img}
                  alt={item.category}
                />
                <h3>{item.title}</h3>
                <h3 className='item-desc'>
                  {item.description.length > 50 ? item.description.slice(0, maxLength) + '...': item.description}
                </h3>
                <p className='item-price'>{item.price}</p>
              </div>
            ))
          ))
        )
      }
      
    </section>
  )
}
