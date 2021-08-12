import React from 'react'
import {Link} from 'react-router-dom'

function TopProduct({products}) {

    return (
        <div className="topproducts">
            {
                products.map((product, index)=>(
                    index ===0 &&
                    <>
                        <Link to={`/product/${product._id}`}>
                            <img src={product.image} alt={product.name} />
                            <div className="product_info">
                                <div className="name">{product.name}</div>
                                <div className="seller">{product.seller.seller.name}</div>
                                <div className="description">{product.description}sdlfwjlfdjwlidfjliwjflwdjlfkjwlfijwdlfjlkwjfliwjflwdjkfljwlfijiwdjfdljwlityljdklfjwifuiwytihwlijfkdjifowoidfuoywoihltjwlkefjiwuoetyilwjlejkwjfidwjoitliwjlwjk</div>
                            </div>
                        </Link>
                    </>
                ))
            }
        </div>

    )
}

export default TopProduct
