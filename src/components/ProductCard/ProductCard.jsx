/* eslint-disable react/prop-types */
import './ProductCard.css'
const ProductCard = ({ product }) => {
    const { productName, description, ratings, price, creationDateTime, productImage } = product;
    return (


        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow p-8">
            <a href="#">
                <img className="rounded-t-lg" src={productImage} alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight">{productName}</h5>
                </a>
                <p className="mb-3 font-normal ">{description}</p>
                <p>rating: <span className='font-bold'>{ratings}</span> </p>
                <p>price: <span className='font-bold'>{price}</span> </p>
                <p>date: <span className='font-bold'>{creationDateTime}</span> </p>
            </div>
        </div>


    );
};

export default ProductCard;