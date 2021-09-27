import React from 'react'
import Rating from './Rating';
import {Link} from 'react-router-dom'

function HomeProduct({product}) {


    return (
        <>
            <Link to={`/product/${product._id}`}>
                <div  className="homeproduct_card" >
                    <div className="homeproduct_card_image">
                        <img src={product.image} alt={product.name}></img>
                    </div>
                    <div className="homeproduct_card-body">
                        <Link to={`/product/${product._id}`}>
                            <div className="homeproduct_card_name">
                                {product.name}
                            </div>
                            <div className="homeproduct_card_description">
                                {product.description}
                            </div>
                            <div className="homeproduct_card_button">
                                SHOP NOW
                            </div>
                        </Link>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default HomeProduct
