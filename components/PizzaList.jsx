import React from 'react';
import styles from '../styles/PizzaList.module.css';
import PizzaCard from './PizzaCard';

const PizzaList = ({pizzaList}) => {
  return (
    
    <div className={styles.container}>
    <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
    <p className={styles.desc}>
      Don't believe us? Find out for yourself below...
    </p>
    <div className={styles.wrapper}>
      
      {pizzaList && pizzaList.map((pizza) => (
      
      <PizzaCard key={pizza._id} pizza={pizza}/>
      
      ))}
      

    </div>
    </div>
  )
}

export default PizzaList