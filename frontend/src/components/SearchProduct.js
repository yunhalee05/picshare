import React from 'react'
import {Link} from 'react-router-dom'


function SearchProduct({product}) {
    return (
        <div  >
            <Link to={`/product/${product._id}`}>
                <div className="search-product-image">
                    <img src={product.image} alt={product.name}/>
                </div>
            </Link> 
            <div className="search-product-info">
                <div style={{width:"80%", overflow:"hidden", fontSize:"20px"}}>{product.name}</div>
                <div >$  {product.price}</div>
            </div>
        </div>
    )
}

export default SearchProduct
