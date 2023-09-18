import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export default function ProductList({productList,setProductList}) {
    
    const [isUpdateItem, setIsUpdateItem] = useState(false);
    const [UpdateItemTitle, setUpdateItemTitle] = useState(false);
    const [isSort, setIsSort] = useState(false);
    const TilteUpdate = useRef("");
    const Description = useRef("");
    const [PriceUpdate,setPriceUpdate] = useState("");



    

    const detailPageHandeler = (userId) => {
        return `/detailPage?${userId}`;
    }

    const DeleteProduct = (item) => {
        let tempIndex;
        let tempArr = [...productList]
        tempArr.map((ele, index) => {
            if (ele.title === item.title) {
                tempIndex = index;
            }
        })
        tempArr.splice(tempIndex, 1);
        setProductList(tempArr);
        NotificationManager.warning(`Deleted One Item: ${item.title}`);
    }

    const UpdateProduct = (ele) => {
        setUpdateItemTitle(ele.title);
        setIsUpdateItem(true);
        Description.current = ele.description;
        TilteUpdate.current = ele.title;
        setPriceUpdate(ele.price);
    }
    const CancelHandeler = () => {
        setIsUpdateItem(false);
    }

    const ChangeHandeler = (e) => {
        if (e.target.id === "title") {
            TilteUpdate.current =   e.target.value;
        } else if (e.target.id === "description") {
            Description.current =   e.target.value;
        } else if (e.target.id === "price") {
            setPriceUpdate(e.target.value);
        }
    }

    const SaveProduct = (ele) => {
        if (ele) {
            ele.price = PriceUpdate;
            ele.description = Description.current;
            ele.title = TilteUpdate.current;
        }
        setIsUpdateItem(false);
        NotificationManager.success(`Updated Product is :${ele.title}`);
    }

    useEffect(()=>{
            setProductList(productList);      
    },[isSort])

    const sortingButton = ()=>{
        productList.sort((a,b)=>{
             
            if(a.price>b.price){
                return -1;
            }else{
                return 1;
            }
        })
        setIsSort(true);
        NotificationManager.info('Apply! Sorted By Price');
        
    }

    const RemoveSorting = ()=>{
        productList.sort((a,b)=>{
             
            if(a.id<b.id){
                return -1;
            }else{
                return 1;
            }
        })
        setIsSort(false)
        NotificationManager.info('Remove! Sorted By Price');
    }

    return (
        <div>
            <NotificationContainer/>
            <div className='listcontainer'>
            <div style={{float:"right",marginRight:"5%"}}>
                {isSort?<><button style={{borderRadius:"12px",padding:"5px",paddingRight:"40px"}}onClick={()=>{sortingButton()}}>Sort By Price</button>
                <button style={{borderRadius:"20px",backgroundColor:"#cec9c9",color:"white",marginLeft:"-22%"}} onClick={()=>{RemoveSorting()}}>✖</button></>
                :
                <button style={{borderRadius:"12px",padding:"5px"}}onClick={()=>{sortingButton()}}>Sort By Price</button>
                }
            </div>
                <ul>
                    {productList.map((ele) => {
                        console.log(productList)
                        return (
                            <>
                                <div className='mainList'>
                                    <div className='childList'>
                                        <div className='imgProduct'>
                                            <NavLink to={detailPageHandeler(ele.id)}>
                                                <img style={{ width: "100px" }} src={ele.image} />
                                            </NavLink>
                                        </div>
                                        <div className='titleProduct'>
                                            {isUpdateItem && UpdateItemTitle === ele.title ? <textarea id='title' type='text' style={{ height: "-webkit-fill-available", width: "-webkit-fill-available", marginRight: "10px" }} onChange={(e) => { ChangeHandeler(e) }}>{TilteUpdate.current}</textarea> : <h3>
                                                {ele.title}
                                            </h3>}
                                            {isUpdateItem && UpdateItemTitle === ele.title ? <>Rs<input id='price' type='text' value={PriceUpdate} onChange={(e) => { ChangeHandeler(e) }} /></> : <div>Rs {ele.price}</div>}

                                            <div></div>
                                        </div>

                                        <span className='ProductDescription'>
                                            {isUpdateItem && UpdateItemTitle === ele.title ? <textarea id='description' type='text' style={{ height: "-webkit-fill-available", width: "-webkit-fill-available", marginBottom: "10px" }} onChange={(e) => { ChangeHandeler(e) }}>{Description.current}</textarea> : <>{ele.description}</>}
                                        </span>
                                    </div>
                                    <div className='btnList'>
                                        {isUpdateItem && UpdateItemTitle === ele.title ? <> <button style={{ backgroundColor: "#ccebec", cursor: "pointer", marginRight: "4px" }} onClick={() => { CancelHandeler() }} >Cancel</button>
                                            <button style={{ backgroundColor: "#ccebec", cursor: "pointer" }} onClick={() => { SaveProduct(ele) }}  >Save</button></> :
                                            <>
                                                <button style={{ backgroundColor: "#ccebec", cursor: "pointer", marginRight: "3px" }} onClick={() => { UpdateProduct(ele) }} >Update</button>
                                                <button style={{ backgroundColor: "#ccebec", cursor: "pointer" }} onClick={() => { DeleteProduct(ele) }}  >Delete</button>
                                            </>}

                                    </div>
                                </div>
                            </>
                        )
                    })}
                </ul>
            </div>

        </div>
    )
}
