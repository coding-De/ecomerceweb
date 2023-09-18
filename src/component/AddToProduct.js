import React, { useRef } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function AddToProduct({productList,setProductList}) {

  const productName = useRef("");
  const ProductDescription = useRef("");
  const productPrice = useRef("");
  const productRating = useRef("");

  const inputHandeler = (e)=>{

    if(e.target.id==="name"){
      productName.current = e.target.value;
    }
    else if(e.target.id === "description"){
     ProductDescription.current = e.target.value; 
    }else if(e.target.id ==="price"){
      productPrice.current = e.target.value;
    }else if(e.target.id==="rating"){
      productRating.current = e.target.value;
    }

  }

  const Additem = ()=>{
    let tempobj = {};
    tempobj["id"]= productList.length+1;
    tempobj["title"] = productName.current;
    tempobj["description"] = ProductDescription.current;
    tempobj["price"] = productPrice.current;
    tempobj["rating"] = productRating.current;
console.log(tempobj)
    setProductList([...productList,tempobj]);
    NotificationManager.info('Successfully! Added');
  }
  return (
    <div className='AddProductMain'>
      <NotificationContainer/>
      <h3>Add a Product</h3><br/>
      <h4>Name</h4>
      <input id="name" style={{width:"100%",height:"40px"}} onChange={inputHandeler}></input>
      <h4>Description</h4>
      <input id="description" style={{width:"100%",height:"40px"}} onChange={inputHandeler}></input>
      <h4>Price</h4>
      <input id="price" style={{width:"100%",height:"40px"}}onChange={inputHandeler}></input>
      <h4>Rating</h4>
      <input id="rating" style={{width:"100%",height:"40px",marginBottom:"10px"}} onChange={inputHandeler}></input>
      <button style={{float:"right",width:"70px",margin:"10px"}} onClick={Additem}>Add</button>
    </div>
  )
}
