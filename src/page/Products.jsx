import { useEffect, useState } from "react";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import { toast } from "react-toastify";
import ProductCard from '../components/ProductCard/ProductCard'

const Products = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [singleBrand, setSingleBrand] = useState('');
    const [singleCategory, setSingleCategory] = useState('');
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(2000);
    const [sorted, setSorted] = useState('');
    const [totalPage, setTotalPage] = useState(0);
    const axiosCommon = useAxiosCommon();
    const perPage = 10;     //one page have 10 cards

    // console.log(totalPage);
    useEffect(() => {
        loadData();
        loadBrands();
        loadCategory();
        check();
        loadProductNumber();
        setPageNumber();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [min, max, page, singleBrand, singleCategory])
    const check = () => {
        if (min > max) {
            toast.error("Min price can't be greater than Max price")
        }
    }

    const setPageNumber = () => {
        const newPage = Math.ceil(total / perPage);
        console.log(total);
        // if (totalPage === 0) { setTotalPage(1) };
        if (totalPage === newPage) return;

        setTotalPage(newPage);
    };


    const loadProductNumber = async () => {
        // try {
        //     const { data } = await axiosCommon.get('/productCount');
        //     setTotal(data);
        // } catch (error) {
        //     console.error("Error fetching products:", error);
        // }
        const length = products.length;
        setTotal(length);
    };

    const loadData = async () => {
        const search = { max, min, singleBrand, singleCategory, page, perPage, sorted }
        try {
            const { data } = await axiosCommon.get('/products', { params: search });
            setProducts(data);
        } catch (error) {
            console.error("Error fetching filtered products:", error);
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
        setPage(1);

    }

    // select sort item menu
    const handleSort = e => {
        const sort = e.target.value;
        setSorted(sort);
    }

    // console.log(products);
    // console.log(brands);
    // console.log(categories);
    // console.log(min, max);
    console.log(page, totalPage);

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* category input  */}
                <select className="border border-primary px-4 py-2 rounded-xl" onChange={handleCategory} name="" id="">
                    <option value="">Select Category</option>
                    {
                        categories.map(category =>
                            <option key={category._id} value={category.category}>{category.category}</option>
                        )
                    }
                </select>
                {/* brand input */}
                <select className="border border-primary px-4 py-2 rounded-xl" onChange={handleBrand} name="" id="">
                    <option value="">Select Brand</option>
                    {
                        brands.map(brand =>
                            <option key={brand._id} value={brand.brand}>{brand.brand}</option>
                        )
                    }
                </select>

                <select className="border border-primary px-4 py-2 rounded-xl" onChange={handleSort} name="" id="">
                    <option value="">Select sort by</option>
                    <option value="lowToHigh">Low to high</option>
                    <option value="HighToLow">High to Low</option>
                    <option value="Newest">Newest</option>

                </select>

                <input className="border border-primary px-4 py-2 rounded-xl" onChange={handleMin} type="number" name="min" id="" placeholder="Min price" defaultValue={1} />
                <input className="border border-primary px-4 py-2 rounded-xl" onChange={handleMax} type="number" name="max" id="" placeholder="Max price" defaultValue={2000} />

                <button onClick={() => {
                    loadData();
                    handleClick();
                }} className="btn btn-outline btn-primary w-auto">Apply</button>
            </div>

            <div className="flex justify-normal pb-6">
                <button onClick={() => { setPage(page - 1) }} disabled={page === 1} className="w-20 btn ">«</button>
                <button className="w-20 btn btn-active">page {page}</button>
                <button onClick={() => { setPage(page + 1) }} disabled={page === totalPage} className="w-20 btn ">»</button>
            </div>
            {/* {page || totalPage || page} */}


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    products.map(product =>
                        <ProductCard key={product._id} product={product} />
                    )
                }
            </div>

            {/* <ProductCard /> */}

        </div>
    );
};

export default Products;