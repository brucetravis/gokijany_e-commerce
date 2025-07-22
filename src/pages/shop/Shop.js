import React from 'react'
import './Shop.css'
import SideBar from '../../components/sidebar/SideBar'

export default function Shop() {
  return (
    <div className='shop-page d-flex align-items-center'>
      <SideBar />

      <div className='shop-products'></div>
    </div>
  )
}
