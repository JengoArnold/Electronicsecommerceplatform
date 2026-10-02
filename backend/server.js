// imports backend into our application
const express = require("express"); 

// import CORS[allows backend to communicste with fromtend ]

const cors = require("cors");

const mysql = require("mysql2");
// this creates our backend application 
const app = express(); 

// enable cors
app.use(cors());
//enablejson requests--wehen react sends a product express needs to understand it
app.use(express.json());


// this is like a door through which we access our server
const PORT =5000;

const db = mysql.createConnection({
   host:"localhost",
   user:"root",
   password:"admin",
   database: "arnold_tech_store"
});

db.connect((error)=>{
    if(error){
        console.log("My_SQL_CONNECTION_FAILED:",error);
    }else{
        console.log("MY_SQL_CONNECTION_SUCEESSFUL!");
    }
});

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

app.get("/products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) {
            console.log("DATABASE ERROR:", err);
            return res.status(500).json({
                message: "Failed to fetch products"
            });
        }
        res.json(results);
    });
});

app.post('/products',(req,res)=>{
    const newProduct = req.body;
// Take the product that React sent me and store it in a JavaScript variable called newProduct.
    
db.query(
    "SELECT * FROM products WHERE id = ?",
    [newProduct.id],
    (err,results) => {
if(err) {
    console.log("DATABASE ERROR:",err);

    return res.status(500).json({
message:"Database error"
    });

}

if(results.length > 0){
return res.status(400).json({
    message: "Product with this ID already exits"
});
}
//now here is where we Insert the product into MYSQL

db.query(
    "INSERT INTO products(id,name,price,rating) VALUES (?,?,?,?)",
    [
        newProduct.id,
        newProduct.name,
        newProduct.price,
        newProduct.rating
    ],
    //What does (err) => {} mean?
//This is a callback function.
    (err) => {
        
if(err){
    console.log("DATABASE ERROR:",err);
    return res.status(500).json({
        message:"Failed to create the product"
    });
}
                    res.status(201).json(newProduct);
                }
            );
        }
    );
});

app.put("/products/:id",(req,res)=>{

    const productid = Number(req.params.id);
    const updatedProduct = req.body;

    db.query(
        "SELECT * FROM products WHERE id = ?",
        [productid],
        (err, results) => {

            if (err) {
                console.log("DATABASE ERROR:", err);

                return res.status(500).json({
                    message: "Database error"
                })
            };

// did my SQL find the product 
if(results.length === 0){
    return res.status(404).json({
message:"Product not found"
    });
}

db.query(
    "UPDATE products SET name =?, price =?, rating =? WHERE id = ?",
    [
        updatedProduct.name,
        updatedProduct.price,
        updatedProduct.rating,
        productid
    ],
    // This is the callback that runs after MySQL attempts the update.
    (err) => {
        if(err){
            console.log("DATABASE ERROR:" ,err);
           

            return res.status(500).json({
                message: "Failed to update product"
            });
           
        }
 res.json(updatedProduct);
    }
)
}
    
);
});



// app.put("/products/:id",(req,res)=>{
// const productid = Number(req.params.id);
// const updatedProduct = req.body;

// //searches the index in the array (find the product we want to update)
// const productIndex = Products.findIndex(
//     product => product.id === productid
// );

// if (productIndex === -1){
//     return res.status(404).json({
//         message:"Product not found "
//     });
// }

// Products[productIndex] = updatedProduct;
// res.json(updatedProduct);
// });

app.delete("/products/:id",(res,req) => {
const productId = Number(req.params.id);

db.query(
    " SELECT * FROM products WHERE id = ?"
    [productId],
    (err,result) => {
if(err) {
    console.log("DATABASE ERROR:", err);

    return res.status(500).json({
message:"Database error"
    });
}
//checks of the product doesnt exit 
 if(result.length === 0){
return res.status(404).json({
    message:"product not found"
});
 }
//NOW delete from my sql 
 db.query(
    "DELETE FROM  products WHERE id = ? "
    [productId]

    (err) => {
        if(err){
            console.log("DATABASE ERROR:",err);

            return res.status(500).json({
message:"Failed to delete the product"
            });
        }
        res.json
    }

 )
    }
)   ;

});


// Start the server and listen on port 5000.
app.listen(PORT,()=>{
console.log(` server running on port ${PORT} `)
});

