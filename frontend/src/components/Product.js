import React from 'react'
import Rating from './Rating';
import {Link} from 'react-router-dom'

function Product({product}) {


    return (
        <div>
            <Link to={`/product/${product._id}`}>
                <div  className="homeproduct_card" >
                    <div className="homeproduct_card_image">
                        <img src={product.image} alt={product.name}></img>
                    </div>
                    <div className="card-body">
                <Link to={`/product/${product._id}`}>
                        <img  src={product.seller.seller.logo} alt={product.seller.seller.name} />
                        <div className="seller_name">{product.seller.seller.name}</div>
                </Link>
            </div>
                </div>
            </Link>
        </div>
    )
}

export default Product
