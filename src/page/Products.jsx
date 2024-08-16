import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import useAxiosCommon from "../Hooks/useAxiosCommon";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState(null);
    const [category, setCategory] = useState(null);
    const axiosCommon = useAxiosCommon();

    useEffect(() => {
        loadData();
        loadBrands();
        loadCategory();
    }, [])

    const loadData = async () => {
        try {
            const { data } = await axiosCommon.get('/products');
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const loadBrands = async () => {
        try {
            const { data } = await axiosCommon.get('/brands');
            setBrands(data);
        } catch (error) {
            console.error("Error fetching brands:", error);
        }
    };

    const loadCategory = async () => {
        try {
            const { data } = await axiosCommon.get('/category');
            setBrands(data);
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    }


    // console.log(products);
    // console.log(brands);

    return (
        <div>
            <select name="" id="">
                <option value="">Select Category</option>

            </select>
            <ProductCard />
        </div>
    );
};

export default Products;