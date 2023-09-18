import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart,removeCartItem } from '../Redux/Store';

export default function CartItem() {

    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.allCart.ProductArr)
    console.log(cartData)


    const removeFromCart = (removeItem) => {
        let newArr = [...cartData];
        dispatch(removeCartItem());
        newArr.map((ele) => {
            if (ele.title !== removeItem.title) {
                dispatch(addToCart(ele));
            }
        })     
    }



    return (
        <div>
            {cartData.length &&
                <div className='listcontainer'>
                    <ul>
                        {cartData.map((ele) => {
                            console.log(ele);
                            return (
                                <>
                                    <div className='mainList'>
                                        <div className='childList'>
                                            <div className='imgProduct'>
                                                <a>
                                                    <img style={{ width: "100px" }} src={ele.image} />
                                                </a>
                                            </div>
                                            <div className='titleProduct'>
                                                <h3>
                                                    {ele.title}
                                                </h3>
                                                <div>Rs {ele.price}</div>
                                                <div></div>
                                            </div>

                                            <span className='ProductDescription'>
                                                {ele.description}
                                            </span>
                                        </div>
                                        <div className='btnList'>
                                            <button style={{ backgroundColor: "#ccebec", cursor: "pointer" }} onClick={() => { removeFromCart(ele) }}  >Remove</button>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </ul>
                </div>
            }
        </div>
    )
}
