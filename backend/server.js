// imports backend into our application
const express = require("express"); 
// this creates our backend application 
const app = express(); 

// this is like a door through which we access our server
const PORT =5000;

const products=[{
    id:1,
    name :"gaming laptop",
    price: 2000,
},
{id:2,
    name:"Iphone",
    price:3000,
},
{id:3,
    name:"Refrigirator",
    price:4000,

},
{id:4,
    name:"Desktops",
    price:2000,

},

];

// my 1st api,Send this message back to whoever made the request
app.get("/",(req,res) =>{
    res.send("Ecommerce backend is running");
});

app.get("/products",(req,res)=>{
    res.json(products);
});

// Start the server and listen on port 5000.
app.listen(PORT,()=>{
console.log(` server running on port ${PORT} `)
});

