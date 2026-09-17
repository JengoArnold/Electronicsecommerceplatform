// imports backend into our application
const express = require("express"); 

// import CORS[allows backend to communicste with fromtend ]

const cors = require("cors");
// this creates our backend application 
const app = express(); 

// enable cors
app.use(cors());
//enablejson requests--wehen react sends a product express needs to understand it
app.use(express.json());


// this is like a door through which we access our server
const PORT =5000;

const Products=[{
    id:1,
    name :"gaming laptop",
    price: 2000,
    rating: 4.5,

},
{id:2,
    name:"Iphones",
    price:3000,
    rating: 4.0,
},
{id:3,
    name:"Refrigirator",
    price:4000,
    rating: 4.8,

},
{id:4,
    name:"Desktops",
    price: 2000,
    rating: 4.5,

},

];

// my 1st api,Send this message back to whoever made the request
app.get("/",(req,res) =>{
    res.send("Ecommerce backend is running");
});

app.get("/Products",(req,res)=>{
    res.json(Products);
});

app.post('/Products',(req,res)=>{
    const newProduct = req.body;

    const existingProduct = Products.find(
        product => product.id === newProduct.id
    );

    if(existingProduct){
        return res.status(400).json({
message:"Product with this ID already exists"
        });
    }

Products.push(newProduct);
res.status(201).json(newProduct);
});

app.put("/products/:id",(req,res)=>{
const productid = Number(req.params.id);
const updatedProduct = req.body;
//searches the index 
const productIndex = Products.findIndex(
    product => product.id === productid
);

if (productIndex === -1){
    return res.status(404).json({
        message:"Product not found "
    });
}

Products[productIndex] = updatedProduct;
res.json(updatedProduct);
});



















// Start the server and listen on port 5000.
app.listen(PORT,()=>{
console.log(` server running on port ${PORT} `)
});

