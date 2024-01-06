
import styles from "../../styles/Product.module.css";
import Image from 'next/image';
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({pizza}) => {
    const [price, setPrice] = useState(pizza.prices[0]);
    const [size, setSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [extras, setExtras] = useState([]);
    const dispatch = useDispatch();
    

    const changePrice = (number) =>{
      setPrice(price + number);
    };



    const handleSize =(sizeIndex)=>{
      const difference = pizza.prices[sizeIndex] - pizza.prices[size];
      setSize(sizeIndex);
      changePrice(difference);

    };


    const handleChange = (e, option) =>{
    const checked = e.target.checked;

  if(checked){
    changePrice(option.price)
    setExtras((prev)=> [...prev, option])

  }else{
    changePrice(-option.price);
    setExtras(extras.filter((extra)=> extra._id !== option._id));
  }
};
  const handleClick=()=>{
    dispatch(addProduct({...pizza, extras, price, quantity}));

  };
  return (
    <div className={styles.container}>
        <div className={styles.left}>
        <div className={styles.imgContainer}>
            <Image src={pizza.img} fill />
        </div>

        </div>
        <div className={styles.right}>
            <h1 className={styles.title}>{pizza.title}</h1>
            <span className={styles.price}>R{price}</span>
            <h3 className={styles.choose}>{pizza.desc}</h3>
            <div className={styles.sizes}>
            <div className={styles.size} onClick={()=>handleSize(0)}>
                <Image src="/img/size.png" fill alt=""/>
                <span className={styles.number}>Small</span>
            </div>

            <div className={styles.size} onClick={()=>handleSize(1)}>
                <Image src="/img/size.png" fill alt=""/>
                <span className={styles.number}>Medium</span>
            </div>


            <div className={styles.size} onClick={()=>handleSize(2)}>
                <Image src="/img/size.png" fill alt=""/>
                <span className={styles.number}>Large</span>
            </div>

            
            </div>
            <h3 className={styles.choose}>Choose Additional Ingredients</h3>
            <div className={styles.ingredients}>
              {pizza.extraOptions.map((option)=> (
                <div className={styles.option} key={option._id}>
                    <input type="checkbox" id={option.text} name={option.text} className={styles.checkbox} onChange={(e)=>handleChange(e, option)}/>
                    
                    <label htmlFor="double">{option.text}</label>
                </div>
                ))}
                
                
        </div>
        <div className={styles.add}>
            <input  onChange={(e)=> setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity}/>
            <button className={styles.button} onClick={handleClick}>Add to Cart</button>
        </div>
                
            </div>
            
        </div>

    
  )
}

export const getServerSideProps = async ({params}) => {
  const res= await axios.get(`/api/products/${params.id}`); // or products double check
  return{
    props:{
      pizza:res.data
    }
  }
}
export default Product