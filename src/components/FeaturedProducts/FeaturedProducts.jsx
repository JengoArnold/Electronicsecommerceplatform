
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
const[editingProduct,setEditingProduct]=useState("null");

const[createError,setCreateError] = useState("");
//a small temporary object that will hold whatever a user types in the form 
const[newProduct,setNewProduct]= useState({
  name:"",
  price:"",
  rating:""
});

useEffect(()=>{

fetch("http://localhost:5000/products")
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


function addProduct(event){
  event.preventDefault();
//Incase u dont want to send empty fields in our form and irrelevant data to the data base,this stops the fetch request(form Validation)
if (
    !newProduct.name ||
    !newProduct.price ||
    !newProduct.rating
) {
    setCreateError("Please fill in all fields.");
    return;
}


  //Post request to my express API
  fetch("http://localhost:5000/products",{
method:"POST",
headers:{
  "Content-Type" : "application/json"
     },

body:JSON.stringify({
 
  name: newProduct.name,
  price: Number(newProduct.price),
  rating: Number(newProduct.rating)
         })
           })
   //This coverts the data sent from the backend from JSON to javascript Object
     .then(response => response.json())
     //take the product the backend sent back and put it into data
     .then(data =>{
      console.log("PRODUCT CREATE:", data);
      
//For the product to immediately appear in mySQL and react app
setProduct(prevProducts =>[
  //keep the existing products
  ...prevProducts,
  //data means add the newly created product
  data
]);
//Clears the form for the next product
setNewProduct({
  name:"",
  price:"",
  rating:""

});
     })
     //incase the new product has failed java script can display the error 
     .catch(error =>{
console.log("CREATE ERROR:", error);
setCreateError(error.message);
     });
     
}

//Creating an Update Product with React
function updateProduct(product){

  console.log("UPDATE BUTTON CLICKED:",product);

  const updateProduct ={
    name:product.name,
    price: Number(product.price) +100,
    rating: Number(product.rating)
  };

fetch(`http://localhost:5000/products/${product.id}`,{
  method:"PUT",
  headers:{
    "Content-Type": "application/json"
  },
  body: JSON.stringify(updateProduct)
})
.then(response =>{
  if(!response.ok){
    throw new Error("Product colud not be Updated");

  }
  return response.json();
})
.then(data =>{
  console.log("PRODUCT UPDATED:", data);
setProduct(prevProducts => 
  prevProducts.map(item =>
    item.id === data.id ? data : item 
  )
);

})
.catch(error => {
  console.log("UPDATE ERROR:" ,error);
});

}

// Delete
function deleteProduct(productId) {

    fetch(`http://localhost:5000/products/${productId}`, {
        method: "DELETE"
    })
        .then(response => {

            if (!response.ok) {
                throw new Error("Product could not be deleted");
            }

            return response.json();
        })
        .then(data => {

            console.log("PRODUCT DELETED:", data);

            setProduct(prevProducts =>
                prevProducts.filter(item => item.id !== productId)
            );
        })
        .catch(error => {
            console.log("DELETE ERROR:", error);
        });
}















  return (
    <div className="Featured-Products">
      <h2>FeaturedProducts </h2>


{createError && <p>{createError}</p>}
      {loading && <p>⏳ loading.......</p>}
      {error && <p>{error}</p>}
     <div className="Product-grid">

 {Product.map((item) => (
<div className="product-item" key={item.id}>
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
                     <button onClick={() => updateProduct(item)}>
        Update Product
    </button>
    <button onClick={() => deleteProduct(item.id)}>
    Delete Product
</button>

</div>

                ))}

     </div>
 


 {createError &&(
  <p className="form-error">{createError}</p>
 )}
 <form className="add-product-form" onSubmit={addProduct}> 
  <h2>Add Product</h2>

 <input
 type="text"
 placeholder="Product name"
 value={newProduct.name}
 //onChange will run wenever a user cahnges whats inside the input
 onChange={(e)=>
  setNewProduct({
    ...newProduct,
    name:e.target.value
  })
 }
 />
 <input
 type="number"
 placeholder="Price"
 value={newProduct.price}
 onChange={(e)=>
  setNewProduct({
    ...newProduct,
    price: e.target.value
  })
 }
 
 />
 <input
  type="number"
  step="0.1"
  placeholder="Rating"
  value={newProduct.rating}
  onChange={(e) =>
    setNewProduct({
      ...newProduct,
      rating: e.target.value  
    })
  }
/>

<button type="submit">Add product</button>

 </form>




      </div>

    
  );
}

export default FeaturedProducts
