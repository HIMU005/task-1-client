import './ProductCard.css'
const ProductCard = () => {
    return (
        /* From Uiverse.io by ElSombrero2 */
        <div className="card">
            <div className="content">
                <div className="back">
                    <div className="back-content">
                        <img src="https://i.ibb.co/7yQ5YCC/electronics.jpg" alt="" />
                        <strong>productName</strong>
                    </div>
                </div>
                <div className="front">

                    <div className="img">
                        <div className="circle">
                        </div>
                        <div className="circle right" id="">
                        </div>
                        <div className="circle bottom" id="">
                        </div>
                    </div>

                    <div className="front-content">
                        <small className="badge text-white">productName</small>
                        <div className="description">
                            <div className="title">
                                <p className="title ">
                                    <s className='text-white font-normal'>description</s>
                                </p>
                                {/* <svg fill-rule="nonzero" height="15px" width="15px" viewBox="0,0,256,256" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g style="mix-blend-mode: normal" text-anchor="none" font-size="none" font-weight="none" font-family="none" stroke-dashoffset="0" stroke-dasharray="" stroke-miterlimit="10" stroke-linejoin="miter" stroke-linecap="butt" stroke-width="1" stroke="none" fill-rule="nonzero" fill="#20c997"><g transform="scale(8,8)"><path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path></g></g></svg> */}
                            </div>
                            <p className="card-footer">
                                rating: ratings | price: price|  date: creationDateTime
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;