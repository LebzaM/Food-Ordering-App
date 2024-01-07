import React from 'react'
import styles from '../styles/Footer.module.css';
import Image from 'next/image';
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/pngwing.com (25).png" fill alt='Footer'/>

      </div>
      <div className={styles.item}>
        <div className={styles.card}>
        <h2 className={styles.motto}>
          OH YES, WE HAVE THE BEST PIZZA IN TOWN.
        </h2>

      </div>
      <div className={styles.card}>
        <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
        <p className={styles.text}>
          34 Nelson Mandela Road
          <br/> Joburg, Braamfontein
          <br /> 081 521 54212
        </p>

        <p className={styles.text}>
          265 Sizwe Street
          <br/> Pretoria, Hatfield
          <br /> 081 521 54212
        </p>

        

       
      </div>
      <div className={styles.card}>
        <h1 className={styles.title}>WORKING HOURS</h1>
        <p className={styles.text}>
          MONDAY UNTIL FRIDAY
          <br /> 9:00-22:00

        </p>

        <p className={styles.text}>
          SATURDAY - SUNDAY
          <br /> 12:00-24:00

        </p>
      </div>

      <div className={styles.card}>
        <h1 className={styles.title}>FOLLOW US ON SOCIAL MEDIA</h1>
        {/* <Image src="/img/facebook.png" alt="" width="150" height="150" style={{cursor: 'pointer'}} /> */}
        <Image src="/img/socialmedia.png" alt="" width="50" height="50" style={{cursor: 'pointer'}} />
        <Image src="/img/instagram.png" alt="" width="50" height="50" style={{cursor: 'pointer'}} />
        <Image src="/img/twitter.png" alt="" width="50" height="50" style={{cursor: 'pointer'}} />
        
      </div>

      </div>
      </div>
    
  )
}

export default Footer