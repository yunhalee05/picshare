import React from 'react'
import Rating from './Rating';
import {Link} from 'react-router-dom'

function Product(props) {

    const{product} = props;

    return (
        <div key={product._id} className="card" >
        <Link to={`/product/${product._id}`}>
            <img className="medium" src={product.image} alt={product.name}/>
        </Link>
        <div className="card-body">
           <Link to={`/product/${product._id}`}>
                <div style={{"color":"black", "textAlign":"center", "fontSize": "2rem", "fontWeight":"600"}}>{product.name}</div>
            </Link>
            <Rating rating ={product.rating} numReviews={product.numReviews}/>
            <div className="row">
                <div className="price">
                    ${product.price}
                </div>
                <div >
                    <Link to={`/seller/${product.seller._id}`}><img className="seller-logosmall" src={product.seller.seller.logo} alt="" /><span className="seller-name">{product.seller.seller.name}</span></Link>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Product
