import React from 'react'
import styles from '../styles/Add.module.css'
import axiosInstance from '../utilities/axiosconfig'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Add = ({setClose}) => {
    const [file, setFile] = useState(null)
    const [title, setTitle]= useState(null)
    const [prices, setPrices] = useState([]);
    const [desc, setDesc] = useState(null);
    const [extraOptions, setExtraOptions] = useState([]);
    const [extra, setExtra] = useState(null);

    const changePrice = (e, index)=>{
        const currentPrices= prices;
        currentPrices[index] = e.target.value
        setPrices(currentPrices);

        //Find current prices first and change its value then setPrices at the end
    };

    const handleExtraInput = (e)=>{
        setExtra({...extra, [e. target.name]: e.target.value});
    };
// hanlde multiple inputs in one handler
    const handleExtra = (e) =>{
        setExtraOptions((prev)=>[...prev, extra]);
    };
//Set state using previous data

    const handleCreate = async ()=>{
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploads")
        try {
            const uploadRes = await axiosInstance.post("https://api.cloudinary.com/v1_1/djdq95efy/image/upload", data)
            //console.log(uploadRes.data)
            const {url}= uploadRes.data;
            const newProduct ={
                title, desc, prices, extraOptions, img:url,
            };
            await axiosInstance.post(`/api/products`, newProduct);
            setClose(true);
        } catch (err) {
            console.log(err)
        }


    }
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <span onClick={()=>setClose(true)} className={styles.close}>X</span>
        
        <h1>Add a new Pizza</h1>
        <div className={styles.item}>
            <label className={styles.label}>Choose an Image</label>
            <input type="file" className={styles.input} onChange={(e)=>setFile(e.target.files[0])}/>

        </div>

        <div className={styles.item}>
            <label className={styles.label}>Title</label>
            <input type="text" className={styles.input} onChange={(e)=>setTitle(e.target.value)}/>

        </div>

        <div className={styles.item}>
            <label className={styles.label}>Desc</label>
            <textarea type="text" rows={4} onChange={(e)=> setDesc(e.target.value)}/>

        </div>

        <div className={styles.item}>
            <label className={styles.label}>Prices</label>
            <div className={styles.priceContainer}>
            <input type="number" placeholder='small' onChange={(e)=> changePrice(e, 0)} className={`${styles.input} ${styles.inputSmall}`}/>
            <input type="number" placeholder='medium' onChange={(e)=> changePrice(e, 1)} className={`${styles.input} ${styles.inputSmall}`}/>
            <input type="number" placeholder='large' onChange={(e)=> changePrice(e, 2)} className={`${styles.input} ${styles.inputSmall}`}/>
            </div>
        </div>
        <div className={styles.item}>
            <label className={styles.label}>Extra</label>
            <div className={styles.extra}>
                <input className={`${styles.input} ${styles.inputSmall}`} name="text" type="text" placeholder='Item'  onChange={handleExtraInput}/>
                <input className={`${styles.input} ${styles.inputSmall}`} name ="price" type="number" placeholder='Price'  onChange={handleExtraInput}/>
                

                <button className={styles.extraButton} onClick={handleExtra}>
                    Add
                </button>
            

            </div>
            <div className={styles.extraItems}>
                {extraOptions.map((option)=>(
                <span key={option.text} className={styles.extraItem}>{option.text}</span>
                ))}
            </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
            Create
        </button>
        

        </div>

    </div>
  )
}

export default Add