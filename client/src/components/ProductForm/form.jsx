import { useEffect, useState } from "react";
import axios from "axios";
import {useProductsStore} from "../../store/productsStore"
import {validName, 
    validDescription, 
    validPrice, 
    validStock, 
    validCategory,
    validImage
} from "./validations"

export default function ProductForm(){
    const {addProduct} = useProductsStore()
    const [categories, setCategories]=useState([])
    useEffect(()=>{
        axios.get('/categories')
        .then(res=>setCategories(res.data))
        .catch(err=>{throw new Error(err)})
    }, [])

    const[formData, setFormData]=useState({
        name:"",
        description:"",
        price:0,
        stock:0,
        rating:0,
        category:"",
        image:""
    })

    const [errors, setErrors]=useState({
        name:false,
        description:false,
        price:false,
        stock:false,
        category:false,
        image:false
    })

    const allErrorsFalsy = (errors) => {
        return Object.values(errors).every(error => !error);
    };

    const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
        ...formData,
        [name]: value
        });

    switch(name){
        case "name":
        setErrors({
            ...errors,
            name: !validName(value),
        });
        break;
        case "description":
        setErrors({
            ...errors,
            description: !validDescription(value),
        });
        break;
        case "price":
        setErrors({
            ...errors,
            price: !validPrice(value),
        });
        break;
        case "stock":
        setErrors({
            ...errors,
            stock: !validStock(value),
        });
        break;
        case "category":
        setErrors({
            ...errors,
            category: !validCategory(value),
        });
        break;
        case "image":
        setErrors({
            ...errors,
            image: !validImage(value),
        });
        break;
        default:
        break;
    }
}
    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault();
        if(allErrorsFalsy){
            try {
                await addProduct(formData)
                setFormData({
                    name:"",
                    description:"",
                    price:0,
                    stock:0,
                    rating:0,
                    category:"",
                    image:""    
                })
                window.alert("Product added successfully")
            } catch (error) {
                window.alert("Check for errors")
                throw new Error(error.message)
            }
        }
    }

    return(
        <div className="formContainer">
            <form onSubmit={handleSubmit} className="form">
                <div className="nameInput">
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange}/>
                        {errors.name && <p className='Errors'>invalid name</p>}
                    </label>
                </div>
                <div className="descriptionInput">
                    <label>
                        Description:
                        <input type="text" name="description" value={formData.description} onChange={handleChange}/>
                        {errors.description && <p className='Errors'>invalid description</p>}
                    </label>
                </div>
                <div className="priceInput">
                    <label>
                        Price:
                        <input type="number" name="price" value={formData.price} onChange={handleChange}/>
                        {errors.price && <p className='Errors'>invalid price</p>}
                    </label>
                </div>
                <div className="stockInput">
                    <label>
                        Stock:
                        <input type="number" name="stock" value={formData.stock} onChange={handleChange}/>
                        {errors.stock && <p className='Errors'>invalid stock</p>}
                    </label>
                </div>
                <div className="categoryInput">
                    <label>
                        Category:
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option key="category" value="all">Select a category</option>
                            {categories.map(category=>(
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="imageInput">
                    <label>
                        Image:
                        <input type="text" name="image" value={formData.image} onChange={handleChange}/>
                        {errors.image && <p className='Errors'>invalid image</p>}
                    </label>
                </div>

                <button onClick={()=>handleSubmit}> Create product </button>
            </form>
        </div>
    )
}