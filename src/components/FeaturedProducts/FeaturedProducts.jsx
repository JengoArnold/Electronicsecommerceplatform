

import "./FeaturedProducts.css";
import ProductCard from "../ProductCard/ProductCard";

import desk from "../../assets/images/desk.jpg";
import fridges from "../../assets/images/fridges.jpg";
import gamingPC from "../../assets/images/gamingPC.jpg";
import iphones from "../../assets/images/iphones.jpg";

import React,{useEffect,useState} from 'react';
// Connect backend product IDs to frontend images
const productImages = {
    1: gamingPC,
    2: iphones,
    3: desk,
    4: fridges
};




function FeaturedProducts({addToCart , selectProduct}) {

  // gets products get from backend 
const [Product, setProduct] = useState([]);

//error when the fetch fails 
const[error,setError]=useState("");

//Tracks if the products are still loading 
const[loading,setLoading]=useState(true);

useEffect(()=>{

fetch("http://localhost:5000/Products")
.then(response=>response.json())
.then(data=>{
  console.log("DATA RECIEVED:",data);
  setProduct(data);
  setLoading(false);

 
})

.catch(error => {
  console.log("FETCH ERROR:",error);
  setError("unable to fetch data");
  setLoading(false);
});

},[]);


   


  return (
    <div className="Featured-Products">
      <h2>FeaturedProducts </h2>
      {loading && <p>⏳ loading.......</p>}
      {error && <p>{error}</p>}
     <div className="Product-grid">

 {Product.map((item) => (

                    <ProductCard
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        rating={item.rating}
                        Image={productImages[item.id]}
                        addToCart={addToCart}
                        product={item}
                        selectProduct={selectProduct}
                    />

                ))}




     </div>

        
      </div>

    
  );
}

export default FeaturedProducts
