import React from 'react'
import styles from '../styles/OrderDetail.module.css';
import { useState } from 'react';


const OrderDetail = ({total, createOrder}) => {
    const [customer, setCustomer] = useState("");
    const [address, setAddress] = useState("");

    const handleClick = ()=>{
        createOrder({customer, address, total, method: 0})

    };
    // Pass items in Create order. Method for paypal is 1. Method for cash on delivery is 0.

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1 className={styles.title}>You will pay R50 after delivery</h1>
            <div className={styles.item}>
                <label className={styles.label}>Name Surname</label>
                <input placeholder='John Doee' type="text" className={styles.input} onChange={(e)=>setCustomer(e.target.value)}></input>
                
                <label className={styles.label}>Address</label>
                <input placeholder='John Doee' type="text" className={styles.input} onChange={(e)=>setAddress(e.target.value)}></input>

                <label className={styles.label}> Phone Number</label>
                <input placeholder='John Doee' type="text" className={styles.input} ></input>

            </div>
            <button className={styles.button} onClick={handleClick}>Order</button>

        </div>
    </div>
  )
}

export default OrderDetail