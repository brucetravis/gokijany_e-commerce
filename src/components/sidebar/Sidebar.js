import React from 'react'
import './Sidebar.css'
import { motion } from "framer-motion"

export default function SideBar() {
  return (
    <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: .5, ease: "easeIn" }}
        className='sidebar'
    >
      <h3 className='title mb-3'>Eco-Products</h3>
      
      <div className=' d-flex flex-column align-items-start'>
        <div className='d-flex align-items-center justify-content-center gap-2 mb-4'>
          <input type='checkbox' name='all' />
          <span className="checkmark"></span>
          <label htmlFor='all' className='fs-5'>All</label>
        </div>

       {/* {categories.map((item, i) =>
          <div className='d-flex align-items-center justify-content-center gap-2 mb-4' key={i}>
            <input type='checkbox' name={item.replace(" ", "_").toLowerCase()} />
            <label htmlFor='all' className='fs-5'>{item}</label>
          </div>
      )} */}
        {/* <a href='/products' className='fs-5'>Products</a> */}
      </div>

    </motion.div>
  )
}
