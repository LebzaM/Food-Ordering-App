import React from 'react'
import styles from '../styles/PizzaCard.module.css';
import Image from 'next/image';

const PizzaCard = () => {
  return (
    <div className={styles.container}>
        <Image src="/img/pizza.png" width="200" height="200"/>
        <h1 className={styles.title}>Pepperoni</h1>
        <span className={styles.price}>R85.00</span>
        <p className={styles.desc}>Melted cheese, Pepperoni..</p>
    </div>
  )
}

export default PizzaCard