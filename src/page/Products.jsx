import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import { toast } from "react-toastify";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [singleBrand, setSingleBrand] = useState('');
    const [singleCategory, setSingleCategory] = useState('');
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(2000);
    const axiosCommon = useAxiosCommon();

    useEffect(() => {
        loadData();
        loadBrands();
        loadCategory();
        check();
    }, [min, max])
    const check = () => {
        if (min > max) {
            toast.error("Min price can't be greater than Max price")
        }
    }


    const loadData = async () => {
        try {
            const { data } = await axiosCommon.get('/products');
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // load all brand name 
    const loadBrands = async () => {
        try {
            const { data } = await axiosCommon.get('/brands');
            setBrands(data);
        } catch (error) {
            console.error("Error fetching brands:", error);
        }
    };

    // load all category name 
    const loadCategory = async () => {
        try {
            const { data } = await axiosCommon.get('/category');
            setCategories(data);
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    }

    // select a single category name by user 
    const handleCategory = e => {
        const cat = e.target.value;
        setSingleCategory(cat);
    }

    // select a single brand name by user 
    const handleBrand = e => {
        const bra = e.target.value;
        setSingleBrand(bra);
    }

    // select a min price 
    const handleMin = e => {
        const min = e.target.value;
        setMin(min);
    }

    // select max price 
    const handleMax = e => {
        const max = e.target.value;
        setMax(max);
    }

    // apply all the document 
    const handleClick = async () => {
        const search = { max, min, singleBrand, singleCategory }
        try {
            const { data } = await axiosCommon.get('/products', { params: search });
            setProducts(data);
        } catch (error) {
            console.error("Error fetching filtered products:", error);
        }
    }



    console.log(products);
    // console.log(brands);
    // console.log(categories);
    // console.log(min, max);

    return (
        <div>
            {/* category input  */}
            <select onChange={handleCategory} name="" id="">
                <option value="">Select Category</option>
                {
                    categories.map(category =>
                        <option key={category._id} value={category.category}>{category.category}</option>
                    )
                }
            </select>
            {/* brand input */}
            <select onChange={handleBrand} name="" id="">
                <option value="">Select Brand</option>
                {
                    brands.map(brand =>
                        <option key={brand._id} value={brand.brand}>{brand.brand}</option>
                    )
                }
            </select>

            <input onChange={handleMin} type="number" name="min" id="" placeholder="Min price" defaultValue={1} />
            <input onChange={handleMax} type="number" name="max" id="" placeholder="Max price" defaultValue={2000} />

            <button onClick={handleClick} className="btn btn-outline btn-primary w-auto">Apply</button>

            <ProductCard />
        </div>
    );
};

export default Products;