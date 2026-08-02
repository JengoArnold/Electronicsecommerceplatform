import "./Categories.css";
import React from "react";

function Categories() {

    const categories = [

        {
            id:1,
            name:"Laptops",
            icon:"💻",
        },

        {
            id:2,
            name:"Phones",
            icon:"📱",
        },

        {
            id:3,
            name:"Gaming",
            icon:"🎮",
        },

        {
            id:4,
            name:"Audio",
            icon:"🎧",
        }

    ];

    return (

        <section className="categories">

            <h2>Shop by Category</h2>

            <div className="categories-grid">

                {categories.map((category) => (

                    <div
                        className="category-card"
                        key={category.id}
                    >

                        <div className="category-icon">
                            {category.icon}
                        </div>

                        <h3>{category.name}</h3>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default Categories;