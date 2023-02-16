import React from 'react';
import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import { useSelector } from "react-redux";
import Link from 'next/link';

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity);
    return (
      <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.callButton}>
            <Image src="/img/telephone.png" alt="" width="32" height="32" style={{display:'flex', paddingTop:'10px', paddingLeft:'10px'}}/>
          </div>
          <div className={styles.texts}>
            <div className={styles.text}>ORDER NOW!</div>
            <div className={styles.text}>012 345 678</div>
          </div>
        </div>
        <div className={styles.item}>
          <ul className={styles.list}>
            
            {/* <Image src="/img/logo4.png" alt="" width="250" height="80" className={styles.logotop} /> */}
            <li className={styles.listItem}>Cusso's Pizza</li>
            
          </ul> 
        </div>
        <Link href="/Cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width="30" height="30" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
        </Link>
      </div>
    );
  };
  

export default Navbar