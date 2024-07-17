"use client";
import { store } from '@/store/store'
import React from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'remixicon/fonts/remixicon.css';
export const metadata = {
    title : "Login | Student"
  }
const Wrapper = ({children}) => {
  return (
    <>
 <Provider  store={store}>

        {children}
        <ToastContainer />
        </Provider>
    </>
  )
}

export default Wrapper