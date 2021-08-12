import React from 'react'
import Rating from './Rating';
import {Link} from 'react-router-dom'

function Product({product}) {


    return (
        <div className="card" >
            <Link to={`/product/${product._id}`}>
                <img className="product_image" src={product.image} alt={product.name}/>
            </Link>

            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                        <img  src={product.seller.seller.logo} alt={product.seller.seller.name} />
                        <div className="seller_name">{product.seller.seller.name}</div>
                </Link>
            </div>
        </div>
    )
}

export default Product
