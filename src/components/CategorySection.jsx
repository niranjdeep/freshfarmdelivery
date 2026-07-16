import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CategorySection() {
    

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        fetchCategories();

    }, []);


    const fetchCategories = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/categories/"
            );

            const updatedCategories = response.data.map((category) => {

    let name = category.category_name;

    if (name === "Cow Milk" || name === "Goat Milk") {
        name = "Milk";
    }
    else if (name === "Fresh Water Fish" || name === "Sea Fish") {
        name = "Fish";
    }
    else if (name === "Fresh Water Prawn" || name === "Sea Prawn") {
        name = "Prawn";
    }
    else if (name === "Country Chicken" || name === "Broiler Chicken") {
        name = "Chicken";
    }
    else if (
        name === "Country Eggs" ||
        name === "White Eggs" ||
        name === "Quail Eggs" ||
        name === "Duck Eggs"
    ) {
        name = "Eggs";
    }

    return {
        ...category,
        category_name: name
    };
});

setCategories(updatedCategories);

        } catch(error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    if(loading){
        return <h3>Loading Categories...</h3>
    }


    return (

        <div>

            <h2>
                Shop by Category
            </h2>


            <div
                style={{
                    display:"grid",
                    gridTemplateColumns:"repeat(4,1fr)",
                    gap:"20px"
                }}
            >

            {
                categories.map((category)=>(

                    <div
    key={category.id}
    onClick={() =>
        navigate(`/category/${category.category_name}`)
    }
    style={{
        border:"1px solid #ddd",
        padding:"20px",
        borderRadius:"10px",
        textAlign:"center",
        cursor:"pointer"
    }}
>
                    

                        <img
                            src={
                                category.category_image
                                || "/default-category.png"
                            }
                            width="100"
                            height="100"
                        />


                        <h3>
                            {category.category_name}
                        </h3>


                        <p>
                            Fresh Products
                        </p>


                    </div>

                ))
            }


            </div>


        </div>

    )

}

export default CategorySection;