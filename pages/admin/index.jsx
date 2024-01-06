import React from 'react'
import styles from '../../styles/Admin.module.css'
import Image from 'next/image';
import axios from 'axios';
import { useState } from 'react';
const index = ({products, orders}) => {
    const [pizzaList, setPizzaList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ["Preparing", "On the way", "Delivered"]
    const handleDelete = async (id)=>{
        try {
            const res = await axios.delete(`/api/products/` + id);
            setPizzaList(pizzaList.filter((pizza)=>pizza._id !== id));
        } catch (err) {
            console.log(err)
        }

    };
    const handleStatus = async (id)=>{
      const item = orderList.filter((order)=>order._id===id)[0]
      const currentStatus = item.status;
      try {
        const res = await axios.put(`/api/orders/` + id, {status: currentStatus + 1  });
        setOrderList([
          res.data,
          ...orderList.filter((order)=> order._id !== id),
        ])
      } catch (err) {
        console.log(err)
      }
    }
  return (
    <div className={styles.container}>
    <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.trTitle}>
        <tbody>
          <tr className={styles.trTitle}>
            <th>Image</th>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            
            <th>Action</th>
          </tr>
          </tbody>
         
            {pizzaList.map((product)=>(
        <tbody key={product._id}>
          <tr className={styles.trTitle}>
            <td>
            <Image
                  src="/img/pizza.png"
                  width={50}
                  height={50}
                  style={{objectFit:'cover'}}
                  alt=""
                />
            </td>
            <td>{product._id.slice(0,5)}...</td>
            <td>{product.title}</td>
            <td>R{product.prices[0]}</td>
            
            <td>
               
                <button className={styles.button}>Edit</button>
                <button className={styles.button} onClick={()=>handleDelete(product._id)}>Delete</button>
                
            </td>
            
          </tr>
          </tbody>
          ))}
        
          
        </table>
    </div>
    <div className={styles.item}>
    <h1 className={styles.title}>Orders</h1>
    
    <table className={styles.trTitle}>
    
        <tbody>
          <tr className={styles.trTitle}>
            <th>Id</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
            
          </tr>
          </tbody>
          {orderList.map((order)=>(
          <tbody key ={order._id}>
          <tr className={styles.trTitle}>
            
            <td>{order._id.slice(0,5)}...</td>
            <td>{order.customer}</td>
            <td>{order.total}</td>
            <td>{order.method === 0 ?(<span>Cash</span>) :(<span>Paid</span>) } </td>
            <td>{status[order.status]}</td>
            <td>
            <button onClick={()=>handleStatus(order._id)}>Next Stage</button>
            </td>
            
          </tr>
          </tbody>
          ))}
          
        </table>
        </div>

    </div>
  );
};
export const getServerSideProps = async (ctx)=>{
  //Check cookie for the serverside as well.
    const myCookie = ctx.req?.cookies ||  "";
    if(myCookie.token !== process.env.TOKEN){
      return{
        redirect:{
          destination:"/admin/login", 
          permanent: false
        },
      };

    }
    const productRes= await axios.get(`/api/products`)
    const orderRes= await axios.get(`/api/orders`)

    return{
        props:{
            orders:orderRes.data,
            products:productRes.data
        }
    }
}

export default index