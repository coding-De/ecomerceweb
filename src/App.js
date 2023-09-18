import { useEffect, useState } from 'react';
import './App.css';
import AddToProduct from './component/AddToProduct';
import CartItem from './component/CartItem';
import DetailPage from './component/DetailPage';
import Navbarr from './component/Navbarr';
import ProductList from './component/ProductList';
import { Routes, Route } from "react-router-dom";


function App() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetchList();
}, [])


const fetchList = async () => {

  fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
          let tempArr = [];
          data.map((ele) => {
              tempArr.push(ele);
          })
          setProductList(tempArr);
      })
      .catch((err) => {
          console.log(err.message);
      });

}


  return (
    <div className="App">
      <Navbarr />
        <Routes>
          <Route path="/" element={<ProductList productList={productList} setProductList={setProductList}/>}></Route>
          <Route path="/detailPage" element={<DetailPage/>}/>
          <Route path="/addToProduct" element={<AddToProduct productList={productList} setProductList={setProductList}/>}/>
          <Route path="/cartItem" element={<CartItem/>}/>
        </Routes>
    </div>
  );
}

export default App;
