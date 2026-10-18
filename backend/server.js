require("dotenv").config();
const jwt = require("jsonwebtoken");
// imports backend into our application
const express = require("express"); 

// import CORS[allows backend to communicate with fromtend ]

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

// const Products=[{
//     id:1,
//     name :"gaming laptop",
//     price: 2000,
//     rating: 4.5,

// },
// {id:2,
//     name:"Iphones",
//     price:3000,
//     rating: 4.0,
// },
// {id:3,
//     name:"Refrigirator",
//     price:4000,
//     rating: 4.8,

// },
// // {id:4,
// //     name:"Desktops",
// //     price: 2000,
// //     rating: 4.5,

// },

// ];

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

app.delete("/products/:id",(req,res) => {
const productId = Number(req.params.id);

db.query(
    " SELECT * FROM products WHERE id = ?",
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
    "DELETE FROM  products WHERE id = ?",
    [productId],

    (err) => {
        if(err){
            console.log("DATABASE ERROR:",err);

            return res.status(500).json({
message:"Failed to delete the product"
            });
        }
       res.json({
message :"product deleted sucessfully"
        });
    }
 
 )
    }
)   ;

});


app.post("/orders", (req, res) => {
    const {
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        cartItems
    } = req.body;

    // 1. Validate the customer's details.
    if (
        !customerName?.trim() ||
        !customerEmail?.trim() ||
        !customerPhone?.trim() ||
        !customerAddress?.trim() ||
        !Array.isArray(cartItems) ||
        cartItems.length === 0
    ) {
        return res.status(400).json({
            message: "Please provide customer details and cart items."
        });
    }

    // 2. Validate every product ID and quantity.
    const validItems = cartItems.every(item =>
        Number.isInteger(Number(item.id)) &&
        Number(item.id) > 0 &&
        Number.isInteger(Number(item.quantity)) &&
        Number(item.quantity) > 0
    );

    if (!validItems) {
        return res.status(400).json({
            message: "Invalid product or quantity."
        });
    }

    // 3. Start a database transaction.
    db.beginTransaction((err) => {
        if (err) {
            console.log("TRANSACTION ERROR:", err);
            return res.status(500).json({
                message: "Could not start the order."
            });
        }

        // Roll back changes if anything goes wrong.
        const failOrder = (status, message, error) => {
            if (error) {
                console.log("ORDER ERROR:", error);
            }

            db.rollback(() => {
                res.status(status).json({ message });
            });
        };

        // 4. Get the real prices from MySQL.
        const productIds = cartItems.map(item => Number(item.id));

        db.query(
            "SELECT id, price FROM products WHERE id IN (?)",
            [productIds],
            (err, products) => {
                if (err) {
                    return failOrder(
                        500,
                        "Failed to check products.",
                        err
                    );
                }

                // Ensure every requested product exists.
                const productsById = new Map(
                    products.map(product => [
                        Number(product.id),
                        Number(product.price)
                    ])
                );

                const allProductsExist = cartItems.every(item =>
                    productsById.has(Number(item.id))
                );

                if (!allProductsExist) {
                    return failOrder(
                        400,
                        "One or more products no longer exist."
                    );
                }

                // 5. Calculate the total using database prices.
                const total = cartItems.reduce((sum, item) => {
                    const price = productsById.get(Number(item.id));
                    return sum + price * Number(item.quantity);
                }, 0);

                // 6. Save the customer's order.
                db.query(
                    `INSERT INTO orders
                    (customer_name, customer_email, customer_phone,
                     customer_address, total_amount)
                    VALUES (?, ?, ?, ?, ?)`,
                    [
                        customerName.trim(),
                        customerEmail.trim(),
                        customerPhone.trim(),
                        customerAddress.trim(),
                        total
                    ],
                    (err, result) => {
                        if (err) {
                            return failOrder(
                                500,
                                "Failed to save the order.",
                                err
                            );
                        }

                        const orderId = result.insertId;
                        let index = 0;

                        // 7. Save each product in the order.
                        const saveNextItem = () => {
                            if (index >= cartItems.length) {
                                // All items saved. Commit everything.
                                return db.commit(err => {
                                    if (err) {
                                        return failOrder(
                                            500,
                                            "Failed to complete the order.",
                                            err
                                        );
                                    }

                                    return res.status(201).json({
                                        message: "Order saved successfully.",
                                        orderId,
                                        total
                                    });
                                });
                            }

                            const item = cartItems[index];
                            const productId = Number(item.id);
                            const quantity = Number(item.quantity);
                            const unitPrice = productsById.get(productId);

                            db.query(
                                `INSERT INTO order_items
                                (order_id, product_id, quantity, unit_price)
                                VALUES (?, ?, ?, ?)`,
                                [
                                    orderId,
                                    productId,
                                    quantity,
                                    unitPrice
                                ],
                                err => {
                                    if (err) {
                                        return failOrder(
                                            500,
                                            "Failed to save order items.",
                                            err
                                        );
                                    }

                                    index++;
                                    saveNextItem();
                                }
                            );
                        };

                        saveNextItem();
                    }
                );
            }
        );
    });
});



const bcrypt = require("bcryptjs");

// REGISTER A NEW CUSTOMER
app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        !name.trim() ||
        !email.trim() ||
        password.length < 8 ||
        password.length > 72
    ) {
        return res.status(400).json({
            message: "Enter a name, valid email and password of 8–72 characters."
        });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    bcrypt.hash(password, 12, (hashError, passwordHash) => {
        if (hashError) {
            console.log("PASSWORD HASH ERROR:", hashError);

            return res.status(500).json({
                message: "Could not create account."
            });
        }

        db.query(
            `INSERT INTO users (name, email, password_hash)
             VALUES (?, ?, ?)`,
            [cleanName, cleanEmail, passwordHash],
            (err, result) => {
                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(409).json({
                            message: "An account with this email already exists."
                        });
                    }

                    console.log("REGISTRATION ERROR:", err);

                    return res.status(500).json({
                        message: "Could not create account."
                    });
                }

                return res.status(201).json({
                    message: "Account created successfully.",
                    user: {
                        id: result.insertId,
                        name: cleanName,
                        email: cleanEmail,
                        role: "customer"
                    }
                });
            }
        );
    });
});


// LOGIN A CUSTOMER
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        !email.trim() ||
        !password
    ) {
        return res.status(400).json({
            message: "Email and password are required."
        });
    }

    const cleanEmail = email.trim().toLowerCase();

    db.query(
        `SELECT id, name, email, password_hash, role
         FROM users
         WHERE email = ?`,
        [cleanEmail],
        (error, results) => {
            if (error) {
                console.log("LOGIN DATABASE ERROR:", error);

                return res.status(500).json({
                    message: "Login failed. Please try again."
                });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    message: "Invalid email or password."
                });
            }

            const user = results[0];

            bcrypt.compare(
                password,
                user.password_hash,
                (compareError, isMatch) => {
                    if (compareError) {
                        console.log("PASSWORD COMPARISON ERROR:", compareError);

                        return res.status(500).json({
                            message: "Login failed. Please try again."
                        });
                    }

                    if (!isMatch) {
                        return res.status(401).json({
                            message: "Invalid email or password."
                        });
                    }
const token =jwt.sign(
    {
        id :user.id,
        role:user.role
    },
    process.env.JWT_SECRET,
    { expiresIn:"1h"

    }
);




                    return res.status(200).json({
                        message: "Login successful.",
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        }
                    });
                }
            );
        }
    );
});


// Start the server and listen on port 5000.
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

