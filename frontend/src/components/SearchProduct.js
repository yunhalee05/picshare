import React from 'react'
import {Link} from 'react-router-dom'


function SearchProduct({product}) {
    return (
        <div  >
            <Link to={`/product/${product._id}`}>
            <img src={product.image} alt={product.name}/>
            </Link> 
            <div className="search-product-info">
                    {/* <img  src={product.seller.seller.logo} alt={product.seller.seller.name} /> */}
                    <div style={{fontSize:'2.1vw'}}>$  {product.price}</div>
                    <div >{product.seller.seller.name}</div>
            </div>
            <div className="search-product-description">
                {product.description}
            </div>
        </div>
    )
}

export default SearchProduct
