import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/Store';


export default function DetailPage() {

  const [productDetail, setProductDetail] = useState({});
  const dispatch = useDispatch();
  const cartData = useSelector((state)=>state.allCart.ProductArr)
    console.log(cartData)

  const UserId = JSON.parse(window.location.href.split("?")[1]);
 
  useEffect(() => {
    fetchProductDetail();
     
  }, [])

  const fetchProductDetail = () => {
    fetch(`https://fakestoreapi.com/products/${UserId}`)
      .then((res) => res.json())
      .then((data) => {
      
        setProductDetail(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

const addAllCartItem = (item)=>{
  dispatch(addToCart(item));
}




  return (
    <div className="maincointainer mb-5 mt-5">
      <div className="row d-flex flex-row">
        <div className="col-md-5 product-image">
          <img className="img-fluid" src={productDetail.image} alt="" />
        </div>

        <div className="col-md-5">
          <h6 className="text-uppercase text-secondary">{productDetail.title} </h6>
          <h2 className="fs-3">{productDetail.category}</h2>
          <h5 className="text-secondary fs-6 fw-bold">Rs {productDetail.price} </h5>
          <div className="text-secondary text-small">color :</div>
          <div className="my-2">
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
              <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked />
              <label className="btn btn-danger color-label" for="btnradio1">
                <i className="bi bi-check2"></i>
              </label>

              <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
              <label className="btn btn-success color-label" for="btnradio2">
                <i className="bi bi-check2"></i>
              </label>

              <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autocomplete="off" />
              <label className="btn btn-dark color-label" for="btnradio3">
                <i className="bi bi-check2"></i>
              </label>
            </div>
          </div>
          <div className="text-secondary text-small">size :</div>
          <div className="my-2">
            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
              <input type="radio" className="btn-check" name="size" id="btnradio4" autocomplete="off" checked />
              <label className="btn btn-outline-dark" for="btnradio4">S</label>

              <input type="radio" className="btn-check" name="size" id="btnradio5" autocomplete="off" />
              <label className="btn btn-outline-dark" for="btnradio5">M</label>

              <input type="radio" className="btn-check" name="size" id="btnradio6" autocomplete="off" />
              <label className="btn btn-outline-dark" for="btnradio6">L</label>
            </div>
          </div>

          <button className="btn btn-dark w-100 my-5"  onClick={()=>{addAllCartItem(productDetail)}}><i className="bi bi-cart-plus-fill"></i>
            Add to Cart </button>
          <div>
            <span className="text-secondary text-small">Details :</span>

            <div className="accordion accordion-flush" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Accordion Item #1
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <strong>This is the first item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}