import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";

const Cart = () => {
  const [open, setOpen] = useState(false)
  const amount = "2";
  const currency = "USD";
  const style = {"layout":"vertical"};
  const dispatch = useDispatch()
  const cart = useSelector((state) =>state.cart);

  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    return (<>
      { (showSpinner && isPending) && <div className="spinner" /> }
      <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
              return actions.order
                  .create({
                      purchase_units: [
                          {
                              amount: {
                                  currency_code: currency,
                                  value: amount,
                              },
                          },
                      ],
                  })
                  .then((orderId) => {
                      // Your code here after create the order
                      return orderId;
                  });
          }}
          onApprove={function (data, actions) {
              return actions.order.capture().then(function (details) {
                  // Your code here after capture the order
                  console.log(details)
              });
          }}
      />
  </>
);
}


  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
          <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          </tbody>
          <tbody>
          {cart.products.map((product)=>(
          <tr className={styles.tr} key={product._id}>
            <td>
              <div className={styles.imgContainer}>
                <Image
                  src={product.img}
                  fill
                  style={{objectFit:'cover'}}
                  alt=""
                />
              </div>
            </td>
            <td>
              <span className={styles.name}>{product.title}</span>
            </td>
            <td>
              <span className={styles.extras}>
                {product.extras.map((extra)=>(
                
                <span key={extra._id}>{extra.text}, </span>
                ))}
              </span>
            </td>
            <td>
              <span className={styles.price}>R{product.price}</span>
            </td>
            <td>
              <span className={styles.quantity}>{product.quantity}</span>
            </td>
            <td>
              <span className={styles.total}>R{product.price * product.quantity}</span>
            </td>
          </tr>
          ))}
          </tbody>
          
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>R{cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>R0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>R{cart.total}
          </div>
          {open ? (

         
          <div className={styles.paymentMethods}>
            <button className={styles.payButton}>Cash on Delivery</button>
          <PayPalScriptProvider
                options={{
                    "client-id": "AchNPVWm4KqOAPLeTyE0OC4PY5PbWf7p2QmFM91ZzTkktToHxpg7U5SDtemnV3ZzKNIRVnJrDexI5Ovs",
                    components: "buttons",
                    currency: "USD",
                    
                }}
            >
				<ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                />
			</PayPalScriptProvider>
      </div>
       ) : (
        <button onClick={()=>setOpen(true)} className={styles.button}>CHECKOUT NOW</button>
          ) }

        </div>
      </div>
    </div>
  );
};

export default Cart;