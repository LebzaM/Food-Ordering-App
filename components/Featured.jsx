import React from 'react';
import styles from '../styles/Featured.module.css' ;
import Image from 'next/image';
import { useState } from 'react';
const Featured = () => {
    const [index, setIndex] = useState(0);
    const images =[
        "/img/Featured.jpg",
        "/img/Featured1.jpg",
        "/img/Featured2.jpg",
        "/img/Featured3.jpg",
        
    ];

    
    const handleArrow = (direction) =>{
        if(direction==="l"){
            setIndex(index !== 0 ? index-1 : 2)
        }
        if(direction==="r"){
            setIndex(index !== 2 ? index+1 : 0)
        }
    }
  
  return (
    <div className={styles.container}>
        <div className={styles.arrowContainer}>
        <Image src="/img/arrowl.png" width="150" height="150" style={{ left: 0 }} onClick={()=>handleArrow("l")}/>
        </div>
        <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
            <div className={styles.imgContainer}>
                {images.map((img, i) =>(
                 <div className={styles.imgContainer} key={i}>
                 <Image src={img} alt="" fill style={{objectFit:'contain'}} />
               </div>
                ))}
            </div>
        </div>
        <div className={styles.arrowContainer}  style={{ right: 0 }} onClick={()=>handleArrow("r")}>
        <Image src="/img/arrowr.png" fill style={{objectFit:'contain'}} />
        </div>

    
    
    
    </div>
  )
}

export default Featured